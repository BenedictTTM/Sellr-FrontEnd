"use client";
import React, { useState } from "react";
import ExclusiveSection from "./exclusiveSection";
import SupportSection from "./supportsSection"
import AccountSection from "./accountsSection";
import QuickLinkSection from "./quickLinkSection";
import DownloadAppSection from "./downloadAppSection";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <ExclusiveSection
            email={email}
            setEmail={setEmail}
            handleSubscribe={handleSubscribe}
          />
          <SupportSection />
          <AccountSection />
          <QuickLinkSection />
          <DownloadAppSection />
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
