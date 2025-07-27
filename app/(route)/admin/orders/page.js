// app/admin/orders/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📦 All Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-lg shadow bg-white space-y-2"
            >
              <p><span className="font-semibold">Order ID:</span> {order._id}</p>
              <p><span className="font-semibold">Vendor ID:</span> {order.vendorId}</p>
              <p><span className="font-semibold">Material ID:</span> {order.materialId?._id}</p>
              <p><span className="font-semibold">Material Name:</span> {order.materialId?.name || "N/A"}</p>
              <p><span className="font-semibold">Supplier ID:</span> {order.supplierId}</p>
              <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
              <p><span className="font-semibold">Total Price:</span> ₹{order.totalPrice}</p>
              <p><span className="font-semibold">Location:</span> {order.location}</p>
              <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-blue-600">{order.status}</span></p>
              <p className="text-sm text-gray-500">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
