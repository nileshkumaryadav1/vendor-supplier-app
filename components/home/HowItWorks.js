"use client";

import { PackageSearch, Handshake, Store, Truck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Vendors Sign Up",
      icon: <Store className="w-8 h-8 text-green-600" />,
      desc: "Street food vendors register and list what raw materials they need regularly.",
    },
    {
      title: "2. Suppliers List Materials",
      icon: <PackageSearch className="w-8 h-8 text-green-600" />,
      desc: "Verified suppliers showcase their stock and pricing transparently.",
    },
    {
      title: "3. Match & Order",
      icon: <Handshake className="w-8 h-8 text-green-600" />,
      desc: "The system connects vendors to affordable, trusted sources nearby.",
    },
    {
      title: "4. Delivery & Trust",
      icon: <Truck className="w-8 h-8 text-green-600" />,
      desc: "Suppliers deliver on time. Vendors rate quality & build long-term trust.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 text-lg mb-12">
          A transparent, efficient system to connect the streets to the source.
        </p>

        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
