const logUserName = async () => {
    try {
        const resp = await fetch('/api/userName', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        }

        const data = await resp.json();
        console.log("fetched data:", data);
        
        return data.user;
    } catch (error) {
        console.error('Failed to fetch user role:', error);
        return null;
    }
};


export { logUserName }