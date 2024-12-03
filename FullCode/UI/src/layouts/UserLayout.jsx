import React from 'react'
import UserNavbar from '../component/UserNavbar'
import { Outlet} from 'react-router-dom'
import UserMobileNavbar from '../component/UserMobileNavbar'


const UserLayout = () => {
  return (

    
    <>
    <UserNavbar />
    <UserMobileNavbar />
    <div className="pt-16">
    {/* <h1 className="text-white text-center">Main Content Area</h1> */}
      <Outlet />
    </div>
  </>
  )
}

export default UserLayout