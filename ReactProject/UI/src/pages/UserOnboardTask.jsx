
import React, { useEffect, useState } from 'react';


const UserOnboardTask = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch onboarding tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/getOnboardingTasks');
      const result = await response.json();

      if (response.ok && Array.isArray(result.tasks)) {
        setTasks(result.tasks);
      } else {
        setMessage(result.message || 'Failed to fetch onboarding training data.');
      }
    } catch (error) {
      setMessage('Error occurred while fetching onboarding training data.');
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Onboarding Training Tasks</h2>

      {message && <p className="text-center text-red-500">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.taskTitle} className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-bold">{task.taskTitle}</h3>
              <p>{task.taskDescription}</p>
              <p>Start Date: {new Date(task.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(task.endDate).toLocaleDateString()}</p>
              {task.taskPdf && (
                <a
                href={`http://localhost:3000/${task.taskPdf}`}

                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View PDF
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No onboarding training tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default UserOnboardTask
