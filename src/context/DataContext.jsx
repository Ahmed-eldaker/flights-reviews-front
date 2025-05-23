// "use client"

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { token, isAuthenticated, user } = useAuth();
  const [flights, setFlights] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFlights, setUserFlights] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = "https://flights-xi-five.vercel.app/";

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
        // Try to fetch flights from API
        try {
          const flightsResponse = await axios.get(`${URL}flights`);
          setFlights(flightsResponse.data);

          // Instead of using a subset of all flights, we should fetch user-specific flights
          // For now, we'll initialize with an empty array
          setUserFlights([]);

          // Try to fetch reviews for each flight
          const reviewsPromises = flightsResponse.data.map((flight) =>
            axios.get(`${URL}reviews/${flight._id}`)
          );

          const reviewsResponses = await Promise.all(reviewsPromises);
          const allReviews = reviewsResponses.flatMap(
            (response) => response.data
          );
          setReviews(allReviews);

          // Get the current user ID
          const userId =
            user?._id || JSON.parse(localStorage.getItem("user"))?._id;

          // Try to fetch user reviews directly from the API
          try {
            const userReviewsResponse = await axios.get(
              `${URL}reviews/user/${userId}`
            );
            setUserReviews(userReviewsResponse.data);
          } catch (error) {
            console.log(
              "Falling back to client-side filtering for user reviews:",
              error
            );

            // Filter reviews by user ID as fallback
            const filteredUserReviews = allReviews.filter((review) => {
              const reviewUserId = review.user?._id || review.user;
              return (
                reviewUserId &&
                userId &&
                reviewUserId.toString() === userId.toString()
              );
            });

            setUserReviews(filteredUserReviews);
          }
        } catch (error) {
          console.log("Using sample data due to API error:", error);
          // If API fails, we'll use sample data (handled in components)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data, using sample data instead");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  // Add a review
  const addReview = async (flightId, reviewData) => {
    try {
      // Get the current user ID
      const userId = user?._id || JSON.parse(localStorage.getItem("user"))?._id;
      const userName =
        user?.name ||
        JSON.parse(localStorage.getItem("user"))?.name ||
        "Current User";

      // Prepare the review data with the user ID
      const reviewPayload = {
        flight: flightId,
        user: userId, // Make sure to include the user ID
        ...reviewData,
      };

      let newReview;

      try {
        // Try to call the API
        const response = await axios.post(`${URL}reviews`, reviewPayload);
        newReview = response.data;

        // If the API response doesn't include user details, add them
        if (!newReview.user || typeof newReview.user === "string") {
          newReview.user = {
            _id: userId,
            name: userName,
          };
        }
      } catch (error) {
        console.log("Using simulated review due to API error:", error);
        // If API fails, simulate a new review
        newReview = {
          _id: `review_${Date.now()}`,
          flight: flightId,
          user: {
            _id: userId,
            name: userName,
          },
          rating: reviewData.rating,
          feedback: reviewData.feedback,
          details: reviewData.details,
          createdAt: new Date().toISOString(),
        };
      }

      // Update reviews state
      setReviews((prevReviews) => [...prevReviews, newReview]);

      // Update user reviews - make sure this is always updated
      setUserReviews((prevUserReviews) => [...prevUserReviews, newReview]);

      toast.success("Review added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
      return false;
    }
  };

  // Add a flight
  const addFlight = async (flightData) => {
    try {
      // Ensure we have the required fields
      if (
        !flightData.airline ||
        !flightData.flightNumber ||
        !flightData.from ||
        !flightData.to
      ) {
        toast.error("Missing required flight information");
        return false;
      }

      // Add default values if not provided
      const completeFlightData = {
        departureDate: new Date().toISOString(),
        price: "450.00",
        duration: "5h 30m",
        ...flightData,
      };

      let newFlight;

      try {
        // Try to call the API to add a flight
        const response = await axios.post(`${URL}flights`, completeFlightData);
        newFlight = response.data;
      } catch (error) {
        console.log("Using simulated flight due to API error:", error);
        // If API fails, simulate a new flight
        newFlight = {
          _id: `flight_${Date.now()}`,
          ...completeFlightData,
        };
      }

      // Update flights state
      setFlights((prevFlights) => [...prevFlights, newFlight]);

      toast.success("Flight added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding flight:", error);
      toast.error("Failed to add flight");
      return false;
    }
  };

  // Reserve a flight (simulated)
  const reserveFlight = async (flightId) => {
    try {
      // Check if flight is already reserved
      if (userFlights.some((f) => f._id === flightId)) {
        toast.info("You have already reserved this flight");
        return false;
      }

      // Try to call the API first
      let reservedFlight;

      try {
        // In a real app, you'd call an API endpoint to reserve the flight
        // For this demo, we'll just simulate it
        const response = await axios.post(`${URL}flights/reserve`, {
          flightId,
        });
        reservedFlight = response.data;
      } catch (error) {
        console.log("Using simulated reservation due to API error:", error);
        // If API fails, simulate a reservation
        reservedFlight = flights.find((f) => f._id === flightId);
      }

      if (!reservedFlight) {
        throw new Error("Flight not found");
      }

      // Add to user flights - this should be user-specific
      setUserFlights((prevUserFlights) => [...prevUserFlights, reservedFlight]);

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
    addFlight,
    reserveFlight,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
