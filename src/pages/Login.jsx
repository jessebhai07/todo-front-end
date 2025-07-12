import React, { useState } from "react";
import API from "../../api"; // Make sure API is properly set up
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/login", formData);
      localStorage.setItem("token", response.data.accessToken);
      toast.success("Login successful");

      setIsLoggedIn(true); // ✅ This updates App state
      navigate("/profile"); // ✅ Navigate after successful login
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="p-4 flex justify-center items-center flex-col min-h-screen">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="mb-4 px-3 py-2 rounded border focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
        <span>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            SignUp
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
