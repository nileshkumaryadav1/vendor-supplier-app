"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6 md:px-20 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Empowering <span className="text-green-600">Street Vendors</span>
            <br />
            with Trusted Raw Materials
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A platform built during Hackathon 2025 to connect local street food
            vendors with reliable, affordable suppliers — streamlining access to
            quality resources and boosting small businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/materials"
              className="px-6 py-3 bg-green-600 text-white text-lg rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Explore Materials
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border-2 border-green-600 text-green-600 text-lg rounded-xl font-semibold hover:bg-green-50 transition"
            >
              Join as a Vendor
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1">
          <img
            src="/hero-vendor.png"
            alt="Street Vendor Hero"
            className="w-full h-auto object-contain drop-shadow-xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
