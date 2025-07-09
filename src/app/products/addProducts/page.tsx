'use client';

import { useState } from 'react';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    category: '',
    discount: '',
    condition: '',
    tags: '',
    locationLat: '',
    locationLng: '',
    stock: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setMainImageIdx(0);
    }
  };

  const handleThumbnailClick = (idx: number) => {
    setMainImageIdx(idx);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach(file => formData.append('images', file));
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('originalPrice', form.originalPrice);
      formData.append('discountedPrice', form.discountedPrice);
      formData.append('category', form.category);
      formData.append('discount', form.discount);
      formData.append('condition', form.condition);
      formData.append('locationLat', form.locationLat);
      formData.append('locationLng', form.locationLng);
      formData.append('stock', form.stock);

      // Convert tags string to array and append each tag separately
      const rawTags = form.tags || "";
      const tagsArray = rawTags
        .split(',')
        .map(tag => tag.trim())
        .filter((tag, index, self) => tag.length > 0 && self.indexOf(tag) === index);

      tagsArray.forEach(tag => formData.append('tags', tag));

      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log('FormData:', pair[0], pair[1]);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log('Request headers:', headers);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers,
        body: formData,
      });

      console.log('Backend response status:', response.status);

      const data = await response.json();
      console.log('Backend response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
      setImages([]);
      setMainImageIdx(0);
    } catch (err: any) {
      setError(err.message);
      console.error('Error in handleSubmit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Preview Section */}
        {images.length > 0 && (
          <div>
            <div className="flex justify-center mb-2">
              <img
                src={URL.createObjectURL(images[mainImageIdx])}
                alt="Main Preview"
                className="w-48 h-48 object-cover rounded-lg border-2 border-primary"
              />
            </div>
            <div className="flex gap-2 justify-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-12 h-12 object-cover rounded border cursor-pointer ${
                    idx === mainImageIdx ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-300'
                  }`}
                  onClick={() => handleThumbnailClick(idx)}
                />
              ))}
            </div>
          </div>
        )}

        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input input-bordered w-full" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="textarea textarea-bordered w-full" required />
        <input type="number" name="originalPrice" placeholder="Original Price" value={form.originalPrice} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="number" name="discountedPrice" placeholder="Discounted Price" value={form.discountedPrice} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="input input-bordered w-full" />
        <input type="number" name="discount" placeholder="Discount" value={form.discount} onChange={handleChange} className="input input-bordered w-full" />
        <input type="text" name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} className="input input-bordered w-full" />
        <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="input input-bordered w-full" />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="file-input file-input-bordered w-full" />
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {success && <div className="mt-2 text-green-600">Product created successfully!</div>}
    </div>
  );
}