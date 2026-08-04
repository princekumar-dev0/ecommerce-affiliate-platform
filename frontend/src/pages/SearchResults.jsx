import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../services/api";

function SearchResults() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProducts();

  }, [query]);

  async function loadProducts() {

    try {

      setLoading(true);

      const data = await searchProducts(query);

      setProducts(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">

        Search Results

      </h1>

      <p className="text-gray-500 mb-8">

        Searching for:
        <span className="font-bold"> {query}</span>

      </p>

      {loading ? (

        <h2>Loading...</h2>

      ) : products.length === 0 ? (

        <h2>No products found.</h2>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map(product => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default SearchResults;