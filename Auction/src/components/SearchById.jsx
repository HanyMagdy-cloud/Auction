import { useState } from "react";
import axios from "axios";
import "../styles/SearchById.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

function SearchById({ isAuthenticated }) {
  const [auctionId, setAuctionId] = useState(""); // Store Auction ID input
  const [auction, setAuction] = useState(null);   // Store auction details
  const [error, setError] = useState(null);       // Handle errors

  // Function to fetch auction data by ID
  const handleSearch = async () => {
    if (!auctionId.trim()) {
      setError("❌ Please enter a valid Auction ID.");
      setAuction(null);
      return;
    }

    //  Retrieve JWT token from localStorage (Ensure user is logged in)
    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ You must be logged in to search for auctions.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5074/api/Auction/${auctionId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send JWT token in request
        },
      });

      setAuction(response.data); // Store the fetched auction
      setError(null); // Clear errors
    } catch (err) {
      console.error("Fetch error:", err);
      setError("❌ Auction not found or unauthorized.");
      setAuction(null);
    }
  };

  return (
    <div className="search-container">
      <h1>Search Auction by ID</h1>

      {!isAuthenticated && <p className="error">❌ Please log in first.</p>}
      <Link to="/login" className="login-link">➡️ Click here to log in</Link> {/* ✅ Add Login Link */}


      {isAuthenticated && (
        <>
          <div className="input-container">
            <input
              type="number"
              value={auctionId}
              onChange={(e) => setAuctionId(e.target.value)}
              placeholder="Enter Auction ID"
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {error && <p className="error">{error}</p>}

          {auction && (
            <table className="auction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Starting Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{auction.auctionID}</td>
                  <td>{auction.title}</td>
                  <td>{auction.description}</td>
                  <td>{auction.startingPrice} SEK</td>
                  <td>{new Date(auction.startDate).toLocaleDateString()}</td>
                  <td>{new Date(auction.endDate).toLocaleDateString()}</td>
                  <td>{auction.createdBy}</td>
                  <td>{new Date(auction.createdAt).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default SearchById;
