import React from 'react'
import DashboardCards from '../component/DashboardCards'
// import ProgressSection from "../component/ProgressSection"

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 flex-grow">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center md:text-left text-white">Admin Dashboard</h2>
    <DashboardCards />
    {/* <ProgressSection /> */}
  </div>
  )
}

export default AdminDashboard