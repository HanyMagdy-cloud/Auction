import { createContext, useContext, useState } from "react";
import axios from "axios";

//  Create Auction Context
const AuctionContext = createContext();

//  Create Auction Provider Component
export const AuctionProvider = ({ children }) => {
  const baseUrl = "http://localhost:5074/api/Auction"; // Base API URL

  //  Fetch all auctions
  const getAllAuctions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Get_All_Auctions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching auctions:", error);
      throw error;
    }
  };

  //  Search auctions by item
  const searchAuctions = async (searchTerm) => {
    try {
      const response = await axios.get(`${baseUrl}/search`, { params: { searchTerm } });
      return response.data;
    } catch (error) {
      console.error("Error searching auctions:", error);
      throw error;
    }
  };

  return (
    <AuctionContext.Provider value={{ getAllAuctions, searchAuctions }}>
      {children}
    </AuctionContext.Provider>
  );
};

//  Custom Hook for Using AuctionContext
export const useAuction = () => useContext(AuctionContext);
