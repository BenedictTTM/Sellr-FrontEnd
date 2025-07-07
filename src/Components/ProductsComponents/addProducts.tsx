'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  locationLat?: number;
  locationLng?: number;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: 0,
    category: '',
    tags: [],
    locationLat: 0,
    locationLng: 0,
  });

  const categories = [
    'Electronics',
    'Books',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'locationLat' || name === 'locationLng' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append product data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('locationLat', formData.locationLat?.toString() || '0');
      formDataToSend.append('locationLng', formData.locationLng?.toString() || '0');
      
      // Append image file if selected
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          // Don't set Content-Type header, let browser set it for FormData
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Product created successfully!');
        router.push('/products'); // Redirect to products page
      } else {
        throw new Error(result.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Choose Image
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your product"
              />
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., new, electronics, smartphone)"
              />
              <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
            </div>

            {/* Location (Optional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="locationLat" className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude (Optional)
                </label>
                <input
                  type="number"
                  id="locationLat"
                  name="locationLat"
                  step="any"
                  value={formData.locationLat}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.0"
                />
              </div>

              <div>
                <label htmlFor="locationLng" className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude (Optional)
                </label>
                <input
                  type="number"
                  id="locationLng"
                  name="locationLng"
                  step="any"
                  value={formData.locationLng}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.0"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}