import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Payment = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [paymentType, setPaymentType] = useState("CARD");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState("");

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const token = localStorage.getItem("token");

  // Load product details
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:9001/app2/api/product/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product"));
  }, [productId, token, navigate]);

  // Handle input changes
  // Handle input changes with formatting
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === "expiry") {
      // Remove non-digits
      value = value.replace(/\D/g, "");
      // Limit to 4 digits (MMYY)
      if (value.length > 4) value = value.slice(0, 4);
      // Auto-insert slash after 2 digits
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    if (name === "cvc") {
      // Only digits, max 3
      value = value.replace(/\D/g, "").slice(0, 3);
    }

    if (name === "number") {
      // Optional: restrict to digits only
      value = value.replace(/\D/g, "");
    }

    setCard((prev) => ({ ...prev, [name]: value }));
  };


  const handleInputFocus = (e) => {
    setCard((prev) => ({ ...prev, focus: e.target.name }));
  };

  // Proceed to Pay
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9001/app3/api/payment",
        {
          paymentType,
          totalPrice: product.price,
          email: user?.email,
          productId,
          cardDetails: card, // optional: send card details if backend needs
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPaymentResponse(res.data);
    } catch {
      setError("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Payment</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        {product && !paymentResponse && (
          <>
            <p className="font-semibold">{product.productName}</p>
            <p className="mb-2">Price: ₹{product.price}</p>

            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>

            {paymentType === "CARD" && (
              <div className="mb-4">
                <Cards
                  number={card.number}
                  expiry={card.expiry}
                  cvc={card.cvc}
                  name={card.name}
                  focused={card.focus}
                />
                <form className="mt-3 space-y-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={card.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    value={card.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    value={card.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="border p-2 rounded w-full"
                  />

                </form>
              </div>
            )}

            <button
              onClick={handlePayment}
              className="bg-green-600 text-white w-full py-2 mt-4 rounded hover:bg-green-700"
            >
              Proceed to Pay
            </button>
          </>
        )}

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
