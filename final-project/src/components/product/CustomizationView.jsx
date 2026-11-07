import React, { useState, useRef, useEffect } from 'react';
import { getRelevantCustomizationOptions } from '../../data/customizationOptions';
import OrderActionButtons from './OrderActionButtons';

const ChevronCircle = () => (
  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#006241" strokeWidth="1.8" />
    <path d="M8.5 10.5l3.5 3.5 3.5-3.5" stroke="#006241" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusCircle = () => (
  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#006241" strokeWidth="1.8" />
    <path d="M12 8v8M8 12h8" stroke="#006241" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusCircle = () => (
  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#006241" strokeWidth="1.8" />
    <path d="M8 12h8" stroke="#006241" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusCircleSolid = () => (
  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#006241" strokeWidth="2" />
    <path d="M12 8v8M8 12h8" stroke="#006241" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DropdownList = ({ option, value, onChange, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 shadow-2xl z-[60] overflow-y-auto rounded-b-lg"
      style={{ maxHeight: 240 }}
    >
      <div className="px-4 pt-2.5 pb-1.5 text-[12px] text-gray-500 font-medium border-b border-gray-100 select-none">
        {option.name}
      </div>
      {option.choices.map((choice) => {
        const isActive = choice === value;
        return (
          <button
            key={choice}
            type="button"
            onClick={() => { onChange(choice); onClose(); }}
            className={`w-full text-left px-5 py-3 text-[15px] cursor-pointer transition-colors ${
              isActive
                ? 'bg-[#1967D2] text-white font-medium'
                : 'text-[#212121] hover:bg-gray-50 font-normal'
            }`}
          >
            {choice}
          </button>
        );
      })}
    </div>
  );
};

// ─── Option row ──────────────────────────────────────────────────────────────

const OptionRow = ({ option, categoryName, value, onChange, isOpen, onToggleDropdown }) => {
  const isCounter = option.type === 'counter';
  const isSelect  = option.type === 'select';
  const resolvedValue = value ?? option.defaultValue;

  const isInactive =
    (isCounter && (resolvedValue === 0 || resolvedValue === undefined)) ||
    (isSelect  && (resolvedValue === 'None' || resolvedValue === 'No' || resolvedValue === undefined));

  const label = option.name.startsWith('Add ') ? option.name : `Add ${option.name}`;

  const handleAdjust = (delta) => {
    const current = typeof resolvedValue === 'number' ? resolvedValue : 0;
    const next = Math.max(option.min ?? 0, Math.min(option.max ?? 12, current + delta));
    onChange(option.id, next);
  };

  return (
    <div className="relative w-full">
      {option.img && (
        <img src={option.img} alt={option.name} className="mb-1.5 w-8 h-8 object-contain" />
      )}

      {isInactive ? (
        /* ── Inactive "Add …" button ── */
        <button
          type="button"
          onClick={() => isCounter ? onChange(option.id, 1) : onToggleDropdown(option.id)}
          className="w-full flex items-center justify-between bg-[#f9f9f9] border border-[#f9f9f9] hover:border-gray-300 rounded-[12px] px-5 py-3.5 transition-colors cursor-pointer text-left"
        >
          <span className="text-[15px] text-[#1a1a1a] font-medium">{label}</span>
          <div className="shrink-0">{isCounter ? <PlusCircle /> : <ChevronCircle />}</div>
        </button>

      ) : isCounter ? (
        /* ── Active counter ── */
        <div className="w-full border border-gray-300 rounded-[12px] px-5 py-2.5 bg-white flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">{categoryName}</span>
            <span className="text-[15px] text-[#1a1a1a] font-medium leading-snug mt-0.5">{option.name}</span>
          </div>
          <div className="flex items-center gap-4 select-none">
            <button type="button" onClick={() => handleAdjust(-1)} className="cursor-pointer hover:opacity-70 transition-opacity" aria-label="Decrease">
              <MinusCircle />
            </button>
            <span className="text-[15px] font-bold text-[#1a1a1a] w-5 text-center tabular-nums">{resolvedValue}</span>
            <button type="button" onClick={() => handleAdjust(1)} className="cursor-pointer hover:opacity-70 transition-opacity" aria-label="Increase">
              <PlusCircleSolid />
            </button>
          </div>
        </div>

      ) : (
        /* ── Active select ── */
        <div
          className={`w-full border rounded-[12px] px-5 py-3 bg-white flex items-center justify-between cursor-pointer transition-colors ${
            isOpen ? 'border-[#006241]' : 'border-gray-300'
          }`}
          onClick={() => onToggleDropdown(option.id)}
        >
          <div className="flex flex-col flex-1 min-w-0 pr-3">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">{categoryName}</span>
            <span className="text-[15px] text-[#1a1a1a] font-medium leading-snug mt-0.5 truncate">{resolvedValue}</span>
          </div>
          <ChevronCircle />
        </div>
      )}

      {isSelect && isOpen && (
        <DropdownList
          option={option}
          value={resolvedValue}
          onChange={(v) => onChange(option.id, v)}
          onClose={() => onToggleDropdown(null)}
        />
      )}
    </div>
  );
};

// ─── Category block ──────────────────────────────────────────────────────────

const CategoryBlock = ({ category, customState, onChange, openDropdown, onToggleDropdown }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2.5 mb-2">
      {category.img && (
        <img src={category.img} alt={category.name} className="w-6 h-6 object-contain" />
      )}
      <h2 className="text-[20px] font-bold text-[#1a1a1a] tracking-tight">{category.name}</h2>
    </div>

    {/* Thin green divider */}
    <div className="w-full border-b border-[#D4E9E2] mb-4" />

    <div className="flex flex-col gap-3">
      {category.options.map((opt) => (
        <OptionRow
          key={opt.id}
          option={opt}
          categoryName={category.name}
          value={customState[opt.id] ?? opt.defaultValue}
          onChange={onChange}
          isOpen={openDropdown === opt.id}
          onToggleDropdown={onToggleDropdown}
        />
      ))}
    </div>
  </div>
);

// ─── CustomizationView ───────────────────────────────────────────────────────

const CustomizationView = ({
  product,
  sizeVolumeDescription,
  calories,
  customState,
  onChange,
  onClose,
  onAddToOrder,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMounted, setIsMounted]       = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleToggle = (id) =>
    setOpenDropdown((prev) => (prev === id ? null : id));

  const relevantCategories = getRelevantCustomizationOptions(product);

  const leftIds  = new Set(['milk', 'flavors', 'coldFoams', 'toppings', 'preparation']);
  const rightIds = new Set(['tea', 'sweeteners', 'cupOptions', 'espresso']);
  const leftCats  = relevantCategories.filter((c) => leftIds.has(c.id));
  const rightCats = relevantCategories.filter((c) => rightIds.has(c.id));
  const unbucketed = relevantCategories.filter((c) => !leftIds.has(c.id) && !rightIds.has(c.id));
  const allLeft  = [...leftCats, ...unbucketed];
  const allRight = [...rightCats];

  const imageSrc =
    product.assets?.masterImage?.uri ||
    'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';

  return (
    <div
      className="w-full bg-white overflow-x-hidden pb-32"
      style={{
        opacity:    isMounted ? 1 : 0,
        transform:  isMounted ? 'scale(1)' : 'scale(0.97)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      {/* ── 1. Dark-green hero banner ── */}
      <div className="bg-[#1e3932] text-white w-full">
        <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 py-10 flex items-center gap-8 md:gap-12">
          <div className="w-36 h-36 md:w-44 md:h-44 flex-shrink-0 flex items-center justify-center">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              onError={(e) => {
                e.target.src =
                  'https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeAmericano.jpg';
              }}
            />
          </div>

          <div className="flex flex-col items-start gap-1.5">
            <h1 className="text-[28px] md:text-[34px] font-bold text-white leading-tight tracking-tight">
              {product.name}
            </h1>
            <p className="text-[16px] md:text-[17px] text-white/90">
              {sizeVolumeDescription}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] md:text-[17px] text-white/90">{calories} calories</span>
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 11v5M12 8h.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Content area ── */}
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-8 py-10">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-[#1a1a1a] hover:text-[#006241] text-[15px] font-semibold mb-8 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Done customizing
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            {allLeft.map((cat) => (
              <CategoryBlock
                key={cat.id}
                category={cat}
                customState={customState}
                onChange={onChange}
                openDropdown={openDropdown}
                onToggleDropdown={handleToggle}
              />
            ))}
          </div>

          <div>
            {allRight.map((cat) => (
              <CategoryBlock
                key={cat.id}
                category={cat}
                customState={customState}
                onChange={onChange}
                openDropdown={openDropdown}
                onToggleDropdown={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Fixed Bottom Bar Action Button ── */}
      <OrderActionButtons 
        onAddToOrder={onAddToOrder} 
        showCustomize={false} 
      />
    </div>
  );
};

export default CustomizationView;