"use client";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {  ArrowLeft  } from "lucide-react";
import Link from "next/link";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl tracking-tight uppercase">Your Cart is Empty</h1>
          <p className="text-[#1D3557]/60">Add items to your cart before checking out.</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate.push("/order-success");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="max-w-[1600px] mx-auto px-8 py-16">
      {/* Back Button */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider uppercase">Back to Cart</span>
      </Link>

      {/* Page Title */}
      <h1 className="text-4xl tracking-tight uppercase mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl tracking-wider uppercase">Contact Information</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            />
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h2 className="text-xl tracking-wider uppercase">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
            </div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            />
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h2 className="text-xl tracking-wider uppercase">Payment Information</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E74C3C] text-white py-4 hover:bg-[#C0392B] transition-colors"
          >
            <span className="tracking-wider uppercase text-sm">Place Order</span>
          </button>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#E3F2FD] p-8 space-y-6 sticky top-32">
            <h2 className="text-2xl tracking-tight uppercase">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 pb-6 border-b border-[#1D3557]/10">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-white overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm tracking-wider uppercase mb-1">{item.name}</h4>
                    <p className="text-sm text-[#1D3557]/60">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 py-6 border-b border-[#1D3557]/10">
              <div className="flex justify-between">
                <span className="text-[#1D3557]/60">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1D3557]/60">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1D3557]/60">Tax</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl">
              <span className="tracking-wider uppercase">Total</span>
              <span>${(cartTotal * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
