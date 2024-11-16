import React, { useState } from "react";
import { FaFootballBall } from "react-icons/fa";
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
  // State to toggle the menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Football icon with onClick toggle */}
      <div className="navbar-logo" onClick={toggleMenu}>
        <FaFootballBall />
      </div>
      {/* Navigation menu, displayed based on the isOpen state */}
      <ul className={`navbar_search_opts ${isOpen ? "active" : ""}`}>
        <li><Link to="/homepage" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/season" onClick={closeMenu}>Season</Link></li>
        <li><Link to="/team" onClick={closeMenu}>Team</Link></li>
        <li><Link to="/player" onClick={closeMenu}>Player</Link></li>
        <li><Link to="/position" onClick={closeMenu}>Position</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
