import React from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  name: string;
  instructor: string;
}

interface CourseProps {
  courses?: Course[]; // Make courses optional with the ? operator
}

// Default courses data
const defaultCourses: Course[] = [
  { id: 1, name: "React Fundamentals", instructor: "John Doe" },
  { id: 2, name: "Advanced Python", instructor: "Jane Smith" },
  { id: 3, name: "UI/UX Design Basics", instructor: "Emily Johnson" },
];

function Course({ courses = defaultCourses }: CourseProps) {
  const navigate = useNavigate();

  // Handle course selection and navigation to feedback
  const handleCourseSelection = (course: Course) => {
    console.log(`Selected course: ${course.id} - ${course.name}`);

    // Navigate to feedback with course ID and name as query parameters
    navigate(
      `/feedback?courseId=${course.id}&courseName=${encodeURIComponent(
        course.name
      )}`
    );

    // Alternative URL structure if you prefer route parameters instead of query parameters:
    // navigate(`/courses/${course.id}?courseName=${encodeURIComponent(course.name)}`);
  };

  // Additional safety check in case default prop doesn't work
  const coursesToRender = courses || [];

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {coursesToRender.length > 0 ? (
          coursesToRender.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseSelection(course)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCourseSelection(course);
                }
              }}
              className="bg-white rounded-2xl shadow-md p-4 cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl text-left"
              aria-label={`View course: ${course.name}`}
            >
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600">Instructor: {course.instructor}</p>
              <p className="text-blue-500 mt-2">Provide Feedback</p>
            </button>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No courses available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
