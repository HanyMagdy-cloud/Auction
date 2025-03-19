import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext"; // Import API Context
import "./Login.css";

function Login({ setIsAuthenticated }) {
  const { api, updateToken } = useApi(); // Use API context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("❌ Please enter username and password.");
      return;
    }

    try {
      const response = await api.post(`/Login/login`, null, {
        params: { Username: username, Password: password },
      });

      const token = response.data.token;
      updateToken(token); //  Store token in API Context
      setIsAuthenticated(true); //  Mark user as authenticated
      setMessage("✅ Login successful!");
      //navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ Invalid credentials. Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {message && <p className={message.startsWith("✅") ? "success" : "error"}>{message}</p>}
    </div>
  );
}

export default Login;
