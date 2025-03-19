import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiProvider } from "./context/ApiContext"; // ✅ Import API context provider
import { BidProvider } from "./context/BidContext.jsx";
import { AuctionProvider } from "./context/AuctionContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { UserIdProvider } from "./context/UserIdContext";  // Import UserIdProvider


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider> {/* ✅ Ensure UserProvider is the outermost provider */}
      <ApiProvider> {/* ✅ API provider needs access to user token */}
        <AuctionProvider>
          <BidProvider>
          <UserIdProvider>
            <App />
            </UserIdProvider>
          </BidProvider>
        </AuctionProvider>
      </ApiProvider>
    </UserProvider>
  </StrictMode>
);
