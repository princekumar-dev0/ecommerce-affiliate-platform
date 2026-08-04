import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    setLoading(true);

    try {
      const result = await loginUser(formData);

      if (!result.success) {
        alert(result.message);
        setLoading(false);
        return;
      }

      // Allow only admins
      if (result.user.role !== "admin") {
        alert("❌ Access Denied! You are not an administrator.");
        setLoading(false);
        return;
      }

      // Save admin session
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("userEmail", result.user.email);
      localStorage.setItem("userRole", result.user.role);
      localStorage.setItem("isLoggedIn", "true");

      alert("✅ Welcome Admin!");

      navigate("/admin");

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Logging In..." : "Admin Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;