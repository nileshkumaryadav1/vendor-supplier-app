import React from "react";
import connectDB from "@/lib/db";
import Supplier from "@/models/User";
import Material from "@/models/Material";
import BuyButton from "@/components/custom/BuyButton";

export const dynamic = "force-dynamic";

async function SupplierDetailPage({ params }) {
  await connectDB();
  const supplierId = params.id;

  // Fetch supplier
  const supplier = await Supplier.findById(supplierId).lean();
  if (!supplier) {
    return (
      <div className="p-6 text-center text-red-600 font-medium">
        ❌ Supplier not found.
      </div>
    );
  }

  // Fetch materials
  const materials = await Material.find({ supplierId }).lean();

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Supplier Card */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border space-y-2">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)]">
          🧑‍🌾 {supplier.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">📍 {supplier.location}</p>
        <p className="text-gray-600 dark:text-gray-400">📞 {supplier.phone}</p>
        <p className="text-gray-600 dark:text-gray-400">📧 {supplier.email}</p>
        <span className="inline-block text-sm mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full">
          Supplier ID: {supplier._id.toString().slice(-6).toUpperCase()}
        </span>
      </section>

      {/* Material Listing */}
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md border">
        <h2 className="text-2xl font-semibold mb-6 text-[color:var(--foreground)]">
          🧾 Materials by {supplier.name}
        </h2>

        {materials.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">
            No materials listed by this supplier yet.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((item) => (
              <div
                key={item._id}
                className="border p-5 rounded-xl bg-gray-50 dark:bg-zinc-800 shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-[color:var(--foreground)]">
                  🏷️ {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
                <p className="text-green-600 font-semibold mt-2">₹ {item.price}</p>
                <div className="mt-4">
                  <BuyButton materialId={item._id} supplierId={supplier._id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SupplierDetailPage;
