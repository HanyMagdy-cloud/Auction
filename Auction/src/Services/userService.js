// src/Services/userService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5074/api/User"; // Backend API URL

// Function to register a new user
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register_New_User`, {
      username,
      password,
    });

    return response.data; // Return success response from the backend
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed. Try a different username.");
  }
};
