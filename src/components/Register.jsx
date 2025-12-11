import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    phoneNo: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9001/app1/api/auth/register", form);
      alert("Registered Successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />
        <input
          name="phoneNo"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
