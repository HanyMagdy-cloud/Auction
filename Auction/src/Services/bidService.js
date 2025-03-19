// src/Services/bidService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5074/api/Bid"; // Your backend API

// Fetch all bids for a specific auction
export const fetchBidsForAuction = async (auctionId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get_all_bids_for_a_specific_auction/${auctionId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token for authentication
    });
    return response.data; // Return bid data
  } catch (error) {
    console.error("Error fetching bids:", error);
    throw new Error("Failed to fetch bids.");
  }
};
