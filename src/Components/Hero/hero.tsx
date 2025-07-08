'use client';

import React, { useState, useEffect } from 'react';
import CatergorySideBar from '../Categories/categorySidebar';

interface HeroSlide {
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  textColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    buttonText: "Shop Now",
    bgColor: "bg-black",
    textColor: "text-white"
  },
  {
    title: "Gaming Collection",
    subtitle: "Up to 25% off Gaming Gear",
    buttonText: "Shop Now",
    bgColor: "bg-blue-600",
    textColor: "text-white"
  },
  {
    title: "Electronics Sale",
    subtitle: "Best Deals on Electronics",
    buttonText: "Shop Now",
    bgColor: "bg-purple-600",
    textColor: "text-white"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-80">
      {/* Sidebar */}
      <div className="w-64">
        <CatergorySideBar />
      </div>

      {/* Hero Carousel */}
      <div className="flex-1 relative overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${slide.bgColor} ${slide.textColor} transition-transform duration-500 ease-in-out flex items-center`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`
            }}
          >
            <div className="flex w-full max-w-6xl mx-auto px-8">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-sm mb-2 opacity-80">{slide.title}</p>
                <h1 className="text-4xl font-bold mb-6">{slide.subtitle}</h1>
                <button className="inline-flex items-center px-6 py-3 bg-transparent border border-current rounded hover:bg-white hover:text-black transition-colors w-fit">
                  {slide.buttonText}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}