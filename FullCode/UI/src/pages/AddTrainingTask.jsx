import React, { useState, useEffect } from 'react';

const AddTrainingTask = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [assignedRole, setAssignedRole] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coursePdf, setCoursePdf] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingCourseTitle, setEditingCourseTitle] = useState(null);
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/getTrainingTasks');
      const result = await response.json();

      if (response.ok) {
        setTasks(result.tasks);
      } else {
        setMessage(result.message || 'Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage('Error occurred while fetching tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('courseTitle', courseTitle);
    formData.append('courseDescription', courseDescription);
    formData.append('assignedRole', assignedRole);
    formData.append('duration', duration);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);

    if (coursePdf) {
      formData.append('coursePdf', coursePdf);
    }

    const endpoint = editingCourseTitle
      ? `/api/updateTrainingTask/${editingCourseTitle}`
      : '/api/trainingTask';
    const method = editingCourseTitle ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          editingCourseTitle ? 'Task successfully updated!' : 'Task successfully added!'
        );
        fetchTasks();
        setCourseTitle('');
        setCourseDescription('');
        setAssignedRole('');
        setDuration('');
        setStartDate('');
        setEndDate('');
        setCoursePdf(null);
        setEditingCourseTitle(null);
      } else {
        setMessage(result.message || 'Error processing task.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while processing task.');
    }
  };

  const handleFileChange = (e) => {
    setCoursePdf(e.target.files[0]);
  };

  const handleEdit = (task) => {
    setCourseTitle(task.courseTitle);
    setCourseDescription(task.courseDescription);
    setAssignedRole(task.assignedRole);
    setDuration(task.duration);
    setStartDate(task.startDate);
    setEndDate(task.endDate);
    setCoursePdf(null);  // Reset file input on edit
    setEditingCourseTitle(task.courseTitle);
  };

  const handleDelete = async (courseTitle) => {
    try {
      const response = await fetch(`/api/deleteTrainingTask/${courseTitle}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Task deleted successfully');
        fetchTasks(); // Refresh task list
      } else {
        const result = await response.json();
        setMessage(result.message || 'Error deleting task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage('Error occurred while deleting task.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        {editingCourseTitle ? 'Edit Training Task' : 'Add New Training Task'}
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-600">
              Task Name:
            </label>
            <input
              type="text"
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-600">
              Course Description:
            </label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div>
            <label htmlFor="assignedRole" className="block text-sm font-medium text-gray-600">
              Assigned Role:
            </label>
            <select
              id="assignedRole"
              value={assignedRole}
              onChange={(e) => setAssignedRole(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="developer">Developer</option>
              <option value="uidesigner">UI Designer</option>
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-600">
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="coursePdf" className="block text-sm font-medium text-gray-600">
              Course PDF:
            </label>
            <input
              type="file"
              id="coursePdf"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="application/pdf"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              {editingCourseTitle ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-white">Task List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.courseTitle} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-700">{task.courseTitle}</h3>
              <p className="text-sm text-gray-600 mt-2">{task.courseDescription}</p>
              <p className="text-sm text-gray-600 mt-2">Role: {task.assignedRole}</p>
              <p className="text-sm text-gray-600 mt-2">Duration: {task.duration}</p>
              <p className="text-sm text-gray-600 mt-2">Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600 mt-2">End Date: {new Date(task.endDate).toLocaleDateString()}</p>
              {task.coursePdf && (
                <a
                  href={`http://localhost:3000/${task.coursePdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  View PDF
                </a>
              )}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.courseTitle)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default AddTrainingTask;
