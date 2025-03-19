import { createContext, useContext, useState } from "react";
import axios from "axios";

// Create the API Context
const ApiContext = createContext();

// Create a provider component
export const ApiProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Get token from localStorage
  const baseUrl = "http://localhost:5074/api"; // API base URL

  // Function to update token after login
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Axios instance with Authorization header
  const api = axios.create({
    baseURL: baseUrl,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return (
    <ApiContext.Provider value={{ api, updateToken, token }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => useContext(ApiContext);

// Manages API Calls using Axios.
//Handles Authentication (JWT Token) Automatically.
//Stores the Token in localStorage for Persistent Login

// Creating an Axios Instance
