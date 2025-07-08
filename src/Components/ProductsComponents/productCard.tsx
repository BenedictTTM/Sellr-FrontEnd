'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductCard as ProductCardType } from '../../types/products';
import placeholder from '../../../public/placeholder-image.png';
import { CiHeart } from "react-icons/ci";
import SimpleStarRating from '../../Components/Rating/rating'; // Add this import

interface ProductCardProps {
  product: ProductCardType;
  showSale?: boolean;
}

export default function ProductCard({ product, showSale = false }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group h-full">
      <div className=" rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200 relative aspect-[3/5]  flex flex-col">
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 z-10">
          <CiHeart className="w-4 h-4" />
        </button>

        {/* Image Section - Fixed Height */}
        <div className="aspect-square w-full overflow-hidden bg-gray-100 relative flex-shrink-0">
          <Image
            src={product.imageUrl || placeholder.src}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = placeholder.src;
            }}
          />
        </div>

        {/* Content Section - Flexible Height */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title - Fixed Height */}
          <h3 className="font-medium text-gray-900 mb-1 text-sm group-hover:text-red-900 min-h-[1.5rem] line-clamp-1">
            {product.title}
          </h3>
    
          {/* Price */}
          <div className="flex items-center gap-1 mb-1">
            <span className="text-red-500 font-semibold text-md">
              ${product.price}
            </span>
          </div>

          {/* Simple Star Rating */}
          <div className="mb-1">
            <SimpleStarRating 
              rating={Math.round(product.averageRating)} 
              totalReviews={product.totalReviews}
              size={14}
              showCount={true}
            />
          </div>
    
        </div>
      </div>
    </Link>
  );
}