import { useState, useEffect } from "react";
import { useApi } from "../../context/ApiContext";
import { useUserId } from "../../context/UserIdContext";
import '..//CreateNewAuction/CreateNewAuction.css'

function CreateNewAuction() {
  const { api } = useApi();
  const { userId } = useUserId(); // Fetch User ID from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User ID from Context in CreateNewAuction:", userId); // ✅ Check if User ID is received
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID not available. Please log in again.");
      return;
    }

    try {
      const response = await api.post(
        `/Auction/Create_Auction?Title=${title}&Description=${description}&Price=${price}&StartDate=${startDate}&EndDate=${endDate}&CreatedBy=${userId}`
      );

      setMessage("Auction created successfully!");
      console.log("Auction Created:", response.data);
    } catch (error) {
      setMessage("Failed to create auction. Please try again.");
      console.error("Error creating auction:", error);
    }
  };

  return (
    <div>
      <h2>Create New Auction</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Auction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Starting Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="End Date"
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

        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}

export default CreateNewAuction;
