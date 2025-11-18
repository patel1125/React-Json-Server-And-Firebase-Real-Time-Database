// src/components/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-page text-center">
      <h1 className="mb-3">🎨 Welcome to Artist Hub</h1>
      <p className="lead mb-4">
        Showcase, discover and buy local art. Login to upload or browse the gallery.
      </p>

      <div>
        {/* Changed as you requested */}
        <button 
          onClick={() => navigate("/login")}
          className="btn btn-primary me-2"
        >
          Get Started
        </button>

        <Link to="/viewer" className="btn btn-outline-dark">
          View Gallery
        </Link>
      </div>
    </div>
  );
}
