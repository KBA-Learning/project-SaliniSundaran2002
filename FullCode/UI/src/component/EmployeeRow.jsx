import React from 'react';
import EmployeeActions from './EmployeeActions';

const EmployeeRow = ({ employee }) => {
  const handleRemove = () => {
    // Logic for removing the employee (e.g., API call)
    console.log(`Removing employee: ${employee.name}`);
  };

  return (
    <tr className="border-t border-gray-300">
      <td className="p-3 text-black">{employee.name}</td>
      <td className="p-3 text-black">{employee.email}</td>
      <td className="p-3 text-black">{employee.role}</td>
      <td className="p-3 text-black">{employee.joiningDate}</td>
      <EmployeeActions verifyLink="/frontend/Admin/editAdmin.html" onRemove={handleRemove} />
    </tr>
  );
};

export default EmployeeRow;
