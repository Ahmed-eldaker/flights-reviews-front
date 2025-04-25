// "use client";

import { useState } from "react";
import { useData } from "../context/DataContext";
import FlightCard from "../components/FlightCard";
import ReviewCard from "../components/ReviewCard";
import { FaPlane, FaStar, FaSpinner } from "react-icons/fa";

const Home = () => {
  const { flights, reviews, loading } = useData();
  const [activeTab, setActiveTab] = useState("flights");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to FlightReview</h1>
        <p className="text-gray-600">
          Browse flights, read reviews, and share your experiences
        </p>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("flights")}
            className={`${
              activeTab === "flights"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center">
              <FaPlane className="mr-2" />
              Flights
            </div>
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`${
              activeTab === "reviews"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            <div className="flex items-center">
              <FaStar className="mr-2" />
              Recent Reviews
            </div>
          </button>
        </nav>
      </div>

      {activeTab === "flights" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
          {flights.length === 0 ? (
            <div className="card p-8 text-center">
              <FaPlane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No flights available</p>
              <p className="text-gray-500 mt-2">
                Check back later for updated flight information
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {flights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          {reviews.length === 0 ? (
            <div className="card p-8 text-center">
              <FaStar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No reviews yet</p>
              <p className="text-gray-500 mt-2">
                Be the first to share your experience
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {reviews.slice(0, 5).map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
