"use client";

import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

/* ---------------- HOME CONTENT COMPONENT ---------------- */

function HomeContent() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const globalSearch = searchParams.get("search");

  const { addToCart } = useCart();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("Recommended");


  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {

    try {

      setLoading(true);

      const [catRes, prodRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      ]);

      setCategories(catRes.data);

      if (catRes.data.length > 0) {
        setActiveCategory(catRes.data[0]._id);
      }

      setProducts(prodRes.data.products);

    } catch (error) {

      console.error("Error fetching data:", error);

    } finally {

      setLoading(false);

    }

  };


  /* ---------------- GLOBAL SEARCH ---------------- */

  useEffect(() => {

    if (!globalSearch) return;

    const searchProducts = async () => {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?query=${globalSearch}`
        );

        setProducts(res.data);

      } catch (error) {

        console.error("Global search error:", error);

      }

    };

    searchProducts();

  }, [globalSearch]);


  /* ---------------- SEARCH ---------------- */

  const handleSearch = async (e) => {

    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?query=${query}`
        );

        setProducts(res.data);

      } catch (error) {

        console.error("Search error", error);

      }

    } else if (query.length === 0) {

      fetchData();

    }

  };


  /* ---------------- ADD TO CART ---------------- */

  const handleAddToCart = (product) => {

    addToCart(product);
    router.push("/cart");

  };


  /* ---------------- FILTER + SORT ---------------- */

  let filteredProducts = products.filter(
    (p) => p.category?._id === activeCategory || p.category === activeCategory
  );

  if (sortType === "Price: Low to High") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortType === "Price: High to Low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const activeCategoryName =
    categories.find((c) => c._id === activeCategory)?.name || "Menu";


  /* ---------------- UI ---------------- */

  return (

    <div className="flex flex-col md:flex-row py-8 gap-8 px-4 sm:px-6 lg:px-8">

      {/* Sidebar */}

      <aside className="w-full md:w-64 flex-shrink-0 relative">

        <div className="sticky top-24">

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full mb-6 bg-white border border-slate-200 text-sm rounded-xl px-4 py-3"
          />

          <h2 className="text-xl font-bold mb-4 text-slate-800">
            Menu Highlights
          </h2>

          <div className="flex md:flex-col gap-2">

            {categories.map((cat) => (

              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                ${activeCategory === cat._id
                    ? "bg-orange-500 text-white"
                    : "bg-white text-slate-600 hover:bg-orange-50"
                  }`}
              >
                <span className="text-xl">{cat.icon || "📌"}</span>
                {cat.name}
              </button>

            ))}

          </div>

        </div>

      </aside>


      {/* Products */}

      <div className="flex-1 min-w-0">

        {/* Banner */}

        <div className="mb-8 rounded-3xl overflow-hidden relative shadow-sm h-48 md:h-64 flex items-center bg-slate-900">

          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="relative z-10 p-8 text-white">

            <span className="inline-block px-3 py-1 bg-orange-500 text-xs font-bold rounded-full mb-4">
              LIMITED TIME
            </span>

            <h1 className="text-4xl font-black">
              Summer Combo Meals
            </h1>

            <p className="text-lg">
              Get 20% off on all combo meals!
            </p>

          </div>

        </div>


        {/* Title */}

        <div className="mb-6 flex justify-between items-center">

          <h2 className="text-3xl font-bold text-slate-900">
            {activeCategoryName}
          </h2>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2"
          >

            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>

          </select>

        </div>


        {/* Product Grid */}

        {loading ? (

          <div className="text-center py-20 text-slate-500">
            Loading products...
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-xl flex flex-col"
              >

                <img
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <div className="flex-1 flex flex-col">

                  <div className="flex justify-between mb-2">

                    <h3 className="font-bold text-slate-900">
                      {product.title}
                    </h3>

                    <span className="font-bold text-xl">
                      ${product.price}
                    </span>

                  </div>

                  <p className="text-sm text-slate-500 mb-4 flex-1">
                    {product.description}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}


/* ---------------- SUSPENSE WRAPPER ---------------- */

export default function Page() {

  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );

}