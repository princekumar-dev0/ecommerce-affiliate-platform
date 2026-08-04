import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
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
      console.log(result);

      if (result.success) {
        // Login status
        localStorage.setItem("isLoggedIn", "true");

        // Save complete user object
        localStorage.setItem("user", JSON.stringify(result.user));
      
localStorage.setItem("userRole", result.user.role);


        // Save individual values
        localStorage.setItem(
          "userId",
          result.user.id
        );

        localStorage.setItem(
          "userName",
          result.user.name
        );

        localStorage.setItem(
          "userEmail",
          result.user.email
        );

        alert("✅ Login Successful!");

        // Redirect
       if (result.user.role === "admin") {
    localStorage.setItem("adminLoggedIn", "true");
    navigate("/admin");
} else {
    navigate("/");
}
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;