import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>Welcome, {user?.name || "Artist"} 🎨</h2>
        <p className="text-muted">You are now logged in to Artist Hub</p>
        <div className="mt-4">
          <Link to="/profile" className="btn btn-outline-primary me-2">View Profile</Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
