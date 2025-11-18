import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await axios.get("http://localhost:5000/cart");
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Cart</h2>

      {cart.map((c) => (
        <div key={c.id} style={{ marginBottom: 20 }}>
          <img src={c.image} width="150" />
          <p>{c.title}</p>
        </div>
      ))}
    </div>
  );
}
