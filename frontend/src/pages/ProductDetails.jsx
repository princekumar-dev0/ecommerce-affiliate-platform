import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProduct,
  addToWishlist,
  getReviews,
  addReview,
} from "../services/api";




function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState([]);

const [reviewData, setReviewData] = useState({
  user_name: "",
  rating: 5,
  review: "",
});


 useEffect(() => {
  loadProduct();
  loadReviews();
}, [id]);

  async function loadProduct() {
    try {
      const data = await getProduct(id);

      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  }

  async function loadReviews() {
  try {
    const data = await getReviews(id);
    setReviews(data);
  } catch (error) {
    console.error(error);
  }
}

function handleReviewChange(e) {
  setReviewData({
    ...reviewData,
    [e.target.name]: e.target.value,
  });
}

async function submitReview(e) {
  e.preventDefault();

  const result = await addReview({
    product_id: id,
    ...reviewData,
  });

  alert(result.message);

  if (result.success) {
    setReviewData({
      user_name: "",
      rating: 5,
      review: "",
    });

    loadReviews();
  }
}

async function handleWishlist() {
  // Check login
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("Please login first.");
    return;
  }

  try {
    const result = await addToWishlist({
      user_email: email,
      product_id: Number(product.id),
    });

    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message || "Failed to add to wishlist.");
    }

  } catch (error) {
    console.error("Wishlist Error:", error);
    alert("Server error while adding to wishlist.");
  }
}
  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading Product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-lg w-full"
          />
        </div>

        <div>

          <p className="text-gray-500">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <div className="text-yellow-500 text-xl mt-4">
            ⭐⭐⭐⭐☆
          </div>

          <h2 className="text-3xl text-orange-500 font-bold mt-5">
            ₹{product.price}
          </h2>

          <p className="mt-6 text-gray-700 leading-7">
            {product.description}
          </p>

          <a
            href={product.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg"
          >
            Buy on Amazon
          </a>

   <button
  onClick={handleWishlist}
  className="bg-pink-600 text-white px-8 py-3 rounded-lg"
>
  ❤️ Add to Wishlist
</button>

        </div>

      </div>
      
      <div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    Customer Reviews
  </h2>

  <form
    onSubmit={submitReview}
    className="bg-gray-100 p-6 rounded-lg space-y-4"
  >

    <input
      type="text"
      name="user_name"
      placeholder="Your Name"
      value={reviewData.user_name}
      onChange={handleReviewChange}
      className="w-full border p-3 rounded"
      required
    />

    <select
      name="rating"
      value={reviewData.rating}
      onChange={handleReviewChange}
      className="w-full border p-3 rounded"
    >
      <option value="5">⭐⭐⭐⭐⭐</option>
      <option value="4">⭐⭐⭐⭐</option>
      <option value="3">⭐⭐⭐</option>
      <option value="2">⭐⭐</option>
      <option value="1">⭐</option>
    </select>

    <textarea
      name="review"
      placeholder="Write your review..."
      value={reviewData.review}
      onChange={handleReviewChange}
      className="w-full border p-3 rounded h-32"
      required
    />

    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
    >
      Submit Review
    </button>

  </form>

</div>

<div className="mt-10">

  {reviews.length === 0 ? (

    <p>No reviews yet.</p>

  ) : (

    reviews.map((item) => (

      <div
        key={item.id}
        className="bg-white shadow rounded-lg p-5 mb-4"
      >

        <h3 className="font-bold text-lg">
          {item.user_name}
        </h3>

        <p className="text-yellow-500">
          {"⭐".repeat(Number(item.rating))}
        </p>

        <p className="mt-2">
          {item.review}
        </p>

        <p className="text-sm text-gray-500 mt-3">
          {item.created_at}
        </p>

      </div>

    ))

  )}

</div>

    </div>
  );
}

export default ProductDetails;