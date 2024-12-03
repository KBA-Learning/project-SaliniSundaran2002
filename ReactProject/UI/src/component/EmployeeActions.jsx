import React from 'react';

const EmployeeActions = ({ verifyLink, onRemove }) => {
  return (
    <td className="p-3 flex space-x-2">
      <a href={verifyLink} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Verify
      </a>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={onRemove}
      >
        Remove
      </button>
    </td>
  );
};

export default EmployeeActions;
