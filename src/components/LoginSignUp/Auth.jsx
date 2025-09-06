// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-purple-100">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center p-4">
        
        {/* Branding Section (hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center w-1/2 pr-8">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 drop-shadow-md">
            SynergySphere
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Work smarter. Stay aligned. <br /> Grow together.
          </p>
        </div>

        {/* Auth Card */}
        <div className="w-full md:w-1/2">
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isLogin ? "Welcome Back Ally 👋" : "Create Your Account 🚀"}
            </h2>

            <form className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-3 text-orange-400" size={20} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-orange-400" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                />
              </div>

              {/* Password Input with Toggle */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-orange-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password for Signup */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-orange-400" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition transform"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  New here?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Join the Sphere
                  </button>
                </>
              ) : (
                <>
                  Already part of the Sphere?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Log In
                  </button>
                </>
              )}
            </div>

            {/* Forgot password */}
            {isLogin && (
              <div className="mt-3 text-center">
                <button className="text-xs text-gray-500 hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
