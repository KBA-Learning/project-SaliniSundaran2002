import React from 'react';
import whiteLogo from "../assets/images/white-logo.png";
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    
  return (
    <>
    <div className="text-white p-4 fixed top-0 left-0 w-full flex items-center justify-between z-10">
      <div className="logo-home">
        <img
          src={whiteLogo}
          alt="Logo"
          className="h-12 sm:h-10 md:h-12 lg:h-14 xl:h-16"
        />
      </div>
      <div className="hidden md:flex space-x-6">
          <Link to="/user-home" className="hover:text-blue-300">Home</Link>
          <Link to="/profile" className="hover:text-blue-300">My Profile</Link>
          
          <div className="relative group">
            <button className="hover:text-blue-300">Tasks</button>
            <div className="absolute hidden group-hover:block bg-gray-700 mt-2 rounded">
              <Link to="/user-onTasks" className="block px-4 py-2 hover:bg-blue-600">Onboarding Tasks</Link>
              <Link to="/user-trainTasks" className="block px-4 py-2 hover:bg-blue-600">Training Tasks</Link>
              <Link to="/user-progress" className="block px-4 py-2 hover:bg-blue-600">Progress</Link>
            </div>
          </div>
          
          {/* <Link to="/user-resources" className="hover:text-blue-300">Resources</Link> */}
          <Link to="/user-notification" className="hover:text-blue-300">Notifications</Link>
          <Link to="/user-support" className="hover:text-blue-300">Support</Link>
          <Link to="/" className="hover:text-blue-300">Logout</Link>
          </div>
          </div>
    </>
  );
};

export default UserNavbar;
