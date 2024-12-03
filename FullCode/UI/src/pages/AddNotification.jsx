import React, { useState, useEffect } from 'react';

const AddNotification = () => {
  const [taskId, setTaskId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  // const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // For update mode

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/getNotifications');
      const result = await response.json();

      if (response.ok) {
        setNotifications(result.notifications);
      } else {
        setMessage(result.message || 'Failed to fetch notifications.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setMessage('Error occurred while fetching notifications.');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle Add or Update Notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    const notificationData = {
      taskId,
      taskName,
      details,
      date,
      // recipient,
    };

    try {
      const endpoint = editingTaskId
        ? `/api/updateNotification/${editingTaskId}`
        : '/api/addNotification';
      const method = editingTaskId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          editingTaskId
            ? 'Notification successfully updated!'
            : 'Notification successfully added!'
        );
        fetchNotifications();
        // Reset form and editing state
        setTaskId('');
        setTaskName('');
        setDetails('');
        setDate('');
        // setRecipient('');
        setEditingTaskId(null);
      } else {
        setMessage(result.message || 'Error processing notification.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while processing notification.');
    }
  };

  // Handle Edit Button Click
  const handleEdit = (notification) => {
    setEditingTaskId(notification.taskid);
    setTaskId(notification.taskid);
    setTaskName(notification.taskname);
    setDetails(notification.Details);
    setDate(notification.Date);
    // setRecipient(notification.recipient);
  };

  // Handle Delete Button Click
  const handleDelete = async (taskid) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
  
    try {
      const response = await fetch(`/api/deleteNotification/${taskid}`, {
        method: 'DELETE',
      });
  
      // Handle plain-text or JSON responses
      const result = await response.text(); // Change to `text()` to capture any response
      console.log('Response:', result); // Log response for debugging
  
      if (response.ok) {
        alert('Notification successfully deleted!');
        setNotifications((prev) =>
          prev.filter((notification) => notification.taskid !== taskid)
        );
      } else {
        setMessage(result || 'Error deleting notification.');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      setMessage('Error occurred while deleting notification.');
    }
  };
    
  

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        {editingTaskId ? 'Edit Notification' : 'Add New Notification'}
      </h2>

      {/* Notification Form */}
      <div className="bg-white p-6 rounded shadow-md mb-6 text-gray-700">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="taskId" className="block text-sm font-medium">
              Notification ID:
            </label>
            <input
              type="text"
              id="taskId"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="w-full p-2 border rounded"
              required
              disabled={!!editingTaskId} // Disable ID editing during update
            />
          </div>
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium">
              Notification Message:
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-medium">
              Details:
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Send Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {editingTaskId ? 'Update Notification' : 'Send Notification'}
          </button>
        </form>
      </div>

      {/* Message Display
      {message && (
        <div className="mt-4 p-4 border rounded bg-gray-200 text-center">
          <p>{message}</p>
        </div>
      )} */}

      {/* Notifications Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-white">Notification List</h2>
      <div className="bg-white p-6 rounded shadow-md text-gray-700 overflow-x-auto">
        {notifications.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">ID</th>
                <th className="border-b py-2 px-4">Message</th>
                <th className="border-b py-2 px-4">Details</th>
                <th className="border-b py-2 px-4">Date</th>
                {/* <th className="border-b py-2 px-4">Recipient</th> */}
                <th className="border-b py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.tasksd}>
                  <td className="border-b py-2 px-4">{notification.taskid}</td>
                  <td className="border-b py-2 px-4">{notification.taskname}</td>
                  <td className="border-b py-2 px-4">{notification.Details}</td>
                  <td className="border-b py-2 px-4">
                    {new Date(notification.Date).toLocaleDateString()}
                  </td>
                  {/* <td className="border-b py-2 px-4">{notification.Recipient}</td> */}
                  <td className="border-b py-2 px-4">
                    <button
                      onClick={() => handleEdit(notification)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notification.taskid)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mt-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default AddNotification;
