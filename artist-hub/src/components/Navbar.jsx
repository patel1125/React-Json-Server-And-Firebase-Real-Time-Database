import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: 15, color: "#fff" }}>Login</Link>
      <Link to="/register" style={{ marginRight: 15, color: "#fff" }}>Register</Link>
           <Link to="/Home" style={{ marginRight: 15, color: "#fff" }}>Home</Link>
      <Link to="/artist" style={{ marginRight: 15, color: "#fff" }}>Artist</Link>
      <Link to="/viewer" style={{ marginRight: 15, color: "#fff" }}>Viewer</Link>
      <Link to="/cart" style={{ marginRight: 15, color: "#fff" }}>Cart</Link>
    </nav>
  );
}
