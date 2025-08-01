import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth"; // 👉 added
import { auth, googleProvider } from "../firebase"; // 👉 added
import "./Signup.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      setSuccess("Signup successful! Redirecting to Browse...");
      setError("");
      setTimeout(() => navigate("/browse"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
      setSuccess("");
    }
  };

  // 👉 Google Sign-In handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Logged in with Google:", user.displayName);
      navigate("/browse");
    } catch (err) {
      console.error("Google Login Failed", err);
      setError("Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create your account</h2>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-group">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="toggle-btn" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit">Sign Up</button>

        {/* 👉 Google Sign-In Button */}
        <button type="button" onClick={handleGoogleLogin} className="google-btn">
          Sign Up with Google
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
