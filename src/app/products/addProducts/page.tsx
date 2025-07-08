'use client';

import { useState } from 'react';

export default function CreateProductPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    discount: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('discount', form.discount);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input type="number" name="discount" placeholder="Discount" value={form.discount} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>Product created successfully!</div>}
    </div>
  );
}