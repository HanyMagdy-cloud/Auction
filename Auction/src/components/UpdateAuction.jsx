import { useState, useEffect } from "react";
import { useApi } from "../context/ApiContext";
import { useUserId } from "../context/UserIdContext";

function UpdateAuction() {
  const { api } = useApi();
  const { userId } = useUserId(); // Fetch User ID from context
  const [auctionId, setAuctionId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User ID from Context in UpdateAuction:", userId); // ✅ Check if User ID is received
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID not available. Please log in again.");
      return;
    }

    try {
      const response = await api.put(
        `/Auction/${auctionId}/Update_Auction?userId=${userId}&Title=${title}&Description=${description}&StartingPrice=${startingPrice}&StartDate=${startDate}&EndDate=${endDate}`
      );

      setMessage("Auction updated successfully!");
      console.log("Auction Updated:", response.data);
    } catch (error) {
      setMessage("Failed to update auction. Please try again.");
      console.error("Error updating auction:", error);
    }
  };

  return (
    <div>
      <h2>Update Auction</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Auction ID to Update"
          value={auctionId}
          onChange={(e) => setAuctionId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="New Starting Price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="New Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="New End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        {/* Automatically fill the User ID from context */}
        <input
          type="text"
          placeholder="Your User ID"
          value={userId || "Loading..."} // If User ID is not ready, show "Loading..."
          readOnly
        />

        <button type="submit">Update Auction</button>
      </form>
    </div>
  );
}

export default UpdateAuction;
