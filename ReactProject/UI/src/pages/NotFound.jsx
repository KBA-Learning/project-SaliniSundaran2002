import React, { useState, useEffect } from 'react';
import { logUserRole } from '../utils/getUserRole';  // Assuming logUserRole is a utility function
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [role, setRole] = useState('');  // Store the role in the state
  const [loading, setLoading] = useState(true);  // Track loading state to prevent rendering before role is fetched

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const fetchedRole = await logUserRole();  // Fetch the role from your API or logic
        setRole(fetchedRole);  // Set the role in state
        setLoading(false);  // Set loading to false after role is fetched
      } catch (error) {
        console.error('Error fetching user role:', error);
        setLoading(false);  // Even if error, stop loading
      }
    };

    fetchUserRole();
  }, []);  // Only run on component mount

  if (loading) {
    return <p>Loading...</p>;  // Show loading message while role is being fetched
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <Link
            to={role === 'admin' ? '/admin-home' : '/user-home'}
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
