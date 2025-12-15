import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProductById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9001/app2/api/product/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [productId]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{product.productName}</h2>

      <p><b>Product ID:</b> {product.productId}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Category:</b> {product.type}</p>
      <p><b>Date:</b> {product.createdAt}</p>

      <button
        onClick={() => navigate(`/payment/${product.productId}`)}
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
