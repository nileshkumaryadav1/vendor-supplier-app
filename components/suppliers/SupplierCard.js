"use client";

import { FaStar, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

export default function SupplierCard({ supplier }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 transition-all border border-gray-100 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {supplier.name}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <FaMapMarkerAlt className="text-red-500" />
            {supplier.location}
          </p>
        </div>
        {supplier.verified && (
          <FaCheckCircle className="text-green-500 text-xl" title="Verified Supplier" />
        )}
      </div>

      <div>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Category:</span> {supplier.category}
        </p>
        <p className="text-gray-700 text-sm mt-1">
          <span className="font-semibold">Items:</span> {supplier.items.join(", ")}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <FaStar className="text-yellow-400" />
        <span className="text-sm font-medium">{supplier.rating.toFixed(1)} / 5.0</span>
      </div>

      <button className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition">
        View Details
      </button>
    </div>
  );
}
