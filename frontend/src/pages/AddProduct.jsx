import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  uploadImage,
  addActivity,
} from "../services/api";
import { toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
  name: "",
  category: "",
  description: "",
  price: "",
  affiliate_link: "",
  image: null,

  featured: false,
  today_deal: false,
  flash_sale: false,
  best_seller: false,
});

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);


  
 function handleChange(e) {

  const { name, value, type, checked } = e.target;

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });

}

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      // Upload image
      const uploadResult = await uploadImage(imageFile);

      if (!uploadResult.success) {
        alert(uploadResult.message);
        return;
      }

      // Save product
      const productData = {
        ...formData,
        image: uploadResult.image,
      };

      const result = await addProduct(productData);

      if (result.success) {

         await addActivity(
    `Added product: ${formData.name}`
  );

        alert("✅ Product Added Successfully!");
        navigate("/admin");
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-40"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="affiliate_link"
            placeholder="Amazon Affiliate Link"
            value={formData.affiliate_link}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />


          <div className="grid grid-cols-2 gap-4 mt-6">

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="featured"
      checked={formData.featured}
      onChange={handleChange}
    />

    Featured Product

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="today_deal"
      checked={formData.today_deal}
      onChange={handleChange}
    />

    Today's Deal

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="flash_sale"
      checked={formData.flash_sale}
      onChange={handleChange}
    />

    Flash Sale

  </label>

  <label className="flex items-center gap-2">

    <input
      type="checkbox"
      name="best_seller"
      checked={formData.best_seller}
      onChange={handleChange}
    />

    Best Seller

  </label>

</div>

          <div>
            <label className="block mb-2 font-semibold">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-56 h-56 object-cover rounded-lg shadow"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;