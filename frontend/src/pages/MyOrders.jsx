import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    try {
      const data = await getMyOrders(user.email);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">
          No Orders Found
        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-6"
            >

              <h2 className="text-xl font-bold">
                Order #{order.id}
              </h2>

              <p className="mt-2">
                <strong>Total:</strong> ₹{order.total_amount}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <p>
                <strong>Date:</strong> {order.order_date}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyOrders;