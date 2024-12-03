import React from 'react'
import ContactUs from '../component/ContactUs';
import AboutUs from '../component/AboutUs';

const AddSettings = () => {
  return (
    <main className="container mx-auto p-6 flex-grow text-gray-700">
    <h2 className="text-2xl font-bold mb-4 text-white">App Settings</h2>

    <ContactUs />

    <AboutUs />
  </main>
  )
}

export default AddSettings


