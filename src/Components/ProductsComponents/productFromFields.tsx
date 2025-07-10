import React from 'react';
import CategorySelector from './categorySelector';

interface ProductFormFieldsProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const labelClass = "block mb-1 font-semibold text-gray-700";
const inputClass = "input input-bordered w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400";

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ form, handleChange }) => (
  <div className=" p-8 rounded-xl shadow-md max-w-2xl mx-auto space-y-5">
    <div>
      <label className={labelClass} htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className={inputClass}
        required
      />
    </div>
    <div>
      <label className={labelClass} htmlFor="category">Category</label>
      <CategorySelector
        value={form.category}
        onChange={cat => handleChange({ target: { name: 'category', value: cat } })}
      />
    </div>
    <div>
      <label className={labelClass} htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className={inputClass + " min-h-[80px]"}
        required
      />
    </div>
    <div className="flex gap-4">
      <div className="flex-1">
        <label className={labelClass} htmlFor="originalPrice">Original Price</label>
        <input
          type="number"
          name="originalPrice"
          id="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>
      <div className="flex-1">
        <label className={labelClass} htmlFor="discountedPrice">Discounted Price</label>
        <input
          type="number"
          name="discountedPrice"
          id="discountedPrice"
          placeholder="Discounted Price"
          value={form.discountedPrice}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>
    </div>
    <div>
      <label className={labelClass} htmlFor="condition">Condition</label>
      <input
        type="text"
        name="condition"
        id="condition"
        placeholder="Condition"
        value={form.condition}
        onChange={handleChange}
        className={inputClass}
      />
    </div>
    <div>
      <label className={labelClass} htmlFor="tags">Tags</label>
      <input
        type="text"
        name="tags"
        id="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className={inputClass}
      />
    </div>
  </div>
);

export default ProductFormFields;