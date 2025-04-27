// "use client";

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const URL = "https://flights-xi-five.vercel.app/";

  // Check if user is authenticated on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${URL}auth/login`, {
        email,
        password,
      });

      const { token: newToken, user: userData } = response.data;

      // Save to localStorage
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setToken(newToken);
      setUser(userData);

      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.msg || "Login failed");
      return false;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${URL}auth/signup`, {
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.msg || "Signup failed");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
