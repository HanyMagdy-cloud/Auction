import { createContext, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext"; // ✅ Get authentication token

const BidContext = createContext();

export const BidProvider = ({ children }) => {
  const baseUrl = "http://localhost:5074/api/Bid";
  const { token } = useUser(); // ✅ Get token from UserContext

  const getBidsForAuction = async (auctionId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/get_all_bids_for_a_specific_auction/${auctionId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is included
        }
      );

      return response.data; // ✅ Return the actual bid data
    } catch (error) {
      console.error("Error fetching bids:", error);
      throw error;
    }
  };

  return (
    <BidContext.Provider value={{ getBidsForAuction }}>
      {children}
    </BidContext.Provider>
  );
};

export const useBid = () => useContext(BidContext);
