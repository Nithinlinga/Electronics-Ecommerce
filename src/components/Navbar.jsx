import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ElectroMart</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/products" className="hover:text-yellow-400">Products</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>

        {/* New buttons */}
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
        <Link to="/register" className="hover:text-yellow-400">Register</Link>
      </div>
    </nav>
  );
}
