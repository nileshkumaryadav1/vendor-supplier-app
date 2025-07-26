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

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-600 font-medium">Pending</span>;
      case "confirmed":
        return <span className="text-green-600 font-medium">Confirmed</span>;
      case "cancelled":
        return <span className="text-red-600 font-medium">Cancelled</span>;
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

  console.log(orders);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
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
                <p>Quantity: <strong>{order.quantity}</strong></p>
                <p>Total Price: ₹<strong>{order.totalPrice}</strong></p>
                <p>Status: {renderStatus(order.status)}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery Date:{" "}
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery Address: {order.deliveryAddress}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Delivery Time: {order.deliveryTime}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
