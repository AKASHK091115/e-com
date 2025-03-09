import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and has 10 digits
    return phoneRegex.test(phone);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (name && password && mobile) {
      if (!isValidPhoneNumber(mobile)) {
        alert("Please enter a valid mobile number starting with 6, 7, 8, or 9 and having 10 digits.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3002/register", {
          name,
          password,
          mobile,
        });

        if (response.status === 200) {
          alert(response.data.message); // "Registration successful"
          navigate("/"); // Redirect to login after successful registration
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Registration failed");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      className="form-control"
                      placeholder="Enter your number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already registered?
                    <button
                      className="btn btn-link"
                      onClick={() => navigate("/login")} // Navigate to login
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
