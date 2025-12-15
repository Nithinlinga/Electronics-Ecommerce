import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const{user}=useSelector(state=>state.auth);

  const fetchPaymentHistory = async () => {
    try {
      
      const token = localStorage.getItem("token"); // if you are using JWT

      const res = await axios.get(
        "http://localhost:9001/app3/api/payment/get/payments",
        {
          params: { email:user?.email },
          headers: {
            "X-Role": "USER",
            Authorization: `Bearer ${token}`, // safe even if backend ignores it
          },
        }
      );

      setPayments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">
          No payment history found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Payment ID</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Payment Type</th>
                <th className="p-3 border">Total Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.paymentId}
                  className="text-center hover:bg-gray-50"
                >
                  <td className="p-3 border">{payment.paymentId}</td>
                  <td className="p-3 border">{payment.productName}</td>
                  <td className="p-3 border">{payment.paymentType}</td>
                  <td className="p-3 border font-semibold">
                    ₹{payment.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
