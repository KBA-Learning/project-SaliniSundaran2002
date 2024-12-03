import React, { useState, useEffect } from 'react';
import { logUserRole } from '../utils/getUserRole'; // Import logUserRole function

const UserTrainingTask = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [userRole, setUserRole] = useState(''); // State to store user role

  // Function to fetch training tasks based on the user role
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/getTrainingTasks');
      const result = await response.json();

      if (response.ok) {
        // Filter tasks by user role
        const filteredTasks = result.tasks.filter(task => task.assignedRole === userRole);
        setTasks(filteredTasks);
      } else {
        setMessage(result.message || 'Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage('Error occurred while fetching tasks.');
    }
  };

  // Fetch the user role when the component mounts
  const fetchUserRole = async () => {
    try {
      const role = await logUserRole(); // Call the logUserRole function to get the user role
      setUserRole(role); // Set the user role in state
      console.log("userrole",role);
      
    } catch (error) {
      console.error('Error fetching user role:', error);
      setMessage('Failed to get user role.');
    }
  };

  useEffect(() => {
    fetchUserRole(); // Fetch the user role when the component mounts
  }, []);

  // Fetch tasks when the userRole is updated
  useEffect(() => {
    if (userRole) {
      fetchTasks(); // Fetch tasks only if the user role is available
    }
  }, [userRole]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Training Tasks</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.courseTitle} className="bg-white p-6 rounded shadow-md text-gray-700">
              <h3 className="text-xl font-bold">{task.courseTitle}</h3>
              <p className="mt-2">{task.courseDescription}</p>
              <div className="mt-4">
                {task.coursePdf && (
                  <a 
                  href={task.coursePdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500"
                  onClick={(e) => {
                    console.log("PDF URL:", task.coursePdf); // Log the URL to check if it's correct
                  }}
                >
                  View PDF
                </a>
                )}
              </div>
              <p className="mt-2">Start Date: {task.startDate}</p>
              <p>End Date: {task.endDate}</p>
            </div>
          ))
        ) : (
          <p>No tasks available for your role.</p>
        )}
      </div>
    </div>
  );
};

export default UserTrainingTask;
