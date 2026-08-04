import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderDetails } from "../services/api";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const data = await getOrderDetails(id);
      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading Order...
      </h1>
    );
  }

  if (!order) {
    return (
      <h1 className="text-center text-red-600 mt-20">
        Order not found.
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">

        <p><strong>Order ID:</strong> {order.id}</p>

        <p><strong>Customer:</strong> {order.user_name}</p>

        <p><strong>Email:</strong> {order.user_email}</p>

        <p><strong>Phone:</strong> {order.phone}</p>

        <p><strong>Address:</strong> {order.address}</p>

        <p><strong>Total:</strong> ₹{order.total_amount}</p>

        <p><strong>Status:</strong> {order.status}</p>

        <p><strong>Date:</strong> {order.order_date}</p>

      </div>

      <Link
        to="/admin/orders"
        className="inline-block mt-8 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
      >
        Back to Orders
      </Link>

    </div>
  );
}

export default OrderDetails;