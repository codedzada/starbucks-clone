import React, { useMemo } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { menuData } from '../../data/menuData';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/favoritesSlice';
import { clearPreviousOrders } from '../../redux/previousOrdersSlice';
import { useAuth } from '../../features/auth/AuthContext';
import { addToCart } from '../../utils/cartStore';
import { calculateProductPrice, formatPrice } from '../../utils/priceHelper';

// Import sub-components
import MenuNavTabs from './MenuNavTabs';
import MenuSidebar from './MenuSidebar';
import MenuContent from './MenuContent';
import StoreAndCartBar from './StoreAndCartBar';

// Helper to recursively find a representative product image URI
const findFirstImage = (node) => {
  if (node.products && node.products.length > 0) {
    for (const p of node.products) {
      if (p.assets?.masterImage?.uri) {
        return p.assets.masterImage.uri;
      }
    }
  }
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const img = findFirstImage(child);
      if (img) return img;
    }
  }
  return null;
};

// Traverse and parse the full menuData tree dynamically
const getDynamicCategories = () => {
  if (!menuData || menuData.length === 0) return [];
  
  return menuData.map(mainCat => {
    const mainCatId = mainCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return {
      name: mainCat.name,
      id: mainCatId,
      subcategories: (mainCat.children || []).map(subCat => {
        const subId = subCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const image = findFirstImage(subCat) || 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
        
        return {
          name: subCat.name,
          id: subId,
          image: image,
          rawNode: subCat
        };
      })
    };
  });
};

// Extract and group products dynamically based on subcategory
const getCategorySections = (subcat) => {
  if (!subcat || !subcat.rawNode) return [];
  const { rawNode } = subcat;

  if (rawNode.children && rawNode.children.length > 0) {
    return rawNode.children
      .map(child => ({
        name: child.name,
        products: child.products || []
      }))
      .filter(section => section.products.length > 0);
  }

  if (rawNode.products && rawNode.products.length > 0) {
    return [
      {
        name: rawNode.name,
        products: rawNode.products
      }
    ];
  }

  return [];
};

const MenuPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Redux-dan favorit və keçmiş sifarişləri oxuyuruq
  const favoriteItems = useSelector((state) => state.favorites.items);
  const previousOrdersItems = useSelector((state) => state.previousOrders.items);

  // Parse category tree dynamically and cache the result
  const categories = useMemo(() => getDynamicCategories(), []);

  // Find active subcategory from current params
  const activeSubcategory = useMemo(() => {
    if (!categoryId) return null;
    const allSubcats = categories.flatMap(c => c.subcategories);
    return allSubcats.find(s => s.id === categoryId) || null;
  }, [categoryId, categories]);

  // Extract products for active subcategory dynamically
  const categorySections = useMemo(() => {
    return activeSubcategory ? getCategorySections(activeSubcategory) : [];
  }, [activeSubcategory]);

  // Determine current active sub-tab based on route
  const currentTab = location.pathname.includes('/menu/featured')
    ? 'featured'
    : location.pathname.includes('/menu/previous')
    ? 'previous'
    : location.pathname.includes('/menu/favorites')
    ? 'favorites'
    : 'menu';

  // Sub-tabs list configuration
  const tabs = [
    { id: 'menu', label: 'Menu', path: '/menu' },
    { id: 'featured', label: 'Featured', path: '/menu/featured' },
    { id: 'previous', label: 'Previous', path: '/menu/previous' },
    { id: 'favorites', label: 'Favorites', path: '/menu/favorites' }
  ];

  return (
    <div className="min-h-screen bg-white pb-32 flex flex-col">
      {/* ── Sticky Sub-navigation Tabs Bar ── */}
      <MenuNavTabs currentTab={currentTab} tabs={tabs} />

      {/* ── Main Menu Layout Container ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 py-10 md:py-16 flex-grow">
        
        {/* Render layout for Featured tab */}
        {currentTab === 'featured' && (
          <div className="max-w-5xl mx-auto text-center py-12 animate-fadeIn">
            <h1 className="text-3xl font-bold text-[#006241] mb-10">
              Summer favorites, ready when you are
            </h1>

            <div className="grid md:grid-cols-2 gap-8 text-center">
              {/* Card 1 */}
              <div className="flex flex-col bg-[#f1f8f5] overflow-hidden rounded-none">
                <div className="w-full h-80">
                  <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-109921.jpg"
                    alt="Orange Cream Cold Brew"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col items-center justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-[#006241] mb-4">
                      Orange Cream Cold Brew
                    </h3>
                    <p className="text-[#006241] opacity-90 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                      A cold-coffee classic bursting with summertime flavor. Our smooth, signature cold brew is topped with orange cream cold foam for a dreamy, nostalgic summer sip.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/menu/starbucks-refreshers-beverages')}
                    className="px-6 py-1.5 border border-[#006241] text-[#006241] rounded-full font-semibold text-sm hover:bg-[#006241] hover:text-white transition-all cursor-pointer"
                  >
                    Order now
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col bg-[#f1f8f5] overflow-hidden rounded-none">
                <div className="w-full h-80">
                  <img
                    src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-110028.jpg"
                    alt="Iced Orange Cream Matcha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col items-center justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-[#006241] mb-4">
                      Iced Orange Cream Matcha
                    </h3>
                    <p className="text-[#006241] opacity-90 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                      A matcha twist on a nostalgic summer treat. Expertly handcrafted with matcha, milk, classic syrup and ice, topped with orange cream cold foam.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/menu/cold-coffees')}
                    className="px-6 py-1.5 border border-[#006241] text-[#006241] rounded-full font-bold text-sm hover:bg-[#006241] hover:text-white transition-all cursor-pointer"
                  >
                    Order now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render layout for Previous tab */}
        {currentTab === 'previous' && (
          <div className="max-w-6xl mx-auto py-10 animate-fadeIn">
            {!user ? (
              /* Scenario 1: User is not logged in */
              <div className="max-w-md mx-auto text-center py-12 flex flex-col items-center">
                <div className="w-24 h-24 text-gray-300 mb-6">
                  <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-[#212121] mb-4">Previous Orders</h1>
                <p className="text-gray-500 text-base mb-8">
                  Your past orders will appear here so you can easily order your favorites again.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/account/signin')}
                    className="px-6 py-2 border border-black rounded-full hover:bg-black/5 transition-all text-[15px] font-bold text-[#212121] cursor-pointer"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => navigate('/account/create')}
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-black/85 transition-all border border-black text-[15px] font-bold cursor-pointer"
                  >
                    Join now
                  </button>
                </div>
              </div>
            ) : previousOrdersItems.length === 0 ? (
              /* Scenario 2: User is logged in AND has no past orders */
              <div className="max-w-md mx-auto text-center py-12 flex flex-col items-center">
                <div className="w-24 h-24 text-gray-300 mb-6">
                  <svg className="w-full h-full stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-[#212121] mb-4">No Previous Orders</h1>
                <p className="text-gray-500 text-base mb-8">
                  When you place an order, it will appear here so you can quickly reorder your favorite items.
                </p>
                <button
                  onClick={() => navigate('/menu')}
                  className="px-6 py-2.5 bg-[#006241] text-white rounded-full font-bold text-[15px] hover:bg-[#004d32] transition-all cursor-pointer shadow-md"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              /* Scenario 3: User is logged in AND has past orders */
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#212121]">Previous Orders</h1>
                  <button
                    onClick={() => dispatch(clearPreviousOrders())}
                    className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer underline"
                  >
                    Clear History
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {previousOrdersItems.map((orderItem, idx) => {
                    const productImg = orderItem.image || orderItem.assets?.masterImage?.uri || 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
                    const productName = orderItem.name || orderItem.productName || 'Starbucks Order';
                    const orderDate = orderItem.orderDate || orderItem.placedAt || 'Recent Order';
                    const pNum = orderItem.productNumber || '407';
                    const fCode = (orderItem.formCode || 'hot').toLowerCase();
                    const itemPrice = orderItem.price ?? calculateProductPrice(orderItem, orderItem.size || 'Grande');

                    return (
                      <div
                        key={orderItem.id || idx}
                        className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                      >
                        <div>
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-20 h-20 rounded-full bg-[#1e3932] overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-[1.03] transition-transform">
                              <img
                                src={productImg}
                                alt={productName}
                                className="w-[85%] h-[85%] object-contain select-none"
                                onError={(e) => { e.target.src = 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg'; }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                                {orderDate}
                              </span>
                              <Link
                                to={`/product/${pNum}/${fCode}`}
                                className="text-[15px] font-bold text-[#212121] hover:text-[#006241] transition-colors leading-snug line-clamp-2 mt-0.5"
                              >
                                {productName}
                              </Link>
                              {orderItem.size && (
                                <p className="text-[12px] text-gray-500 font-medium mt-1">
                                  {orderItem.size}
                                </p>
                              )}
                              <p className="text-[13px] font-bold text-[#006241] mt-1">
                                {formatPrice(itemPrice)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            onClick={() => {
                              addToCart({
                                id: `${pNum}-${fCode}-${Date.now()}`,
                                productNumber: pNum,
                                formCode: fCode,
                                name: productName,
                                image: productImg,
                                size: orderItem.size || 'Grande',
                                price: itemPrice,
                                quantity: orderItem.quantity || 1,
                                customizations: orderItem.customizations || {},
                              });
                            }}
                            className="flex-1 py-2 px-4 bg-[#006241] hover:bg-[#004d32] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm text-center"
                          >
                            Reorder
                          </button>
                          <Link
                            to={`/product/${pNum}/${fCode}`}
                            className="py-2 px-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-full text-xs font-semibold transition-all cursor-pointer text-center"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Render layout for Favorites tab */}
        {currentTab === 'favorites' && (
          <div className="max-w-6xl mx-auto py-10 animate-fadeIn">
            {!user ? (
              /* Scenario 1: Not logged in */
              <div className="max-w-md mx-auto text-center py-12 flex flex-col items-center">
                <div className="w-24 h-24 text-gray-300 mb-6">
                  <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-base mb-8">
                  Save your favorite drinks and foods to quickly reorder them next time.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/account/signin')}
                    className="px-6 py-2 border border-black rounded-full hover:bg-black/5 transition-all text-[15px] font-bold text-[#212121] cursor-pointer"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => navigate('/account/create')}
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-black/85 transition-all border border-black text-[15px] font-bold cursor-pointer"
                  >
                    Join now
                  </button>
                </div>
              </div>
            ) : favoriteItems.length === 0 ? (
              /* Scenario 2: Logged in, BUT the favorites list is empty */
              <div className="max-w-md mx-auto text-center py-12 flex flex-col items-center">
                <div className="w-24 h-24 text-gray-300 mb-6">
                  <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-base mb-8">
                  Save your favorite drinks and foods to quickly reorder them next time.
                </p>
              </div>
            ) : (
              /* Scenario 3: Logged in AND favorites list has items */
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {favoriteItems.map((product, pIdx) => {
                  const productImg = product.assets?.masterImage?.uri || 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
                  return (
                    <div key={pIdx} className="relative group flex flex-col items-center text-center">
                      <button
                        onClick={() => dispatch(toggleFavorite(product))}
                        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md text-red-500 transition-all cursor-pointer"
                        title="Remove from favorites"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      <Link
                        to={`/product/${product.productNumber}/${product.formCode?.toLowerCase() || 'hot'}`}
                        className="flex flex-col items-center cursor-pointer w-full"
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-[136px] md:h-[136px] rounded-full bg-[#1e3932] overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.03] shadow-md">
                          <img
                            src={productImg}
                            alt={product.name}
                            className="w-[85%] h-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-[1.05]"
                          />
                        </div>
                        <h3 className="text-[14px] md:text-[15px] font-bold text-[#212121] mt-3 line-clamp-2 max-w-[160px] leading-snug group-hover:text-[#006241] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Render layout for Menu tab */}
        {currentTab === 'menu' && (
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Left Sidebar for categories selection */}
            <MenuSidebar categories={categories} activeSubcategoryId={categoryId} />

            {/* Central Area for rendering grid listings */}
            <main className="flex-1 min-w-0">
              <MenuContent
                categoryId={categoryId}
                categories={categories}
                activeSubcategory={activeSubcategory}
                categorySections={categorySections}
              />
            </main>
          </div>
        )}
      </div>

      {/* ── Bottom Fixed Action Bar ── */}
      <StoreAndCartBar />
    </div>
  );
};

export default MenuPage;