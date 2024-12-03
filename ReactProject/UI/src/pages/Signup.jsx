import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if signupDate already exists in sessionStorage, otherwise set it
        if (!sessionStorage.getItem("signupDate")) {
            const signupDate = new Date().toISOString(); // Format the date as ISO string
            sessionStorage.setItem("signupDate", signupDate);
        }
    }, []);

    // Function to handle the form submission to the backend
    const signupSubmit = async (userDetails) => {
        try {
            const signupDate = sessionStorage.getItem("signupDate"); // Get the signupDate from sessionStorage

            const res = await fetch('/api/signup', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: userDetails.firstName, 
                    LastName: userDetails.lastName,
                    Email: userDetails.email,
                    Username: userDetails.username,
                    Password: userDetails.password,
                    Role: userDetails.role,
                    SignupDate: signupDate, // Send the signupDate from sessionStorage
                }),
                credentials: 'include', // include cookies if needed
            });

            const data = await res.json();
            console.log("Response Data:", data);
            console.log("status", res.status);

            if (res.status === 201) {
                toast.success("Successfully Signed up");
                navigate("/");
            } else {
                toast.error("Error occurred: " + data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Handle form submission
    const submitForm = (e) => {
        e.preventDefault();
        const userDetails = {
            firstName,
            lastName,
            email,
            username,
            password,
            role,
        };

        // Calling signupSubmit function with the user details
        signupSubmit(userDetails);
    };

    return (
        <>
            <div className="bg-cover bg-center bg-no-repeat flex items-center justify-center h-screen">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full max-w-md md:max-w-lg p-8 rounded-2xl shadow-lg border border-white/20 h-screen">
                    <h2 className="text-2xl font-semibold text-center text-white mb-6">Sign Up</h2>
                    <form onSubmit={submitForm}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="first-name" className="text-white text-lg">First Name:</label>
                            <input
                                type="text"
                                id="first-name"
                                name="firstName"
                                placeholder="Enter your first name"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="last-name" className="text-white text-lg">Last Name:</label>
                            <input
                                type="text"
                                id="last-name"
                                name="lastName"
                                placeholder="Enter your last name"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="text-white text-lg">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="username" className="text-white text-lg">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-white text-lg">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="role" className="text-white text-lg">Role:</label>
                            <select
                                id="role"
                                name="role"
                                className="h-12 rounded-lg px-4 mt-1"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select your role</option>
                                <option value="developer">Frontend Developer</option>
                                <option value="uidesigner">UI/Ux Designer</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg transition duration-200 hover:bg-sky-700">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-white mt-4">
                        Already have an account? <Link to="/" className="text-sky-400 underline hover:text-sky-900">Login here</Link>.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;
