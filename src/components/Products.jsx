import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>

      {allProducts.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <div>
          {allProducts.map((p) => (
            <div
              key={p.productId}
              style={{
                border: "1px solid gray",
                padding: "12px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <h3>{p.productName}</h3>
              <p><b>Product ID:</b> {p.productId}</p>
              <p><b>Auth ID:</b> {p.authId}</p>
              <p><b>Type:</b> {p.type}</p>
              <p><b>Price:</b> ₹{p.price}</p>
              <p><b>Created At:</b> {p.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
