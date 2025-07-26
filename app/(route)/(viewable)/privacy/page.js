export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-[color:var(--foreground)]">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-gray-500">Last updated: July 25, 2025</p>

      <p className="mb-6">
        At <strong>RawEase</strong>, we are committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you use our platform. By accessing our site, you
        agree to the terms outlined below.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Personal Information:</strong> Name, email, phone number, address.</li>
          <li><strong>Account Data:</strong> Login credentials, vendor profile details.</li>
          <li><strong>Usage Data:</strong> IP address, device type, browser, access times.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To operate and maintain the platform.</li>
          <li>To improve services and user experience.</li>
          <li>To communicate with you about your account or transactions.</li>
          <li>To ensure security and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information. We may share data with
          service providers who help us operate our platform, under strict
          confidentiality agreements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p>
          We implement strong technical and organizational measures to protect
          your data. However, no digital platform is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You can access, correct, or delete your data anytime.</li>
          <li>You can opt out of marketing communications.</li>
          <li>Request a copy of your stored data by contacting us.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please reach out at: <br />
          <a
            href="mailto:nileshkumarextra@gmail.com"
            className="text-blue-600 hover:underline"
          >
            nileshkumarextra@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
