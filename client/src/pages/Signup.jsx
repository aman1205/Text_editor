import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      if (response) {
        toast.success("Register successful", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error:", error);
    }
  };
  return (
    <div className="signup-page">
      <ToastContainer />
      <div className="form-container">
        <h2>Signup Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="data">
            <label>Name</label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="data">
            <label>Email</label>
            <input
              type="text"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="data">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn">
            <div className="inner"></div>
            <button type="submit">Register</button>
          </div>
          <div className="signup-link">
            Already Registered: <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
