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
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export default function CategorySidebar() {
  return (
    <div className="h-90 bg-white p-6">
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-3 rounded cursor-pointer transition-colors"
          >
            <span>{category}</span>
            {category === "Men's Fashion" && <ChevronRight className="w-4 h-4 text-gray-400" />}
          </div>
        ))}
      </div>
    </div>
  );
}