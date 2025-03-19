import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DeleteAuction.css"; // Import CSS for styling
import { Link } from "react-router-dom";
import { useUserId } from "../context/UserIdContext"; // ✅ Import UserIdContext for User ID

function DeleteAuction({ isAuthenticated }) {
  const [auctionId, setAuctionId] = useState("");
  const { userId } = useUserId(); // ✅ Fetch User ID from context
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("User ID from Context in DeleteAuction:", userId); // ✅ Check User ID
  }, [userId]);

  // Function to delete an auction
  const handleDeleteAuction = async () => {
    if (!isAuthenticated) {
      setMessage("❌ You must be logged in to delete an auction.");
      return;
    }

    if (!auctionId || !userId) {
      setMessage("❌ Please enter both Auction ID and User ID.");
      return;
    }

    // Retrieve JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Authentication error. Please log in again.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5074/api/Auction/${auctionId}/Delete_Auction_ByUserId/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(`✅ Auction ${auctionId} deleted successfully.`);
      setAuctionId("");
    } catch (err) {
      console.error("Error deleting auction:", err);
      setMessage("❌ Failed to delete auction. Make sure you are the creator.");
    }
  };

  return (
    <div className="delete-auction-container">
      <h1>Delete Auction</h1>

      {!isAuthenticated && <p className="error">❌ Please log in first.</p>}
      <Link to="/login" className="login-link">➡️ Click here to log in</Link> {/* ✅ Add Login Link */}

      {isAuthenticated && (
        <>
          <input
            type="number"
            placeholder="Auction ID"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
          />

          {/* Automatically fill User ID from context */}
          <input
            type="text"
            placeholder="Your User ID"
            value={userId || "Loading..."}
            readOnly
          />

          <button onClick={handleDeleteAuction}>Delete Auction</button>

          {message && <p className={message.startsWith("✅") ? "success" : "error"}>{message}</p>}
        </>
      )}
    </div>
  );
}

export default DeleteAuction;
