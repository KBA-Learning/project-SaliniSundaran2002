import React, { useState, useEffect } from 'react';

const UserViewNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch notifications when the component mounts
  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/getNotifications');
      const result = await response.json();

      if (response.ok) {
        setNotifications(result.notifications);  // Set notifications from the response
      } else {
        setMessage(result.message || 'Failed to fetch notifications.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setMessage('Error occurred while fetching notifications.');
    }
  };

  useEffect(() => {
    fetchNotifications();  // Call the fetch function on component mount
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Notifications</h2>
      
      {/* Display message if there's an error or no notifications */}
      {message && (
        <div className="mt-4 p-4 border rounded bg-gray-200 text-center">
          <p>{message}</p>
        </div>
      )}

      {/* Display Notifications */}
      {notifications.length > 0 ? (
        <div className="bg-white p-6 rounded shadow-md text-gray-700">
          {notifications.map((notification) => (
            <div key={notification.taskid} className="border-b py-4">
              <h3 className="font-bold text-xl text-purple-700">{notification.taskname}</h3>
              <p className="text-gray-600">{notification.Details}</p>
              <p className="text-sm text-gray-400">
                {new Date(notification.Date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default UserViewNotification;
