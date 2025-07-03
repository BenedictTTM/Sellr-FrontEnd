import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const downloadPlatforms = [
  {
    id: "google-play",
    name: "Google Play",
    text: "GET IT ON",
    icon: "/icons/google-play.svg", // Move to /public/icons for performance and control
    url: "https://play.google.com/store/apps"
  },
  {
    id: "app-store",
    name: "App Store",
    text: "Download on the",
    icon: "/icons/app-store.png", // Local path
    url: "https://www.apple.com/app-store/"
  }
];

export default function DownloadAppSection() {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Download App</h3>
      <p className="text-xs text-gray-400 mb-3">Save $3 with App New User Only</p>

      {/* Fake QR */}
      <div className="flex gap-2 mb-4">
      

        {/* App store buttons */}
        <div className="flex flex-col gap-1">

             {downloadPlatforms.map((store) => (
  <a key={store.id} href={store.url} className="bg-black border border-gray-600 rounded px-2 py-1 flex items-center gap-2 hover:opacity-90">
    <img src={store.icon} alt={store.name} className="w-6 h-6 object-contain" />
    <div className="text-xs leading-tight">
      <div className="text-gray-400">{store.text}</div>
      <div className="font-semibold text-white">{store.name}</div>
    </div>
  </a>
))}

          </div>

         
    
      </div>

      {/* Social icons */}
      <div className="flex gap-4">
        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
          <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
