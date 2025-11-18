import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ArtistDashboard from "./components/ArtistDashboard";
import ViewerDashboard from "./components/ViewerDashboard";
import Cart from "./components/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/" element={<Home />} />
      <Route path="/artist" element={<ArtistDashboard />} />
      <Route path="/viewer" element={<ViewerDashboard />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
