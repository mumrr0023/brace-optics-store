"use client";
import { motion } from "motion/react";
import { newCollectionIds, bestSellerIds } from "../data/products";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, AlertCircle, PackageX } from "lucide-react";

function ShopContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const collection = searchParams.get("collection");
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(
      categoryParam === "Sunglasses" || categoryParam === "Optical" ? categoryParam : "All"
    );
  }, [searchParams, categoryParam]);

  const categories = ["All", "Sunglasses", "Optical"];
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const collectionIds =
    collection === "new" ? newCollectionIds : collection === "best" ? bestSellerIds : null;

  const filteredProducts = products.filter((product) => {
    if (collectionIds && !collectionIds.includes(product.id)) return false;
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      trimmedQuery.length === 0 ||
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.category.toLowerCase().includes(trimmedQuery) ||
      product.description.toLowerCase().includes(trimmedQuery) ||
      product.features.some((f) => f.toLowerCase().includes(trimmedQuery));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const allMatchesOutOfStock =
    sortedProducts.length > 0 && sortedProducts.every((product) => !product.inStock);

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl tracking-tight uppercase mb-4">
          {collection === "new" ? "New Collection" : collection === "best" ? "Best Sellers" : "Shop Eyewear"}
        </h1>
        <p className="text-[#1D3557]/60 text-lg">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </p>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12 pb-8 border-b border-[#1D3557]/10 space-y-6"
      >
        {/* Search Input */}
        <div className="flex items-stretch gap-3 max-w-xl">
          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-[#1D3557]/50 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store by frame name, style, or feature..."
              className="w-full h-12 pl-12 pr-4 bg-[#E3F2FD]/60 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="h-12 px-6 bg-[#E3F2FD] border border-[#1D3557]/20 text-[#1D3557] hover:bg-[#E74C3C] hover:text-white hover:border-[#E74C3C] transition-colors text-xs uppercase tracking-wider font-medium shrink-0 flex items-center justify-center"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <SlidersHorizontal className="w-5 h-5" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm tracking-wider uppercase transition-all ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-[#E3F2FD] text-[#1D3557] hover:bg-[#1D3557]/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-sm tracking-wider uppercase text-[#1D3557]/60">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#E3F2FD] border-none text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Out of Stock Banner when searched item is out of stock */}
      {trimmedQuery.length > 0 && allMatchesOutOfStock && (
        <div className="mb-10 flex items-center gap-3 p-5 bg-[#E74C3C]/10 border border-[#E74C3C] text-[#1D3557]">
          <PackageX className="w-6 h-6 text-[#E74C3C] flex-shrink-0" />
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#E74C3C]">
              Item Out of Stock
            </p>
            <p className="text-sm text-[#1D3557]/80">
              The item matching &ldquo;{searchQuery}&rdquo; is currently out of stock.
            </p>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-24 bg-[#E3F2FD]/30 border border-[#1D3557]/10"
        >
          <AlertCircle className="w-12 h-12 text-[#E74C3C] mx-auto mb-4" />
          <h3 className="text-2xl tracking-tight uppercase mb-2 font-semibold">
            Search Doesn&apos;t Exist
          </h3>
          <p className="text-[#1D3557]/60 max-w-md mx-auto">
            No products matching &ldquo;{searchQuery}&rdquo; were found in our store. Try another search term or reset your filters.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="max-w-[1600px] mx-auto px-8 py-16">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
