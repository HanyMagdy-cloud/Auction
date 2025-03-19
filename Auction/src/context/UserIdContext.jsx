import { createContext, useContext, useState, useEffect } from "react";

// The JWT parsing function
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT", error);
    return {};
  }
};

// Create UserId Context
const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = parseJwt(token);
        console.log("Decoded Token:", decodedToken);

        // Adjust according to your token structure
        const extractedUserId = decodedToken.unique_name || decodedToken.UserID || decodedToken.userId;
        console.log("Extracted User ID:", extractedUserId);

        setUserId(extractedUserId);
      }
    } catch (error) {
      console.error("Error extracting User ID:", error);
    }
  }, []);

  return (
    <UserIdContext.Provider value={{ userId }}>
      {children}
    </UserIdContext.Provider>
  );
};

// Custom hook to use UserIdContext
export const useUserId = () => useContext(UserIdContext);
