'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Health & Beauty",
];

export default function CategorySidebar() {
  return (
    <div className="h-80 bg-white border-r border-gray-200 p-6">
      <div className="space-y-0.1">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-3 rounded cursor-pointer transition-colors"
          >
            <span>{category}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}