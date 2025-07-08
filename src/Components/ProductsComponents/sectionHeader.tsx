import React from 'react';

interface SectionHeaderProps {
  category: string;
  title: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

export default function SectionHeader({ category, title, showViewAll = false, onViewAll }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="w-4 h-8 bg-red-500 rounded mr-3"></div>
        <span className="text-red-500 font-medium">{category}</span>
      </div>
      {showViewAll && (
        <button
          onClick={onViewAll}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          View All →
        </button>
      )}
    </div>
  );
}