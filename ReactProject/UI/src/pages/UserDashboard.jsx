import React, { useEffect, useState } from 'react';
import { logUserName } from '../utils/getUserName';
import WelcomeSection from '../component/WelcomeSection';
import CompanyOverview from '../component/CompanyOverview';

const UserDashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await logUserName();
                console.log("userdetails", user);

                setUserInfo(user);
            } catch (err) {
                console.error('Error fetching user info:', err);
                setError('Failed to fetch user info.');
            }
        };

        fetchUserInfo();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
<h2 class="text-4xl font-semibold text-white text-center p-6 shadow-xl rounded-lg bg-gradient-to-r from-black via-blue-600 to-black transform scale-100 transition-all duration-5000 ease-out animate-zoom-out">
  Hi, {userInfo.firstname} {userInfo.lastname}
</h2>

<WelcomeSection />

<CompanyOverview />

        </div>
       
    );
};

export default UserDashboard;
