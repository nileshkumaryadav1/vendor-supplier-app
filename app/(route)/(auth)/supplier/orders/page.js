"use client";

import { useEffect, useState } from "react";

export default function SupplierOrders() {
  const [orders, setOrders] = useState([]);
  const [supplierId, setSupplierId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "supplier") {
      setSupplierId(user._id);
    }
  }, []);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders", err));
  }, []);

  const filteredOrders = orders.filter(
    (order) => order.supplierId === supplierId
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📦 Orders Received
      </h1>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No orders received yet.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {order.materialId?.name || "Material Name Not Found"}
              </h2>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Vendor:</span>{" "}
                  {order.vendorId?.name || "Unknown Vendor"}
                </p>
                <p>
                  <span className="font-medium">Supplier:</span>{" "}
                  {order.supplierId?.name || "Unknown Supplier"}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span> {order.quantity}
                </p>
                <p>
                  <span className="font-medium">Total Price:</span> ₹
                  {order.totalPrice}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
