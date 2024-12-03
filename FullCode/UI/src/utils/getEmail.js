const getUserInfo = async () => {
    try {
        const response = await fetch('/api/userEmail', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Returning user info:", data);

        // Since response returns email directly, adjust accordingly
        const email = data.email;
        return {
            email: email,
            
        };
        
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        throw error;
    }
};

export { getUserInfo };
