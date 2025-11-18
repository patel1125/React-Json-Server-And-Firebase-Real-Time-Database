import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    await axios.post("http://localhost:5000/users", form);
    alert("Register Success!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br /><br />

      <select name="role" onChange={handleChange}>
        <option value="artist">Artist</option>
        <option value="viewer">Viewer</option>
      </select>
      <br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
