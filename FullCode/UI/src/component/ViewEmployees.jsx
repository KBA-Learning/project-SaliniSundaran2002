import React from 'react';
import EmployeeTable from './EmployeeTable';

const ViewEmployees = () => {
  const employees = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Software Engineer', joiningDate: '01-02-2025' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'HR Manager', joiningDate: '01-02-2025' },
  ];

  return (
    <div className="flex-grow container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">View Employees</h2>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default ViewEmployees;
