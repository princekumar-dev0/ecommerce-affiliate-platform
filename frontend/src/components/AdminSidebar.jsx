import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">

      <div className="text-3xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex flex-col">

        <Link
          to="/admin"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Products
        </Link>

        <Link
          to="/admin/add-product"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Add Product
        </Link>

        <Link
          to="/admin/orders"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Orders
        </Link>

        <Link
          to="/admin/customers"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Customers
        </Link>

        <Link
          to="/admin/reports"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Reports
        </Link>

        <Link
          to="/admin/activity-logs"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Activity Logs
        </Link>

        <Link
          to="/admin/notifications"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Notifications
        </Link>

        <Link
          to="/admin/settings"
          className="px-6 py-4 hover:bg-gray-800"
        >
          Settings
        </Link>

      </nav>

    </div>
  );
}

export default AdminSidebar;