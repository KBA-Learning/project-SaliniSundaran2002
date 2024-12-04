import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar";
import AdminMobileNavbar from "../component/AdminMobileNavbar";


const MainLayout = () => {;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar for desktop */}
      <AdminNavbar />
      {/* Navbar for mobile */}
      <AdminMobileNavbar />
      
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

export default MainLayout;
