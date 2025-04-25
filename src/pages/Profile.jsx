// "use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import FlightCard from "../components/FlightCard";
import ReviewCard from "../components/ReviewCard";
import { FaUser, FaPlane, FaStar, FaSpinner } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const { userFlights, userReviews, loading } = useData();
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
        <div className="flex items-center">
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaUser className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {user?.name || "User"}'s Profile
            </h1>
            <p className="text-gray-600">Manage your flights and reviews</p>
          </div>
        </div>
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
              My Flights
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
              My Reviews
            </div>
          </button>
        </nav>
      </div>

      {activeTab === "flights" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Reserved Flights</h2>
          {userFlights.length === 0 ? (
            <div className="card p-8 text-center">
              <FaPlane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No flights reserved yet</p>
              <p className="text-gray-500 mt-2">
                Browse available flights and reserve your next trip
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {userFlights.map((flight) => (
                <FlightCard
                  key={flight._id}
                  flight={flight}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
          {userReviews.length === 0 ? (
            <div className="card p-8 text-center">
              <FaStar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No reviews submitted yet</p>
              <p className="text-gray-500 mt-2">
                Share your flight experiences to help other travelers
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {userReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
