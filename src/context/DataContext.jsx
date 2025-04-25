// "use client"

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [flights, setFlights] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFlights, setUserFlights] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configure axios with token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Fetch flights and reviews
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch flights
        const flightsResponse = await axios.get(
          `http://localhost:5000//flights`
        );
        setFlights(flightsResponse.data);

        // For demo purposes, we'll simulate user flights by taking a subset of all flights
        // In a real app, you'd have an endpoint to get user's flights
        setUserFlights(flightsResponse.data.slice(0, 2));

        // Fetch reviews for each flight
        const reviewsPromises = flightsResponse.data.map((flight) =>
          axios.get(`http://localhost:5000//reviews/${flight._id}`)
        );

        const reviewsResponses = await Promise.all(reviewsPromises);
        const allReviews = reviewsResponses.flatMap(
          (response) => response.data
        );
        setReviews(allReviews);

        // Filter reviews by user ID
        // In a real app, you'd have an endpoint to get user's reviews
        const userId = JSON.parse(localStorage.getItem("user"))?.user;
        const filteredUserReviews = allReviews.filter(
          (review) => review.user._id === userId
        );
        setUserReviews(filteredUserReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Add a review
  const addReview = async (flightId, reviewData) => {
    try {
      const response = await axios.post(`http://localhost:5000//reviews`, {
        flight: flightId,
        ...reviewData,
      });

      // Update reviews state
      setReviews([...reviews, response.data]);

      // Update user reviews
      setUserReviews([...userReviews, response.data]);

      toast.success("Review added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
      return false;
    }
  };

  // Reserve a flight (simulated)
  const reserveFlight = async (flightId) => {
    try {
      // In a real app, you'd call an API endpoint to reserve the flight
      // For this demo, we'll just simulate it by adding the flight to userFlights
      const flight = flights.find((f) => f._id === flightId);

      if (!flight) {
        throw new Error("Flight not found");
      }

      // Check if flight is already reserved
      if (userFlights.some((f) => f._id === flightId)) {
        toast.info("You have already reserved this flight");
        return false;
      }

      // Add to user flights
      setUserFlights([...userFlights, flight]);

      toast.success("Flight reserved successfully!");
      return true;
    } catch (error) {
      console.error("Error reserving flight:", error);
      toast.error("Failed to reserve flight");
      return false;
    }
  };

  const value = {
    flights,
    reviews,
    userFlights,
    userReviews,
    loading,
    addReview,
    reserveFlight,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
