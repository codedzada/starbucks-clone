import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartCount } from '../../utils/cartStore';
import CartDrawer from './CartDrawer';

const StoreAndCartBar = () => {
  const navigate = useNavigate();
  const reduxStore = useSelector((state) => state.store?.selectedStore);
  const [selectedStore, setSelectedStore] = useState(reduxStore);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (reduxStore) {
      setSelectedStore(reduxStore);
    } else {
      const store = localStorage.getItem('selectedStore');
      if (store) {
        try { setSelectedStore(JSON.parse(store)); } catch { /* ignore */ }
      }
    }

    // Sync cart count whenever cart-updated fires
    const onCartUpdate = (e) => setCartCount(e.detail?.length ?? getCartCount());
    window.addEventListener('cart-updated', onCartUpdate);
    return () => window.removeEventListener('cart-updated', onCartUpdate);
  }, [reduxStore]);

  return (
    <>
      {/* ── Cart Drawer ── */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* ── Bottom Bar ── */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1e3932] text-white py-4 px-6 md:px-12 flex items-center justify-between z-40 border-t border-[#122420] shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">
        {/* Left: Location selector */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] md:text-[12px] uppercase tracking-wider text-gray-300 font-medium">
            For item availability
          </span>
          <button
            onClick={() => navigate('/store-locator')}
            className="flex items-center gap-1.5 text-[14px] md:text-[15px] font-semibold underline hover:text-gray-200 transition-colors cursor-pointer mt-0.5"
          >
            {selectedStore ? (
              <span className="truncate max-w-[160px] sm:max-w-xs">{selectedStore.name}</span>
            ) : (
              <span>Choose a store</span>
            )}
            <svg className="w-4 h-4 fill-current mt-0.5" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>

        {/* Right: Shopping bag — click opens CartDrawer */}
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} item${cartCount !== 1 ? 's' : ''}` : ''}`}
          className="relative p-1 transition-transform active:scale-95 hover:scale-110 transition-all duration-150 cursor-pointer group"
        >
          <svg
            className="w-7 h-7 text-white stroke-current group-hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span
            className={`absolute -top-1.5 -right-1.5 bg-[#006241] border border-white text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md transition-all duration-300 ${
              cartCount > 0 ? 'scale-110' : ''
            }`}
          >
            {cartCount}
          </span>
        </button>
      </div>
    </>
  );
};

export default StoreAndCartBar;
