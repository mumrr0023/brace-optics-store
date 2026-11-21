"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ShoppingBag, User, Store } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";

export function MobileNav() {
  const location = { pathname: usePathname() };
  const { cartCount } = useCart();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#1D3557]/10"
    >
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive("/") ? "text-[#1D3557]" : "text-[#1D3557]/40"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs tracking-wider uppercase">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive("/shop") ? "text-[#1D3557]" : "text-[#1D3557]/40"
          }`}
        >
          <Store className="w-5 h-5" />
          <span className="text-xs tracking-wider uppercase">Shop</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
            isActive("/cart") ? "text-[#1D3557]" : "text-[#1D3557]/40"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-2 right-1/2 translate-x-3 -translate-y-1 bg-[#E74C3C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-xs tracking-wider uppercase">Cart</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            isActive("/profile") ? "text-[#1D3557]" : "text-[#1D3557]/40"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs tracking-wider uppercase">Profile</span>
        </Link>
      </div>
    </motion.nav>
  );
}
