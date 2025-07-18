import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <nav className="flex gap-4 p-4 bg-gray-800 text-white">
        <Link to="/">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/register">SignUp</Link>
            <Link to="/login">SignIn</Link>
          </>
        ) : (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
