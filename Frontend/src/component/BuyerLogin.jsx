import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BuyerLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    alert(`Logged in as Buyer: ${formData.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-[Poppins]">
      <div className="bg-gray-50 border border-gray-200 shadow-md rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Buyer Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 mt-3 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Log In
          </button>

          {/* Links */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <a href="/buyer-forgot-password" className="text-green-600 hover:underline">
              Forgot Password?
            </a>
            <Link
            className='text-green-600 hover:underline'
            to='/buyer/register'
            >
            Register Now
            </Link>
            {/* <a href="/buyer-register" className="text-green-600 hover:underline">
              Register Now
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
}