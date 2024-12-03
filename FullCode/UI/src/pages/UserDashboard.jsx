import React, { useEffect, useState } from 'react';
import { logUserName } from '../utils/getUserName';

const UserDashboard = () => {
    const [username, setUsername] = useState(null); // State to store username (null for initial loading state)
    const [error, setError] = useState(null);      // State to store errors

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                console.log("Fetching username...");
                const user = await logUserName();
                if (user) {
                    setUsername(user); // Set username if fetched successfully
                } else {
                    setUsername('Guest'); // Fallback to 'Guest' if username is null
                }
                console.log("Fetched and set username:", user);
            } catch (err) {
                console.error('Error fetching username:', err);
                setError('Failed to fetch username.');
            }
        };

        fetchUsername(); // Call fetch function when component mounts
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetching fails
    }

    if (username === null) {
        return <div>Loading...</div>; // Display loading message while fetching data
    }

    return (
        <div>
            <h2>Hi, {username}</h2> {/* Display the fetched username */}
        </div>
    );
};

export default UserDashboard;
