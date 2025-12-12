import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9001/app2/api/product/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching purchased products");
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Purchased Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No purchased products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{p.name}</h3>
              <p className="text-gray-500">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
