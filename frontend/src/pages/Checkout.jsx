import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    address: "",
    phone: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

   const orderData = {

  user_name: formData.user_name,

  user_email: formData.user_email,

  phone: formData.phone,

  address: formData.address,

  total_amount: totalPrice,

  items: cart

};

    try {
      const result = await placeOrder(orderData);

      if (result.success) {
        alert("✅ Order placed successfully!");

        clearCart();

        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-5"
      >

        <input
          type="text"
          name="user_name"
          placeholder="Full Name"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 h-32"
          required
        />

        <div className="text-2xl font-bold">
          Total: ₹{Number(totalPrice).toFixed(2)}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;