import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9001/app2/api/product/product/${productId}`
      );
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{product.productName}</h2>

      <p><b>Product ID:</b> {product.productId}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Category:</b> {product.type}</p>
      <p><b>Date:</b> {product.createdAt}</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default ProductDetails;
