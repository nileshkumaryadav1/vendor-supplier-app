"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackageCheck, Loader2, XCircle } from "lucide-react";

export default function OrderedItemPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      fetch(`/api/orders/${parsed._id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching orders", err);
          setOrders([]);
          setLoading(false);
        });
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const handleCancelOrder = async (materialId, orderId) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/orders`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId: user._id, materialId }),
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        const errorData = await res.json();
        alert(
          "Failed to cancel order: " + (errorData.message || "Unknown error.")
        );
      }
    } catch (err) {
      console.error("Error canceling order:", err);
      alert("Something went wrong while canceling the order.");
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case "Processing":
        return <span className="text-yellow-600 font-medium">Processing</span>;
      case "Shipped":
        return <span className="text-blue-600 font-medium">Shipped</span>;
      case "Delivered":
        return <span className="text-green-600 font-medium">Delivered</span>;
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <Loader2 className="animate-spin mr-2" />
        Loading your orders...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] md:px-4 px-2 md:py-10 py-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2 md:mb-6 mb-2">
          <PackageCheck size={24} /> Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 flex flex-col items-center gap-2 mt-12">
            <XCircle size={32} />
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-5 border rounded-xl shadow-sm bg-white text-black"
              >
                <h2 className="text-lg font-semibold mb-1">
                  {order.materialId?.name || "Unnamed Material"}
                </h2>
                <p>
                  Quantity: <strong>{order.quantity}</strong>
                </p>
                <p>
                  Total Price: ₹<strong>{order.totalPrice}</strong>
                </p>
                <p>Status: {renderStatus(order.status)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment Method: {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery Location: {order.location}
                </p>

                <button
                  onClick={() =>
                    handleCancelOrder(order.materialId?._id, order._id)
                  }
                  className="mt-4 px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                  disabled={["Shipped", "Delivered"].includes(order.status)}
                >
                  Cancel order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
