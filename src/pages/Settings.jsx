"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaCog, FaBell, FaLock, FaUser, FaGlobe, FaSave } from "react-icons/fa";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Frequent traveler and flight enthusiast",
    location: "New York, USA",
    language: "English",
    password: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    reviewNotifications: true,
    flightAlerts: true,
    priceAlerts: false,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Saving settings:", formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <FaCog className="mr-2 text-emerald-700 dark:text-emerald-400" />
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "profile"
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FaUser className="mr-3 h-4 w-4" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "security"
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FaLock className="mr-3 h-4 w-4" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "notifications"
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FaBell className="mr-3 h-4 w-4" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === "preferences"
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <FaGlobe className="mr-3 h-4 w-4" />
                Preferences
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {/* Profile Information */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Profile Information
                  </h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Security
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Notification Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive email notifications about your account
                          activity
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          id="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="emailNotifications"
                          className={`flex items-center w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            formData.emailNotifications
                              ? "bg-emerald-700"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.emailNotifications ? "translate-x-6" : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Review Notifications
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when someone responds to your reviews
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="reviewNotifications"
                          id="reviewNotifications"
                          checked={formData.reviewNotifications}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="reviewNotifications"
                          className={`flex items-center w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            formData.reviewNotifications
                              ? "bg-emerald-700"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.reviewNotifications
                                ? "translate-x-6"
                                : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Flight Alerts
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications about your upcoming flights
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="flightAlerts"
                          id="flightAlerts"
                          checked={formData.flightAlerts}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="flightAlerts"
                          className={`flex items-center w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            formData.flightAlerts
                              ? "bg-emerald-700"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.flightAlerts ? "translate-x-6" : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Price Alerts
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when flight prices drop
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="priceAlerts"
                          id="priceAlerts"
                          checked={formData.priceAlerts}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="priceAlerts"
                          className={`flex items-center w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                            formData.priceAlerts
                              ? "bg-emerald-700"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.priceAlerts ? "translate-x-6" : ""
                            }`}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Preferences
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Theme
                      </h3>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            id="light"
                            name="theme"
                            type="radio"
                            className="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 dark:border-gray-600"
                            defaultChecked
                          />
                          <label
                            htmlFor="light"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            Light
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="dark"
                            name="theme"
                            type="radio"
                            className="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 dark:border-gray-600"
                          />
                          <label
                            htmlFor="dark"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            Dark
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="system"
                            name="theme"
                            type="radio"
                            className="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 dark:border-gray-600"
                          />
                          <label
                            htmlFor="system"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            System
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Currency
                      </h3>
                      <select
                        id="currency"
                        name="currency"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                        defaultValue="USD"
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>JPY</option>
                        <option>CAD</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Distance Unit
                      </h3>
                      <div className="mt-2 flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            id="miles"
                            name="distanceUnit"
                            type="radio"
                            className="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 dark:border-gray-600"
                            defaultChecked
                          />
                          <label
                            htmlFor="miles"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            Miles
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="kilometers"
                            name="distanceUnit"
                            type="radio"
                            className="h-4 w-4 text-emerald-700 focus:ring-emerald-500 border-gray-300 dark:border-gray-600"
                          />
                          <label
                            htmlFor="kilometers"
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            Kilometers
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <FaSave className="mr-2 -ml-1 h-4 w-4" />
                  Save Changes
                </button>
              </div>

              {saved && (
                <div className="mt-4 p-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-sm">
                  Settings saved successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
