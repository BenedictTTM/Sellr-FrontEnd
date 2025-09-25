import React from "react";
import QuantitySelector from "./quantitySelector";

interface ProductActionsProps {
  quantity: number;
  maxQuantity?: number;
  inStock: boolean;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onAddToCart: () => void;
}

export default function ProductActions({ 
  quantity, 
  maxQuantity, 
  inStock,
  onIncreaseQuantity, 
  onDecreaseQuantity,
  onAddToCart 
}: ProductActionsProps) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <QuantitySelector 
        quantity={quantity}
        maxQuantity={maxQuantity}
        onIncrease={onIncreaseQuantity}
        onDecrease={onDecreaseQuantity}
      />

      <div className="mt-3 sm:mt-0 flex-1">
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded shadow text-white transition-colors ${
            inStock 
              ? "bg-orange-500 hover:bg-orange-600" 
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          {inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </div>
  );
}