import React, { useState } from "react";
import axios from "axios";

export default function ArtUpload({ onUpload }) {
  const [form, setForm] = useState({ title: "", image: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/artworks", { ...form, artist: user.name });
    setForm({ title: "", image: "" });
    onUpload();
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input className="form-control mb-2" placeholder="Artwork Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="form-control mb-2" placeholder="Image URL" onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <button className="btn btn-success">Upload</button>
    </form>
  );
}
