"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {  ArrowLeft  } from "lucide-react";
import Link from "next/link";

export default function Register() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    navigate.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-24 px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider uppercase">Back to Login</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight uppercase mb-4">Create Account</h1>
          <p className="text-[#1D3557]/60">Join us and discover premium eyewear</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#E3F2FD] border-none focus:outline-none focus:ring-2 focus:ring-[#E74C3C]"
          />

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1 w-5 h-5 accent-black"
              required
            />
            <span className="text-sm text-[#1D3557]/70 leading-relaxed">
              I agree to the Terms & Conditions and Privacy Policy
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors"
          >
            <span className="tracking-wider uppercase text-sm">Create Account</span>
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <Link href="/login" className="text-sm text-[#1D3557]/60 hover:text-[#1D3557] transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
