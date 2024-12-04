import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import Footer from "./component/Footer";
import Background from "./component/Background";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AddNotification from "./pages/AddNotification";
import AddOnboardTask from "./pages/AddOnboardTask";
import AddTrainingTask from "./pages/AddTrainingTask";
import AddSettings from "./pages/AddSettings";
import UserDashboard from "./pages/UserDashboard";
import UserOnboardTask from "./pages/UserOnboardTask";
import UserTrainingTask from "./pages/UserTrainingTask";
import UserViewNotification from "./pages/UserViewNotification";
import UserSupport from "./pages/UserSupport";
import ViewEmployee from "./pages/ViewEmployee"
import EditProfile from "./pages/EditProfile";
import AdminTrackProgress from "./pages/AdminTrackProgress";
import MyProfile from "./pages/MyProfile";
// import ViewCourse from "./pages/ViewCourse";

const App = () => {
   return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/signup" element={< Signup />} />
        <Route element={<MainLayout />} >
          <Route path="/admin-home" element={<AdminDashboard />} />
          <Route path="add-notifications" element={< AddNotification />} />
          <Route path="admin-onTasks" element={< AddOnboardTask />} />
          <Route path="admin-trainTasks" element={< AddTrainingTask />} />
          <Route path="admin-settings" element={< AddSettings />} />
          <Route path="view-employee" element={< ViewEmployee />} />
          <Route path="track-progress" element={< AdminTrackProgress/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<UserLayout />} >
          <Route path="/user-home" element={<UserDashboard />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="user-onTasks" element={<UserOnboardTask />} />
          <Route path="user-trainTasks" element={<UserTrainingTask />} />
          <Route path="user-notification" element={<UserViewNotification />} />
          <Route path="user-support" element={<UserSupport />} />
          {/* <Route path="view-course" element={<ViewCourse />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
