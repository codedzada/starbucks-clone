/**
 * Determines the price based on the product and selected size (e.g., Tall, Grande, Venti),
 * falling back to a default base price if necessary.
 * 
 * @param {Object} product - Product object
 * @param {string} size - Selected size code (e.g. 'Short', 'Tall', 'Grande', 'Venti', 'Trenta')
 * @returns {number} Dynamic calculated price
 */
export const calculateProductPrice = (product, size) => {
  if (!product) return 4.95;

  // 1. Check if product or size has an explicit price property
  let basePrice = product.price || product.basePrice;

  if (!basePrice) {
    const name = (product.name || '').toLowerCase();
    const type = (product.productType || '').toLowerCase();

    // Kateqoriya və ya açar sözlərə uyğun qiymətlər siyahısı
    const priceRules = [
      { keywords: ['food', 'sandwich', 'box', 'wrap'], price: 6.45 },
      { keywords: ['croissant', 'muffin', 'scone', 'cookie', 'cake'], price: 3.95 },
      { keywords: ['espresso shot'], price: 2.75 },
      { keywords: ['frappuccino', 'refresher', 'matcha'], price: 5.45 },
      { keywords: ['latte', 'macchiato', 'mocha', 'cold brew'], price: 4.95 },
      { keywords: ['americano', 'brewed coffee', 'tea'], price: 3.95 }
    ];

    // Uyğun gələn ilk qaydanı tapırıq, tapmasa standart 4.75 götürürük
    const matchedRule = priceRules.find(rule => 
      rule.keywords.some(keyword => type.includes(keyword) || name.includes(keyword))
    );

    basePrice = matchedRule ? matchedRule.price : 4.75;
  }

  // 2. Dynamic price modifier based on selected size
  const sizeCode = (size || 'grande').toLowerCase();
  
  const sizeModifiers = {
    short: -0.50,
    tall: -0.30,
    grande: 0.00,
    venti: 0.60,
    trenta: 1.00
  };

  const modifier = sizeModifiers[sizeCode] !== undefined ? sizeModifiers[sizeCode] : 0.00;

  const finalPrice = Math.max(1.50, basePrice + modifier);
  return Number(finalPrice.toFixed(2));
};

/**
 * Formats a numeric price into a currency string (e.g. 4.95 -> "$4.95").
 * 
 * @param {number|string} price 
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  const num = typeof price === 'number' ? price : parseFloat(price) || 0;
  return `$${num.toFixed(2)}`;
};

/**
 * Calculates total price for a collection of cart items using reduce().
 * 
 * @param {Array} items - Array of items in cart
 * @returns {number} Subtotal
 */
export const calculateCartSubtotal = (items = []) => {
  return items.reduce((total, item) => {
    const itemPrice = item.price ?? calculateProductPrice(item, item.size);
    const quantity = item.quantity || 1;
    return total + (itemPrice * quantity);
  }, 0);
};