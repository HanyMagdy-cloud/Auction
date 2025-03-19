// src/App.jsx
import { useState } from "react";
import AuctionList from "./components/AuctionList";
import SearchById from "./components/SearchById";
import Login from "./components/Login"; // ✅ Ensure default import
import RegisterNewUser from "./components/RegisterNewUser";
import CreateNewAuction from "./components/CreateNewAuction";
import UpdateAuction from "./components/UpdateAuction";
import DeleteAuction from "./components/DeleteAuction"; // Import DeleteAuction
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PlaceBid from './components/PlaceBid';
import DeleteBid from "./components/DeleteBid";
import GetBidsForAuction from "./components/GetBidsForAuction";
import SearchByItem from "./components/SearchByItem";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/search" element={<SearchById isAuthenticated={isAuthenticated} />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/createAuction" element={<CreateNewAuction isAuthenticated={isAuthenticated} />} />
          <Route path="/updateAuction" element={<UpdateAuction isAuthenticated={isAuthenticated} />} />
          <Route path="/deleteAuction" element={<DeleteAuction isAuthenticated={isAuthenticated} />} /> {/* Add DeleteAuction route */}
          <Route path="/placeBid" element={<PlaceBid isAuthenticated={isAuthenticated} />} /> {/* Add PlaceBid route */}
          <Route path="/deleteBid" element={<DeleteBid isAuthenticated={isAuthenticated} />} /> {/* ✅ Add DeleteBid route */}
          <Route path="/getBidsForAuction" element={<GetBidsForAuction isAuthenticated={isAuthenticated} />} />
          <Route path="/searchByItem" element={<SearchByItem isAuthenticated={isAuthenticated} />} /> {/* ✅ New Route */}




        </Routes>
      </div>
    </Router>
  );
}

export default App;