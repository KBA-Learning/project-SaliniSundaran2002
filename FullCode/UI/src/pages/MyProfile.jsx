import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../utils/getEmail';
import profile from '../assets/images/profile.jpeg'

const MyProfile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiRequest = async (url, method = 'GET', body = null) => {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const userInfo = await getUserInfo(); // Get user info (e.g., email)
        const userEmail = userInfo.email;

        if (!userEmail) throw new Error('Failed to fetch user email.');

        // Fetch user details from userDetails route
        const userDetails = await apiRequest(`/api/userDetails/${userEmail}`);
        setEmail(userEmail);
        setFirstname(userDetails.firstname || '');
        setLastname(userDetails.lastname || '');
        setRole(userDetails.role || ''); // Fetch role

        // Fetch address and phone number from getUserUpdate route
        const userUpdateDetails = await apiRequest(`/api/getUserUpdate/${userEmail}`);
        setAddress(userUpdateDetails.address || '');
        setPhoneNumber(userUpdateDetails.phoneNumber || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user information. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center m-auto">
    <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <img
              src={profile} // Use default image if no profilePic
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">My Profile</h1>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div className="w-full p-4 rounded-lg shadow-md">
          {/* Profile Information */}
          <div className="flex justify-between mb-3">
            <div className="text-sm font-semibold">Name</div>
            <div>{firstname} {lastname}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-sm font-semibold">Email</div>
            <div>{email}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-sm font-semibold">Role</div>
            <div>{role}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-sm font-semibold">Address</div>
            <div>{address}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-sm font-semibold">Phone Number</div>
            <div>{phoneNumber}</div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/edit-profile')} // Redirect to the Edit Profile page
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfile;
