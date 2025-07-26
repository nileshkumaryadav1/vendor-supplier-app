"use client";

import { ShieldCheck, Rocket, Users, Star } from "lucide-react";

export default function UniqueFeatures() {
  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Not Just Ecommerce",
      desc: "Unlike a typical ecommerce site, we create curated vendor-supplier matching with smart filters, not just open listings.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Street Vendor Focus",
      desc: "We're built *for* and *with* street food vendors. We understand their specific needs and irregular ordering patterns.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Verified & Trusted Suppliers",
      desc: "Every supplier is verified to reduce fake pricing or poor quality delivery — unlike open markets.",
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "Quality & Price Ratings",
      desc: "Vendors can rate suppliers on quality, punctuality, and pricing. This builds a trust network organically.",
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-20 px-6 md:px-20" id="unique">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Why Our Platform is Unique
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Built with ground realities in mind — this isn&apos;t just another marketplace.
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
