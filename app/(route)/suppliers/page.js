import SupplierCard from "@/components/suppliers/SupplierCard";

const dummySuppliers = [
  {
    name: "FreshMart Distributors",
    location: "Delhi",
    category: "Vegetables",
    items: ["Tomatoes", "Onions", "Cabbage"],
    rating: 4.6,
    verified: true,
  },
  {
    name: "Spice Hub",
    location: "Lucknow",
    category: "Spices",
    items: ["Turmeric", "Cumin", "Coriander"],
    rating: 4.2,
    verified: false,
  },
];

export default function AllSuppliersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-8">All Verified Suppliers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummySuppliers.map((s, i) => (
          <SupplierCard key={i} supplier={s} />
        ))}
      </div>
    </div>
  );
}
