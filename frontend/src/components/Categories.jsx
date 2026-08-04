import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaMobileAlt,
  FaTshirt,
  FaGamepad,
  FaHome,
  FaBook,
  FaFootballBall,
  FaCar,
  FaHeartbeat,
  FaUtensils,
  FaAppleAlt,
  FaBaby,
  FaDog,
  FaGift,
  FaCouch,
  FaTv,
  FaMusic,
  FaCamera,
  FaDumbbell,
  FaQuestionCircle,
} from "react-icons/fa";

import { getCategories } from "../services/api";

function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

function getIcon(category) {

  switch (category.toLowerCase()) {

    case "electronics":
      return <FaLaptop size={40} />;

    case "mobile":
    case "mobiles":
    case "smartphones":
      return <FaMobileAlt size={40} />;

    case "fashion":
    case "clothing":
      return <FaTshirt size={40} />;

    case "gaming":
      return <FaGamepad size={40} />;

    case "home":
    case "home decor":
      return <FaHome size={40} />;

    case "books":
      return <FaBook size={40} />;

    case "sports":
      return <FaFootballBall size={40} />;

    case "automobile":
    case "cars":
    case "bike":
      return <FaCar size={40} />;

    case "health":
    case "medical":
      return <FaHeartbeat size={40} />;

    case "kitchen":
      return <FaUtensils size={40} />;

    case "grocery":
    case "food":
      return <FaAppleAlt size={40} />;

    case "baby":
      return <FaBaby size={40} />;

    case "pets":
      return <FaDog size={40} />;

    case "gifts":
      return <FaGift size={40} />;

    case "furniture":
      return <FaCouch size={40} />;

    case "appliances":
      return <FaTv size={40} />;

    case "music":
      return <FaMusic size={40} />;

    case "camera":
    case "photography":
      return <FaCamera size={40} />;

    case "fitness":
      return <FaDumbbell size={40} />;

    default:
      return <FaQuestionCircle size={40} />;
  }

}

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-3xl font-bold mb-8">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((category) => (

          <Link
            key={category}
            to={`/category/${encodeURIComponent(category)}`}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
          >

            <div className="text-orange-500 mb-4">
              {getIcon(category)}
            </div>

            <h3 className="font-semibold text-center">
              {category}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;