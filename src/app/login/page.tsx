"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigate = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight uppercase mb-4">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-[#1D3557]/60">
            {isLogin
              ? "Sign in to your account to continue"
              : "Join us and discover premium eyewear"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
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
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
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

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-[#1D3557]/60 hover:text-[#1D3557] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-4 hover:bg-black/90 transition-colors"
          >
            <span className="tracking-wider uppercase text-sm">
              {isLogin ? "Sign In" : "Create Account"}
            </span>
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-8">
          {isLogin ? (
            <Link href="/register" className="text-sm text-[#1D3557]/60 hover:text-[#1D3557] transition-colors">
              Don't have an account? Create one
            </Link>
          ) : (
            <button
              onClick={() => setIsLogin(true)}
              className="text-sm text-[#1D3557]/60 hover:text-[#1D3557] transition-colors"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
