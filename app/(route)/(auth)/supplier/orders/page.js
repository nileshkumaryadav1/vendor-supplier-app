"use client";

import { useEffect, useState } from "react";

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [supplierId, setSupplierId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role !== "supplier" || !user?._id) {
      setError("Unauthorized: Not a supplier.");
      setLoading(false);
      return;
    }

    setSupplierId(user._id);

    fetch("/api/homepage")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        // Filter client-side
        const filtered = data.filter((order) => order.supplierId?._id === user._id);
        setOrders(filtered);
      })
      .catch((err) => {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders.");
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Update failed");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

    console.log(orders);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Orders Received
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders received yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-green-700">
                  {order.materialId?.name || "Unnamed Material"}
                </h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-700 mt-2">
                <strong>Vendor:</strong> {order.vendorId?.name || "Unknown"}
              </p>
              <p className="text-gray-700">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="text-gray-700">
                <strong>Total:</strong> {formatCurrency(order.totalPrice)}
              </p>

              {order.status === "Processing" && (
                <button
                  onClick={() => updateStatus(order._id, "Shipped")}
                  disabled={updatingId === order._id}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
                >
                  {updatingId === order._id
                    ? "Updating..."
                    : "Mark as Shipped"}
                </button>
              )}

              {order.status === "Shipped" && (
                <button
                  onClick={() => updateStatus(order._id, "Delivered")}
                  disabled={updatingId === order._id}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
                >
                  {updatingId === order._id
                    ? "Updating..."
                    : "Mark as Delivered"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
