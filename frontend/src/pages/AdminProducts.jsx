import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../services/api";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
const [categories, setCategories] = useState([]);

const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 5;

const [sortBy, setSortBy] = useState("latest");




  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getAllProducts();
     setProducts(data);
setFilteredProducts(data);

const uniqueCategories = [
  "All",
  ...new Set(data.map((product) => product.category)),
];

setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

function handleSearch(value) {
  setSearch(value);
  applyFilters(value, categoryFilter);
  setCurrentPage(1);
}

function applyFilters(searchValue, categoryValue) {
  let data = [...products];

  if (searchValue.trim() !== "") {
    data = data.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  if (categoryValue !== "All") {
    data = data.filter(
      (product) => product.category === categoryValue
    );
  }

  setFilteredProducts(data);
}

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;

    const result = await deleteProduct(id);

    if (result.success) {
      alert("Product deleted successfully.");
      loadProducts();
    } else {
      alert(result.message);
    }
  }

function handleCategoryFilter(value) {
  setCategoryFilter(value);
  applyFilters(search, value);
  setCurrentPage(1);
}
const lastIndex = currentPage * productsPerPage;
const firstIndex = lastIndex - productsPerPage;

const currentProducts = filteredProducts.slice(
  firstIndex,
  lastIndex
);

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);


function handleSearch(value) {
  setSearch(value);

  const filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );
  });

  setFilteredProducts(filtered);
  setCurrentPage(1);
}

function handleSort(value) {
  setSortBy(value);

  let data = [...filteredProducts];

  switch (value) {
    case "priceLow":
      data.sort((a, b) => Number(a.price) - Number(b.price));
      break;

    case "priceHigh":
      data.sort((a, b) => Number(b.price) - Number(a.price));
      break;

    case "nameAZ":
      data.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "nameZA":
      data.sort((a, b) => b.name.localeCompare(a.name));
      break;

    case "oldest":
      data.sort((a, b) => a.id - b.id);
      break;

    default:
      data.sort((a, b) => b.id - a.id);
  }

  setFilteredProducts(data);
}




  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Manage Products
          </h1>

          <button
            onClick={loadProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Refresh
          </button>

        </div>

     <div className="flex flex-col md:flex-row gap-4 mb-6">

  <input
    type="text"
    placeholder="Search Product..."
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
    className="w-full md:w-96 border rounded-lg px-4 py-2"
  />

  

  <select
    value={categoryFilter}
    onChange={(e) => handleCategoryFilter(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>

</div>


<div className="flex flex-col md:flex-row gap-4 mb-6">

    
{/* Search Box */}
<div className="mb-6">
  <input
    type="text"
    placeholder="Search by Product Name or Category..."
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
    className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

<select
  value={sortBy}
  onChange={(e) => handleSort(e.target.value)}
  className="border rounded-lg px-4 py-2"
>
  <option value="latest">Latest</option>
  <option value="oldest">Oldest</option>
  <option value="priceLow">Price: Low to High</option>
  <option value="priceHigh">Price: High to Low</option>
  <option value="nameAZ">Name: A-Z</option>
  <option value="nameZA">Name: Z-A</option>
</select>
</div>
        {loading ? (

          <div className="bg-white rounded-lg shadow p-8 text-center">
            Loading products...
          </div>

        ) : (

          <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-gray-200">

                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Image</th>
                 <th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Last Updated</th>
                 <th className="p-3 text-left">Actions</th>
                </tr>

              </thead>

              <tbody>

                {currentProducts.map((product) => (

                  <tr key={product.id} className="border-b">

                    <td className="p-3">
                      {product.id}
                    </td>

                    <td className="p-3">

                     <img
  src={product.image}
  alt={product.name}
  className="w-20 h-20 object-cover rounded-lg shadow"
/>

                    </td>

                    <td className="p-3">
                      {product.name}
                    </td>

                    <td className="p-3">
  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
    {product.category}
  </span>
</td>

                    <td className="p-3 font-bold text-green-600">
  ₹{Number(product.price).toFixed(2)}
</td>

<td className="px-4 py-3">
  {new Date(product.updated_at).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</td>

                   <td className="p-3">
  <div className="flex gap-2">

    <Link
      to={`/admin/edit-product/${product.id}`}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Edit
    </Link>

    <button
      onClick={() => handleDelete(product.id)}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Delete
    </button>

  </div>
</td>

                  </tr>

                ))}

              </tbody>

            </table>
            <div className="flex justify-center items-center gap-3 mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={
      currentPage === totalPages || totalPages === 0
    }
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>


<div className="flex justify-center gap-3 mt-6 mb-4">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2 font-semibold">
    Page {currentPage} of {totalPages || 1}
  </span>

  <button
    disabled={
      currentPage === totalPages || totalPages === 0
    }
    onClick={() => setCurrentPage(currentPage + 1)}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>


</div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminProducts;