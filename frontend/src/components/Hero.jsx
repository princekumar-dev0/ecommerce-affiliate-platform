import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodayDeals } from "../services/api";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadTodayDeals();
  }, []);

  async function loadTodayDeals() {
    try {
      const data = await getTodayDeals();

      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch (error) {
      console.error(error);
      setSlides([]);
    }
  }

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const exploreMore = () => {
    document
      .getElementById("featured-products")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  if (slides.length === 0) {
    return (
      <section className="h-[500px] flex items-center justify-center bg-gray-200">
        <h1 className="text-3xl font-bold">
          No Today's Deals Available
        </h1>
      </section>
    );
  }

  return (
    <section className="relative h-[500px] overflow-hidden">

      {/* Background Image */}
     <img
  src={slides[current].image}
  alt={slides[current].name}
  className="w-full h-full object-cover"
/>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">

        <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-bold mb-5">
          🔥 TODAY'S DEAL
        </span>

        <h1 className="text-5xl md:text-6xl font-bold">
          {slides[current].name}
        </h1>

        <p className="text-2xl mt-4 font-semibold text-yellow-300">
          ₹{slides[current].price}
        </p>

        {slides[current].description && (
          <p className="mt-4 max-w-2xl text-lg text-gray-200 line-clamp-2">
            {slides[current].description}
          </p>
        )}

        <div className="flex gap-5 mt-8">

          <Link
            to={`/product/${slides[current].id}`}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Shop Now
          </Link>

          <button
            onClick={exploreMore}
            className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Explore More
          </button>

        </div>

      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-12 h-12 rounded-full shadow-lg text-2xl"
      >
        ❮
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-12 h-12 rounded-full shadow-lg text-2xl"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index
                ? "bg-orange-500 scale-125"
                : "bg-white"
            }`}
          />
        ))}

      </div>

    </section>
  );
}

export default Hero;