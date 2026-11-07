import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/priceHelper';

const ProductHero = ({ product, calories, categoryPathName, price }) => {
  const imageSrc =
    product.assets?.masterImage?.uri ||
    'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';

  return (
    <div className="bg-[#1e3932] text-white">
      {/* ── Breadcrumb bar ── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-5">
        <nav className="text-xs md:text-sm text-white/60 font-normal flex items-center gap-1.5">
          <Link to="/menu" className="hover:text-white hover:underline transition-colors">
            Menu
          </Link>
          <span>/</span>
          {categoryPathName && (
            <>
              <Link
                to={`/menu/${categoryPathName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="hover:text-white hover:underline transition-colors"
              >
                {categoryPathName}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-white font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* ── Hero content ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Product image */}
        <div className="w-44 h-44 md:w-60 md:h-60 flex-shrink-0 flex items-center justify-center select-none">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
            onError={(e) => {
              e.target.src =
                'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
            }}
          />
        </div>

        {/* Name + calories + dynamic price */}
        <div className="flex-grow text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-3xl md:text-[42px] font-bold text-white leading-tight mb-3 tracking-tight max-w-2xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 text-[15px] md:text-[16px] text-white/90 font-medium">
            {price != null && (
              <span className="bg-white/15 px-3.5 py-1 rounded-full text-white font-bold text-base md:text-lg border border-white/20 shadow-inner">
                {formatPrice(price)}
              </span>
            )}
            <span className="opacity-80">{calories} calories</span>
            <button
              className="w-4.5 h-4.5 rounded-full border border-white/50 flex items-center justify-center text-[9px] font-medium text-white/50 hover:text-white hover:border-white transition-colors cursor-pointer"
              title="Calorie information based on Grande size"
            >
              i
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
