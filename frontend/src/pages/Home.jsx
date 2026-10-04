import React, { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TodayDeals from "../components/TodayDeals";
import FlashSale from "../components/FlashSale";
import BestSellers from "../components/BestSellers";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../services/api";


import background from "../assets/background.jpg";


function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
      setCurrentPage(1);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSearch(e) {
    const value = e.target.value;

    setSearch(value);

    try {

      if (value.trim() === "") {

        if (selectedCategory === "All") {
          loadProducts();
        } else {
          handleCategory(selectedCategory);
        }

      } else {

        const data = await searchProducts(value);

        setProducts(data);
        setCurrentPage(1);

      }

    } catch (error) {
      console.error(error);
    }
  }

  async function handleCategory(category) {

    setSelectedCategory(category);

    try {

      setLoading(true);

      if (category === "All") {

        loadProducts();

      } else {

        const data = await getProductsByCategory(category);

        setProducts(data);
        setCurrentPage(1);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = products.slice(firstIndex, lastIndex);

  function paginate(pageNumber) {

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  return (
   <div
  className="min-h-screen bg-fixed bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.62), rgba(255,255,255,0.1)), url(${background})`,
  }}
>

      {/* Hero Slider */}
      <Hero />

      {/* Dynamic Categories */}
      <Categories />

      {/* Today's Deals */}
      <TodayDeals />

      {/* Flash Sale */}
      <FlashSale />

      {/* Best Sellers */}
      <BestSellers />

      {/* Featured Products */}
      <section
        id="featured-products"
        className="max-w-7xl mx-auto px-6 py-12"
      >

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8">

          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <input
            type="text"
            placeholder="Search Featured Products..."
            value={search}
            onChange={handleSearch}
            className="border rounded-lg px-4 py-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Category Filter */}

        <div className="flex flex-wrap gap-3 mb-8">

          <button
            onClick={() => handleCategory("All")}
            className={`px-5 py-2 rounded-lg transition ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-5 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {loading ? (

          <h2 className="text-center text-2xl py-20">
            Loading Products...
          </h2>

        ) : (

          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {currentProducts.length > 0 ? (

                currentProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                ))

              ) : (

                <div className="col-span-4 text-center text-xl py-20">
                  No Products Found
                </div>

              )}

            </div>

            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              currentPage={currentPage}
              paginate={paginate}
            />

          </>

        )}

      </section>

    </div>
  );
}

export default Home;