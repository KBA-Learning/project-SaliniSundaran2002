import React from 'react'

const ProgressSection = () => {
  return (
    <div className="progress-section bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-md sm:max-w-lg mx-auto text-black">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Onboarding & Training Status Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 sm:p-3 font-semibold">Employee Name</th>
              <th className="p-2 sm:p-3 font-semibold">Onboarding Progress</th>
              <th className="p-2 sm:p-3 font-semibold">Training Progress</th>
              <th className="p-2 sm:p-3 font-semibold">Roles</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 sm:p-3">John Doe</td>
              <td className="p-2 sm:p-3">90%</td>
              <td className="p-2 sm:p-3">80%</td>
              <td className="p-2 sm:p-3">UI/UX Designer</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 sm:p-3">Jane Smith</td>
              <td className="p-2 sm:p-3">100%</td>
              <td className="p-2 sm:p-3">50%</td>
              <td className="p-2 sm:p-3">Frontend Developer</td>
            </tr>
            <tr>
              <td className="p-2 sm:p-3">Mark Johnson</td>
              <td className="p-2 sm:p-3">70%</td>
              <td className="p-2 sm:p-3">60%</td>
              <td className="p-2 sm:p-3">Frontend Developer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default ProgressSection

