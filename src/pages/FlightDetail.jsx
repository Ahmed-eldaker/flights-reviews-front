"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import ReviewCard from "../components/ReviewCard";
import {
  FaPlane,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaCheck,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";

const FlightDetail = () => {
  const { flightId } = useParams();
  const { flights, reviews, userFlights, reserveFlight } = useData();
  const [flight, setFlight] = useState(null);
  const [flightReviews, setFlightReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");

  // Check if this flight is already reserved by the user
  const isReserved = userFlights.some((f) => f._id === flightId);

  useEffect(() => {
    // Find the flight in our data
    const foundFlight = flights.find((f) => f._id === flightId);
    if (foundFlight) {
      setFlight(foundFlight);
    }

    // Find reviews for this flight
    const foundReviews = reviews.filter((r) => r.flight === flightId);
    setFlightReviews(foundReviews);

    setLoading(false);
  }, [flightId, flights, reviews]);

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

  const handleReserve = async () => {
    if (!isReserved) {
      await reserveFlight(flightId);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="h-12 w-12 text-amber-600 dark:text-amber-400 animate-spin mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Loading flight details...
        </p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="page-container">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <FaInfoCircle className="h-12 w-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Flight Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The flight you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/home"
            className="inline-flex items-center px-4 py-2 bg-amber-600 dark:bg-amber-700 text-white rounded-md hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Flights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="mb-6">
        <Link
          to="/home"
          className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Flights
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-700 dark:to-amber-800 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-full mr-4 shadow-md">
                <FaPlane className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{flight.airline}</h1>
                <p className="text-amber-100 dark:text-amber-200 flex items-center">
                  <span className="bg-white dark:bg-gray-800 text-amber-700 dark:text-amber-400 text-xs px-2 py-1 rounded-full mr-2">
                    #{flight.flightNumber}
                  </span>
                  <span>{flight.duration || "5h 30m"}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg text-amber-700 dark:text-amber-400 font-medium">
                <FaCalendarAlt className="inline mr-2" />
                {formatDate(flight.departureDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between my-6 bg-gradient-to-r from-amber-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg shadow-inner">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                From
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {flight.from}
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                {formatTime(flight.departureDate)}
              </p>
              <div className="mt-2 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-1" />
                <span className="text-xs">Terminal 2</span>
              </div>
            </div>

            <div className="flex-1 flex justify-center relative px-4">
              <div className="w-full max-w-[300px] flex items-center">
                <div className="h-[3px] flex-1 bg-lime-300 dark:bg-lime-600"></div>
                <div className="relative">
                  <FaPlane className="h-6 w-6 text-amber-500 dark:text-amber-400 mx-3 transform rotate-90" />
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-lime-400 dark:bg-lime-600 text-sm text-gray-800 dark:text-white px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    {flight.duration || "5h 30m"}
                  </div>
                </div>
                <div className="h-[3px] flex-1 bg-lime-300 dark:bg-lime-600"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                To
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {flight.to}
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                {formatTime(
                  new Date(
                    new Date(flight.departureDate).getTime() +
                      5 * 60 * 60 * 1000
                  )
                )}
              </p>
              <div className="mt-2 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-1" />
                <span className="text-xs">Terminal 1</span>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("details")}
                className={`tab-button ${
                  activeTab === "details"
                    ? "tab-button-active"
                    : "tab-button-inactive"
                }`}
              >
                <div className="flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Flight Details
                </div>
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`tab-button ${
                  activeTab === "reviews"
                    ? "tab-button-active"
                    : "tab-button-inactive"
                }`}
              >
                <div className="flex items-center">
                  <FaStar className="mr-2" />
                  Reviews ({flightReviews.length})
                </div>
              </button>
            </nav>
          </div>

          {activeTab === "details" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Flight Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Airline:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {flight.airline}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Flight Number:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        #{flight.flightNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Duration:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {flight.duration || "5h 30m"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Aircraft:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        Boeing 787
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Distance:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        3,500 miles
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Pricing & Availability
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Price:
                      </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        ${flight.price || "450.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Class:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        Economy
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Seats Available:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        24
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Baggage Allowance:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        23kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">
                        Meal Included:
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Flight Schedule
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="min-w-[80px] text-center">
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {formatTime(flight.departureDate)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(flight.departureDate)}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {flight.from} Airport (Terminal 2)
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Check-in opens 3 hours before departure
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-dashed border-gray-300 dark:border-gray-600 ml-10 pl-8 py-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Flight Duration: {flight.duration || "5h 30m"}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="min-w-[80px] text-center">
                      <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                        {formatTime(
                          new Date(
                            new Date(flight.departureDate).getTime() +
                              5 * 60 * 60 * 1000
                          )
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(
                          new Date(
                            new Date(flight.departureDate).getTime() +
                              5 * 60 * 60 * 1000
                          )
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {flight.to} Airport (Terminal 1)
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Baggage claim at Carousel 4
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleReserve}
                  disabled={isReserved}
                  className={`flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg ${
                    isReserved
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 cursor-default"
                      : "bg-amber-600 dark:bg-amber-700 hover:bg-amber-700 dark:hover:bg-amber-600 text-white"
                  }`}
                >
                  {isReserved ? (
                    <>
                      <FaCheck className="mr-2" />
                      Flight Reserved
                    </>
                  ) : (
                    <>
                      <FaPlane className="mr-2" />
                      Reserve This Flight
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Flight Reviews
                </h3>
                {flightReviews.length === 0 ? (
                  <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center">
                    <FaStar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-xl font-medium text-gray-800 dark:text-white">
                      No reviews yet
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      Be the first to share your experience
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {flightReviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
