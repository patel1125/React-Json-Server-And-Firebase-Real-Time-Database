// src/components/Gallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/artworks")
      .then((res) => setArts(res.data))
      .catch((err) => console.log("Error loading artworks:", err));
  }, []);

  const addToCart = async (art) => {
    try {
      await axios.post("http://localhost:5000/cart", art);
      alert("Added to cart!");
    } catch (err) {
      console.log("Cart error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">🎨 Art Gallery</h3>

      <div className="row">
        {arts.map((art) => (
          <div key={art.id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={art.image}
                className="card-img-top"
                alt={art.title}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{art.title}</h5>
                <p className="card-text text-muted">By: {art.artist}</p>

                <button
                  onClick={() => addToCart(art)}
                  className="btn btn-warning"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        {arts.length === 0 && (
          <p className="text-center text-muted mt-5">
            No artworks available right now.
          </p>
        )}
      </div>
    </div>
  );
}
