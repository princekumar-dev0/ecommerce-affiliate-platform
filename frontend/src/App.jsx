import React from "react";
import AdminCustomers from "./pages/AdminCustomers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import AdminProducts from "./pages/AdminProducts";

import AdminReports from "./pages/AdminReports";

import AdminOrderDetails from "./pages/AdminOrderDetails";


import { ToastContainer } from "react-toastify";

import AdminSettings from "./pages/AdminSettings";

import Wishlist from "./pages/Wishlist";

import OrderDetails from "./pages/OrderDetails";

import ProductReport from "./pages/ProductReport";


import ActivityLogs from "./pages/ActivityLogs";

import AdminNotifications from "./pages/AdminNotifications";

import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";

import AdminLogin from "./pages/AdminLogin";

import Profile from "./pages/Profile";

import EditProfile from "./pages/EditProfile";

import ChangePassword from "./pages/ChangePassword";

import CategoryProducts from "./pages/CategoryProducts";


import SearchResults from "./pages/SearchResults";


function App() {


  
  return (
    <CartProvider>
      <BrowserRouter>
      

       <Routes>

  {/* ================= USER WEBSITE ================= */}

  <Route element={<UserLayout />}>

    <Route path="/" element={<Home />} />

    <Route
      path="/product/:id"
      element={<ProductDetails />}
    />

    <Route
  path="/category/:category"
  element={<CategoryProducts />}
/>

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/cart"
      element={<Cart />}
    />

    <Route
      path="/checkout"
      element={<Checkout />}
    />

    <Route
      path="/wishlist"
      element={<Wishlist />}
    />

    <Route
      path="/my-orders"
      element={<MyOrders />}
    />

    <Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/edit-profile"
  element={<EditProfile />}
/>

<Route
  path="/change-password"
  element={<ChangePassword />}
/>

<Route
    path="/search"
    element={<SearchResults />}
/>




  </Route>
  <Route
    path="/admin/login"
    element={<AdminLogin />}
/>

  {/* ================= ADMIN PANEL ================= */}

  <Route
    element={
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    }
  >

    <Route
      path="/admin"
      element={<AdminDashboard />}
    />

    <Route
      path="/admin/products"
      element={<AdminProducts />}
    />

    <Route
      path="/admin/add-product"
      element={<AddProduct />}
    />

    <Route
      path="/admin/edit-product/:id"
      element={<EditProduct />}
    />

    <Route
      path="/admin/orders"
      element={<AdminOrders />}
    />

    <Route
      path="/admin/order/:id"
      element={<AdminOrderDetails />}
    />

    <Route
      path="/admin/customers"
      element={<AdminCustomers />}
    />

    <Route
      path="/admin/reports"
      element={<AdminReports />}
    />

    <Route
      path="/admin/product-report"
      element={<ProductReport />}
    />

    <Route
      path="/admin/activity-logs"
      element={<ActivityLogs />}
    />

    <Route
      path="/admin/notifications"
      element={<AdminNotifications />}
    />

    <Route
      path="/admin/settings"
      element={<AdminSettings />}
    />

  </Route>

</Routes>

      

        <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
/>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;