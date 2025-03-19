import { useState } from "react";
import { useBid } from "../context/BidContext"; // ✅ Import Bid Context
import { useUser } from "../context/UserContext"; // ✅ Import User Context
import "../styles/GetBidsForAuction.css"; // ✅ Import CSS for styling

function GetBidsForAuction() {
  const { getBidsForAuction } = useBid(); // ✅ Fetch bids from BidContext
  const { token } = useUser(); // ✅ Get authentication token
  const [auctionId, setAuctionId] = useState("");
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState(null);

  // ✅ Handle fetching bids
  const handleFetchBids = async () => {
    if (!auctionId) {
      setMessage("❌ Please enter an Auction ID.");
      return;
    }

    if (!token) {
      setMessage("❌ Authentication error. Please log in again.");
      return;
    }

    try {
      const bidData = await getBidsForAuction(auctionId);
      console.log("Fetched Bids:", bidData); // ✅ Debugging: Check console if data is received

      if (bidData.length === 0 || !bidData) {
        setMessage(`❌ No bids found for Auction ID: ${auctionId}`);
        setBids([]);
      } else {
        setBids(bidData);
        setMessage(null);
      }
    } catch (error) {
      setMessage("❌ Failed to fetch bids.");
    }
  };

  return (
    <div className="bids-container">
      <h2>Get Bids for Auction</h2>
      <input
        type="number"
        placeholder="Enter Auction ID"
        value={auctionId}
        onChange={(e) => setAuctionId(e.target.value)}
      />
      <button onClick={handleFetchBids}>Fetch Bids</button>

      {message && <p className="message">{message}</p>}

      {/* ✅ Display bids in a table */}
      {bids.length > 0 && (
        <table className="bid-table">
          <thead>
            <tr>
              <th>Bid ID</th>
              <th>User ID</th>
              <th>Bid Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.bidID}>
                <td>{bid.bidID}</td>
                <td>{bid.userID}</td>
                <td>{bid.bidAmount} SEK</td>
                <td>{new Date(bid.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GetBidsForAuction;
