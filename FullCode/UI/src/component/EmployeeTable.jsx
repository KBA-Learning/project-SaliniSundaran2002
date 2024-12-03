import React from 'react';
import EmployeeRow from './EmployeeRow';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Employees</h3>
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left font-medium text-gray-600">Name</th>
            <th className="p-3 text-left font-medium text-gray-600">Email</th>
            <th className="p-3 text-left font-medium text-gray-600">Role</th>
            <th className="p-3 text-left font-medium text-gray-600">Joining Date</th>
            <th className="p-3 text-left font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <EmployeeRow key={index} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
