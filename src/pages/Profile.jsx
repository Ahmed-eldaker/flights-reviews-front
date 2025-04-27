"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import FlightCard from "../components/FlightCard";
import ReviewCard from "../components/ReviewCard";
import {
  FaUser,
  FaPlane,
  FaStar,
  FaSpinner,
  FaEdit,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";

const sampleUserFlights = [
  {
    _id: "flight1",
    airline: "SkyJet Airways",
    flightNumber: "SJ456",
    from: "New York",
    to: "London",
    departureDate: new Date(2023, 11, 15, 10, 30).toISOString(),
    price: "450.00",
    duration: "7h 15m",
  },
  {
    _id: "flight2",
    airline: "Global Airlines",
    flightNumber: "GA789",
    from: "Los Angeles",
    to: "Tokyo",
    departureDate: new Date(2023, 11, 18, 14, 45).toISOString(),
    price: "820.00",
    duration: "12h 30m",
  },
];

const sampleUserReviews = [
  {
    _id: "review1",
    user: { _id: "user1", name: "Current User" },
    rating: 4.5,
    feedback:
      "The flight was comfortable and the crew was very attentive. Food could have been better, but overall a great experience.",
    details: { crew: 5, cleanliness: 4, food: 3, takeoff: 5, landing: 5 },
    createdAt: new Date(2023, 10, 5).toISOString(),
  },
  {
    _id: "review2",
    user: { _id: "user1", name: "Current User" },
    rating: 3.8,
    feedback:
      "Decent flight but there were some delays. The crew handled it professionally though.",
    details: { crew: 4, cleanliness: 4, food: 3, takeoff: 3, landing: 5 },
    createdAt: new Date(2023, 10, 10).toISOString(),
  },
];

const Profile = () => {
  const { user } = useAuth();
  const { userFlights = [], userReviews = [], loading } = useData();
  const [activeTab, setActiveTab] = useState("flights");
  const [isLoading, setIsLoading] = useState(true);
  const [displayUserFlights, setDisplayUserFlights] = useState([]);
  const [displayUserReviews, setDisplayUserReviews] = useState([]);

  // Use real data with fallback to sample data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if we have real user flights, otherwise use sample data
      setDisplayUserFlights(
        userFlights.length > 0 ? userFlights : sampleUserFlights
      );

      setDisplayUserReviews(
        userReviews.length > 0 ? userReviews : sampleUserReviews
      );

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userFlights, userReviews]);

  useEffect(() => {
    console.log("User Reviews in Profile:", userReviews);
  }, [userReviews]);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="h-12 w-12 text-emerald-700 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 h-32 md:h-48"></div>
        <div className="relative px-4 py-5 sm:px-6">
          <div className="absolute -mt-16 flex items-center">
            <div className="bg-emerald-100 p-4 rounded-full border-4 border-white shadow-lg">
              <FaUser className="h-12 w-12 text-emerald-700" />
            </div>
          </div>
          <div className="ml-24 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name || "User"}
              </h1>
              <div className="flex flex-wrap mt-2">
                <div className="flex items-center mr-4 text-sm text-gray-600">
                  <FaEnvelope className="mr-1 text-emerald-700" />
                  {user?.email || "user@example.com"}
                </div>
                <div className="flex items-center mr-4 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-1 text-emerald-700" />
                  New York, USA
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-1 text-emerald-700" />
                  Joined Jan 2023
                </div>
              </div>
            </div>
            <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 transition-colors">
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-3xl font-bold text-emerald-700">
            {displayUserFlights.length}
          </div>
          <div className="text-gray-500">Reserved Flights</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-3xl font-bold text-emerald-700">
            {displayUserReviews.length}
          </div>
          <div className="text-gray-500">Reviews Written</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-3xl font-bold text-gray-700">
            {displayUserReviews.length > 0
              ? (
                  displayUserReviews.reduce(
                    (acc, review) => acc + review.rating,
                    0
                  ) / displayUserReviews.length
                ).toFixed(1)
              : "0.0"}
          </div>
          <div className="text-gray-500">Average Rating Given</div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("flights")}
            className={`tab-button ${
              activeTab === "flights"
                ? "tab-button-active"
                : "tab-button-inactive"
            }`}
          >
            <div className="flex items-center">
              <FaPlane className="mr-2" />
              My Flights
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
              My Reviews
            </div>
          </button>
        </nav>
      </div>

      {activeTab === "flights" && (
        <div className="animate-fade-in">
          <h2 className="section-title">Your Reserved Flights</h2>
          {displayUserFlights.length === 0 ? (
            <div className="card p-8 text-center">
              <FaPlane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No flights reserved yet</p>
              <p className="text-gray-500 mt-2">
                Browse available flights and reserve your next trip
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {displayUserFlights.map((flight) => (
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
        <div className="animate-fade-in">
          <h2 className="section-title">Your Reviews</h2>
          {displayUserReviews.length === 0 ? (
            <div className="card p-8 text-center">
              <FaStar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No reviews submitted yet</p>
              <p className="text-gray-500 mt-2">
                Share your flight experiences to help other travelers
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {displayUserReviews.map((review) => (
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
