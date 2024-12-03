import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewCourse = () => {
  const { courseTitle } = useParams(); // Extract the courseTitle from the URL
  const [courseDetails, setCourseDetails] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch course details based on courseTitle
  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`/api/getCourseDetails?title=${encodeURIComponent(courseTitle)}`);
      const result = await response.json();

      if (response.ok) {
        setCourseDetails(result.course);
      } else {
        setMessage(result.message || 'Failed to fetch course details.');
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      setMessage('Error occurred while fetching course details.');
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseTitle]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Course Details</h2>

      {courseDetails ? (
        <div className="bg-white p-6 rounded shadow-md text-gray-700">
          <h3 className="text-xl font-bold mb-2">{courseDetails.courseTitle}</h3>
          <p className="text-sm mb-4">{courseDetails.courseDescription}</p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Start Date:</strong> {new Date(courseDetails.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>End Date:</strong> {new Date(courseDetails.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Instructor:</strong> {courseDetails.instructor || 'Not specified'}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-700">{message || 'Loading course details...'}</p>
      )}
    </div>
  );
};

export default ViewCourse;
