"use client";
import { useParams } from "next/navigation";
import { useStore } from "../../context/StoreContext";
import { useCart } from "../../context/CartContext";
import { motion } from "motion/react";
import { ArrowLeft, Check, Camera, PackageX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { VirtualTryOn } from "../../components/VirtualTryOn";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link href="/" className="text-sm underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.hoverImage];

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-16">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm tracking-wider uppercase">Back to Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/5] bg-[#E3F2FD] overflow-hidden relative"
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-[#E74C3C] text-white text-xs tracking-wider uppercase px-4 py-1.5 font-semibold">
                Item Out of Stock
              </div>
            )}
          </motion.div>

          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-24 bg-[#E3F2FD] overflow-hidden transition-opacity ${
                  selectedImage === index ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Category & Stock Badge */}
          <div className="flex items-center gap-4">
            <p className="text-sm tracking-[0.3em] uppercase text-[#1D3557]/60">
              {product.category}
            </p>
            {product.inStock ? (
              <span className="text-xs tracking-wider uppercase px-3 py-1 bg-emerald-600 text-white">
                In Stock
              </span>
            ) : (
              <span className="text-xs tracking-wider uppercase px-3 py-1 bg-[#E74C3C] text-white font-semibold">
                Item Out of Stock
              </span>
            )}
          </div>

          {/* Name */}
          <h1 className="text-5xl tracking-tight uppercase">{product.name}</h1>

          {/* Price */}
          <p className="text-3xl">${product.price}</p>

          {/* Description */}
          <p className="text-lg leading-relaxed text-[#1D3557]/70">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-3 py-6 border-y border-[#1D3557]/10">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-4 h-4" />
                <span className="text-[#1D3557]/70">{feature}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors relative overflow-hidden"
              >
                <motion.span
                  animate={{ opacity: addedToCart ? 0 : 1 }}
                  className="tracking-wider uppercase text-sm"
                >
                  Add to Cart
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: addedToCart ? 1 : 0,
                    y: addedToCart ? 0 : 20,
                  }}
                  className="absolute inset-0 flex items-center justify-center tracking-wider uppercase text-sm"
                >
                  Added to Cart ✓
                </motion.span>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-[#E74C3C]/15 border border-[#E74C3C] text-[#E74C3C] py-4 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <PackageX className="w-5 h-5" />
                <span className="tracking-wider uppercase text-sm font-semibold">
                  Item Out of Stock
                </span>
              </button>
            )}

            <button
              onClick={() => setShowVirtualTryOn(true)}
              className="w-full border-2 border-[#1D3557] text-[#1D3557] py-4 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              <span className="tracking-wider uppercase text-sm">Virtual Try-On</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Virtual Try-On Modal */}
      <VirtualTryOn
        isOpen={showVirtualTryOn}
        onClose={() => setShowVirtualTryOn(false)}
        currentProduct={product}
        allProducts={products}
      />
    </div>
  );
}
