import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../services/api";

function CategoryProducts() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [category]);

  async function loadProducts() {
    try {
      const data = await getProductsByCategory(category);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          {category} Products
        </h1>

        {products.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">
            No products found.
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-xl overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-lg font-bold">
                    {product.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {product.category}
                  </p>

                  <p className="text-orange-500 text-2xl font-bold mt-3">
                    ₹{product.price}
                  </p>

                  <Link
                    to={`/product/${product.id}`}
                    className="block mt-5 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                  >
                    View Product
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CategoryProducts;