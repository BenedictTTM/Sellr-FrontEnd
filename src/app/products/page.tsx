'use client';

import React, { useState, useEffect } from 'react';
import { ProductDetail } from '../../types/products';
import HeroSection from '../../Components/Hero/hero';
import ProductsGrid from '../../Components/ProductsComponents/productsGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <div className="px-8 py-8">
          <>
            <ProductsGrid products={products} />
          </>
      </div>
    </div>
  );
}