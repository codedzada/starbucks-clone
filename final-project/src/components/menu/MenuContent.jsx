import React from 'react';
import { Link } from 'react-router-dom';

const MenuContent = ({ categoryId, categories, activeSubcategory, categorySections }) => {
  if (!categoryId) {
    // ── Main Menu Landing (Grid of Categories) ──
    return (
      <div>
        <h1 className="text-3xl md:text-[36px] font-black text-[#212121] tracking-tight mb-8">
          Menu
        </h1>
        
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.id} className="border-b border-gray-200/80 pb-10 last:border-0 last:pb-0">
              <h2 className="text-xl md:text-2xl font-black text-[#212121] mb-6">
                {category.name}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
                {category.subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    to={`/menu/${subcat.id}`}
                    className="group flex items-center gap-5 cursor-pointer"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#1e3932] overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
                      <img
                        src={subcat.image}
                        alt={subcat.name}
                        className="w-[85%] h-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-[1.05]"
                        onError={(e) => {
                          e.target.src = 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
                        }}
                      />
                    </div>
                    <span className="text-[17px] md:text-[19px] font-bold text-[#212121] group-hover:text-[#006241] transition-colors leading-snug">
                      {subcat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // ── Subcategory Detail View (Grid of Products) ──
  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
        <Link to="/menu" className="hover:text-black transition-colors hover:underline">
          Menu
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold capitalize">
          {activeSubcategory?.name || categoryId.replace(/-/g, ' ')}
        </span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-black text-[#212121] tracking-tight mb-8 capitalize">
        {activeSubcategory?.name || categoryId.replace(/-/g, ' ')}
      </h1>

      {categorySections.length === 0 ? (
        <div className="py-12 text-center text-gray-400">
          <p className="text-lg font-medium">No products found in this category.</p>
          <Link
            to="/menu"
            className="mt-4 inline-block text-sm font-bold text-[#006241] hover:underline"
          >
            Back to Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {categorySections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-6">
              {/* Sub-section Title (e.g. Brewed Coffee) */}
              <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#212121] border-b border-gray-100 pb-2.5">
                {section.name}
              </h2>
              
              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10">
                {section.products.map((product, pIdx) => {
                  const productImg = product.assets?.masterImage?.uri || 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
                  return (
                    <Link
                      key={pIdx}
                      to={product.uri || `/product/${product.productNumber}/${product.formCode?.toLowerCase() || 'hot'}`}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                      {/* Circular thumbnail with dark green bg */}
                      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-[136px] md:h-[136px] rounded-full bg-[#1e3932] overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.03] shadow-md">
                        <img
                          src={productImg}
                          alt={product.name}
                          className="w-[85%] h-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-[1.05]"
                          onError={(e) => {
                            e.target.src = 'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
                          }}
                        />
                      </div>
                      
                      {/* Product Name */}
                      <h3 className="text-[14px] md:text-[15px] font-bold text-[#212121] mt-3 line-clamp-2 max-w-[160px] leading-snug group-hover:text-[#006241] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuContent;
