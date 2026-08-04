import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("userRole");

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  if (role !== "admin") {
    alert("Access Denied!");

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;