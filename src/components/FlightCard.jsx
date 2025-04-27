// "use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlane,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheck,
  FaInfoCircle,
} from "react-icons/fa";
import { useData } from "../context/DataContext";
import ReviewForm from "./ReviewForm";

const FlightCard = ({ flight, showActions = true }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { reserveFlight, userFlights } = useData();

  // Check if this flight is already reserved by the user
  const isReserved = userFlights.some((f) => f._id === flight._id);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Generate a random price for demo purposes
  const getRandomPrice = () => {
    return (Math.floor(Math.random() * 500) + 200).toFixed(2);
  };

  const handleReserve = async () => {
    if (!isReserved) {
      await reserveFlight(flight._id);
    }
  };

  return (
    <div className="card mb-6 overflow-hidden hover:border-emerald-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-emerald-500 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full mr-4 shadow-sm">
            <FaPlane className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {flight.airline}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 flex items-center">
              <span className="bg-emerald-50 dark:bg-gray-700 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-1 rounded-full mr-2">
                #{flight.flightNumber}
              </span>
              <span className="text-sm">{flight.duration || "5h 30m"}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
          <FaCalendarAlt className="text-emerald-700 dark:text-emerald-400 mr-2" />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {formatDate(flight.departureDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between my-6 bg-gradient-to-r from-emerald-50 to-white dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">From</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {flight.from}
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
            {formatTime(flight.departureDate)}
          </p>
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="w-full max-w-[200px] flex items-center">
            <div className="h-[2px] flex-1 bg-gray-700 dark:bg-gray-600"></div>
            <div className="relative">
              <FaPlane className="h-5 w-5 text-emerald-700 dark:text-emerald-400 mx-2 transform rotate-90" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 dark:bg-gray-600 text-xs text-white dark:text-white px-2 py-1 rounded-full whitespace-nowrap">
                {flight.duration || "5h 30m"}
              </div>
            </div>
            <div className="h-[2px] flex-1 bg-gray-700 dark:bg-gray-600"></div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">To</p>
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {flight.to}
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
            {formatTime(
              new Date(
                new Date(flight.departureDate).getTime() + 5 * 60 * 60 * 1000
              )
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 px-2">
        <div className="flex items-center mb-2 md:mb-0">
          <FaClock className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Departure:{" "}
            <span className="font-medium">
              {formatTime(flight.departureDate)}
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="text-green-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Price:{" "}
            <span className="font-medium text-green-600 dark:text-green-400">
              ${flight.price || getRandomPrice()}
            </span>
          </span>
        </div>
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to={`/flight/${flight._id}`}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <FaInfoCircle className="mr-2" />
            Flight Details
          </Link>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900 hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-all duration-300 shadow-sm hover:shadow"
          >
            <FaStar className="mr-2" />
            {showReviewForm ? "Cancel Review" : "Write Review"}
          </button>

          {/* Changed button based on reservation status */}
          <button
            onClick={handleReserve}
            disabled={isReserved}
            className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-300 shadow-sm hover:shadow ${
              isReserved
                ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 cursor-default"
                : "bg-emerald-700 dark:bg-emerald-800 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-white"
            }`}
          >
            {isReserved ? (
              <>
                <FaCheck className="mr-2" />
                Reserved
              </>
            ) : (
              <>
                <FaPlane className="mr-2" />
                Reserve Flight
              </>
            )}
          </button>
        </div>
      )}

      {showReviewForm && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
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
