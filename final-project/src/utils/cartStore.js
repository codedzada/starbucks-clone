const CART_KEY = 'sbux_cart';
const ORDER_HISTORY_KEY = 'sbux_order_history';

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const addToCart = (item) => {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  return cart;
};

export const getCartCount = () => getCart().length;

export const saveOrderToHistory = (userEmail, items) => {
  if (!userEmail || !items?.length) return;
  try {
    const all = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY)) || {};
    const userOrders = all[userEmail] || [];
    userOrders.unshift({
      orderId: `SBX-${Date.now()}`,
      placedAt: new Date().toISOString(),
      items,
    });
    all[userEmail] = userOrders;
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(all));
  } catch {/* ignore */}
};

export const getOrderHistory = (userEmail) => {
  if (!userEmail) return [];
  try {
    const all = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY)) || {};
    return all[userEmail] || [];
  } catch {
    return [];
  }
};
