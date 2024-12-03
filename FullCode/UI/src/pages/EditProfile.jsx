import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../utils/getEmail';

const EditProfile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState({
    firstname: false,
    lastname: false,
    address: false,
    phoneNumber: false,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userInfo = await getUserInfo(); // Assuming you have a function to get user info
        const userEmail = userInfo.email;

        if (!userEmail) {
          throw new Error('Failed to fetch user email');
        }

        const response = await fetch(`/api/userDetails/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setEmail(userEmail);
        setFirstname(data.firstname || '');
        setLastname(data.lastname || '');
        setAddress(data.address || '');
        setPhoneNumber(data.phoneNumber || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user information. Please try again.');
      }
    }
    fetchUserData();
  }, []);

  const handleSaveProfile = async () => {
    // Basic validation to make sure required fields are not empty
    if (!address || !phoneNumber) {
      setError('Address and Phone Number are required.');
      return;
    }

    try {
        const response = await fetch(`/api/updateUser/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                address,
                phoneNumber,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            // Assuming the backend sends updated data
            setSuccessMessage('Profile updated successfully!');
            setError(null);

            // Optionally update the state with the new values returned from the backend
            setFirstname(data.updatedData.firstname);
            setLastname(data.updatedData.lastname);
            setAddress(data.updatedData.address);
            setPhoneNumber(data.updatedData.phone);
        } else {
            throw new Error('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        setError('An unexpected error occurred while saving profile updates.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}

      {/* Email (read-only) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>

      {/* Firstname */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Firstname</label>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Lastname */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Lastname</label>
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Address</label>
        {isEditing.address ? (
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
          />
        ) : (
          <div className="flex justify-between items-center">
            <span>{address}</span>
            <button onClick={() => setIsEditing({ ...isEditing, address: true })} className="text-blue-500">Edit</button>
          </div>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Phone Number</label>
        {isEditing.phoneNumber ? (
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex justify-between items-center">
            <span>{phoneNumber}</span>
            <button onClick={() => setIsEditing({ ...isEditing, phoneNumber: true })} className="text-blue-500">Edit</button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSaveProfile}
          className="px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
