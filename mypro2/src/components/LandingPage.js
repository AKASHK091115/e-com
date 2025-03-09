import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";  // Import GoogleLogin component

const LandingPage = ({onLoginSuccess}) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    try {
      const token = response.credential;  // Get the token from the response
      const res = await fetch("http://localhost:3002/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),  // Send token to the server for verification
      });
      const data = await res.json();
      if (res.ok) {
        alert("Google login successful");
        onLoginSuccess();
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Error during Google login");
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 text-white"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Animation */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          zIndex: 0,
          background: `radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 70%)`,
          backgroundSize: "200% 200%",
          animation: "pulse 6s infinite alternate",
        }}
      ></div>

      {/* Heading */}
      <motion.h1
        className="text-center fw-bold mb-4"
        style={{ zIndex: 1, fontSize: "3.5rem", letterSpacing: "2px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to AK Enterprises
      </motion.h1>
      <motion.p
        className="text-center mb-5 fs-5"
        style={{ zIndex: 1, maxWidth: "600px", lineHeight: "1.5" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Your Trusted Partner in Excellence. Unlock amazing products and
        services tailored for you.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="d-grid gap-3 w-100"
        style={{ maxWidth: "400px", zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.button
          className="btn btn-danger btn-lg"
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.1 }}
        >
          Continue with Phone Number
        </motion.button>
        <GoogleLogin
        onSuccess={handleGoogleLogin}  // Handle success
  onError={() => alert("Google Login failed")}  // Handle error
  render={(renderProps) => (
    <button
      className="btn btn-danger btn-lg"
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}  // Disable the button when it's waiting for Google login
    >
      Continue with Google
    </button>
  )}
/>
        <motion.button
          className="btn btn-warning btn-lg"
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.1 }}
        >
          Login
        </motion.button>
        <motion.button
          className="btn btn-success btn-lg"
          onClick={() => navigate("/register")}
          whileHover={{ scale: 1.1 }}
        >
          Sign Up
        </motion.button>
      </motion.div>

      {/* Floating Icons or Shapes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "50px",
          height: "50px",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          animation: "float 6s infinite ease-in-out",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "75px",
          height: "75px",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "50%",
          animation: "float 8s infinite ease-in-out",
        }}
      ></div>

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes pulse {
            from {
              background-position: 0% 0%;
            }
            to {
              background-position: 100% 100%;
            }
          }
          @keyframes float {
            from {
              transform: translateY(0px);
            }
            to {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
