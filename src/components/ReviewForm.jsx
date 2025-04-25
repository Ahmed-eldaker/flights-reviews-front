// "use client"

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useData } from "../context/DataContext";

const ReviewForm = ({ flightId, onComplete }) => {
  const { addReview } = useData();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [details, setDetails] = useState({
    crew: 3,
    cleanliness: 3,
    food: 3,
    takeoff: 3,
    landing: 3,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewData = {
      rating,
      feedback,
      details,
    };

    const success = await addReview(flightId, reviewData);

    if (success && onComplete) {
      onComplete();
    }

    setLoading(false);
  };

  const handleDetailChange = (key, value) => {
    setDetails({
      ...details,
      [key]: value,
    });
  };

  const renderStarRating = (value, onChange) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`h-5 w-5 ${
                star <= value ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Overall Rating</label>
        <div className="flex items-center space-x-2">
          {renderStarRating(rating, setRating)}
          <span className="text-lg font-medium">{rating}/5</span>
        </div>
      </div>

      <div>
        <label htmlFor="feedback" className="form-label">
          Your Review
        </label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your experience with this flight..."
          required
          className="input-field min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Rate Specific Aspects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between">
              <label className="form-label">Crew Service</label>
              <span className="text-sm font-medium">{details.crew}/5</span>
            </div>
            {renderStarRating(details.crew, (value) =>
              handleDetailChange("crew", value)
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="form-label">Cleanliness</label>
              <span className="text-sm font-medium">
                {details.cleanliness}/5
              </span>
            </div>
            {renderStarRating(details.cleanliness, (value) =>
              handleDetailChange("cleanliness", value)
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="form-label">Food & Beverages</label>
              <span className="text-sm font-medium">{details.food}/5</span>
            </div>
            {renderStarRating(details.food, (value) =>
              handleDetailChange("food", value)
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="form-label">Takeoff Experience</label>
              <span className="text-sm font-medium">{details.takeoff}/5</span>
            </div>
            {renderStarRating(details.takeoff, (value) =>
              handleDetailChange("takeoff", value)
            )}
          </div>

          <div>
            <div className="flex justify-between">
              <label className="form-label">Landing Experience</label>
              <span className="text-sm font-medium">{details.landing}/5</span>
            </div>
            {renderStarRating(details.landing, (value) =>
              handleDetailChange("landing", value)
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
