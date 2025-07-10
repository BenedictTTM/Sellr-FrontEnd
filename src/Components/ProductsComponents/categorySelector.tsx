import React, { useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import { categories } from '../../constants/categories'; // categories: [{ name, subcategories: [] }]

const CategorySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMain, setActiveMain] = useState(null);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCategories = () => setIsOpen(true);
  const handleCloseCategories = () => {
    setIsOpen(false);
    setSearchTerm('');
    setActiveMain(null);
  };

  const handleMainCategoryClick = (categoryName) => {
    setActiveMain(categoryName === activeMain ? null : categoryName);
  };

  const handleCategorySelect = (main, sub = null) => {
    if (sub) {
      onChange(sub); // Only pass the subcategory name
    } else {
      onChange(main);
    }
    setIsOpen(false);
    setSearchTerm('');
    setActiveMain(null);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div>
      {/* Button or input to open categories */}
      <button
        type="button"
        onClick={handleOpenCategories}
        className="input input-bordered w-full text-left px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
        style={{ color: value ? "#222" : "#888" }}
      >
        {value || (
          <span className="flex items-center gap-2 text-gray-400">
            Category <MdNavigateNext />
          </span>
        )}
      </button>

      {/* Categories Modal/Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-auto shadow-lg">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button onClick={handleCloseCategories} className="text-2xl leading-none text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for a category"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
              />
            </div>

            {/* Categories List */}
            <div>
              <h3 className="font-medium mb-2 text-gray-700">All the categories</h3>
              {filteredCategories.length === 0 && (
                <div className="text-gray-400 py-4 text-center">No categories found</div>
              )}
              {filteredCategories.map((category, index) => (
                <div key={index} className="mb-2">
                  {/* Main Category */}
                  <div
                    onClick={() => handleMainCategoryClick(category.name)}
                    className={`flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer transition
                      ${activeMain === category.name ? 'bg-orange-50 border-orange-300' : 'bg-white hover:bg-gray-50'}
                    `}
                  >
                    <span>{category.name}</span>
                    <span className="text-gray-400">&rsaquo;</span>
                  </div>

                  {/* Subcategories (shown when main category is active) */}
                  {activeMain === category.name && (
                    <div className="ml-6 mt-2">
                      {category.subcategories.map((sub, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={() => handleCategorySelect(category.name, sub)}
                          className="px-3 py-2 border border-gray-100 rounded cursor-pointer mb-1 bg-white hover:bg-orange-100 transition"
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;