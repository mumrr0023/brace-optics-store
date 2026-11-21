"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, AlertCircle, PackageX, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const { cartCount } = useCart();
  const { products } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${sectionId}`);
      }
    }
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const matchedProducts =
    trimmedQuery.length === 0
      ? []
      : products.filter(
          (product) =>
            product.name.toLowerCase().includes(trimmedQuery) ||
            product.category.toLowerCase().includes(trimmedQuery) ||
            product.description.toLowerCase().includes(trimmedQuery) ||
            product.features.some((f) => f.toLowerCase().includes(trimmedQuery))
        );

  const allMatchesOutOfStock =
    matchedProducts.length > 0 && matchedProducts.every((product) => !product.inStock);
  const someMatchesOutOfStock =
    matchedProducts.length > 0 && matchedProducts.some((product) => !product.inStock);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedQuery) return;
    if (matchedProducts.length === 1 && matchedProducts[0].inStock) {
      setSearchOpen(false);
      router.push(`/product/${matchedProducts[0].id}`);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#1D3557]/10"
      >
        <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setSearchOpen(false)}
            className="text-2xl tracking-tight hover:opacity-70 transition-opacity text-[#E74C3C] font-bold"
          >
            BRACE OPTICS
          </Link>

          {/* Center Menu - Desktop */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              onClick={() => setSearchOpen(false)}
              className="text-sm tracking-wider uppercase hover:text-[#E74C3C] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setSearchOpen(false)}
              className="text-sm tracking-wider uppercase hover:text-[#E74C3C] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              onClick={(e) => handleSectionClick(e, "about")}
              className="text-sm tracking-wider uppercase hover:text-[#E74C3C] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => handleSectionClick(e, "contact")}
              className="text-sm tracking-wider uppercase hover:text-[#E74C3C] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              onClick={() => setSearchOpen(false)}
              className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 bg-[#1D3557] text-white hover:bg-[#E74C3C] transition-colors"
            >
              Admin Portal
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Search Toggle Button (Desktop & Mobile) */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              aria-label="Toggle search bar"
              className={`hover:text-[#E74C3C] transition-colors flex items-center justify-center ${
                searchOpen ? "text-[#E74C3C]" : "text-[#1D3557]"
              }`}
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Hamburger - Mobile Only */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setSearchOpen(false);
              }}
              className="md:hidden hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Icons */}
            <Link
              href="/profile"
              onClick={() => setSearchOpen(false)}
              className="hidden md:block hover:opacity-70 transition-opacity"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              onClick={() => setSearchOpen(false)}
              className="hidden md:block hover:opacity-70 transition-opacity relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E74C3C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Sliding Search Bar Drawer */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 16 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border-t border-[#1D3557]/10 shadow-xl overflow-hidden"
            >
              <div className="max-w-[1600px] mx-auto px-8 py-6 space-y-6">
                {/* Search Input Row */}
                <form onSubmit={handleSearchSubmit} className="flex items-stretch gap-3">
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 text-[#1D3557]/50 absolute left-4 pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search frames by name, style, or category (e.g. Clubmaster, Cat-Eye, Aviator, Sport Wrap Pro)..."
                      className="w-full h-12 pl-12 pr-4 bg-[#E3F2FD]/60 border border-[#1D3557]/20 text-sm tracking-wide focus:outline-none focus:border-[#E74C3C] text-[#1D3557]"
                    />
                  </div>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="h-12 px-6 bg-[#E3F2FD] border border-[#1D3557]/20 text-[#1D3557] hover:bg-[#E74C3C] hover:text-white hover:border-[#E74C3C] transition-colors text-xs uppercase tracking-wider font-medium shrink-0 flex items-center justify-center"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="h-12 px-6 bg-[#1D3557] text-white hover:bg-[#E74C3C] transition-colors text-xs uppercase tracking-wider font-medium shrink-0 flex items-center justify-center"
                  >
                    Close
                  </button>
                </form>

                {/* Quick Search Suggestions when empty */}
                {trimmedQuery.length === 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="uppercase tracking-wider text-[#1D3557]/50 mr-2">
                      Popular Searches:
                    </span>
                    {[
                      "Clubmaster",
                      "Cat-Eye",
                      "Aviator",
                      "Optical",
                      "Round Vintage Amber",
                      "Sport Wrap Pro",
                    ].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-[#E3F2FD] text-[#1D3557] hover:bg-[#1D3557] hover:text-white transition-colors uppercase tracking-wider"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results Area */}
                {trimmedQuery.length > 0 && (
                  <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
                    {/* Case 1: Search Doesn't Exist */}
                    {matchedProducts.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center text-center py-10 px-6 bg-[#E3F2FD]/40 border border-[#1D3557]/10"
                      >
                        <AlertCircle className="w-10 h-10 text-[#E74C3C] mb-3" />
                        <h4 className="text-lg tracking-wider uppercase font-semibold text-[#1D3557]">
                          Search Doesn&apos;t Exist
                        </h4>
                        <p className="text-sm text-[#1D3557]/70 mt-1 max-w-md">
                          No eyewear matching &ldquo;<span className="font-semibold text-[#1D3557]">{searchQuery}</span>&rdquo; exists in our store. Try searching for another frame name or category.
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        {/* Out-of-Stock Banner if matching item(s) are out of stock */}
                        {someMatchesOutOfStock && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 bg-[#E74C3C]/10 border border-[#E74C3C] text-[#1D3557]"
                          >
                            <PackageX className="w-5 h-5 text-[#E74C3C] flex-shrink-0" />
                            <div className="text-xs sm:text-sm">
                              <span className="font-bold uppercase tracking-wider text-[#E74C3C] mr-2">
                                Item Out of Stock:
                              </span>
                              {allMatchesOutOfStock
                                ? `The searched item "${searchQuery}" is currently out of stock.`
                                : "One or more matching items below are currently out of stock."}
                            </div>
                          </motion.div>
                        )}

                        {/* Result Count Header */}
                        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#1D3557]/60">
                          <span>
                            Found {matchedProducts.length}{" "}
                            {matchedProducts.length === 1 ? "Product" : "Products"}
                          </span>
                          <Link
                            href={`/shop?q=${encodeURIComponent(searchQuery.trim())}`}
                            onClick={() => setSearchOpen(false)}
                            className="inline-flex items-center gap-1 text-[#E74C3C] hover:underline font-medium"
                          >
                            <span>View in Shop</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* Matched Product Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {matchedProducts.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center gap-4 p-3 border border-[#1D3557]/10 hover:border-[#1D3557] bg-[#E3F2FD]/30 transition-all group"
                            >
                              <div className="w-20 h-24 bg-[#E3F2FD] overflow-hidden flex-shrink-0 relative">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] tracking-widest uppercase text-[#1D3557]/60">
                                    {product.category}
                                  </span>
                                  {product.inStock ? (
                                    <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-emerald-600 text-white">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-[#E74C3C] text-white font-semibold">
                                      Item Out of Stock
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-sm font-medium tracking-wider uppercase text-[#1D3557] truncate">
                                  {product.name}
                                </h5>
                                <p className="text-sm font-semibold text-[#1D3557]">
                                  ${product.price}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop when search is open */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 top-20 z-40 bg-black/30 backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 z-40 bg-white"
          >
            <div className="flex flex-col p-8 space-y-6">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl tracking-wider uppercase hover:text-[#E74C3C] transition-colors py-3 border-b border-[#1D3557]/10"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl tracking-wider uppercase hover:text-[#E74C3C] transition-colors py-3 border-b border-[#1D3557]/10"
              >
                Shop
              </Link>
              <Link
                href="/#about"
                onClick={(e) => handleSectionClick(e, "about")}
                className="text-2xl tracking-wider uppercase hover:text-[#E74C3C] transition-colors py-3 border-b border-[#1D3557]/10"
              >
                About
              </Link>
              <Link
                href="/#contact"
                onClick={(e) => handleSectionClick(e, "contact")}
                className="text-2xl tracking-wider uppercase hover:text-[#E74C3C] transition-colors py-3 border-b border-[#1D3557]/10"
              >
                Contact
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl tracking-wider uppercase text-[#E74C3C] hover:opacity-75 transition-opacity py-3 border-b border-[#1D3557]/10"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
