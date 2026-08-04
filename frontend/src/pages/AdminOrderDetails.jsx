import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderItems } from "../services/api";


function AdminOrderDetails() {
  const { id } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const data = await getOrderItems(id);
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">

       <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold">
    Order #{id}
  </h1>

  <button
    onClick={() => window.print()}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
  >
    Print Invoice
  </button>

</div>

<div className="bg-gray-50 rounded-lg p-5 mb-6">

  <h2 className="text-xl font-bold mb-3">
    Customer Information
  </h2>

  <p>
    <strong>Name:</strong> {customer.name}
  </p>

  <p>
    <strong>Email:</strong> {customer.email}
  </p>

  <p>
    <strong>Order Date:</strong> {customer.order_date}
  </p>

</div>

        <table className="min-w-full">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Subtotal</th>
            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr key={item.id} className="border-b">

                <td className="p-3">
                  {item.product_name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.price}
                </td>

                <td className="p-3 font-semibold text-green-600">
                  ₹{item.price * item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-end mt-6">

  <div className="bg-gray-100 p-6 rounded-lg">

    <h2 className="text-2xl font-bold">
      Total:
    </h2>

    <h1 className="text-4xl font-bold text-green-600">
      ₹
      {items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      )}
    </h1>

  </div>

</div>

      </div>

    </div>
  );
}

export default AdminOrderDetails;