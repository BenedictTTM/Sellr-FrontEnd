import React from 'react'
import heroDarkBackground from '../../../public/heroDarkBackIphone.png';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const hero = () => {
  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden">
      {/* Blue gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 p-1">
        <div className="w-full h-full bg-black">
          {/* Content Container */}
          <div className="relative w-full h-full flex items-center">
            {/* Left Content */}
            <div className="flex-1 px-12 z-10">
              {/* Apple Logo and Text */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">iPhone 14 Series</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                Up to 10%<br />
                off Voucher
              </h1>

              {/* Shop Now Button */}
              <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:border-gray-300 transition-colors group">
                <span className="text-lg">Shop Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content - iPhone Image */}
            <div className="flex-1 relative h-full">
              <Image
                src={heroDarkBackground}
                alt="iPhone 14 Series"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default hero