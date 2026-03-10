import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";
import { useShop } from "../../context/ShopContext";

const MenCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  /* -------- HERO TYPEWRITER -------- */
   const headingText = "Men's Clothing Collection";

  const subText =
    "Elevate your everyday style with premium fits and timeless designs.";

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < headingText.length) {
      const t = setTimeout(() => {
        setTyped((prev) => prev + headingText[index]);
        setIndex(index + 1);
      }, 50);

      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [index]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=men");

      const menProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(menProducts);

      const cats = [
        "All",
        ...new Set(menProducts.map(p => p.category?.name || p.category)),
      ];
      setCategories(cats);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p => (p.category?.name || p.category) === activeCategory
        );

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770530824/Men_sCollection_rhgsj6.png)",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="text-white max-w-3xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-4">
              Curated for Him
            </p>
            <h1 className="cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
              {typed}
              <span
                className="inline-block w-[2px] h-[0.7em] ml-1 align-middle bg-white/60"
                style={{ animation: "gentlePulse 1s ease-in-out infinite" }}
              />
            </h1>

            {done && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-4 text-[14px] sm:text-[16px] md:text-lg font-light text-white/70 tracking-wide max-w-xl mx-auto"
              >
                {subText}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl p-5 lg:sticky lg:top-24 border border-gray-100">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <h2 className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-900">
                Categories
              </h2>
            </div>

            <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap cursor-pointer px-4 py-2.5 rounded-lg text-[13px] tracking-wide
                    transition-all duration-300
                    ${
                      activeCategory === cat
                        ? "bg-[#f5f0eb] text-[#8b6f47] font-medium"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="lg:col-span-3">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-[13px] text-gray-400 tracking-wide">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="skeleton-luxury aspect-[3/4]" />
                  <div className="skeleton-luxury h-4 w-3/4" />
                  <div className="skeleton-luxury h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-[14px]">No products found in this category.</p>
            </div>
          )}

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default MenCategoryPage;
