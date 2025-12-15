import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Payment = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [paymentType, setPaymentType] = useState("CARD");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const {user} = useSelector(state=>state.auth)

  // 🔹 Load product details (WITH TOKEN)
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(
        `http://localhost:9001/app2/api/product/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
      });
  }, [productId, token, navigate]);

  // 🔹 Proceed to Pay
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9001/app3/api/payment", 
        {
          paymentType,
          totalPrice: product.price,
          email:user?.email,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPaymentResponse(res.data);

    } catch (err) {
      console.error(err);
      setError("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">

        <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        {/* Product Info */}
        {product && (
          <>
            <p className="font-semibold">{product.productName}</p>
            <p className="mb-2">Price: ₹{product.price}</p>

            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>

            <button
              onClick={handlePayment}
              className="bg-green-600 text-white w-full py-2 mt-4 rounded hover:bg-green-700"
            >
              Proceed to Pay
            </button>
          </>
        )}

        {/* Payment Success */}
        {paymentResponse && (
          <div className="mt-4 border rounded p-3 bg-green-50">
            <p><b>Payment ID:</b> {paymentResponse.paymentId}</p>
            <p><b>Product:</b> {paymentResponse.productName}</p>
            <p><b>Amount:</b> ₹{paymentResponse.totalPrice}</p>
            <p><b>Payment Mode:</b> {paymentResponse.paymentType}</p>

            <button
              onClick={() => navigate("/products")}
              className="mt-3 bg-blue-600 text-white w-full py-2 rounded"
            >
              Back to Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
