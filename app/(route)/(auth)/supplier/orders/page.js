"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("supplier"));
    setSupplier(stored);

    if (stored?._id) {
      fetch(`/api/orders/supplier/${stored._id}`)
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    });

    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6">Orders Received</h1>

      {orders.length === 0 ? (
        <p>No orders received yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-md shadow-md border"
            >
              <h2 className="text-lg font-semibold">{order.materialId.name}</h2>
              <p>Vendor: {order.vendorId?.name}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ₹{order.totalPrice}</p>
              <p>Status: <strong>{order.status}</strong></p>

              {/* Status Update Buttons */}
              {order.status === "pending" && (
                <button
                  onClick={() => updateStatus(order._id, "accepted")}
                  className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                >
                  Accept Order
                </button>
              )}
              {order.status === "accepted" && (
                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
