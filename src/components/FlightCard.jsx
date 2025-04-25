// "use client"

import { useState } from "react";
import { FaPlane, FaStar, FaCalendarAlt } from "react-icons/fa";
import { useData } from "../context/DataContext";
import ReviewForm from "./ReviewForm";

const FlightCard = ({ flight, showActions = true }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { reserveFlight } = useData();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleReserve = async () => {
    await reserveFlight(flight._id);
  };

  return (
    <div className="card mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaPlane className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{flight.airline}</h2>
            <p className="text-gray-500">Flight #{flight.flightNumber}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-500">
            {formatDate(flight.departureDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between my-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">From</p>
          <p className="text-lg font-bold">{flight.from}</p>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[150px] flex items-center">
            <div className="h-[2px] flex-1 bg-gray-300"></div>
            <FaPlane className="h-4 w-4 text-gray-400 mx-2 transform rotate-90" />
            <div className="h-[2px] flex-1 bg-gray-300"></div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">To</p>
          <p className="text-lg font-bold">{flight.to}</p>
        </div>
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <FaStar className="mr-2" />
            {showReviewForm ? "Cancel Review" : "Write Review"}
          </button>
          <button
            onClick={handleReserve}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <FaPlane className="mr-2" />
            Reserve Flight
          </button>
        </div>
      )}

      {showReviewForm && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <ReviewForm
            flightId={flight._id}
            onComplete={() => setShowReviewForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default FlightCard;
