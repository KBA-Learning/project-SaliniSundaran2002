import React, { useState } from 'react';

const AboutUs = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the about us information update logic here
    console.log('About Us Description:', description);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">About Us Information</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="about-description" className="block text-sm font-medium">About Us Description:</label>
          <textarea
            id="about-description"
            name="about-description"
            rows="6"
            placeholder="Enter the About Us description..."
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Save About Us Information
        </button>
      </form>
    </div>
  );
};

export default AboutUs;
