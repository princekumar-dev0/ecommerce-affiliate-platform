import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

async function handleSubmit(e) {
  e.preventDefault();

  console.log("Submitting:", formData);

  setLoading(true);

  try {
    const result = await registerUser(formData);

    console.log("Server Response:", result);

    if (result.success) {
      alert(result.message);
      navigate("/login");
    } else {
      alert(result.message);
    }

  } catch (error) {
    console.error("Registration Error:", error);
    alert("Server Error");
  }

  setLoading(false);
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Join ShopHub today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block font-medium mb-2">
              Full Name
            </label>

            <div className="flex items-center border rounded-lg">

              <span className="px-4">
                <FaUser />
              </span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
                required
              />

            </div>

          </div>

          <div>

            <label className="block font-medium mb-2">
              Email
            </label>

            <div className="flex items-center border rounded-lg">

              <span className="px-4">
                <FaEnvelope />
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
                required
              />

            </div>

          </div>

          <div>

            <label className="block font-medium mb-2">
              Password
            </label>

            <div className="flex items-center border rounded-lg">

              <span className="px-4">
                <FaLock />
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-3 outline-none"
                required
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;