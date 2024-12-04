import React, { useState, useEffect } from 'react';

const AdminTrackProgress = () => {
  const [trainingTasks, setTrainingTasks] = useState([]);
  const [onboardingTasks, setOnboardingTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to fetch training tasks
    const fetchTrainingTasks = async () => {
      try {
        const response = await fetch('/api/getTrainingTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          setTrainingTasks(result.tasks || []);
        } else {
          setMessage(result.message || 'Error fetching training tasks.');
        }
      } catch (error) {
        console.error('Error fetching training tasks:', error);
        setMessage('Error occurred while fetching training tasks.');
      }
    };

    // Function to fetch onboarding tasks
    const fetchOnboardingTasks = async () => {
      try {
        const response = await fetch('/api/getOnboardingTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          setOnboardingTasks(result.tasks || []);
        } else {
          setMessage(result.message || 'Error fetching onboarding tasks.');
        }
      } catch (error) {
        console.error('Error fetching onboarding tasks:', error);
        setMessage('Error occurred while fetching onboarding tasks.');
      }
    };

    // Fetching both task types
    fetchTrainingTasks();
    fetchOnboardingTasks();
  }, []);

  const calculateTrainingProgress = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDuration = end - start;
    const timeElapsed = currentDate - start;

    if (timeElapsed <= 0) return 0; // Task hasn't started yet
    if (timeElapsed >= totalDuration) return 100; // Task is completed

    // Round the progress percentage
    return Math.round(Math.min((timeElapsed / totalDuration) * 100, 100));
  };

  const calculateOnboardingProgress = (milestones) => {
    // Ensure milestones is an array before proceeding
    if (!Array.isArray(milestones)) {
      return 0; // Return 0 if milestones are missing or not an array
    }

    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter(milestone => milestone.completed).length;

    // Round the progress percentage
    return Math.round(Math.min((completedMilestones / totalMilestones) * 100, 100));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Task Progress</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      {/* Training Tasks Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6 text-gray-700">
        <h3 className="text-xl font-semibold mb-4">Training Tasks</h3>
        {trainingTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse sm:table-fixed">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">Course Name</th>
                  <th className="border-b py-2 px-4">Course Description</th>
                  <th className="border-b py-2 px-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                {trainingTasks.map((task) => (
                  <tr key={task.courseTitle}>
                    <td className="border-b py-2 px-4">{task.courseTitle}</td>
                    <td className="border-b py-2 px-4">{task.courseDescription}</td>
                    <td className="border-b py-2 px-4">
                      {calculateTrainingProgress(task.startDate, task.endDate)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No training tasks available.</p>
        )}
      </div>

      {/* Onboarding Tasks Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6 text-gray-700">
        <h3 className="text-xl font-semibold mb-4">Onboarding Tasks</h3>
        {onboardingTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse sm:table-fixed">
              <thead>
                <tr>
                  <th className="border-b py-2 px-4">Task Name</th>
                  <th className="border-b py-2 px-4">Task Description</th>
                  <th className="border-b py-2 px-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                {onboardingTasks.map((task) => (
                  <tr key={task.taskTitle}>
                    <td className="border-b py-2 px-4">{task.taskTitle}</td>
                    <td className="border-b py-2 px-4">{task.taskDescription}</td>
                    <td className="border-b py-2 px-4">
                      {calculateOnboardingProgress(task.milestones)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No onboarding tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminTrackProgress;
