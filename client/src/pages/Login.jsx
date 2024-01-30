import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const authDispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    let apiUserId = "";
    const response = await axios.post(
      "http://localhost:5000/user/login",
      formData
    );
    if (response.status == 200) {
      alert("Login");
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
    apiUserId = response.data.userId;
    authDispatch(login(apiUserId));
    // Redirect to the /documents route
    setTimeout(()=>{
     navigate("/");
    },2000)
  };

  return (
    <div className="form">
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div className="form-center">
        <div className="form-container">
          <div className="text">Login Form</div>
          <form onSubmit={handleSubmit}>
            <div className="data">
              <label>Email or Phone</label>
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
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit">login</button>
            </div>
            <div className="signup-link">
              Not a member? <Link to="/signup">Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
