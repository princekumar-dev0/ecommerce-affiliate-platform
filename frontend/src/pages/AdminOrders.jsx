import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getOrders,
  getOrderItems,
  updateOrderStatus,
  deleteOrder,
   exportOrders,
} from "../services/api";

function AdminOrders() {
const [orders, setOrders] = useState([]);
const [filteredOrders, setFilteredOrders] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

const [selectedItems, setSelectedItems] = useState([]);
const [selectedOrder, setSelectedOrder] = useState(null); // ------------------

const [currentPage, setCurrentPage] = useState(1);
const ordersPerPage = 5;

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
  try {
    const data = await getOrders();
    setOrders(data);
    setFilteredOrders(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
function handleSearch(value) {
  setSearch(value);
  applyFilters(value, statusFilter);
  setCurrentPage(1);
}

function handleStatusFilter(value) {
  setStatusFilter(value);
  applyFilters(search, value);
  setCurrentPage(1);
}

function applyFilters(searchValue, statusValue) {
  let data = [...orders];

  // Search
  if (searchValue.trim() !== "") {
    data = data.filter((order) => {
      return (
        order.user_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.user_email.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }

  // Status Filter
  if (statusValue !== "All") {
    data = data.filter(
      (order) => order.status === statusValue
    );
  }

  setFilteredOrders(data);
}


async function viewItems(orderId) {
  try {
    const data = await getOrderItems(orderId);

    setSelectedItems(data);
    setSelectedOrder(orderId);
  } catch (error) {
    console.error(error);
    alert("Unable to load order items.");
  }
}

async function changeStatus(orderId, status) {
  try {
    const response = await updateOrderStatus(orderId, status);

    if (response.success) {
      alert("Order status updated successfully.");

      loadOrders();

      if (selectedOrder === orderId) {
        viewItems(orderId);
      }

    } else {
      alert(response.message);
    }

  } catch (error) {
    console.error(error);
    alert("Unable to update order status.");
  }
}


async function handleDelete(orderId) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!confirmDelete) return;

  try {
    const response = await deleteOrder(orderId);

    if (response.success) {
      alert("Order deleted successfully.");
      loadOrders();

      if (selectedOrder === orderId) {
        setSelectedOrder(null);
        setSelectedItems([]);
      }
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to delete order.");
  }
}

// Pagination Logic
const lastIndex = currentPage * ordersPerPage;
const firstIndex = lastIndex - ordersPerPage;

const currentOrders = filteredOrders.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Orders
          </h1>

          <button
            onClick={loadOrders}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>

          <button
  onClick={exportOrders}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
>
  Export Excel
</button>
        </div>

<div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="Search by Name, Email or Phone..."
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
    className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <select
    value={statusFilter}
    onChange={(e) => handleStatusFilter(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="All">All Orders</option>
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>

</div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            No orders available.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Order Date</th>
                  <th className="p-3 text-left">Items</th>
                  <th className="p-3 text-left">Update Status</th>
                  <th className="p-3 text-left">Delete</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-semibold">
                      #{order.id}
                    </td>

                    <td className="p-3">
                      {order.user_name}
                    </td>

                    <td className="p-3">
                      {order.user_email}
                    </td>

                    <td className="p-3">
                      {order.phone}
                    </td>

                    <td className="p-3 max-w-xs break-words">
                      {order.address}
                    </td>

                    <td className="p-3 font-semibold text-green-600">
                      ₹{order.total_amount}
                    </td>

                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                        {order.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {order.order_date}
                    </td>

                   <td className="p-3">
  <div className="flex gap-2">

    <button
      onClick={() => viewItems(order.id)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      View Items
    </button>

    <Link
      to={`/admin/order/${order.id}`}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Details
    </Link>

  </div>
</td>

<td className="p-3">
  <select
    value={order.status}
    onChange={(e) =>
      changeStatus(order.id, e.target.value)
    }
    className="border rounded px-3 py-2"
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
  </select>
</td>

<td className="p-3">
  <button
    onClick={() => handleDelete(order.id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    
  >
    Delete
  </button>
</td>

                  </tr>
                ))}
              </tbody>

            </table>

<div className="flex justify-center gap-2 mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2 font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={currentPage === totalPages || totalPages === 0}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
            
            {selectedOrder && (
  <div className="mt-8 bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold mb-4">
      Order #{selectedOrder} Items
    </h2>

    {selectedItems.length === 0 ? (
      <p>No items found.</p>
    ) : (
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Price</th>
          </tr>
        </thead>

        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.product_name}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminOrders;