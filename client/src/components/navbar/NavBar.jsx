import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  const handleHomeClick = () => {
    navigate("/"); // Navigate to home page
    setTimeout(() => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0); // Timeout to allow the navigation to complete first
  };

  const handleInfoClick = () => {
    navigate("/"); // Navigate to home page
    setTimeout(() => {
      const infoSection = document.getElementById("info");
      if (infoSection) {
        infoSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleAboutClick = () => {
    navigate("/"); // Navigate to home page
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div className="navbar-main-container">
      <div className="logo-container">
        <p>Autism Detection</p>
      </div>
      <div className="navbar-links">
        <a onClick={handleHomeClick} className="navbar-link" style={{ cursor: 'pointer' }}>
          Home
        </a>
        <a onClick={handleInfoClick} className="navbar-link" style={{ cursor: 'pointer' }}>
          Info
        </a>
        <a onClick={handleAboutClick} className="navbar-link" style={{ cursor: 'pointer' }}>
          About
        </a>

        {authToken && (
          <Link to="/diagnose/yourself" className="navbar-link">
            Diagnose Yourself
          </Link>
        )}

        {authToken ? (
          <Link onClick={handleLogout} className="navbar-link">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
