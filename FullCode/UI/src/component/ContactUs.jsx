import React from 'react'

const ContactUs = () => {
  return (
    <main className="container mx-auto p-6">
        <div className="support-container mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Support & Help</h2>
            <p className="mb-6 text-white">If you need assistance or have any questions, please refer to the FAQs below or contact HR.</p>

            {/* <!-- FAQs Section --> */}
            <div className="faq-section mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Frequently Asked Questions (FAQs)</h3>

                {/* <!-- FAQ Items --> */}
                <div className="space-y-4">
                    {/* <!-- FAQ 1 --> */}
   
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <div className="font-medium">Q: Who do I contact for technical issues?</div>
                        <p className="text-gray-700">A: For technical issues, please contact IT support at <a href="mailto:onboard@orbit.com" className="text-blue-500 underline">onboard@orbit.com</a>.</p>
                    </div>

                    {/* <!-- FAQ 3 --> */}
                    <div className="bg-white shadow-md p-4 rounded-lg">
                        <div className="font-medium">Q: Where can I find the employee handbook?</div>
                        <p className="text-gray-700">A: The employee handbook can be found in the "Resources" section of the portal.</p>
                    </div>
                </div>
            </div>

            {/* <!-- Contact HR Section -->
            <div className="contact-hr-section">
                <h3 className="text-xl font-semibold mb-4">Contact HR</h3>
                <form action="#" method="post" className="space-y-4">
                    <div>
                        <label for="name" className="block font-medium">Your Name:</label>
                        <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                        <label for="email" className="block font-medium">Your Email:</label>
                        <input type="email" id="email" name="email" required className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                        <label for="message" className="block font-medium">Your Message:</label>
                        <textarea id="message" name="message" rows="4" required className="w-full p-2 border border-gray-300 rounded"></textarea>
                    </div>
                    <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                </form>
            </div> */}
        </div>
    </main>
  )
}

export default ContactUs








































































// import React, { useState, useEffect } from 'react';

// const ContactUs = () => {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode

//   // Fetch existing contact info on component mount
//   useEffect(() => {
//     const fetchContactInfo = async () => {
//       try {
//         const response = await fetch('/api/contact');
//         if (response.ok) {
//           const contactData = await response.json();
//           if (contactData) {
//             setEmail(contactData.email);
//             setPhone(contactData.phone);
//             setAddress(contactData.address);
//             setIsEditing(true); // Set to editing if data exists
//           }
//         } else {
//           console.error('Failed to fetch contact information');
//         }
//       } catch (err) {
//         console.error('Error fetching contact information:', err);
//       }
//     };

//     fetchContactInfo();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Show loading indicator
//     setError(''); // Clear any previous errors
//     setSuccess(''); // Clear any previous success messages

//     // Validate the form data
//     if (!email || !phone || !address) {
//       setError('All fields are required.');
//       setLoading(false);
//       return;
//     }

//     // Prepare the contact information data
//     const contactData = {
//       email,
//       phone,
//       address,
//     };

//     try {
//       const endpoint = isEditing ? '/contact' : '/contact'; // Use the same endpoint for both edit and create
//       const method = isEditing ? 'PUT' : 'POST';

//       const response = await fetch(endpoint, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(contactData),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         setSuccess(responseData.message || 'Contact information saved successfully!');
//         // Reset form fields or keep them filled for editing
//         if (!isEditing) {
//           setEmail('');
//           setPhone('');
//           setAddress('');
//         }
//       } else {
//         const responseData = await response.json();
//         setError(responseData.message || 'An error occurred while saving the contact information.');
//       }
//     } catch (err) {
//       setError('An error occurred while saving the contact information.');
//     } finally {
//       setLoading(false); // Hide loading indicator
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-md mb-6">
//       <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Contact Information' : 'Add Contact Information'}</h3>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {error && (
//           <div className="text-red-500 text-sm">{error}</div>
//         )}
//         {success && (
//           <div className="text-green-500 text-sm">{success}</div>
//         )}

//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">Email Address:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter the contact email..."
//             className="w-full p-2 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium">Phone Number:</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             placeholder="Enter the contact phone number..."
//             className="w-full p-2 border rounded"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="address" className="block text-sm font-medium">Address:</label>
//           <textarea
//             id="address"
//             name="address"
//             rows="2"
//             placeholder="Enter the address..."
//             className="w-full p-2 border rounded"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//           disabled={loading}
//         >
//           {loading ? 'Saving...' : isEditing ? 'Update Contact Information' : 'Save Contact Information'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;
