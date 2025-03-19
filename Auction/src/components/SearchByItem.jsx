import { useState } from "react";
import { useApi } from "../context/ApiContext"; // ✅ Import API Context
import "../styles/SearchByItem.css"; // ✅ Import styles
import { Link } from "react-router-dom";

function SearchByItem({ isAuthenticated }) {
  const { api } = useApi(); // ✅ Get the Axios instance from API Context
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Store the search term
  const [results, setResults] = useState([]); // ✅ Store search results
  const [message, setMessage] = useState(null); // ✅ Store error/success messages

  // ✅ Function to search auctions by item name
  const handleSearch = async () => {
    if (!isAuthenticated) {
      setMessage("❌ You must log in to search for auctions.");
      return;
    }

    if (!searchTerm.trim()) {
      setMessage("❌ Please enter an item name.");
      return;
    }

    try {
      const response = await api.get(`/Auction/search`, {
        params: { searchTerm },
      });

      setResults(response.data); // ✅ Store the search results
      setMessage(null); // ✅ Clear previous messages
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setMessage(`❌ No auctions found for "${searchTerm}".`);
      } else {
        setMessage("❌ Failed to search for auctions.");
      }
      setResults([]); // ✅ Clear previous results on error
    }
  };

  return (
    <div className="search-container">
      <h2>Search Auctions by Item</h2>
      <Link to="/login" className="login-link">
        ➡️ Click here to log in
      </Link>{" "}
      {/* ✅ Add Login Link */}
      <input
        type="text"
        placeholder="Enter item name (e.g., watch)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {message && <p className="error">{message}</p>}
      {/* ✅ Display results in a table if available */}
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Starting Price</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((auction) => (
              <tr key={auction.auctionID}>
                <td>{auction.auctionID}</td>
                <td>{auction.title}</td>
                <td>{auction.description}</td>
                <td>{auction.startingPrice} SEK</td>
                <td>{new Date(auction.startDate).toLocaleDateString()}</td>
                <td>{new Date(auction.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchByItem;
