import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";

// Import new pages
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Products from "./components/products";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:productId" element={<ProductDetails/>} />

        <Route path="/about" element={<div className="p-6">About Us Page</div>} />
        <Route path="/contact" element={<div className="p-6">Contact Page</div>} />
        <Route path="/home" element={<Home />}/>

        {/* Added Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
