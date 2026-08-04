import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFlashSaleProducts } from "../services/api";

function FlashSale() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadFlashSale();
  }, []);

  async function loadFlashSale() {
    try {
      const data = await getFlashSaleProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          ⚡ Flash Sale
        </h2>

        <button className="text-orange-500 font-semibold hover:underline">
          View All
        </button>

      </div>

      {products.length === 0 ? (

        <div className="text-center text-gray-500 py-10">
          No Flash Sale Products Available.
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

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

                <span className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  Flash Sale
                </span>

              </div>

              <div className="p-4">

                <h3 className="font-bold text-lg line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {product.category}
                </p>

                <p className="text-2xl font-bold text-orange-500 mt-3">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="block mt-5 bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default FlashSale;