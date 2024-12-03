import React, { useState, useEffect } from 'react';

const DashboardCards = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [onboardingCompleted, setOnboardingCompleted] = useState(0);
  const [trainingCompleted, setTrainingCompleted] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [newEmployeesThisMonth, setNewEmployeesThisMonth] = useState(0);

  // Fetch data from your API endpoint
  useEffect(() => {
    // Replace with the actual API call to your backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/viewTotalEmployees'); // Assuming this endpoint returns the required data
        const data = await response.json();

        setTotalEmployees(data.totalEmployees);
        setOnboardingCompleted(data.onboardingCompleted);
        setTrainingCompleted(data.trainingCompleted);
        setPendingTasks(data.pendingTasks);
        setNewEmployeesThisMonth(data.newEmployeesThisMonth);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-cards grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 sm:mb-8">
      <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
        <h3 className="text-base sm:text-lg font-semibold">Total Employees</h3>
        <p className="text-lg sm:text-2xl font-bold">{totalEmployees}</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
        <h3 className="text-base sm:text-lg font-semibold">Onboarding Completed</h3>
        <p className="text-lg sm:text-2xl font-bold">{onboardingCompleted}%</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
        <h3 className="text-base sm:text-lg font-semibold">Training Completed</h3>
        <p className="text-lg sm:text-2xl font-bold">{trainingCompleted}%</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
        <h3 className="text-base sm:text-lg font-semibold">Pending Tasks</h3>
        <p className="text-lg sm:text-2xl font-bold">{pendingTasks} Tasks</p>
      </div>
      <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center sm:col-span-1 md:col-span-2 lg:col-span-1 text-black">
        <h3 className="text-base sm:text-lg font-semibold">New Employees This Month</h3>
        <p className="text-lg sm:text-2xl font-bold">{newEmployeesThisMonth}</p>
      </div>
    </div>
  );
};

export default DashboardCards;
