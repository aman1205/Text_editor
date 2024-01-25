import { useState } from "react";
import { useAuthDispatch } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [userId, setUserId] = useState("");
  // const authDispatch = useAuthDispatch();
  const authDispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: " ",
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
      alert("Login SuccenFul ");
    }
    apiUserId = response.data.userId;
    // Update the user state in the context
    // authDispatch({ type: "login", payload: apiUserId });
    authDispatch(login(apiUserId));
    // Redirect to the /documents route
    navigate("/");
  };

  return (
    <div className="form">
      <div className="login-container">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Not registered? </p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
