import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "../services/api";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [wishlisted, setWishlisted] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    loadWishlistStatus();
  }, []);

  async function loadWishlistStatus() {
    if (!userEmail) return;

    try {
      const result = await checkWishlist(
        userEmail,
        product.id
      );

      setWishlisted(result.exists);

    } catch (error) {
      console.error(error);
    }
  }

  function handleAddToCart() {
    addToCart(product);
    toast.success("Product added to cart");
  }

  async function handleWishlist() {

    if (!userEmail) {
      toast.error("Please login first.");
      return;
    }

    try {

      if (wishlisted) {

        const result = await removeFromWishlist(
          userEmail,
          product.id
        );

        if (result.success) {

          setWishlisted(false);

          toast.success("Removed from wishlist");

        }

      } else {

        const result = await addToWishlist(
          userEmail,
          product.id
        );

        if (result.success) {

          setWishlisted(true);

          toast.success("Added to wishlist");

        } else {

          toast.error(result.message);

        }

      }

    } catch (error) {

      console.error(error);

    }

  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <div className="relative">

        <Link to={`/product/${product.id}`}>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover"
          />

        </Link>

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
        >

          <Heart
            size={22}
            fill={wishlisted ? "red" : "none"}
            color={wishlisted ? "red" : "black"}
          />

        </button>

      </div>

      <div className="p-4">

        <h2 className="text-lg font-semibold line-clamp-2">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {product.category}
        </p>

        <div className="flex items-center mt-2">

          <span className="text-yellow-500">
            ⭐⭐⭐⭐☆
          </span>

          <span className="ml-2 text-sm text-gray-500">
            (120 Reviews)
          </span>

        </div>

        <h3 className="text-2xl font-bold text-orange-500 mt-3">
          ₹{product.price}
        </h3>

        <div className="flex gap-3 mt-5">

          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
          >
            View Details
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;