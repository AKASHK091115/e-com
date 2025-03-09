import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the token to the backend
        const response = await axios.post("http://localhost:5000/google", {
          token: tokenResponse.credential, // Pass the token from Google
        });

        if (response.status === 200) {
          alert("Login successful!");
          console.log("Server response:", response.data);
          // Navigate to the dashboard or another page
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        alert("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      alert("Google login failed.");
    },
  });

  return (
    <button
      className="btn btn-danger btn-lg"
      onClick={() => handleGoogleLogin()}
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
