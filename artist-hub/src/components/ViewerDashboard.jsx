import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewerDashboard() {
  const [arts, setArts] = useState([]);

  const loadArts = async () => {
    const res = await axios.get("http://localhost:5000/arts");
    setArts(res.data);
  };

  useEffect(() => {
    loadArts();
  }, []);

  const addToCart = async (art) => {
    await axios.post("http://localhost:5000/cart", art);
    alert("Added to Cart!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>View Art</h2>

      {arts.map((a) => (
        <div key={a.id} style={{ marginBottom: 20 }}>
          <img src={a.image} width="150" />
          <p>{a.title}</p>
          <button onClick={() => addToCart(a)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
