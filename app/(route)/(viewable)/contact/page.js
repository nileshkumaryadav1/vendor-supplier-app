export default function AboutContactPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* About Section */}
        <section className="space-y-6">
          <h1 className="text-4xl font-bold text-blue-600">About RawEase</h1>
          <p className="text-lg text-gray-700">
            RawEase is on a mission to revolutionize the raw material supply chain for street food vendors. We connect trusted suppliers with small-scale food businesses, making sourcing easier, more affordable, and reliable.
          </p>
          <p className="text-gray-600">
            Our platform helps street vendors get access to quality ingredients, transparent pricing, and doorstep delivery — all while ensuring suppliers get a digital space to grow their business.
          </p>
          <p className="text-gray-600">
            We are a passionate team of developers, designers, and changemakers working toward empowering the informal food sector with modern technology.
          </p>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-600">Get in Touch</h2>
          <p className="text-gray-700">
            Whether you&apos;re a vendor, supplier, or someone with ideas — we&apos;d love to hear from you.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">📧 Email</h3>
              <p className="text-gray-700">nileshkumarextra@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold">📞 Phone</h3>
              <p className="text-gray-700">+91 62055 30252</p>
            </div>
            <div>
              <h3 className="font-semibold">🏢 Office</h3>
              <p className="text-gray-700">
                RawEase Pvt. Ltd.<br />
                NH 31, Hajipur<br />
                Katihar, Bihar - 854106
              </p>
            </div>
            <div>
              <h3 className="font-semibold">🕒 Business Hours</h3>
              <p className="text-gray-700">Mon - Fri: 10 AM – 6 PM</p>
              <p className="text-gray-700">Closed: Sat/Sun & Holidays</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
