import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<div className="p-6">Products Page</div>} />
        <Route path="/about" element={<div className="p-6">About Us Page</div>} />
        <Route path="/contact" element={<div className="p-6">Contact Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;