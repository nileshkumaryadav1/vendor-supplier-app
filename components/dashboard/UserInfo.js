export default function UserInfo({ user }) {  
  return (
    <div className="mb-8 md:p-6 p-4 border border-[color:var(--border)] rounded-2xl bg-[color:var(--card)] shadow-lg">
      <h2 className="text-md md:text-3xl font-extrabold text-[color:var(--foreground)] md:mb-6 mb-2 flex items-center gap-2">
        👤 {user.role} Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-1 text-[color:var(--secondary)]">
        {/* Personal Details */}
        <div>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">👨 Name:</span> {user.name}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">📞 Phone:</span> {user.phone || "N/A"}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">📧 Email:</span> {user.email}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">👔 Role:</span> {user.role}
          </p>
        </div>

        {/* Academic Details */}
        <div>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">🏢 Shop:</span> {user.shopName}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">📍 Location:</span> {user.location}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">👤 Status:</span> {user.status}
          </p>
          <p className="mb-1">
            <span className="text-[color:var(--foreground)]">👍 Verified:</span> {user.verified}
          </p>
        </div>
      </div>
    </div>
  );
}
