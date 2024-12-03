import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminMobileNavbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Menu Button for mobile view */}
      <div className="fixed top-4 right-4 z-50">
        <button
          id="menuButton"
          className="md:hidden text-white text-lg sm:text-xl p-2 rounded-md"
          onClick={toggleNavbar}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navbar */}
      <nav
        id="mobileNavbar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col space-y-4 p-6 text-white text-sm">
          <li>
            <Link to="/admin-home" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/view-employee" className="hover:text-blue-300">
              View Employees
            </Link>
          </li>
          <li>
            <Link to="/admin-onTasks" className="hover:text-blue-300">
              Onboarding Tasks
            </Link>
          </li>
          <li>
            <Link to="/admin-trainTasks" className="hover:text-blue-300">
              Training Tasks
            </Link>
          </li>
          <li>
            <Link to="/track-progress" className="hover:text-blue-300">
              Progress
            </Link>
          </li>
          <li>
            <Link to="/add-notifications" className="hover:text-blue-300">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/admin-settings" className="hover:text-blue-300">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-300">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminMobileNavbar;
