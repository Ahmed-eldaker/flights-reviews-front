// "use client"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaPlane, FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center">
              <FaPlane className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                FlightReview
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link
                to="/home"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <FaHome className="mr-1" />
                  Home
                </div>
              </Link>

              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/profile"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  Profile
                </div>
              </Link>
            </div>

            <div className="ml-4 flex items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-4">
                  Hello, {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <FaSignOutAlt className="mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
