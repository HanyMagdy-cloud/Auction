import { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import { useUserId } from "../context/UserIdContext"; // ✅ Import UserIdContext
import "../styles/DeleteBid.css";

function DeleteBid({ isAuthenticated }) {
  const { api } = useApi();
  const { userId } = useUserId(); // ✅ Fetch User ID from context
  const [bidId, setBidId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User ID from Context in DeleteBid:", userId); // ✅ Check User ID
  }, [userId]);

  // Function to delete a bid
  const handleDeleteBid = async () => {
    if (!isAuthenticated) {
      setMessage("❌ You must be logged in to delete a bid.");
      return;
    }

    if (!bidId || !userId) {
      setMessage("❌ Please enter a Bid ID and ensure you're logged in.");
      return;
    }

    try {
      await api.delete(`/Bid/${bidId}?userId=${userId}`);

      setMessage(`✅ Bid ${bidId} deleted successfully.`);
      setBidId("");
    } catch (err) {
      console.error("Failed to delete bid:", err);
      setMessage(
        "❌ Failed to delete bid. Make sure you're the owner and the auction is open."
      );
    }
  };

  return (
    <div className="delete-bid-container">
      <h2>Delete Bid</h2>
      {message && (
        <p className={message.startsWith("✅") ? "success" : "error"}>
          {message}
        </p>
      )}

      {!isAuthenticated && (
        <p className="error">❌ Please log in first to delete a bid.</p>
      )}

      {isAuthenticated && (
        <>
          <input
            type="number"
            placeholder="Bid ID"
            value={bidId}
            onChange={(e) => setBidId(e.target.value)}
            required
          />

          {/* Automatically fill User ID from context */}
          <input
            type="text"
            placeholder="Your User ID"
            value={userId || "Loading..."}
            readOnly
          />

          <button onClick={handleDeleteBid}>Delete Bid</button>
        </>
      )}
    </div>
  );
}

export default DeleteBid;
