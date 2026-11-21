"use client";
import Link from "next/link";
import { Product } from "../data/products";
import { motion } from "motion/react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-[#E3F2FD] overflow-hidden mb-4">
          <motion.img
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Stock Status Badge */}
          {!product.inStock && (
            <div className="absolute top-3 left-3 z-10 bg-[#E74C3C] text-white text-[10px] tracking-wider uppercase px-2.5 py-1 font-semibold">
              Item Out of Stock
            </div>
          )}

          {/* Quick View on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#1D3557]/20 flex items-center justify-center"
          >
            <span className="text-white text-sm tracking-wider uppercase">
              {product.inStock ? "Quick View" : "Out of Stock — View Details"}
            </span>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm tracking-wider uppercase">{product.name}</h3>
            {!product.inStock && (
              <span className="text-[11px] uppercase tracking-wider text-[#E74C3C] font-medium">
                Out of Stock
              </span>
            )}
          </div>
          <p className="text-sm">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
