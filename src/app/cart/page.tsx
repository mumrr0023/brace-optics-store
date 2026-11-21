"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";
import { ArrowLeft, Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl tracking-tight uppercase">Your Cart is Empty</h1>
          <p className="text-[#1D3557]/60">Start shopping to add items to your cart.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 hover:bg-black/90 transition-colors mt-6"
          >
            <span className="tracking-wider uppercase text-sm">Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-16">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider uppercase">Continue Shopping</span>
      </Link>

      {/* Page Title */}
      <div className="mb-12">
        <h1 className="text-4xl tracking-tight uppercase mb-2">Shopping Cart</h1>
        <p className="text-[#1D3557]/60">
          {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-6 pb-8 border-b border-[#1D3557]/10"
            >
              {/* Image */}
              <Link
                href={`/product/${item.id}`}
                className="w-32 h-40 bg-[#E3F2FD] flex-shrink-0 overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="text-lg tracking-wider uppercase mb-2 hover:opacity-70 transition-opacity">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#1D3557]/60 mb-4">{item.category}</p>
                  <p className="text-lg">${item.price}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#1D3557]/20">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-3 hover:bg-[#1D3557]/5 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 text-center min-w-[60px]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-3 hover:bg-[#1D3557]/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 hover:text-[#E74C3C] transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-right">
                <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="bg-[#E3F2FD] p-8 space-y-6 sticky top-32">
            <h2 className="text-2xl tracking-tight uppercase">Order Summary</h2>

            <div className="space-y-3 py-6 border-y border-[#1D3557]/10">
              <div className="flex justify-between">
                <span className="text-[#1D3557]/60">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1D3557]/60">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between text-xl">
              <span className="tracking-wider uppercase">Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[#E74C3C] text-white py-4 hover:bg-[#C0392B] transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="tracking-wider uppercase text-sm">Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
