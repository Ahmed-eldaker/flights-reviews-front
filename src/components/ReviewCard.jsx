"use client";

import {
  FaStar,
  FaUser,
  FaCalendarAlt,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { useState } from "react";

const ReviewCard = ({ review }) => {
  const [showFullFeedback, setShowFullFeedback] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 15));
  const [dislikes, setDislikes] = useState(Math.floor(Math.random() * 5));
  const [userAction, setUserAction] = useState(null); // 'like', 'dislike', or null

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-amber-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    const { crew, cleanliness, food, takeoff, landing } = review.details || {
      crew: 3,
      cleanliness: 3,
      food: 3,
      takeoff: 3,
      landing: 3,
    };
    return ((crew + cleanliness + food + takeoff + landing) / 5).toFixed(1);
  };

  // Truncate feedback if it's too long
  const truncateFeedback = (text, maxLength = 150) => {
    if (!text) return "No feedback provided.";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Handle missing user data
  const userName = review.user?.name || "Anonymous User";

  const handleLike = () => {
    if (userAction === "like") {
      // User is unliking
      setLikes(likes - 1);
      setUserAction(null);
    } else {
      // User is liking
      setLikes(likes + 1);
      if (userAction === "dislike") {
        // If user previously disliked, remove the dislike
        setDislikes(dislikes - 1);
      }
      setUserAction("like");
    }
  };

  const handleDislike = () => {
    if (userAction === "dislike") {
      // User is undisliking
      setDislikes(dislikes - 1);
      setUserAction(null);
    } else {
      // User is disliking
      setDislikes(dislikes + 1);
      if (userAction === "like") {
        // If user previously liked, remove the like
        setLikes(likes - 1);
      }
      setUserAction("dislike");
    }
  };

  return (
    <div className="card mb-4 hover:border-amber-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-amber-500 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3 shadow-sm">
            <FaUser className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">
              {userName}
            </h3>
            <div className="flex items-center mt-1">
              {renderStars(review.rating || 0)}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {(review.rating || 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg">
          <FaCalendarAlt className="mr-1 text-amber-500 dark:text-amber-400" />
          {formatDate(review.createdAt)}
        </div>
      </div>

      <div className="my-4 bg-amber-50 dark:bg-gray-700 p-4 rounded-lg">
        <p className="text-gray-700 dark:text-gray-300 break-words">
          {showFullFeedback
            ? review.feedback
            : truncateFeedback(review.feedback)}
          {review.feedback && review.feedback.length > 150 && (
            <button
              onClick={() => setShowFullFeedback(!showFullFeedback)}
              className="ml-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium text-sm"
            >
              {showFullFeedback ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Detailed Ratings
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Crew</p>
            {renderStars(review.details?.crew || 0)}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Cleanliness</p>
            {renderStars(review.details?.cleanliness || 0)}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Food</p>
            {renderStars(review.details?.food || 0)}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Takeoff</p>
            {renderStars(review.details?.takeoff || 0)}
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <p className="text-gray-500 dark:text-gray-400 mb-1">Landing</p>
            {renderStars(review.details?.landing || 0)}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center transition-colors duration-300 ${
              userAction === "like"
                ? "text-amber-600 dark:text-amber-400"
                : "text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          >
            <FaThumbsUp className="mr-1" />
            <span className="text-sm">{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center transition-colors duration-300 ${
              userAction === "dislike"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            }`}
          >
            <FaThumbsDown className="mr-1" />
            <span className="text-sm">{dislikes}</span>
          </button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Average rating:
          </span>
          <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 text-sm px-2 py-1 rounded-full font-medium">
            {calculateAverageRating()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
