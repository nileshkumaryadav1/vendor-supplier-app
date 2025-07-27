"use client";

import { useEffect, useState } from "react";

export default function OrdersReceivedPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const allOrders = await res.json();

        // Filter: only orders for this supplier’s materials
        const supplierOrders = allOrders.filter(
          (order) => order.materialId?.supplierId === user._id
        );

        setOrders(supplierOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeliveryDateUpdate = async (orderId, newDate) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/delivery`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryDate: newDate }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, deliveryDate: newDate } : order
          )
        );
      } else {
        console.error("Failed to update delivery date");
      }
    } catch (error) {
      console.error("Error updating date", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Orders Received</h2>

      {orders.length === 0 ? (
        <p>No orders received for your materials.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded shadow-sm">
              <p>
                <strong>Material:</strong> {order.materialId?.name}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Delivery Date:</strong>{" "}
                {order.deliveryDate || "Not set"}
              </p>

              <input
                type="date"
                className="border px-2 py-1 mt-2"
                onChange={(e) =>
                  handleDeliveryDateUpdate(order._id, e.target.value)
                }
                disabled={updating}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
