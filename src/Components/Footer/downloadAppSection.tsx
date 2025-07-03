import React from "react";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const appStores = [
  {
    id: "google-play",
    src: "/app-store.svg",
    alt: "Google Play",
    url: "https://play.google.com/store/apps"
  },
  {
    id: "app-store",
    src: "/google-play.svg",
    alt: "App Store",
    url: "https://www.apple.com/app-store/"
  }
];

export default function DownloadAppSection() {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Download App</h3>
      <p className="text-xs text-gray-400 mb-3">Save $3 with App New User Only</p>

      {/* QR + Store Buttons Layout */}
      <div className="flex items-center gap-4 mb-4">
        {/* QR Code */}
        <Image
          src="/qrCode.svg" // Replace with your QR image
          alt="QR Code"
          width={100}
          height={100}
        />

        {/* App Store Buttons */}
        <div className="flex flex-col gap-2">
          {appStores.map((store) => (
            <a key={store.id} href={store.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={store.src}
                alt={store.alt}
                width={140}
                height={45}
                className="hover:opacity-90 object-contain"
                style={{ objectFit: 'contain' }}
              />
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
