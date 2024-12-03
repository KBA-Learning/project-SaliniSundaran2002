import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/AdminNavbar";
import AdminMobileNavbar from "../component/AdminMobileNavbar";

const MainLayout = () => {;
  
  return (
    <>
      <AdminNavbar />
      <AdminMobileNavbar />
      <div className="pt-16">
      {/* <h1 className="text-white text-center">Main Content Area</h1> */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
