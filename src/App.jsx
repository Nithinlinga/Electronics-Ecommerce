import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";

// Import new pages
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Products from "./components/products";
import ProductDetails from "./components/ProductDetails";
import UserProfile from "./components/UserProfile";
import UnauthorizedPage from "./components/UnauthorizedPage";
import NotFound from "./notFound/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddProduct from "./components/Admin/AddProduct";
import RoleRoute from "./routes/RoleRoute";
import Payment from "./components/Payment";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />

        <Route path="/about" element={<div className="p-6">About Us Page</div>} />
        <Route path="/contact" element={<div className="p-6">Contact Page</div>} />
        <Route path="/home" element={<Home />} />

        {/* Added Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute roles={['user', 'admin']} />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute roles={['admin']} />}>
            <Route path="/payment/:productId" element={<Payment />} />
            </Route>
          </Route>

        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute roles={['admin']} />}>
            <Route path="/admin/addProduct" element={<AddProduct />} />
          </Route>

        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router >
  );
}

export default App;
