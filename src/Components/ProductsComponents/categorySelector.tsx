import React, { useEffect, useRef, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { categories } from '../../constants/categories'; // categories: [{ name, subcategories: [] }]

type Category = {
  name: string;
  subcategories: string[];
};

interface CategorySelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Filter categories based on search term (search both main and subcategory names)
  const filteredCategories: Category[] = categories.filter((category) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    if (category.name.toLowerCase().includes(q)) return true;
    return category.subcategories.some((s) => s.toLowerCase().includes(q));
  });

  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closePanel();
      }
    }

    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    }

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  const openPanel = () => setIsOpen(true);
  const closePanel = () => {
    setIsOpen(false);
    setSearchTerm('');
    setActiveMain(null);
  };

  const toggleMain = (name: string) => {
    setActiveMain((cur) => (cur === name ? null : name));
  };

  const selectCategory = (main: string, sub?: string) => {
    const selected = sub ?? main;
    onChange(selected);
    closePanel();
  };

  const handleButtonClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    openPanel();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="input input-bordered w-full text-left px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
        style={{ color: value ? '#222' : '#888' }}
      >
        {value || (
          <span className="flex items-center justify-between w-full text-gray-400">
            <span className="flex items-center gap-2">Category</span>
            <MdNavigateNext />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal
            className="bg-white p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button
                onClick={closePanel}
                aria-label="Close categories"
                className="text-2xl leading-none text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for a category or subcategory"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-gray-400"
                aria-label="Search categories"
              />
            </div>

            <div>
              <h3 className="font-medium mb-2 text-gray-700">All categories</h3>
              {filteredCategories.length === 0 ? (
                <div className="text-gray-400 py-4 text-center">No categories found</div>
              ) : (
                filteredCategories.map((category, idx) => (
                  <div key={idx} className="mb-2">
                    <div
                      onClick={() => toggleMain(category.name)}
                      className={`flex justify-between items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer transition ${
                        activeMain === category.name ? 'bg-orange-50 border-orange-300' : 'bg-white hover:bg-gray-50'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') toggleMain(category.name);
                      }}
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-400">›</span>
                    </div>

                    {activeMain === category.name && (
                      <div className="ml-6 mt-2">
                        {category.subcategories.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            onClick={() => selectCategory(category.name, sub)}
                            className="px-3 py-2 border border-gray-100 rounded cursor-pointer mb-1 bg-white hover:bg-orange-100 transition"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') selectCategory(category.name, sub);
                            }}
                          >
                            {sub}
                          </div>
                        ))}
                        {/* allow selecting the main category explicitly */}
                        <div
                          onClick={() => selectCategory(category.name)}
                          className="mt-2 px-3 py-2 border border-gray-100 rounded cursor-pointer bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          Select {category.name}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;