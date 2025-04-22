import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// Define the rating criteria
interface RatingCriteria {
  id: string;
  name: string;
  rating: number;
}

// Define the feedback state
interface FeedbackState {
  courseId: string;
  courseName: string;
  criteria: RatingCriteria[];
  comment: string;
}

function Feedback() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ courseId?: string }>();

  // Get course ID from either route params or query params
  const routeParamCourseId = params.courseId || "";

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const queryParamCourseId = queryParams.get("courseId") || "";
  const courseName = queryParams.get("courseName") || "Untitled Course";

  // Use route param if available, otherwise use query param
  const courseId = routeParamCourseId || queryParamCourseId;

  // Log the course information received
  useEffect(() => {
    console.log("Feedback component received:");
    console.log(`Course ID: ${courseId}`);
    console.log(`Course Name: ${courseName}`);
  }, [courseId, courseName]);

  // Initialize feedback state
  const [feedback, setFeedback] = useState<FeedbackState>({
    courseId,
    courseName,
    criteria: [
      { id: "content", name: "Nội dung khóa học", rating: 0 },
      { id: "teaching", name: "Phương pháp giảng dạy", rating: 0 },
      { id: "materials", name: "Tài liệu học tập", rating: 0 },
      { id: "interaction", name: "Mức độ tương tác", rating: 0 },
      { id: "difficulty", name: "Độ khó phù hợp", rating: 0 },
      { id: "overall", name: "Trải nghiệm tổng thể", rating: 0 },
    ],
    comment: "",
  });

  // Handle rating change
  const handleRatingChange = (criteriaId: string, rating: number) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      criteria: prevFeedback.criteria.map((criterion) =>
        criterion.id === criteriaId ? { ...criterion, rating } : criterion
      ),
    }));
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      comment: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format feedback for readable console output
    const formattedFeedback = {
      courseDetails: {
        id: feedback.courseId,
        name: feedback.courseName,
      },
      ratings: feedback.criteria.reduce((acc, criterion) => {
        acc[criterion.id] = criterion.rating;
        return acc;
      }, {} as Record<string, number>),
      averageRating: (
        feedback.criteria.reduce((sum, item) => sum + item.rating, 0) /
        feedback.criteria.length
      ).toFixed(1),
      comment: feedback.comment,
      timestamp: new Date().toISOString(),
    };

    // Log the complete feedback
    console.log("Submitting feedback for course:");
    console.log(JSON.stringify(formattedFeedback, null, 2));

    // Show success message
    alert("Cảm ơn bạn đã gửi đánh giá!");

    // Navigate back to courses page
    navigate("/course");
  };

  // Star rating component
  const StarRating = ({
    rating,
    onChange,
  }: {
    rating: number;
    onChange: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(star);
              }
            }}
            className={`text-2xl focus:outline-none ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-label={`${star} stars`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Đánh giá khóa học</h1>
      <h2 className="text-xl font-semibold mb-4">{feedback.courseName}</h2>
      <p className="text-gray-500 mb-6">Course ID: {feedback.courseId}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating criteria */}
        <div className="space-y-4">
          {feedback.criteria.map((criterion) => (
            <div
              key={criterion.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <label
                htmlFor={criterion.id}
                className="font-medium mb-2 sm:mb-0"
              >
                {criterion.name}
              </label>
              <StarRating
                rating={criterion.rating}
                onChange={(rating) => handleRatingChange(criterion.id, rating)}
              />
            </div>
          ))}
        </div>

        {/* Comments section */}
        <div className="mt-6">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nhận xét của bạn
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Chia sẻ ý kiến của bạn về khóa học..."
            value={feedback.comment}
            onChange={handleCommentChange}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/course")}
            className="mr-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Gửi đánh giá
          </button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
