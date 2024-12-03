import React from "react";
import whiteLogo from "../assets/images/white-logo.png";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="text-white p-4 fixed top-0 left-0 w-full flex items-center justify-between z-10">
      <div className="logo-home">
        <img
          src={whiteLogo}
          alt="Logo"
          className="h-12 sm:h-10 md:h-12 lg:h-14 xl:h-16"
        />
      </div>
      <div className="hidden md:flex space-x-6">
        <Link
          to="/admin-home"
          className="hover:text-blue-300 text-sm sm:text-base"
        >
          Home
        </Link>
        <Link
          to="/view-employee"
          className="hover:text-blue-300 text-sm sm:text-base"
        >
          View Employees
        </Link>
        <div className="relative group">
          <button className="hover:text-blue-300 text-sm sm:text-base">
            Tasks
          </button>
          <div className="absolute hidden group-hover:block bg-gray-700 mt-2 rounded shadow-lg">
            <Link
              to="/admin-onTasks"
              className="block px-4 py-2 hover:bg-blue-600 text-sm"
            >
              Onboarding Tasks
            </Link>
            <Link
              to="/admin-trainTasks"
              className="block px-4 py-2 hover:bg-blue-600 text-sm"
            >
              Training Tasks
            </Link>
            <Link
              to="/track-progress"
              className="block px-4 py-2 hover:bg-blue-600 text-sm"
            >
              Progress
            </Link>
            <Link
              to="/add-notifications"
              className="block px-4 py-2 hover:bg-blue-600 text-sm"
            >
              Notifications
            </Link>
          </div>
        </div>
        <Link
          to="/admin-settings"
          className="hover:text-blue-300 text-sm sm:text-base"
        >
          Settings
        </Link>
        <Link to="/" className="hover:text-blue-300 text-sm sm:text-base">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
