const logUserRole = async () => {
    try {
        const resp = await fetch('/api/viewUser', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        }

        const role = await resp.json();
        return role.user;
    } catch (error) {
        console.error('Failed to fetch user role:', error);
        throw error;
    }
};


export { logUserRole }