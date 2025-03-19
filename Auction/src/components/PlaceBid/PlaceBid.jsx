import { useState, useEffect } from "react";
import { useApi } from "../../context/ApiContext";
import { useUserId } from "../../context/UserIdContext"; // ✅ Import UserIdContext
import "./PlaceBid.css";

function PlaceBid({ isAuthenticated }) {
  const { api } = useApi();
  const { userId } = useUserId(); // ✅ Fetch User ID from context
  const [auctionId, setAuctionId] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User ID from Context in PlaceBid:", userId); // ✅ Check User ID
  }, [userId]);

  // Function to place a bid
  const handlePlaceBid = async () => {
    if (!isAuthenticated) {
      setMessage("❌ You must be logged in to place a bid.");
      return;
    }

    if (!auctionId || !bidAmount || !userId) {
      setMessage("❌ Please enter Auction ID, Bid Amount, and ensure you're logged in.");
      return;
    }

    try {
      const response = await api.post(
        `/Bid/Place_Bid?AuctionID=${auctionId}&UserID=${userId}&BidAmount=${bidAmount}`
      );

      setMessage("✅ Bid placed successfully!");
      console.log("Bid Response:", response.data);

      setAuctionId("");
      setBidAmount("");
    } catch (err) {
      console.error("Failed to place bid:", err);
      setMessage("❌ Failed to place bid. Make sure the auction is open, you're not the owner, and the bid is at least 10 SEK higher.");
    }
  };

  return (
    <div className="place-bid-container">
      <h2>Place a Bid</h2>
      {message && <p className={message.startsWith("✅") ? "success" : "error"}>{message}</p>}
      
      {!isAuthenticated && <p className="error">❌ Please log in first to place a bid.</p>}

      {isAuthenticated && (
        <>
          <input
            type="number"
            placeholder="Auction ID"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Bid Amount (SEK)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />

          {/* Automatically fill User ID from context */}
          <input
            type="text"
            placeholder="Your User ID"
            value={userId || "Loading..."}
            readOnly
          />

          <button onClick={handlePlaceBid}>Place Bid</button>
        </>
      )}
    </div>
  );
}

export default PlaceBid;
