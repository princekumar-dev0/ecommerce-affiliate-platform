import React, { useEffect, useState } from "react";
import { getProductReport } from "../services/api";

function ProductReport() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProductReport();
    setProducts(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Product Report
        </h1>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3">{item.id}</td>

                  <td className="p-3">{item.name}</td>

                  <td className="p-3">{item.category}</td>

                  <td className="p-3">₹{item.price}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ProductReport;