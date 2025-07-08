import React from 'react';
import { ProductDetail } from '../../types/products';
import ProductCard from './productCard';
import SectionHeader from './sectionHeader';

interface ProductsGridProps {
  products: ProductDetail[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="mt-16">
      {/* Horizontal Scrolling Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-48"> {/* Fixed width for each card */}
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
}