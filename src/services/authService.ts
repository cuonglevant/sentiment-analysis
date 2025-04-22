import axios from "axios";

const API_URL = "http://localhost:8080"; // Replace with your API URL

// Authentication API service
const authService = {
  // Login function
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });

      // Store user token in localStorage if needed
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Signup function
  signup: async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

export default authService;
