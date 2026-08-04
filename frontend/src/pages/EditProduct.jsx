import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addActivity } from "../services/api";
import {
  getProductById,
  updateProduct,
} from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
  id: "",
  name: "",
  category: "",
  description: "",
  price: "",
  image: "",
  affiliate_link: "",

  featured: 0,
  today_deal: 0,
  flash_sale: 0,
  best_seller: 0,
});
  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const data = await getProductById(id);

  setProduct({
  id: data.id,
  name: data.name,
  category: data.category,
  description: data.description,
  price: data.price,
  image: data.image,
  affiliate_link: data.affiliate_link,

  featured: Number(data.featured),
  today_deal: Number(data.today_deal),
  flash_sale: Number(data.flash_sale),
  best_seller: Number(data.best_seller),
});

    } catch (error) {
      console.error(error);
      alert("Unable to load product.");
    } finally {
      setLoading(false);
    }
  }

 function handleChange(e) {

  const { name, value, type, checked } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? (checked ? 1 : 0)
        : value,
  }));

}

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await updateProduct(product);

    if (response.success) {

      await addActivity(
  `Updated product: ${product.name}`
);

      alert("Product updated successfully.");
      navigate("/admin/products");
    } else {
      alert(response.message);
    }
  }

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg space-y-5"
      >

    <input
  type="text"
  name="name"
  value={product.name}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  placeholder="Product Name"
  required
/>

<input
  type="text"
  name="category"
  value={product.category}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  placeholder="Category"
  required
/>

<textarea
  name="description"
  value={product.description}
  onChange={handleChange}
  className="w-full border rounded-lg p-3 h-40"
  placeholder="Description"
  required
/>

<input
  type="number"
  name="price"
  value={product.price}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  placeholder="Price"
  required
/>

<input
  type="text"
  name="image"
  value={product.image}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  placeholder="Image URL"
  required
/>

{product.image && (
  <div className="flex justify-center">
    <img
      src={product.image}
      alt={product.name}
      className="w-56 h-56 object-cover rounded-lg shadow"
    />
  </div>
)}

<input
  type="text"
  name="affiliate_link"
  value={product.affiliate_link}
  onChange={handleChange}
  className="w-full border rounded-lg p-3"
  placeholder="Affiliate Link"
  required
/>

<div className="grid grid-cols-2 gap-4">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="featured"
      checked={product.featured === 1}
      onChange={handleChange}
    />

    Featured Product

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="today_deal"
      checked={product.today_deal === 1}
      onChange={handleChange}
    />

    Today's Deal

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="flash_sale"
      checked={product.flash_sale === 1}
      onChange={handleChange}
    />

    Flash Sale

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="best_seller"
      checked={product.best_seller === 1}
      onChange={handleChange}
    />

    Best Seller

  </label>

</div>


        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Update Product
        </button>

        <button
  type="button"
  onClick={() => navigate("/admin/products")}
  className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
>
  Cancel
</button>

      </form>

    </div>
  );
}

export default EditProduct;