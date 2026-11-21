"use client";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Sparkles,
  Eye,
  Truck,
  RefreshCw,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  Glasses,
  ScanFace,
  HeartHandshake,
} from "lucide-react";

const businessFeatures = [
  {
    icon: Eye,
    title: "Digital Optometry Lab",
    description:
      "State-of-the-art computerized eye testing conducted by certified optometrists for pinpoint prescription accuracy.",
  },
  {
    icon: Glasses,
    title: "Artisanal Frame Craftsmanship",
    description:
      "Hand-selected Italian Mazzucchelli acetate and featherweight Japanese titanium frames built for all-day comfort.",
  },
  {
    icon: Sparkles,
    title: "Advanced Lens Technology",
    description:
      "Custom anti-reflective, blue-light blocking, photochromic, and high-index lenses tailored to your lifestyle.",
  },
  {
    icon: ScanFace,
    title: "AI Virtual Try-On Studio",
    description:
      "Preview how any frame fits the contours of your face in real time using our interactive virtual fitting room.",
  },
];

const customerPerks = [
  {
    icon: HeartHandshake,
    title: "Free Computerized Eye Exam",
    detail: "Complimentary full vision checkup at our studio with every frame purchase.",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Comprehensive Warranty",
    detail: " hassle-free coverage against manufacturing defects and lens coating wear.",
  },
  {
    icon: RefreshCw,
    title: "14-Day Easy Exchange",
    detail: "Not in love with your frames? Swap or return them within 14 days, no questions asked.",
  },
  {
    icon: Award,
    title: "Lifetime Tuning & Cleaning",
    detail: "Bring your eyewear in anytime for free ultrasonic deep cleaning, nose-pad replacement, and alignment.",
  },
  {
    icon: Truck,
    title: "Free Express Delivery",
    detail: "Complimentary insured doorstep delivery nationwide on all optical and sunglasses orders.",
  },
  {
    icon: Sparkles,
    title: "2nd Pair 30% Off Perk",
    detail: "Bundle your everyday optical frames with prescription sunglasses and save 30% on the second pair.",
  },
];

const dummyLocations = [
  {
    badge: "Flagship Showroom & Lab",
    city: "Lahore — Gulberg Galleria",
    address: "Shop #14, Ground Floor, Crystal Arcade, Main Boulevard, Block D, Gulberg III, Lahore",
    hours: "Mon – Sat: 10:30 AM – 10:00 PM | Sun: 12:00 PM – 8:00 PM",
    services: ["3D Eye Testing Lab", "Express 1-Hour Lens Fitting", "VIP Styling Lounge"],
  },
  {
    badge: "Experience Studio",
    city: "Islamabad — Blue Area",
    address: "Suite #08, Apex Horizon Plaza, Jinnah Avenue, Sector F-7/G-7 Blue Area, Islamabad",
    hours: "Mon – Sat: 11:00 AM – 9:30 PM | Sun: 1:00 PM – 8:00 PM",
    services: ["Certified Optometrist On-Site", "Ultrasonic Care Bar", "Custom Tint Studio"],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-24 bg-white border-t border-[#1D3557]/10">
      <div className="max-w-[1600px] mx-auto px-8 space-y-24">
        {/* Intro & Story */}
        <div id="our-story" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[#E74C3C] font-semibold">
              About BRACE Optics
            </p>
            <h2 className="text-4xl md:text-5xl tracking-tight uppercase leading-tight text-[#1D3557]">
              Where Precision Optometry Meets Bold Contemporary Style
            </h2>
            <p className="text-lg leading-relaxed text-[#1D3557]/75">
              Founded with a singular mission to transform how you see and are seen,{" "}
              <span className="font-semibold text-[#1D3557]">BRACE OPTICS</span> blends clinical-grade optical
              engineering with runway-inspired eyewear design. Whether you need ultra-light prescription frames for
              long workdays or polarized statement sunglasses for the weekend, every pair is crafted for clarity,
              durability, and unmistakable character.
            </p>
            <p className="text-base leading-relaxed text-[#1D3557]/65">
              Each frame in our collection undergoes a 28-step quality inspection, pairing medical-grade UV400 and
              anti-glare optics with ergonomic bridges designed specifically for all-day comfort.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1D3557]/10">
              <div>
                <p className="text-3xl font-bold text-[#E74C3C]">15K+</p>
                <p className="text-xs tracking-wider uppercase text-[#1D3557]/60 mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1D3557]">100%</p>
                <p className="text-xs tracking-wider uppercase text-[#1D3557]/60 mt-1">UV400 Certified</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1D3557]">24 Hr</p>
                <p className="text-xs tracking-wider uppercase text-[#1D3557]/60 mt-1">Lens Lab Turnaround</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#E74C3C]">4.9★</p>
                <p className="text-xs tracking-wider uppercase text-[#1D3557]/60 mt-1">Customer Rating</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <img
                src="/images/shop_pic_1.png"
                alt="BRACE Optics Showroom"
                className="w-full aspect-[4/5] object-cover bg-[#E3F2FD]"
              />
              <div className="bg-[#1D3557] text-white p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-[#E74C3C] mb-1">Since 2018</p>
                <p className="text-sm leading-relaxed text-white/80">
                   Precision eye care and curated designer frames under one roof.
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="bg-[#E3F2FD] p-6 text-[#1D3557]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#E74C3C] mb-1">Certified Lab</p>
                <p className="text-sm leading-relaxed text-[#1D3557]/80">
                  Custom digital surfacing for single-vision, bifocal & progressive lenses.
                </p>
              </div>
              <img
                src="/images/shop_pic_2.png"
                alt="BRACE Optics Craftsmanship"
                className="w-full aspect-[4/5] object-cover bg-[#E3F2FD]"
              />
            </div>
          </motion.div>
        </div>

        {/* Key Business Features */}
        <div id="key-features" className="scroll-mt-28 space-y-10">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#E74C3C] mb-2">Why Choose Us</p>
            <h3 className="text-3xl tracking-tight uppercase text-[#1D3557]">Key Business Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#E3F2FD]/60 p-8 border border-[#1D3557]/10 hover:border-[#E74C3C] transition-colors space-y-4"
                >
                  <div className="w-12 h-12 bg-[#1D3557] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg tracking-wider uppercase text-[#1D3557]">{feature.title}</h4>
                  <p className="text-sm leading-relaxed text-[#1D3557]/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Exclusive Member Perks */}
        <div id="perks" className="scroll-mt-28 bg-[#1D3557] text-white p-8 md:p-14 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#E74C3C] mb-2">The BRACE Advantage</p>
              <h3 className="text-3xl md:text-4xl tracking-tight uppercase">Exclusive Customer Perks</h3>
            </div>
            <p className="text-sm text-white/70 max-w-md">
              Every pair of BRACE Optics eyewear comes backed by our signature care privileges at no extra cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerPerks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-4 bg-white/5 p-6 border border-white/10"
                >
                  <div className="w-10 h-10 bg-[#E74C3C] text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm tracking-wider uppercase font-semibold">{perk.title}</h4>
                    <p className="text-xs leading-relaxed text-white/70">{perk.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dummy Store Locations */}
        <div id="store-locations" className="scroll-mt-28 space-y-10">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#E74C3C] mb-2">Visit Our Studios</p>
            <h3 className="text-3xl tracking-tight uppercase text-[#1D3557]">Our Store Locations</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dummyLocations.map((loc, index) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-[#1D3557]/15 bg-[#E3F2FD]/30 p-8 space-y-6"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="bg-[#E74C3C] text-white text-xs tracking-wider uppercase px-3 py-1">
                    {loc.badge}
                  </span>
                  <span className="text-xs tracking-wider uppercase text-[#1D3557]/60">
                    Walk-ins & Appointments Welcome
                  </span>
                </div>

                <h4 className="text-2xl tracking-tight uppercase text-[#1D3557]">{loc.city}</h4>

                <div className="space-y-3 text-sm text-[#1D3557]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1D3557]/10 flex flex-wrap gap-3">
                  {loc.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center gap-1.5 text-xs bg-white px-3 py-1.5 border border-[#1D3557]/10 text-[#1D3557]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E74C3C]" />
                      {service}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

