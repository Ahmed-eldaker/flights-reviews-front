import { FaStar, FaUser, FaCalendarAlt } from "react-icons/fa";

const ReviewCard = ({ review }) => {
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
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="card mb-4">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-gray-100 p-2 rounded-full mr-3">
            <FaUser className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-medium">{review.user.name}</h3>
            <div className="flex items-center mt-1">
              {renderStars(review.rating)}
              <span className="ml-2 text-sm text-gray-500">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-1" />
          {formatDate(review.createdAt)}
        </div>
      </div>

      <p className="my-4">{review.feedback}</p>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Detailed Ratings
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Crew</p>
            {renderStars(review.details.crew)}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Cleanliness</p>
            {renderStars(review.details.cleanliness)}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Food</p>
            {renderStars(review.details.food)}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Takeoff</p>
            {renderStars(review.details.takeoff)}
          </div>
          <div>
            <p className="text-gray-500 mb-1">Landing</p>
            {renderStars(review.details.landing)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
