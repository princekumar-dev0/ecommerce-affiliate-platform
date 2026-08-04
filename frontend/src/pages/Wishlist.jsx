import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    const email = localStorage.getItem("userEmail");

    if (!email) return;

    try {
      const data = await getWishlist(email);
      setWishlist(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl">
              Your wishlist is empty.
            </h2>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {wishlist.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4"
              >

               <img
  src={product.image}
  alt={product.name}
  className="w-full h-56 object-cover rounded"
  onError={(e) => {
    e.target.src = "https://picsum.photos/300";
  }}
/>

                <h2 className="text-xl font-bold mt-4">
                  {product.name}
                </h2>

                <p className="text-green-600 text-xl font-bold mt-2">
                  ₹{product.price}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  View Product
                </Link>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;