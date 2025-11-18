// src/components/Profile.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();
  const u = auth.currentUser || user;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="container-page">
      <div className="card p-4" style={{maxWidth:720, margin:"auto"}}>
        <h3>Profile</h3>
        <p><strong>Name:</strong> {u?.displayName || "—"}</p>
        <p><strong>Email:</strong> {u?.email}</p>
        <div className="mt-3">
          <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
