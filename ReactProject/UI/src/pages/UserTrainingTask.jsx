import React, { useState, useEffect } from 'react';

const UserTrainingTask = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserTrainingTasks = async () => {
      try {
        const response = await fetch('/api/getUserTraining', {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          setTasks(result.tasks);
        } else {
          setMessage(result.message || 'Error fetching tasks.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setMessage('Error occurred while fetching tasks.');
      }
    };

    fetchUserTrainingTasks();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDiff = end - currentDate;

    if (timeDiff <= 0) {
      return "Task expired";
    }

    const days = Math.floor(timeDiff / (1000 * 3600 * 24)); // Convert to days
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600)); // Convert to hours
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60)); // Convert to minutes

    return `${days} days`;
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Your Training Tasks</h2>
      
      {message && <p className="text-red-500 text-center">{message}</p>}

      <div className="bg-white p-6 rounded shadow-md mb-6 text-gray-700">
        {tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">Course Name</th>
                  <th className="border-b py-2 px-4">Course Description</th>
                  <th className="border-b py-2 px-4">Course File</th>
                  <th className="border-b py-2 px-4">Start Date</th>
                  <th className="border-b py-2 px-4">End Date</th>
                  <th className="border-b py-2 px-4">Remaining Time</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.courseTitle}>
                    <td className="border-b py-2 px-4">{task.courseTitle}</td>
                    <td className="border-b py-2 px-4">{task.courseDescription}</td>
                    <td className="border-b py-2 px-4">
                      {task.coursePdf && (
                        <a
                          href={`http://localhost:3000/${task.coursePdf}`} // Make sure the URL is correct
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          View PDF
                        </a>
                      )}
                    </td>
                    <td className="border-b py-2 px-4">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4">{calculateRemainingTime(task.endDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default UserTrainingTask;
