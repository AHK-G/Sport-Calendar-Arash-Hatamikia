import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="link">
            Calendar
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-event" className="link">
            Add Event
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
