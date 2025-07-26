// components/home/CTASection.jsx
"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-green-600 text-white py-16 px-6 md:px-20 rounded-t-3xl shadow-lg">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold leading-tight">
          Empowering Street Vendors with Trusted Suppliers 🛒
        </h2>
        <p className="text-lg text-white/90">
          Whether you&apos;re a vendor looking for affordable quality materials or a supplier aiming to grow — we&apos;ve built this platform for <span className="font-semibold underline underline-offset-4">you</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/register"
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Join as a Vendor
          </Link>
          <Link
            href="/suppliers"
            className="bg-transparent border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-green-600 transition"
          >
            Explore Suppliers
          </Link>
        </div>
      </div>
    </section>
  );
}
