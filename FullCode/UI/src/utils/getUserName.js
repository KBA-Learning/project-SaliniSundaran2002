const logUserName = async () => {

        try {
            const response = await fetch('/api/userName', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Fetched user info:", data);
    
            // Extract and return first name and last name
            const { firstname, lastname } = data;
            return { firstname, lastname };
            
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            throw error;
        }
    };
    
   

export { logUserName };
