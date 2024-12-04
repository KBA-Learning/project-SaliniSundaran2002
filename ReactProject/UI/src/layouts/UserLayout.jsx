import React from 'react';
import UserNavbar from '../component/UserNavbar';
import { Outlet } from 'react-router-dom';
import UserMobileNavbar from '../component/UserMobileNavbar';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar for desktop */}
      <UserNavbar />
      {/* Navbar for mobile */}
      <UserMobileNavbar />
      
       <div className="flex-grow pt-16">
        <Outlet />
      </div>

      {/* Footer section */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
