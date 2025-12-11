import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9001/app2/api/product/all");
      setAllProducts(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyNow = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        All Products
      </h2>

      {/* Grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {allProducts.length === 0 ? (
          <p>No Products Found</p>
        ) : (
          allProducts.map((p) => (
            <div
              key={p.productId}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                background: "#fff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{p.productName}</h3>

              <p><b>Price:</b> ₹{p.price}</p>
              <p><b>Category:</b> {p.type}</p>
              <p><b>Created:</b> {p.createdAt}</p>

              {/* Buy Now Button */}
              <button
                onClick={() => handleBuyNow(p.productId)}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
