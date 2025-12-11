import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9001/app1/api/auth/login", {
        email,
        password,
      });

      alert("Login Successful!");

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect to home
      navigate("/home");
    } catch (err) {
      alert("Login Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>

        <form className="flex flex-col space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
