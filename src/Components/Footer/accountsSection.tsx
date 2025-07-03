import React from "react";

export default function AccountSection() {
  const items = ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"];
  return (
    <div className="lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Account</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-white transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
