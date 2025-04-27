import { Link } from "react-router-dom";
import { FaPlane, FaStar, FaUsers, FaGlobe } from "react-icons/fa";

// Sample static data
const featuredFlights = [
  {
    id: 1,
    airline: "SkyJet Airways",
    from: "New York",
    to: "London",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    airline: "Global Airlines",
    from: "Los Angeles",
    to: "Tokyo",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    airline: "Sun Express",
    from: "Dubai",
    to: "Paris",
    rating: 4.7,
    reviews: 150,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "FlightReview helped me find the best airline for my trip to Europe. The reviews were spot on!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "I love being able to share my flight experiences and help others make informed decisions.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    text: "The detailed ratings for different aspects of the flight experience are incredibly helpful.",
    rating: 5,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaPlane className="h-8 w-8 text-emerald-700" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                FlightReview
              </span>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Share Your Flight Experience
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-emerald-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Review flights, help others make informed decisions, and find the
              best airlines for your next trip.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="ml-4 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flights Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Flights
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover top-rated flights based on user reviews
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <FaPlane className="h-6 w-6 text-emerald-700" />
                    </div>
                    <h3 className="ml-3 text-xl font-medium text-gray-900">
                      {flight.airline}
                    </h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500">
                      From:{" "}
                      <span className="font-medium text-gray-900">
                        {flight.from}
                      </span>
                    </p>
                    <p className="text-gray-500">
                      To:{" "}
                      <span className="font-medium text-gray-900">
                        {flight.to}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex text-emerald-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(flight.rating)
                              ? "text-emerald-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-gray-600">
                      {flight.rating} ({flight.reviews} reviews)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Read testimonials from our community
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <div className="flex text-emerald-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-emerald-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  <p className="mt-4 font-medium text-gray-900">
                    - {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose FlightReview
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                <FaStar className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Detailed Reviews
              </h3>
              <p className="mt-2 text-gray-500">
                Get comprehensive insights on every aspect of your flight
                experience.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                <FaUsers className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Community Driven
              </h3>
              <p className="mt-2 text-gray-500">
                Join thousands of travelers sharing authentic experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100">
                <FaGlobe className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                Global Coverage
              </h3>
              <p className="mt-2 text-gray-500">
                Find reviews for flights to and from destinations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <FaPlane className="h-6 w-6 text-emerald-400" />
              <span className="ml-2 text-lg font-bold">FlightReview</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">
                © 2023 FlightReview. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
