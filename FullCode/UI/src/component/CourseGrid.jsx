import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

const CourseGrid = ({ isHome }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const courseList = isHome ? courses.slice(0, 3) : courses;

  // Fetch courses data from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/getCourseDetails'); // Replace with your actual API endpoint
        const data = await res.json();
        setCourses(data); // Store the courses in state
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
      <h1 className="flex flex-col items-center font-bold text-2xl md:text-4xl text-purple-800 pt-10">
        {isHome ? 'Top Courses' : 'All Courses'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
        {courseList.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseGrid;
