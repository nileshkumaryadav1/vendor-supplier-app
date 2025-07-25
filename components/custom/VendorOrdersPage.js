"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [vendor, setVendor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedVendor = JSON.parse(localStorage.getItem("vendor"));
    setVendor(storedVendor);

    if (!storedVendor) {
      router.push("/login");
      return;
    }

    if (storedVendor?._id) {
      fetch(`/api/orders/vendor/${storedVendor._id}`)
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="border p-4 rounded-md shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold">{order.materialId.name}</h2>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Status: <span className="font-medium">{order.status}</span></p>
              <p className="text-sm text-gray-500">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
