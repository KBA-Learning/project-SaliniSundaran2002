import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [likes, setLikes] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Destructure course object to get title, description, and courseId
  const { courseTitle, c = 'No description available.', } = course;

  // Function to handle course description display
  const getDescription = () => {
    const maxLength = 100;
    return showFullDescription || description.length <= maxLength
      ? description
      : `${description.substring(0, maxLength)}...`;
  };

  return (
    <div className="bg-purple-100 rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10">
      {/* Course Title */}
      <h2 className="font-bold text-lg text-purple-900">{courseTitle}</h2>

      {/* Course Description */}
      <p className="text-black group-hover:text-white my-2 mx-5">{getDescription()}</p>
      
      {/* Show More / Show Less Button */}
      {description.length > 100 && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? 'Show less' : 'Show more'}
        </button>
      )}

      {/* Likes Button */}
      <div className="flex space-x-2 mt-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => setLikes(likes + 1)}
        >
          Likes: {likes}
        </button>
      </div>

      {/* Learn More Link */}
      {courseId && (
        <Link
          to={`/course/${courseId}`}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5"
        >
          Learn More
        </Link>
      )}
    </div>
  );
};

export default CourseCard;
