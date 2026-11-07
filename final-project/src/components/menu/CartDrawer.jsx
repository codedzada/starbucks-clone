import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getCart, saveOrderToHistory } from '../../utils/cartStore';
import { useAuth } from '../../features/auth/AuthContext';
import { addOrder } from '../../redux/previousOrdersSlice';
import { calculateCartSubtotal, calculateProductPrice, formatPrice } from '../../utils/priceHelper';
import RemoveCartItemButton from './RemoveCartItemButton';

// ── Helpers ───────────────────────────────────────────────────────────────
const CART_KEY = 'sbux_cart';

const removeFromCart = (itemId) => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const next = cart.filter((i) => i.id !== itemId);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: next }));
  } catch {/* ignore */}
};

const clearCart = () => {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
};

// ── Success Modal ─────────────────────────────────────────────────────────
const showOrderSuccess = (totalFormatted) => {
  Modal.success({
    title: 'Order Placed Successfully! 🎉',
    content: (
      <div style={{ paddingTop: 8 }}>
        <p style={{ color: '#555', marginBottom: 4 }}>
          Your Starbucks order of <strong style={{ color: '#006241' }}>{totalFormatted}</strong> has been confirmed. We'll have it ready for you shortly!
        </p>
        <p style={{ color: '#006241', fontWeight: 600, fontSize: 13 }}>
          Thank you for choosing Starbucks ☕
        </p>
      </div>
    ),
    okText: 'Great!',
    okButtonProps: {
      style: {
        backgroundColor: '#006241',
        borderColor: '#006241',
        borderRadius: 999,
        fontWeight: 700,
        paddingInline: 28,
      },
    },
    centered: true,
    width: 420,
  });
};

// ── CartDrawer ─────────────────────────────────────────────────────────────
const CartDrawer = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  // Sync items whenever cart updates
  const syncCart = useCallback(() => setItems(getCart()), []);

  useEffect(() => {
    syncCart();
    window.addEventListener('cart-updated', syncCart);
    return () => window.removeEventListener('cart-updated', syncCart);
  }, [syncCart]);

  // Listen for the 'order-confirmed' event fired after login/register redirect
  useEffect(() => {
    const onOrderConfirmed = () => {
      const currentItems = getCart();
      const savedUser = localStorage.getItem('sb_current_user');
      const orderTotal = calculateCartSubtotal(currentItems);

      if (savedUser) {
        try {
          const u = JSON.parse(savedUser);
          saveOrderToHistory(u.email, currentItems);
          currentItems.forEach((item) => {
            dispatch(addOrder({
              ...item,
              id: item.id || `order-${Date.now()}-${Math.random()}`,
              price: item.price ?? calculateProductPrice(item, item.size),
              orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }));
          });
        } catch {/* ignore */}
      }
      clearCart();
      onClose();
      showOrderSuccess(formatPrice(orderTotal));
    };
    window.addEventListener('order-confirmed', onOrderConfirmed);
    return () => window.removeEventListener('order-confirmed', onOrderConfirmed);
  }, [onClose, dispatch]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const totalItems = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const subtotal = calculateCartSubtotal(items);

  // ── Place Order handler ────────────────────────────────────────────────
  const handlePlaceOrder = () => {
    if (!user) {
      // Save pending order flag so auth pages can redirect back
      sessionStorage.setItem('pending_order', '1');
      onClose();
      navigate('/account/signin');
      return;
    }
    // Logged in — save to history, clear cart, show success
    saveOrderToHistory(user.email, items);
    items.forEach((item) => {
      dispatch(addOrder({
        ...item,
        id: item.id || `order-${Date.now()}-${Math.random()}`,
        price: item.price ?? calculateProductPrice(item, item.size),
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
    });
    const totalFormatted = formatPrice(subtotal);
    clearCart();
    onClose();
    showOrderSuccess(totalFormatted);
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`fixed inset-y-0 right-0 left-0 sm:left-auto w-full max-w-full sm:max-w-[440px] bg-white z-[70] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#212121] leading-tight">Your Order</h2>
            {totalItems > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">
                {totalItems} item{totalItems !== 1 ? 's' : ''} • {formatPrice(subtotal)}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#212121] transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Items list (scrollable) ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-16 gap-5">
              <div className="w-20 h-20 text-gray-200">
                <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-[17px] font-semibold text-[#212121]">Your order is empty</p>
                <p className="text-sm text-gray-500 mt-1 max-w-[240px] mx-auto">
                  Add items from the menu to get started.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#006241] text-white rounded-full text-[14px] font-semibold hover:bg-[#004d32] transition-all cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = item.price ?? calculateProductPrice(item, item.size);
              const lineTotal = itemPrice * (item.quantity || 1);

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 bg-gray-50 rounded-2xl p-4 relative group"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100 shadow-sm">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Item details */}
                  <div className="flex-1 min-w-0 pr-12">
                    <p className="text-[14px] font-semibold text-[#212121] leading-snug line-clamp-2">
                      {item.quantity > 1 && (
                        <span className="text-[#006241] font-bold mr-1">{item.quantity}×</span>
                      )}
                      {item.name}
                    </p>
                    {item.size && (
                      <p className="text-[12px] text-gray-500 mt-0.5">{item.size}</p>
                    )}
                    {item.calories != null && (
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.calories} cal</p>
                    )}
                    {/* Item Price */}
                    <p className="text-[13px] font-bold text-[#006241] mt-1">
                      {formatPrice(lineTotal)}
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-gray-400 font-normal ml-1.5">
                          ({formatPrice(itemPrice)} each)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Mobile-first Remove button */}
                  <RemoveCartItemButton
                    itemName={item.name}
                    onRemove={() => removeFromCart(item.id)}
                    className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5"
                  />
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer: totals + checkout ── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-200 px-6 py-5 bg-white space-y-3">
            {/* Subtotal calculation */}
            <div className="flex items-center justify-between text-[15px] font-extrabold text-[#212121]">
              <span>Subtotal</span>
              <span className="text-[17px] text-[#006241]">{formatPrice(subtotal)}</span>
            </div>

            {/* Item count + clear */}
            <div className="flex items-center justify-between text-[12px] text-gray-500 border-b border-gray-100 pb-2">
              <span>{totalItems} item{totalItems !== 1 ? 's' : ''} in your order</span>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-600 font-medium transition-colors cursor-pointer text-[12px]"
              >
                Clear all
              </button>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-[#006241] hover:bg-[#004d32] active:scale-[0.98] text-white rounded-full text-[15px] font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              {user ? `Place Order (${formatPrice(subtotal)})` : 'Sign in to Place Order'}
            </button>

            {/* Sub-note */}
            {!user && (
              <p className="text-center text-[11px] text-gray-400">
                You'll be redirected to sign in. Your cart will be saved.
              </p>
            )}
            {user && (
              <p className="text-center text-[11px] text-gray-400">
                Prices may vary. Thank you for choosing Starbucks!
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
