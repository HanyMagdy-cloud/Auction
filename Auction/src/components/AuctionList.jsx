import { useEffect, useState } from "react";
import { useAuction } from "../context/AuctionContext"; // ✅ Import Auction Context
import { useBid } from "../context/BidContext"; // ✅ Import Bid Context
import "../styles/AuctionList.css"; // ✅ Import styles

function AuctionList() {
  const { getAllAuctions } = useAuction(); // ✅ Fetch all auctions
  const { getBidsForAuction } = useBid(); // ✅ Fetch bids for a selected auction
  const [auctions, setAuctions] = useState([]); // ✅ Store auctions
  const [selectedAuction, setSelectedAuction] = useState(null); // ✅ Store selected auction
  const [bids, setBids] = useState([]); // ✅ Store bids for selected auction
  const [message, setMessage] = useState(null); // ✅ Store error/success messages

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctions();
        setAuctions(data);
      } catch (error) {
        setMessage("❌ Failed to fetch auctions.");
      }
    };
    fetchAuctions();
  }, []);

  // ✅ Handle auction click
  const handleAuctionClick = async (auctionId) => {
    setSelectedAuction(auctionId); // ✅ Store the selected auction ID
    setMessage(null); // ✅ Clear previous messages

    try {
      const bidData = await getBidsForAuction(auctionId);
      if (bidData.length === 0) {
        setMessage(`❌ No bids found for Auction ID: ${auctionId}`);
      }
      setBids(bidData);
    } catch (error) {
      setMessage("❌ Failed to fetch bids.");
    }
  };

  return (
    <div className="auction-container">
      <h2>All Auctions</h2>
      {message && <p className="message">{message}</p>}

      {auctions.length > 0 ? (
        <ul className="auction-list">
          {auctions.map((auction) => (
            <li
              key={auction.auctionID}
              onClick={() => handleAuctionClick(auction.auctionID)}
              className="auction-item"
            >
              <strong>{auction.title}</strong> - {auction.startingPrice} SEK
            </li>
          ))}
        </ul>
      ) : (
        <p>No auctions found.</p>
      )}

      {/* ✅ Display bids if an auction is selected */}
      {selectedAuction && (
        <div className="bids-container">
          <h3>Bids for Auction ID: {selectedAuction}</h3>
          {bids.length > 0 ? (
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
          ) : (
            <p>No bids found for this auction.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AuctionList;
