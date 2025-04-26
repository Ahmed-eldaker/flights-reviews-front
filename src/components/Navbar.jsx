// "use client"
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaPlane,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
  FaCog,
  FaBell,
} from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center group">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full transition-all duration-300 group-hover:bg-amber-200 dark:group-hover:bg-amber-800">
                <FaPlane className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                FlightReview
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="ml-2 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700 relative"
            >
              <FaBell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-6 flex items-center space-x-4">
              <Link
                to="/home"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/home"
                    ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <FaHome className="mr-1" />
                  Home
                </div>
              </Link>

              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/profile"
                    ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  Profile
                </div>
              </Link>

              <Link
                to="/settings"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/settings"
                    ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                    : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <FaCog className="mr-1" />
                  Settings
                </div>
              </Link>
            </div>

            <div className="ml-6 flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-gray-700 relative"
                >
                  <FaBell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {showNotifications && <NotificationDropdown />}
              </div>

              <DarkModeToggle />

              <div className="flex items-center">
                <div className="flex items-center bg-amber-50 dark:bg-gray-700 px-3 py-1 rounded-full mr-4">
                  <FaUser className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <FaSignOutAlt className="mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/home"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/home"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                  : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaHome className="mr-2" />
                Home
              </div>
            </Link>

            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/profile"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                  : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUser className="mr-2" />
                Profile
              </div>
            </Link>

            <Link
              to="/settings"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/settings"
                  ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-gray-700"
                  : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaCog className="mr-2" />
                Settings
              </div>
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900 p-1 rounded-full">
                  <FaUser className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user?.name || "User"}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNotifications && mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <NotificationDropdown isMobile={true} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
