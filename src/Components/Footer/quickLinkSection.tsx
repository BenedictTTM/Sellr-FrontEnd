import React from "react";

export default function QuickLinkSection() {
  const links = ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"];
  return (
    <div className="lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-white transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
