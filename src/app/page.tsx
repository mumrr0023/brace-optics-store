"use client";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { useStore } from "./context/StoreContext";
import Link from "next/link";
import { useState, useEffect } from "react";

const heroImages = [
  "/images/hero.png",
  "/images/shop_pic_1.png",
  "/images/shop_pic_2.png"
];

export default function Home() {
  const { products } = useStore();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] flex items-center">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={currentImage}
              src={heroImages[currentImage]}
              alt="Hero"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white text-sm tracking-[0.3em] uppercase mb-4"
            >
              NEW COLLECTION
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white text-6xl md:text-7xl tracking-tight mb-6 uppercase leading-none"
            >
              Stylish
              <br />
              Eyewear
              <br />
              for You
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/90 text-lg mb-8"
            >
              Premium frames that define your style.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#E74C3C] text-white px-10 py-4 hover:bg-[#C0392B] transition-colors group"
              >
                <span className="tracking-wider uppercase text-sm">Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-7 py-4 hover:bg-white hover:text-[#1D3557] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="tracking-wider uppercase text-sm">About & Perks</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-7 py-4 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="tracking-wider uppercase text-sm">Contact & WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[1600px] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl tracking-tight uppercase mb-2">Shop Collection</h2>
          <p className="text-[#1D3557]/60">Discover our curated selection of 13 signature eyewear designs.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/featured.png"
              alt="Featured"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl tracking-tight uppercase">Premium Quality</h2>
            <p className="text-lg leading-relaxed text-[#1D3557]/70">
              Each frame is crafted with precision and care, using only the finest materials.
              Our collection combines timeless design with modern innovation.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E74C3C] rounded-full" />
                <span className="text-[#1D3557]/70">Premium acetate and titanium frames</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E74C3C] rounded-full" />
                <span className="text-[#1D3557]/70">UV400 protection on all lenses</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E74C3C] rounded-full" />
                <span className="text-[#1D3557]/70">Prescription-ready optical frames</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E74C3C] rounded-full" />
                <span className="text-[#1D3557]/70">Virtual try-on technology</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
