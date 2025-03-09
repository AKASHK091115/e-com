import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faLock } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();

    if (name && password) {
      try {
        const response = await axios.post("http://localhost:3002/login", {
          name,
          password,
        });

        if (response.status === 200) {
          alert(response.data.message);
          onLoginSuccess();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Login failed");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const styles = {
    body: {
      fontFamily: "'Roboto', sans-serif",
    },
    card: {
      borderRadius: "15px",
    },
    button: {
      transition: "background-color 0.3s, color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
      color: "white",
    },
  };

  return (
    <div style={styles.body}>
      <div>
        <Header />
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg rounded" style={styles.card}>
              <div className="card-header text-center text-white" style={{ backgroundColor: "#4CAF50" }}>
                <h4 className="font-weight-bold">Welcome Back!</h4>
                <p className="mb-0">Login to your account</p>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleClick}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faUser } /></span>
                      <input
                        type="text"
                        id="name"
                        className="form-control border-primary"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                      <input
                        type="password"
                        id="password"
                        className="form-control border-primary"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-success w-100 rounded-pill"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = ""}
                  >
                    Login
                  </button>

                  {/* Separator */}
                  <div className="text-center my-3">
                    <span style={{ display: "inline-block", width: "40%", height: "1px", background: "#ddd", marginBottom: "10px" }}></span>
                    <span className="mx-2">or</span>
                    <span style={{ display: "inline-block", width: "40%", height: "1px", background: "#ddd", marginBottom: "10px" }}></span>
                  </div>

                  {/* Register Button */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 rounded-pill mt-3"
                    onClick={handleRegisterRedirect}
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;