"use client";
import { motion } from "motion/react";
import { Check, Package, Download, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderSuccess() {
  const orderNumber = "ORD-2026-" + Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-24 px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-12 h-12" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl tracking-tight uppercase">Order Confirmed!</h1>
          <p className="text-xl text-[#1D3557]/70">Thank you for your purchase</p>
          <p className="text-[#1D3557]/60">
            We've sent a confirmation email with your order details
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[#E3F2FD] p-8 mb-8 space-y-6"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#1D3557]/10">
            <div>
              <p className="text-sm tracking-wider uppercase text-[#1D3557]/60 mb-1">Order Number</p>
              <p className="text-2xl tracking-wider uppercase">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider uppercase text-[#1D3557]/60 mb-1">Order Date</p>
              <p className="text-lg">{orderDate}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="tracking-wider uppercase mb-1">Delivery Information</h3>
                <p className="text-sm text-[#1D3557]/70">
                  Your order will be delivered within 3-5 business days
                </p>
                <p className="text-sm text-[#1D3557]/70">
                  Track your order using the confirmation email
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 border-2 border-[#1D3557] text-[#1D3557] py-4 hover:bg-black hover:text-white transition-colors"
          >
            <Package className="w-5 h-5" />
            <span className="tracking-wider uppercase text-sm">Track Order</span>
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-black text-white py-4 hover:bg-black/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="tracking-wider uppercase text-sm">Continue Shopping</span>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-sm text-[#1D3557]/60">Need help with your order?</p>
          <Link href="/" className="inline-block text-sm tracking-wider uppercase underline hover:opacity-70 transition-opacity">
            Contact Support
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
