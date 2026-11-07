import React from 'react';
import { IoCarOutline } from 'react-icons/io5';
import { MdOutlineChair, MdOutlineWifi, MdOutlineStar, MdOutlineSmartphone } from 'react-icons/md';
import { RiCupLine } from 'react-icons/ri';
import { PiLeafLight } from 'react-icons/pi';
import { FiPhone, FiMapPin, FiNavigation } from 'react-icons/fi';

const FEATURE_ICONS = {
  'Drive-Thru': <IoCarOutline className="w-3.5 h-3.5" />,
  'Café Seating': <MdOutlineChair className="w-3.5 h-3.5" />,
  'Mobile Order': <MdOutlineSmartphone className="w-3.5 h-3.5" />,
  'Starbucks Wi-Fi': <MdOutlineWifi className="w-3.5 h-3.5" />,
  'Redeem Rewards': <MdOutlineStar className="w-3.5 h-3.5" />,
  'Nitro Cold Brew': <RiCupLine className="w-3.5 h-3.5" />,
  'Outdoor Seating': <PiLeafLight className="w-3.5 h-3.5" />,
};

const StoreCard = ({ store, isActive, onClick }) => {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${store.name}, ${store.distance} km away`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`px-6 py-5 border-b border-gray-200/60 cursor-pointer transition-all duration-200 group text-left ${
        isActive
          ? 'bg-[#f4fbf7] border-l-4 border-l-[#006241]'
          : 'hover:bg-gray-50 border-l-4 border-l-transparent'
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className={`text-[15px] font-bold leading-snug transition-colors duration-150 ${
          isActive ? 'text-[#006241]' : 'text-[#212121] group-hover:text-[#006241]'
        }`}>
          {store.name}
        </h3>
        <span className="text-[13px] font-semibold text-gray-500 flex-shrink-0">
          {store.distance} km
        </span>
      </div>

      {/* Address */}
      <p className="text-[13px] text-gray-500 font-normal leading-snug mb-2">{store.address}</p>

      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${store.openNow ? 'bg-[#006241]' : 'bg-gray-400'}`} />
        <span className={`text-[13px] font-semibold ${store.openNow ? 'text-[#006241]' : 'text-gray-500'}`}>
          {store.openNow ? `Open · Closes ${store.closingTime}` : `Closed · Opens ${store.openingTime}`}
        </span>
      </div>

      {/* Quick Action Links */}
      <div className="flex items-center gap-4 mb-4 text-[13px] font-medium text-gray-500">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 hover:text-[#006241] transition-colors duration-150"
        >
          <FiNavigation className="w-3.5 h-3.5" />
          <span>Directions</span>
        </a>
        <a
          href={`tel:${store.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 hover:text-[#006241] transition-colors duration-150"
          aria-label={`Call ${store.name}`}
        >
          <FiPhone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>
      </div>

      {/* Feature capsules */}
      <div className="flex flex-wrap gap-1.5">
        {store.features.map((feature) => (
          <span
            key={feature}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100/90 text-[#212121] text-[11px] font-medium border border-gray-200/40"
          >
            {FEATURE_ICONS[feature] && (
              <span className="text-[#006241]">{FEATURE_ICONS[feature]}</span>
            )}
            {feature}
          </span>
        ))}
      </div>
    </article>
  );
};

export default StoreCard;
