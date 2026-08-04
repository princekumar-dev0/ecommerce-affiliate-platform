import React, { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getBestSellerProducts } from "../services/api";



function BestSellers() {
  
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
  loadProducts();
}, []);

async function loadProducts() {
  try {
    const data = await getBestSellerProducts();
    setBestSellers(data);
  } catch (error) {
    console.error(error);
  }
}
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          ⭐ Best Sellers
        </h2>

        <button className="text-orange-500 font-semibold hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {bestSellers.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition duration-300"
          >

            <div className="relative">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                Best Seller
              </span>

              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                <FaHeart className="text-red-500" />
              </button>

            </div>

            <div className="p-4">

              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <div className="flex items-center mt-2">

                <FaStar className="text-yellow-500" />

                <span className="ml-2">
                  {product.rating}
                </span>

                <span className="ml-2 text-gray-500">
                  ({product.reviews})
                </span>

              </div>

              <p className="text-2xl text-orange-500 font-bold mt-3">
                ₹{product.price}
              </p>

              <div className="flex gap-3 mt-5">

                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center"
                >
                  View
                </Link>

                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
                  Buy
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}

export default BestSellers;