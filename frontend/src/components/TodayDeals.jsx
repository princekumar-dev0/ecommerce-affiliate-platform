import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodayDeals } from "../services/api";

function TodayDeals() {
  const [todayDeals, setTodayDeals] = useState([]);

  useEffect(() => {
    loadTodayDeals();
  }, []);

  async function loadTodayDeals() {
    try {
      const data = await getTodayDeals();
      setTodayDeals(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          🔥 Today's Deals
        </h2>

        <button className="text-orange-500 font-semibold hover:underline">
          View All
        </button>

      </div>

      {todayDeals.length === 0 ? (

        <div className="text-center text-gray-500 py-10">
          No Today's Deals Available.
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {todayDeals.map((deal) => (

            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition duration-300"
            >

              <div className="relative">

                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  Today's Deal
                </span>

              </div>

              <div className="p-4">

                <h3 className="font-bold text-lg line-clamp-2">
                  {deal.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {deal.category}
                </p>

                <p className="text-2xl font-bold text-orange-500 mt-3">
                  ₹{deal.price}
                </p>

                <Link
                  to={`/product/${deal.id}`}
                  className="block mt-5 bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg"
                >
                  View Deal
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default TodayDeals;