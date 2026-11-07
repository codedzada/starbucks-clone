import React from 'react';

// ── Outlined select with floating label ───────────────────────────────────
const CustomSelect = ({ label, value, options, onChange }) => (
  <div className="relative border-2 border-gray-300 focus-within:border-[#006241] rounded-lg px-4 pt-5 pb-3 bg-white w-full transition-all">
    <span className="absolute top-2 left-4 text-[11px] font-semibold text-gray-500 leading-none select-none">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-none outline-none appearance-none pr-8 text-[14px] font-semibold text-[#212121] cursor-pointer leading-tight"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#006241]">
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
  </div>
);

// ── Counter row with floating label ──────────────────────────────────────
const CustomCounter = ({ label, name, value, min = 0, max = 8, onChange }) => (
  <div className="relative border-2 border-gray-300 rounded-lg px-4 pt-5 pb-3 bg-white w-full flex items-center justify-between">
    <span className="absolute top-2 left-4 text-[11px] font-semibold text-gray-500 leading-none select-none">
      {label}
    </span>
    <span className="text-[14px] font-semibold text-[#212121] select-none">{name}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease"
        className={`w-7 h-7 rounded-full border flex items-center justify-center text-[18px] leading-none select-none transition-all ${
          value <= min
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-[#006241] text-[#006241] hover:bg-[#006241]/8 cursor-pointer'
        }`}
      >
        &#x2212;
      </button>
      <span className="text-[14px] font-medium text-[#212121] w-4 text-center select-none tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase"
        className={`w-7 h-7 rounded-full border flex items-center justify-center text-[18px] leading-none select-none transition-all ${
          value >= max
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-[#006241] text-[#006241] hover:bg-[#006241]/8 cursor-pointer'
        }`}
      >
        &#x2B;
      </button>
    </div>
  </div>
);

// ── Fruit inclusion name helper ──────────────────────────────────────────
const fruitName = (productName) => {
  const n = productName?.toLowerCase() ?? '';
  if (n.includes('strawberry')) return 'Strawberry Fruit Inclusions scoop';
  if (n.includes('pineapple'))  return 'Pineapple Fruit Inclusions scoop';
  if (n.includes('mango') || n.includes('dragonfruit')) return 'Dragonfruit Fruit Inclusions scoop';
  if (n.includes('peach'))      return 'Peach Fruit Inclusions scoop';
  return 'Fruit Inclusions scoop';
};

// ── WhatsIncluded ─────────────────────────────────────────────────────────
const WhatsIncluded = ({ product, state, onChange }) => {
  const n = product.name?.toLowerCase() ?? '';
  const type = product.productType?.toLowerCase();
  const isBev      = type === 'beverage';
  const isRefresher = isBev && (n.includes('refresher') || n.includes('refresha') || n.includes('lemonade') || n.includes('berry') || n.includes('açaí') || n.includes('acai'));
  const isCoffee   = isBev && !isRefresher && (n.includes('coffee') || n.includes('americano') || n.includes('latte') || n.includes('espresso') || n.includes('macchiato') || n.includes('mocha') || n.includes('cappuccino'));
  const isTea      = isBev && !isRefresher && !isCoffee;
  const isFood     = type === 'food';

  const hasLemonade = n.includes('lemonade');
  const isIced = n.includes('iced') || n.includes('cold') || n.includes('nitro') || n.includes('refresher') || n.includes('lemonade');

  return (
    <div className="flex flex-col text-left space-y-5">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-[#212121]">
          What&#39;s Included
        </h2>
        <div className="w-full max-w-[450px] h-1.5 bg-[#D8E8E2] rounded-full mt-2" />
      </div>

      <div className="flex flex-col gap-4 max-w-lg w-full">

        {/* ── Refresher customizations ── */}
        {isRefresher && (
          <>
            <CustomSelect
              label="Add-ins"
              value={state.ice}
              options={['Ice', 'Extra Ice', 'Light Ice', 'No Ice']}
              onChange={(v) => onChange('ice', v)}
            />

            <CustomCounter
              label="Add-ins"
              name={fruitName(product.name)}
              value={state.fruitScoops}
              onChange={(v) => onChange('fruitScoops', v)}
            />

            {hasLemonade && (
              <CustomSelect
                label="Lemonade"
                value={state.lemonade}
                options={['Lemonade', 'No Lemonade', 'Light Lemonade', 'Extra Lemonade']}
                onChange={(v) => onChange('lemonade', v)}
              />
            )}
          </>
        )}

        {/* ── Coffee/espresso customizations ── */}
        {isCoffee && (
          <>
            <CustomSelect
              label="Milk"
              value={state.milk}
              options={['2% Milk', 'Whole Milk', 'Nonfat Milk', 'Oatmilk', 'Almondmilk', 'Coconutmilk', 'Soy Milk']}
              onChange={(v) => onChange('milk', v)}
            />
            <CustomCounter
              label="Espresso"
              name="Espresso Shots"
              value={state.shots}
              min={1}
              max={10}
              onChange={(v) => onChange('shots', v)}
            />
            {isIced && (
              <CustomSelect
                label="Add-ins"
                value={state.ice}
                options={['Ice', 'Extra Ice', 'Light Ice', 'No Ice']}
                onChange={(v) => onChange('ice', v)}
              />
            )}
          </>
        )}

        {/* ── Tea customizations ── */}
        {isTea && (
          <>
            <CustomSelect
              label="Milk"
              value={state.milk}
              options={['No Milk', '2% Milk', 'Oatmilk', 'Almondmilk', 'Coconutmilk']}
              onChange={(v) => onChange('milk', v)}
            />
            {isIced && (
              <CustomSelect
                label="Add-ins"
                value={state.ice}
                options={['Ice', 'Extra Ice', 'Light Ice', 'No Ice']}
                onChange={(v) => onChange('ice', v)}
              />
            )}
          </>
        )}

        {/* ── Food customizations ── */}
        {isFood && (
          <CustomSelect
            label="Preparation"
            value={state.warmed}
            options={['Warmed', 'Not Warmed']}
            onChange={(v) => onChange('warmed', v)}
          />
        )}

        {/* ── Fallback ── */}
        {!isRefresher && !isCoffee && !isTea && !isFood && (
          <p className="text-[13px] text-gray-400 font-normal py-2">
            No customization options available for this product.
          </p>
        )}

      </div>
    </div>
  );
};

export default WhatsIncluded;