import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setSuccess("Login successful! Redirecting...");
      setError("");
      setTimeout(() => navigate("/browse"), 1500);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
      setSuccess("");
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Enter your email first!");
    try {
      await resetPassword(email);
      alert("Password reset link sent to your email.");
    } catch (err) {
      alert("Reset failed. Please check the email address.");
      console.error("Reset error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Sign In</h2>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="password-group">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" className="toggle-btn" onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <button className="reset-link" onClick={handleResetPassword}>
          Forgot Password?
        </button>
        <p className="hint">Hint: user@example.com / flixwatch</p>
      </div>
    </div>
  );
};

export default Login;
