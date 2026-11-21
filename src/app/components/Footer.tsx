"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const legalSections = [
  {
    key: "privacy",
    title: "Privacy Policy",
    paragraphs: [
      "At BRACE Optics, we respect your privacy. This is a placeholder policy: we collect only the information needed to process your orders, book eye examinations, and respond to your inquiries, such as your name, contact details, and prescription data.",
      "Your information is never sold to third parties. It may be shared with trusted delivery and payment partners solely to fulfil your order, and is protected with industry-standard security measures.",
      "You may request access to, correction of, or deletion of your personal data at any time by contacting hello@braceoptics.com.",
    ],
  },
  {
    key: "terms",
    title: "Terms of Service",
    paragraphs: [
      "By using the BRACE Optics website and placing an order, you agree to these placeholder terms. All product descriptions, prices, and availability are subject to change without prior notice.",
      "Orders are confirmed once payment is received. Eyewear may be exchanged within 14 days of delivery if unworn and in original packaging; custom prescription lenses are non-refundable unless defective.",
      "BRACE Optics is not liable for indirect damages arising from the use of our products or website. These terms are governed by the laws of Pakistan.",
    ],
  },
];

export function Footer() {
  const [openLegal, setOpenLegal] = useState<string | null>(null);
  return (
    <footer className="bg-[#1D3557] text-white py-20">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#E74C3C]">BRACE OPTICS</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Premium eyewear and digital optometry designed for the modern individual.
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              WhatsApp: +92 300 555-0199
              <br />
              Email: hello@braceoptics.com
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?category=Sunglasses" className="text-white/60 hover:text-white transition-colors text-sm">Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Optical" className="text-white/60 hover:text-white transition-colors text-sm">Optical Frames
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=new" className="text-white/60 hover:text-white transition-colors text-sm">New Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?collection=best" className="text-white/60 hover:text-white transition-colors text-sm">Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#contact" className="text-white/60 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#perks" className="text-white/60 hover:text-white transition-colors text-sm">Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/#perks" className="text-white/60 hover:text-white transition-colors text-sm">Warranty & Perks
                </Link>
              </li>
              <li>
                <Link href="/#book-eye-exam" className="text-white/60 hover:text-white transition-colors text-sm">Book Eye Exam
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-6">About</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#our-story" className="text-white/60 hover:text-white transition-colors text-sm">Our Story
                </Link>
              </li>
              <li>
                <Link href="/#store-locations" className="text-white/60 hover:text-white transition-colors text-sm">Store Locations
                </Link>
              </li>
              <li>
                <Link href="/#key-features" className="text-white/60 hover:text-white transition-colors text-sm">Key Features
                </Link>
              </li>
              <li>
                <Link href="/#whatsapp" className="text-white/60 hover:text-white transition-colors text-sm">WhatsApp Concierge
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#E74C3C] hover:underline font-medium transition-colors text-sm">Staff Admin Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 BRACE OPTICS. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {legalSections.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-expanded={openLegal === s.key}
                  onClick={() => setOpenLegal(openLegal === s.key ? null : s.key)}
                  className={`inline-flex items-center gap-1.5 hover:text-white transition-colors text-sm ${
                    openLegal === s.key ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openLegal === s.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence initial={false} mode="wait">
            {legalSections
              .filter((s) => s.key === openLegal)
              .map((s) => (
                <motion.div
                  key={s.key}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/5 border border-white/10 p-6 md:p-8 space-y-3 max-w-4xl">
                    <h5 className="text-sm tracking-wider uppercase">{s.title}</h5>
                    <p className="text-white/50 text-xs">Last updated: November 1, 2026</p>
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} className="text-white/70 text-sm leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
}
