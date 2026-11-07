import React from 'react';
import { calculateProductPrice, formatPrice } from '../../utils/priceHelper';

// ── Cup SVG (outline style, scales with className) ─────────────────────────
const CupSvg = ({ className, isActive }) => (
  <svg
    className={`${className} ${isActive ? 'text-[#006241]' : 'text-gray-400'} fill-none stroke-current`}
    viewBox="0 0 24 34"
  >
    {/* Lid top */}
    <path strokeWidth="1.8" strokeLinecap="round" d="M7 4h10" />
    {/* Lid brim */}
    <path strokeWidth="1.8" strokeLinecap="round" d="M4 7h16" />
    {/* Body tapers toward bottom */}
    <path
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 7l1.5 21c.1 1 .9 1.8 1.9 1.8h8.2c1 0 1.8-.8 1.9-1.8L20 7"
    />
    {/* Active: solid dark green dot inside the cup */}
    {isActive && (
      <circle cx="12" cy="18" r="3" className="fill-[#006241] stroke-none" />
    )}
  </svg>
);

// ── Size volume map ────────────────────────────────────────────────────────
const SIZE_INFO = {
  short:  { label: 'Short',  oz: '8 fl oz',  icon: 'w-4 h-5'   },
  tall:   { label: 'Tall',   oz: '12 fl oz', icon: 'w-5 h-6'   },
  grande: { label: 'Grande', oz: '16 fl oz', icon: 'w-6 h-8'   },
  venti:  { label: 'Venti',  oz: '24 fl oz', icon: 'w-7 h-9'   },
  trenta: { label: 'Trenta', oz: '30 fl oz', icon: 'w-8 h-10'  },
};

const getSizeInfo = (sizeCode, isIced) => {
  const code = sizeCode.toLowerCase();
  if (code === 'venti') return { ...SIZE_INFO.venti, oz: isIced ? '24 fl oz' : '20 fl oz' };
  return SIZE_INFO[code] ?? { label: sizeCode, oz: sizeCode, icon: 'w-6 h-8' };
};

// ── SizeOptions component ──────────────────────────────────────────────────
const SizeOptions = ({ sizes, activeSize, onSizeSelect, formCode, product }) => {
  const isIced = /iced|cold/i.test(formCode ?? '');

  return (
    <div className="flex flex-col text-left space-y-6">
      {/* Heading + thick green divider */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#212121]">Size Options</h2>
        {/* Thick light-green divider, slightly wider than heading text */}
        <div className="w-full max-w-[450px] h-1.5 bg-[#D8E8E2] rounded-full mt-2" />
      </div>

      {/* Size buttons */}
      <div className="flex items-end gap-6 md:gap-8 py-1 overflow-x-auto">
        {sizes.map((size) => {
          const info = getSizeInfo(size.sizeCode, isIced);
          const isActive = activeSize === size.sizeCode;
          const isFood = /piece|each/i.test(size.sizeCode);
          const sizePrice = calculateProductPrice(product, size.sizeCode);

          return (
            <button
              key={size.sizeCode}
              onClick={() => onSizeSelect(size.sizeCode)}
              className="flex flex-col items-center focus:outline-none cursor-pointer group shrink-0"
            >
              {/* Circle + icon */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-150 ${
                  isActive
                    ? 'border-2 border-[#006241] bg-[#e8f5e9]'
                    : 'border border-gray-300 group-hover:border-[#006241]/50'
                }`}
              >
                {isFood ? (
                  <svg
                    className={`w-6 h-6 fill-none stroke-current ${isActive ? 'text-[#006241]' : 'text-gray-400'}`}
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3 12h18" strokeDasharray="3 3" />
                  </svg>
                ) : (
                  <CupSvg className={info.icon} isActive={isActive} />
                )}
              </div>

              {/* Size label */}
              <span
                className={`text-[13px] md:text-[14px] mt-2 ${
                  isActive ? 'font-extrabold text-[#006241]' : 'font-bold text-[#212121]'
                }`}
              >
                {info.label}
              </span>

              {/* Volume */}
              <span className={`text-[11px] md:text-[12px] font-semibold mt-0.5 ${isActive ? 'text-[#006241]' : 'text-gray-600'}`}>
                {info.oz}
              </span>

              {/* Price per size */}
              <span className={`text-[11px] font-bold mt-1 px-2 py-0.5 rounded-full ${isActive ? 'bg-[#006241] text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}>
                {formatPrice(sizePrice)}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default SizeOptions;
