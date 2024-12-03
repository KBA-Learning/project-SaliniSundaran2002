import React, { useState, useEffect } from 'react';

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [role, setRole] = useState('');
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    setMessage('');

    try {
      const query = new URLSearchParams();
      if (role) query.append('role', role);
      if (month) query.append('month', month);

      const response = await fetch(`/api/employeesList?${query.toString()}`);
      const contentType = response.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        console.error('Expected JSON but received:', contentType);
        throw new Error('Unexpected response format. Please check the backend.');
      }

      const data = await response.json();
      console.log('Fetched Data:', data.employees);

      if (response.ok) {
        setEmployees(data.employees);
        setCount(data.count);
      } else {
        setMessage(data.message || 'Failed to fetch employees.');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage('Error occurred while fetching employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [role, month]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Employee List</h2>

      {/* Filters */}
      <div className="flex mb-4">
        <select
          className="p-2 border rounded mr-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="">All</option>
          <option value="developer">Developer</option>
          <option value="uidesigner">Designer</option>
          {/* Add more roles as needed */}
        </select>

        <input
          type="month"
          className="p-2 border rounded"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      {/* Employee Count */}
      <p className="mb-4 text-white">Total Employees: {count}</p>

      {/* Message */}
      {message && <p className="text-red-500">{message}</p>}

      {/* Employee Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse text-white">
            <thead>
              <tr>
                <th className="border-b py-2 px-4">Employee Name</th>
                <th className="border-b py-2 px-4">Role</th>
                <th className="border-b py-2 px-4">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const fullName = `${employee.firstname} ${employee.lastname}`;
                const joiningDate = employee.joiningDate
                  ? new Date(employee.joiningDate).toLocaleDateString() // Format the date for display
                  : 'N/A';

                return (
                  <tr key={employee._id}>
                    <td className="border-b py-2 px-4">{fullName}</td>
                    <td className="border-b py-2 px-4">{employee.role}</td>
                    <td className="border-b py-2 px-4">{joiningDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewEmployee;
