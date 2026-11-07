import React, { useState } from 'react';
import CheckBalanceModal from './CheckBalanceModal';

const GiftCardsHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CupIcon = ({ className = "w-16 h-16" }) => (
    <svg
      viewBox="0 0 100 100"
      className={`${className} text-[#212121] fill-current pointer-events-none`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M59.5 48c3.2 0 5.8-2.6 5.8-5.8s-2.6-5.8-5.8-5.8h-1.5v11.6h1.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M34.5 35h24v12c0 6.6-5.4 12-12 12s-12-5.4-12-12V35z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.5 39.5h24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40.5 59l1.5 5.5h9l1.5-5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="rotate(-25 46.5 24.5)">
        <rect
          x="33.5"
          y="15.5"
          width="26"
          height="16"
          rx="2"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M46.5 21.5l.8 1.8 1.9.2-1.4 1.3.4 1.9-1.7-.9-1.7.9.4-1.9-1.4-1.3 1.9-.2z"
          fill="#EFF7F0"
        />
      </g>
      <line x1="46.5" y1="7.5" x2="46.5" y2="10.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="33" y1="13" x2="35.5" y2="15" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <line x1="60" y1="13" x2="57.5" y2="15" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );

  const LeftCardStack = () => (
    <div className="relative w-[130px] h-[100px] md:w-[330px] lg:w-[380px] md:h-[250px] lg:h-[290px]">
      <div className="absolute left-0 bottom-0 md:left-2 md:bottom-2 w-[95px] md:w-[200px] lg:w-[240px] aspect-[1.58/1] rounded-lg md:rounded-2xl z-10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden border border-black/5 rotate-[-12deg] translate-y-4 md:translate-y-12">
        <img src="https://www.starbucks.com/weblx/images/placeholder.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <img src="https://cloudassets.starbucks.com/is/image/sbuxcorp/CelebrateCoffeeFY25" alt="Celebrate Coffee" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="eager" />
      </div>
      <div className="absolute left-1 top-0 md:left-6 md:top-0 w-[95px] md:w-[200px] lg:w-[240px] aspect-[1.58/1] rounded-lg md:rounded-2xl z-20 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] overflow-hidden border border-black/5 rotate-[-15deg]">
        <img src="https://www.starbucks.com/weblx/images/placeholder.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <img src="https://cloudassets.starbucks.com/is/image/sbuxcorp/SummerSeasonalFY26" alt="Summer Seasonal Storefront" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="eager" />
      </div>
    </div>
  );

  const RightCardStack = () => (
    <div className="relative w-[130px] h-[100px] md:w-[330px] lg:w-[380px] md:h-[250px] lg:h-[290px]">
      <div className="absolute right-1 top-0 md:right-6 md:top-0 w-[95px] md:w-[200px] lg:w-[240px] aspect-[1.58/1] rounded-lg md:rounded-2xl z-20 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] overflow-hidden border border-black/5 rotate-[15deg]">
        <img src="https://www.starbucks.com/weblx/images/placeholder.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <img src="https://cloudassets.starbucks.com/is/image/sbuxcorp/FriendsBuyFriendsCoffeeFY20" alt="Friends Buy Friends Coffee" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="eager" />
      </div>
      <div className="absolute right-0 bottom-0 md:right-2 md:bottom-2 w-[95px] md:w-[200px] lg:w-[240px] aspect-[1.58/1] rounded-lg md:rounded-2xl z-10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden border border-black/5 rotate-[12deg] translate-y-4 md:translate-y-12">
        <img src="https://www.starbucks.com/weblx/images/placeholder.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <img src="https://cloudassets.starbucks.com/is/image/sbuxcorp/ThankYou" alt="Thank You Grid" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="eager" />
      </div>
    </div>
  );

  const TextBlock = () => (
    <div className="flex flex-col items-center text-center">
      <span className="text-[11px] sm:text-[13px] md:text-[16px] font-bold tracking-[0.15em] text-[#212121] uppercase mb-2 md:mb-3 block">
        Starbucks® Gift Cards
      </span>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#212121] leading-tight mb-3 md:mb-4">
        Gift the perfect cup
      </h1>
      <p className="text-[#212121] text-[14px] sm:text-[15px] md:text-[18px] leading-relaxed max-w-[300px] sm:max-w-[360px] md:max-w-[460px] mb-5 md:mb-6 font-medium">
        Celebrate a milestone. Say a simple thank you. Brighten their day. All with a Starbucks gift card.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-[14px] sm:text-[15px] md:text-[17px] font-semibold text-[#212121] hover:text-[#006241] underline transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
      >
        Received a card?{' '}
        <span className="hover:no-underline font-bold">Check your balance.</span>
      </button>
    </div>
  );

  return (
    <div className="w-full bg-[#EFF7F0] py-12 md:py-32 px-3 md:px-12 overflow-hidden relative">
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:grid max-w-[1500px] mx-auto grid-cols-12 gap-6 items-center">
        <div className="col-span-4 flex justify-end">
          <LeftCardStack />
        </div>
        <div className="col-span-4 flex flex-col items-center text-center px-4">
          <div className="mb-5">
            <CupIcon className="w-20 h-20" />
          </div>
          <TextBlock />
        </div>
        <div className="col-span-4 flex justify-start">
          <RightCardStack />
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="flex md:hidden flex-col items-center w-full max-w-[480px] mx-auto">
        <div className="flex justify-between items-center w-full px-1 mb-6 gap-1">
          <div className="flex justify-center">
            <LeftCardStack />
          </div>
          <div className="flex-shrink-0 flex justify-center px-1">
            <CupIcon className="w-12 h-12" />
          </div>
          <div className="flex justify-center">
            <RightCardStack />
          </div>
        </div>
        <div className="w-full text-center px-2">
          <TextBlock />
        </div>
      </div>

      {/* Check Balance Modal */}
      <CheckBalanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GiftCardsHero;