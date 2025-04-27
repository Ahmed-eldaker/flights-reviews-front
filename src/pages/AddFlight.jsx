"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import {
  FaPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

const AddFlight = () => {
  const navigate = useNavigate();
  const { addFlight } = useData();
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState({
    airline: "",
    flightNumber: "",
    from: "",
    to: "",
    departureDate: new Date().toISOString().split("T")[0],
    departureTime: "10:00",
    duration: "5h 30m",
    price: "450.00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Combine date and time for departureDate
    const combinedDateTime = new Date(
      `${flightData.departureDate}T${flightData.departureTime}:00`
    );

    const flightPayload = {
      ...flightData,
      departureDate: combinedDateTime.toISOString(),
    };

    // Remove departureTime as it's now combined with departureDate
    delete flightPayload.departureTime;

    try {
      const success = await addFlight(flightPayload);
      if (success) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error adding flight:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <button
          onClick={() => navigate("/home")}
          className="inline-flex items-center text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Flights
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 dark:from-emerald-800 dark:to-emerald-900 p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-full mr-4 shadow-md">
              <FaPlane className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Add New Flight</h1>
              <p className="text-emerald-100 dark:text-emerald-200">
                Create a new flight in the system
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="airline" className="form-label">
                  Airline Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPlane className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="airline"
                    name="airline"
                    value={flightData.airline}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="e.g. SkyJet Airways"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="flightNumber" className="form-label">
                  Flight Number
                </label>
                <input
                  type="text"
                  id="flightNumber"
                  name="flightNumber"
                  value={flightData.flightNumber}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g. SJ456"
                />
              </div>

              <div>
                <label htmlFor="from" className="form-label">
                  Origin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="from"
                    name="from"
                    value={flightData.from}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="e.g. New York"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="to" className="form-label">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="to"
                    name="to"
                    value={flightData.to}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="e.g. London"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="departureDate" className="form-label">
                  Departure Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={flightData.departureDate}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="departureTime" className="form-label">
                  Departure Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="departureTime"
                    name="departureTime"
                    value={flightData.departureTime}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="form-label">
                  Flight Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={flightData.duration}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g. 5h 30m"
                />
              </div>

              <div>
                <label htmlFor="price" className="form-label">
                  Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMoneyBillWave className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={flightData.price}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="e.g. 450.00"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="mr-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md shadow-sm"
              >
                {loading ? "Adding Flight..." : "Add Flight"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFlight;
