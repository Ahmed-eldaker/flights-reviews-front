// "use client";

import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import FlightCard from "../components/FlightCard";
import ReviewCard from "../components/ReviewCard";
import {
  FaPlane,
  FaStar,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import axios from "axios";

// Sample fake data for flights
const sampleFlights = [
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
  {
    _id: "flight3",
    airline: "Sun Express",
    flightNumber: "SE123",
    from: "Dubai",
    to: "Paris",
    departureDate: new Date(2023, 11, 20, 8, 15).toISOString(),
    price: "380.00",
    duration: "6h 45m",
  },
  {
    _id: "flight4",
    airline: "Mountain Air",
    flightNumber: "MA567",
    from: "Chicago",
    to: "Berlin",
    departureDate: new Date(2023, 11, 22, 12, 0).toISOString(),
    price: "520.00",
    duration: "9h 10m",
  },
  {
    _id: "flight5",
    airline: "Ocean Pacific",
    flightNumber: "OP890",
    from: "Sydney",
    to: "San Francisco",
    departureDate: new Date(2023, 11, 25, 23, 30).toISOString(),
    price: "750.00",
    duration: "14h 20m",
  },
];

// Sample fake data for reviews
const sampleReviews = [
  {
    _id: "review1",
    user: { _id: "user1", name: "Sarah Johnson" },
    rating: 4.5,
    feedback:
      "The flight was comfortable and the crew was very attentive. Food could have been better, but overall a great experience. I would definitely fly with them again on my next trip. The entertainment options were also quite good.",
    details: { crew: 5, cleanliness: 4, food: 3, takeoff: 5, landing: 5 },
    createdAt: new Date(2023, 10, 5).toISOString(),
  },
  {
    _id: "review2",
    user: { _id: "user2", name: "Michael Chen" },
    rating: 3.8,
    feedback:
      "Decent flight but there were some delays. The crew handled it professionally though.",
    details: { crew: 4, cleanliness: 4, food: 3, takeoff: 3, landing: 5 },
    createdAt: new Date(2023, 10, 10).toISOString(),
  },
  {
    _id: "review3",
    user: { _id: "user3", name: "Emma Rodriguez" },
    rating: 5.0,
    feedback:
      "One of the best flights I've ever taken! Everything was perfect from start to finish.",
    details: { crew: 5, cleanliness: 5, food: 5, takeoff: 5, landing: 5 },
    createdAt: new Date(2023, 10, 15).toISOString(),
  },
  {
    _id: "review4",
    user: { _id: "user4", name: "David Wilson" },
    rating: 4.2,
    feedback:
      "Very smooth flight with excellent service. The entertainment options were great.",
    details: { crew: 5, cleanliness: 4, food: 4, takeoff: 4, landing: 4 },
    createdAt: new Date(2023, 10, 20).toISOString(),
  },
  {
    _id: "review5",
    user: { _id: "user5", name: "Sophia Kim" },
    rating: 3.5,
    feedback:
      "The flight was okay. Nothing special but no major issues either.",
    details: { crew: 3, cleanliness: 4, food: 3, takeoff: 4, landing: 4 },
    createdAt: new Date(2023, 10, 25).toISOString(),
  },
];

const Home = () => {
  const { flights = [], reviews = [], loading } = useData();
  const [activeTab, setActiveTab] = useState("flights");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayFlights, setDisplayFlights] = useState([]);
  const [displayReviews, setDisplayReviews] = useState([]);

  const searchFlights = async (term) => {
    if (!term.trim()) {
      setDisplayFlights(flights.length > 0 ? flights : sampleFlights);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/flights/search?term=${term}`
      );
      if (response.data && response.data.length > 0) {
        setDisplayFlights(response.data);
      } else {
        const filtered = (flights.length > 0 ? flights : sampleFlights).filter(
          (flight) =>
            flight.airline.toLowerCase().includes(term.toLowerCase()) ||
            flight.from.toLowerCase().includes(term.toLowerCase()) ||
            flight.to.toLowerCase().includes(term.toLowerCase()) ||
            flight.flightNumber.toLowerCase().includes(term.toLowerCase())
        );
        setDisplayFlights(filtered);
      }
    } catch (error) {
      console.error("Error searching flights:", error);

      const filtered = (flights.length > 0 ? flights : sampleFlights).filter(
        (flight) =>
          flight.airline.toLowerCase().includes(term.toLowerCase()) ||
          flight.from.toLowerCase().includes(term.toLowerCase()) ||
          flight.to.toLowerCase().includes(term.toLowerCase()) ||
          flight.flightNumber.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayFlights(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayFlights(flights.length > 0 ? flights : sampleFlights);
      setDisplayReviews(reviews.length > 0 ? reviews : sampleReviews);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [flights, reviews]);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="h-12 w-12 text-amber-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">
          Loading amazing flights for you...
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-8 mb-8 shadow-lg">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to FlightReview
          </h1>
          <p className="text-lg mb-6 text-amber-100">
            Discover the best flights, read authentic reviews, and share your
            own experiences to help fellow travelers.
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="Search for flights, destinations, or airlines..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value.length > 2 || e.target.value.length === 0) {
                  searchFlights(e.target.value);
                }
              }}
              className="w-full py-3 px-4 pl-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {displayFlights.length}
          </div>
          <div className="text-gray-500 text-sm">Available Flights</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {displayReviews.length}
          </div>
          <div className="text-gray-500 text-sm">User Reviews</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
          <div className="text-2xl font-bold text-lime-500">4.2</div>
          <div className="text-gray-500 text-sm">Average Rating</div>
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
              Flights
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
              Recent Reviews
            </div>
          </button>
        </nav>
      </div>

      {activeTab === "flights" && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Available Flights</h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-amber-50 transition-colors">
                <FaFilter className="mr-2 text-amber-500" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-amber-50 transition-colors">
                <FaSortAmountDown className="mr-2 text-amber-500" />
                <span className="text-sm">Sort</span>
              </button>
            </div>
          </div>

          {displayFlights.length === 0 ? (
            <div className="card p-8 text-center">
              <FaPlane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No flights available</p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {displayFlights.map((flight) => (
                <FlightCard key={flight._id} flight={flight} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">Recent Reviews</h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-amber-50 transition-colors">
                <FaFilter className="mr-2 text-amber-500" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm text-gray-700 hover:bg-amber-50 transition-colors">
                <FaSortAmountDown className="mr-2 text-amber-500" />
                <span className="text-sm">Sort</span>
              </button>
            </div>
          </div>

          {displayReviews.length === 0 ? (
            <div className="card p-8 text-center">
              <FaStar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-medium">No reviews yet</p>
              <p className="text-gray-500 mt-2">
                Be the first to share your experience
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {displayReviews.map((review) => (
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
