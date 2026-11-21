"use client";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Check,
  Instagram,
  Globe,
  Headphones,
} from "lucide-react";
import { useState } from "react";

const contactCards = [
  {
    icon: MessageCircle,
    label: "WhatsApp Concierge",
    primary: "+92 300 555-0199",
    secondary: "Instant prescription help & frame styling chat",
    actionText: "Chat on WhatsApp",
    href: "https://wa.me/923005550199?text=Hi%20BRACE%20Optics%2C%20I%27d%20like%20to%20inquire%20about%20your%20eyewear%20collection.",
    accent: true,
  },
  {
    icon: Phone,
    label: "Phone & Toll-Free",
    primary: "+92 (42) 3571-8899",
    secondary: "Customer Care: +92 321 555-0144 | Toll-Free: 0800-27223",
    actionText: "Call Studio",
    href: "tel:+924235718899",
    accent: false,
  },
  {
    icon: Mail,
    label: "Email Support",
    primary: "hello@braceoptics.com",
    secondary: "Prescriptions: rx@braceoptics.com | VIP: care@braceoptics.com",
    actionText: "Send Email",
    href: "mailto:hello@braceoptics.com",
    accent: false,
  },
  {
    icon: MapPin,
    label: "Flagship Studio",
    primary: "Shop #14, Crystal Arcade, Gulberg III",
    secondary: "Main Boulevard, Lahore & Blue Area Jinnah Ave, Islamabad",
    actionText: "Open Hours: 10:30 AM – 10:00 PM",
    href: "#about",
    accent: false,
  },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "Book Free Eye Exam",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        topic: "Book Free Eye Exam",
        message: "",
      });
    }, 3500);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24 bg-[#E3F2FD]/40 border-t border-[#1D3557]/10">
      <div className="max-w-[1600px] mx-auto px-8 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-[#E74C3C] font-semibold">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl tracking-tight uppercase text-[#1D3557]">
            Contact & WhatsApp Concierge
          </h2>
          <p className="text-[#1D3557]/70 text-lg">
            Have a question about prescription lenses, frame measurements, or booking a complimentary eye test?
            Reach out to our optical specialists directly via WhatsApp, phone, or email.
          </p>
        </motion.div>

        {/* Contact Channel Cards */}
        <div id="whatsapp" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 flex flex-col justify-between space-y-6 border transition-all ${
                  card.accent
                    ? "bg-[#1D3557] text-white border-[#1D3557]"
                    : "bg-white text-[#1D3557] border-[#1D3557]/10 hover:border-[#E74C3C]"
                }`}
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center ${
                      card.accent ? "bg-[#25D366] text-white" : "bg-[#E3F2FD] text-[#1D3557]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p
                    className={`text-xs tracking-[0.2em] uppercase ${
                      card.accent ? "text-white/70" : "text-[#E74C3C]"
                    }`}
                  >
                    {card.label}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight break-words">{card.primary}</h3>
                  <p className={`text-xs leading-relaxed ${card.accent ? "text-white/70" : "text-[#1D3557]/65"}`}>
                    {card.secondary}
                  </p>
                </div>

                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center justify-center gap-2 py-3 px-5 text-xs tracking-wider uppercase transition-colors ${
                    card.accent
                      ? "bg-[#25D366] text-white hover:bg-[#1EBE5D]"
                      : "bg-[#1D3557] text-white hover:bg-[#E74C3C]"
                  }`}
                >
                  <span>{card.actionText}</span>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Form + Direct Directory */}
        <div id="book-eye-exam" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#1D3557]/10 p-8 md:p-12">
          {/* Left: Send a Message / Book Appointment */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl tracking-tight uppercase text-[#1D3557]">
                Send an Inquiry or Book a Free Eye Checkup
              </h3>
              <p className="text-sm text-[#1D3557]/60 mt-1">
                Fill out the form below and our optometrist desk will respond within 15 minutes during studio hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#1D3557]/70 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hamza Noman"
                    className="w-full px-4 py-3 bg-[#E3F2FD]/50 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#1D3557]/70 mb-2">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 bg-[#E3F2FD]/50 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#1D3557]/70 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#E3F2FD]/50 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#1D3557]/70 mb-2">
                    Subject / Service
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 bg-[#E3F2FD]/50 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
                  >
                    <option value="Book Free Eye Exam">Book Free Eye Exam</option>
                    <option value="Prescription Lens Inquiry">Prescription Lens Inquiry</option>
                    <option value="Frame Availability & Sizing">Frame Availability & Sizing</option>
                    <option value="Order Tracking & Warranty">Order Tracking & Warranty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-[#1D3557]/70 mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your prescription details, preferred appointment time, or frame model..."
                  className="w-full px-4 py-3 bg-[#E3F2FD]/50 border border-[#1D3557]/15 text-sm focus:outline-none focus:border-[#E74C3C]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#E74C3C] text-white px-8 py-4 hover:bg-[#C0392B] transition-colors text-sm tracking-wider uppercase"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent — We Will Contact You Shortly!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Complete Dummy Contact Directory */}
          <div className="lg:col-span-5 bg-[#1D3557] text-white p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.3em] uppercase text-[#E74C3C]">Direct Directory</p>
              <h4 className="text-2xl tracking-tight uppercase">Quick Contact Details</h4>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <MessageCircle className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/60">WhatsApp (24/7 Orders & Rx)</p>
                    <p className="font-medium mt-0.5">+92 300 555-0199 / +92 317 555-0189</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <Headphones className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/60">Helpdesk & Landline</p>
                    <p className="font-medium mt-0.5">+92 (42) 3571-8899 | 0800-BRACE (27223)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <Mail className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/60">Official Emails</p>
                    <p className="font-medium mt-0.5">hello@braceoptics.com</p>
                    <p className="text-xs text-white/70">support@braceoptics.com • rx@braceoptics.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                  <Clock className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/60">Working Hours</p>
                    <p className="font-medium mt-0.5">Mon – Sat: 10:30 AM – 10:00 PM</p>
                    <p className="text-xs text-white/70">Sunday: 12:00 PM – 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#E74C3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/60">Social Channels</p>
                    <p className="font-medium mt-0.5 flex items-center gap-2">
                      <Instagram className="w-4 h-4 inline" /> @braceoptics.official • fb.com/braceoptics
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/923005550199?text=Hi%20BRACE%20Optics%2C%20I%27d%20like%20to%20chat%20with%20an%20optician."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 px-6 flex items-center justify-center gap-2 text-xs tracking-wider uppercase font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Live WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

