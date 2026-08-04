import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/api";
import SalesChart from "../components/SalesChart";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    recentOrders: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* Dashboard Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">Total Orders</h3>
            <h2 className="text-3xl font-bold">
              {stats.totalOrders}
            </h2>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">Revenue</h3>
            <h2 className="text-3xl font-bold text-green-600">
              ₹{stats.totalRevenue}
            </h2>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">Customers</h3>
            <h2 className="text-3xl font-bold">
              {stats.totalCustomers}
            </h2>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500">Pending Orders</h3>
            <h2 className="text-3xl font-bold text-red-600">
              {stats.pendingOrders}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <Link
            to="/admin/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-8 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Add Product
            </h2>

            <p className="mt-3">
              Add a new product to your store.
            </p>
          </Link>

          <Link
            to="/admin/products"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-8 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Manage Products
            </h2>

            <p className="mt-3">
              View, edit and delete products.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-8 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Orders
            </h2>

            <p className="mt-3">
              Manage customer orders.
            </p>
          </Link>

          <Link
            to="/admin/customers"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-8 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Customers
            </h2>

            <p className="mt-3">
              View registered customers.
            </p>
          </Link>

          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-8 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold">
              Back to Store
            </h2>

            <p className="mt-3">
              Return to homepage.
            </p>
          </Link>

          <Link
  to="/admin/reports"
  className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl p-8 transition shadow-lg"
>
  <h2 className="text-2xl font-bold">
    Sales Reports
  </h2>

  <p className="mt-3">
    View monthly sales and revenue.
  </p>
</Link>


<Link
  to="/admin/settings"
  className="bg-gray-700 hover:bg-gray-800 text-white rounded-xl p-8 transition shadow-lg"
>
  <h2 className="text-2xl font-bold">
    Settings
  </h2>

  <p className="mt-3">
    Manage store settings.
  </p>
</Link>

      <Link
  to="/admin/product-report"
  className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl p-8 transition shadow-lg"
>
  <h2 className="text-2xl font-bold">
    Product Report
  </h2>

  <p className="mt-3">
    View all products with category and price.
  </p>
</Link>

<Link
  to="/admin/activity-logs"
  className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl p-8 shadow-lg transition"
>
  <h2 className="text-2xl font-bold">
    Activity Logs
  </h2>

  <p className="mt-3">
    View all admin activities.
  </p>
</Link>

<Link
  to="/admin/notifications"
  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-8 shadow-lg transition"
>
  <h2 className="text-2xl font-bold">
    Notifications
  </h2>

  <p className="mt-3">
    View latest admin notifications.
  </p>
</Link>

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          {stats.recentOrders?.length === 0 ? (

            <p className="text-gray-500">
              No recent orders found.
            </p>

          ) : (

            <table className="min-w-full">

              <thead className="bg-gray-200">

                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                </tr>

              </thead>

              <tbody>

                {stats.recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      #{order.id}
                    </td>

                    <td className="p-3">
                      {order.user_name}
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      ₹{order.total_amount}
                    </td>

                    <td className="p-3">
                      {order.status}
                    </td>

                    <td className="p-3">
                      {order.order_date}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

          <SalesChart />

      </div>

    </div>
  );
}

export default AdminDashboard;