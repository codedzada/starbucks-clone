import React from 'react';

// ── OrderActionButtons ────────────────────────────────────────────────----
const OrderActionButtons = ({ 
  onAddToOrder, 
  onCustomizeClick, 
  onFavoriteClick, 
  isFavorite = false, 
  showCustomize = true, 
  isCartOpen = false 
}) => {
  // Səbət açıqdırsa, düymələri göstərmə
  if (isCartOpen) return null;

  return (
    <>
      {/* Customize & Favorite container */}
      {showCustomize && (
        <div className="w-full flex items-center justify-center gap-4 py-8">
          {/* Customize Button */}
          <button
            type="button"
            onClick={onCustomizeClick}
            className="flex items-center gap-2.5 px-10 py-4 bg-[#1e3932] hover:bg-[#0B3B2E] active:scale-[0.97] text-white rounded-full text-[15px] font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-yellow-300 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 16l.75 2.25L8 19l-2.25.75L5 22l-.75-2.25L2 19l2.25-.75L5 16zM19 16l.75 2.25L22 19l-2.25.75L19 22l-.75-2.25L16 19l2.25-.75L19 16z" />
            </svg>
            Customize
          </button>

          {/* Favorite (Heart) Button */}
          <button
            type="button"
            onClick={onFavoriteClick}
            className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
              isFavorite 
                ? 'border-red-500 bg-red-50 text-red-500' 
                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
            }`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`w-6 h-6 transition-colors ${isFavorite ? 'fill-current text-red-500' : 'fill-none stroke-current'}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      )}

      {/* Add to Order — fixed to bottom-right corner */}
      <button
        type="button"
        onClick={onAddToOrder}
        className="fixed bottom-20 right-6 md:right-10 z-40 px-10 py-4 bg-[#006241] hover:bg-[#004d32] active:scale-[0.97] text-white rounded-full text-[16px] font-bold tracking-wide shadow-2xl hover:shadow-xl transition-all duration-200 cursor-pointer"
      >
        Add to Order
      </button>
    </>
  );
};

export default OrderActionButtons;