import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Your Cart is Empty
        </h1>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-6">

        {cart.map((item) => (

          <div
            key={item.id}
            className="bg-white shadow rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg"
            />

            <div className="flex-1">

              <h2 className="text-2xl font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.category}
              </p>

              <h3 className="text-orange-500 text-2xl font-bold mt-3">
                ₹{item.price}
              </h3>

            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                -
              </button>

              <span className="font-bold text-xl">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                +
              </button>

            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      <div className="bg-white shadow rounded-xl p-6 mt-10">

        <h2 className="text-3xl font-bold">
          Total: ₹{Number(totalPrice).toFixed(2)}
        </h2>

        <div className="flex gap-4 mt-6 flex-wrap">

          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;