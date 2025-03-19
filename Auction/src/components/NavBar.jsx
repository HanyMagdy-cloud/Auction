import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ Import User Context
import "../styles/NavBar.css"; // ✅ Import styles

function NavBar() {
  const { token } = useUser(); // ✅ Get token from User Context

  return (
    <nav>
      {/* ✅ Always Visible Links */}
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      {/* ✅ Hide Other Links If User is Not Logged In */}
      {token && <Link to="/createAuction">Create Auction</Link>}
      {token && <Link to="/updateAuction">Update Auction</Link>}
      {token && <Link to="/deleteAuction">Delete Auction</Link>}
      {token && <Link to="/placeBid">Place Bid</Link>}
      {token && <Link to="/deleteBid">Delete Bid</Link>}
      {token && <Link to="/getBidsForAuction">Get Bids</Link>}
      {token && <Link to="/searchByItem">Search by Item</Link>}

      {/* ✅ Removed the Search Link */}
    </nav>
  );
}

export default NavBar;
