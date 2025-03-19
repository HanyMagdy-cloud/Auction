// src/Services/auctionService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5074/api/Auction"; // Your backend API

// Fetch all auctions
export const fetchAllAuctions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Get_All_Auctions`);
    return response.data; // Return the auctions data
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Failed to fetch auctions.");
  }
};

// Fetch a single auction by ID
export const fetchAuctionById = async (auctionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${auctionId}`);
    return response.data; // Return auction details
  } catch (error) {
    console.error("Error fetching auction:", error);
    throw new Error("Auction not found.");
  }
};
