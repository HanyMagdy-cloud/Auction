// src/components/RegisterNewUser.jsx
import { useState } from "react";
import { registerUser } from "../../Services/userService"; // ✅ Import service
import "./RegisterNewUser.css"; // ✅ Import CSS for styling

function RegisterNewUser() {
  const [username, setUsername] = useState(""); // Store username input
  const [password, setPassword] = useState(""); // Store password input
  const [message, setMessage] = useState(null); // Store success/error messages

  // ✅ Function to handle user registration
  const handleRegister = async () => {
    if (!username || !password) {
      setMessage("❌ Please enter both username and password.");
      return;
    }

    try {
      await registerUser(username, password); // ✅ Call service function
      setMessage("✅ Registration successful! You can now log in.");
      setUsername(""); // Clear input fields
      setPassword("");
    } catch (error) {
      setMessage("❌ Registration failed. Try a different username.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register New User</h2>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Register Button */}
      <button onClick={handleRegister}>Register</button>

      {/* Display Success/Error Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterNewUser;
