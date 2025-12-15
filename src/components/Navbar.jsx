import toast from "react-hot-toast";
import { IoMdPower } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../store/AuthSlice';

export default function Navbar() {
  const {isAuthenticated}=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate=useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    
    dispatch(logout());
    toast.success("Logout Success");
    navigate("/");
    // setMenuOpen(false);
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ElectroMart</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/products" className="hover:text-yellow-400">Products</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
       {isAuthenticated && <Link to="/admin/addProduct" className="hover:text-yellow-400">AddProduct</Link>}
       {isAuthenticated && <Link to="/payment/history" className="hover:text-yellow-400">PaymentHistory</Link>}

        {/* New buttons */}
        {!isAuthenticated && 
        <Link to="/login" className="hover:text-yellow-400">Login</Link>} 
         {!isAuthenticated && 
        <Link to="/register" className="hover:text-yellow-400">Register</Link>}

        {isAuthenticated && 
                    <button
              onClick={handleLogout}
              className="inline-flex items-center cursor-pointer gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <IoMdPower size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
        }

      </div>
    </nav>
  );
}
