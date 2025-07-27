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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Order Received</h1>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-md shadow-md border"
            >
              <h2 className="text-lg font-semibold">
                {order.materialId?.name || "Material Name Not Found"}
              </h2>
              <p>Vendor: {order.vendorId?.name}</p>
              <p>Supplier: {order.supplierId?.name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
