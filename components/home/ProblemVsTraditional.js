"use client";

export default function ProblemVsTraditional() {
  const problems = [
    {
      old: "Unorganized and scattered raw material sourcing",
      new: "One-stop platform with verified suppliers by location & category",
    },
    {
      old: "Irregular pricing and quality issues",
      new: "Transparent vendor ratings and feedback on quality, delivery, and price",
    },
    {
      old: "No tracking or order confirmation",
      new: "Live order tracking, status updates, and support",
    },
    {
      old: "Middlemen cut and increased cost",
      new: "Direct connection between vendor and supplier — no commission cuts",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20" id="problem-vs-traditional">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Solving Real Problems with Real Innovation
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Here&apos;s how we disrupt the traditional system that hurts street vendors daily.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          {problems.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Old Way ❌</h3>
              <p className="text-gray-700 mb-4">{item.old}</p>

              <h3 className="text-lg font-semibold text-green-600 mb-2">Our Way ✅</h3>
              <p className="text-gray-800">{item.new}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
