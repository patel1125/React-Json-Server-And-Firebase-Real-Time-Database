import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ArtistDashboard() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [arts, setArts] = useState([]);

  const loadArts = async () => {
    const res = await axios.get("http://localhost:5000/arts");
    setArts(res.data);
  };

  useEffect(() => {
    loadArts();
  }, []);

  const uploadArt = async () => {
    await axios.post("http://localhost:5000/arts", {
      title,
      image
    });
    loadArts();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Artist Dashboard</h2>

      <input placeholder="Art Title" onChange={(e) => setTitle(e.target.value)} />
      <br /><br />

      <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
      <br /><br />

      <button onClick={uploadArt}>Upload Art</button>

      <h3 style={{ marginTop: 40 }}>My Gallery</h3>

      {arts.map((a) => (
        <div key={a.id} style={{ marginBottom: 20 }}>
          <img src={a.image} width="150" />
          <p>{a.title}</p>
        </div>
      ))}
    </div>
  );
}
