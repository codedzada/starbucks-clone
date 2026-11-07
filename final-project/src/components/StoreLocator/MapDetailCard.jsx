/**
 * MapDetailCard.jsx
 *
 * Floating card that appears in the top-right corner of the
 * map when the user selects a store (desktop only).
 * Shows store name, status, address, features, and a call CTA.
 */

import React from 'react';

const MapDetailCard = ({ store, onClose }) => {
  if (!store) return null;

  return (
    <div className="hidden md:block absolute top-4 right-4 z-[1000] w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

      {/* Green header */}
      <div className="bg-[#006241] px-4 py-3 flex items-start justify-between">
        <div>
          <h3 className="text-white font-bold text-[14px] leading-tight">{store.name}</h3>
          <p className="text-white/80 text-[11px] mt-0.5">{store.distance} km away</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close store detail"
          className="text-white/80 hover:text-white transition-colors duration-150 mt-0.5 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {/* Open / closed status */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`inline-block w-2 h-2 rounded-full ${store.openNow ? 'bg-[#006241]' : 'bg-gray-400'}`} />
          <span className={`text-[12px] font-semibold ${store.openNow ? 'text-[#006241]' : 'text-gray-500'}`}>
            {store.openNow
              ? `Open · Closes ${store.closingTime}`
              : `Closed · Opens ${store.openingTime}`}
          </span>
        </div>

        <p className="text-[12px] text-gray-500 mb-1">{store.address}</p>
        <p className="text-[11px] text-gray-400 mb-3">{store.hours}</p>

        {/* Feature tags (max 3 + overflow count) */}
        <div className="flex flex-wrap gap-1 mb-3">
          {store.features.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full">
              {f}
            </span>
          ))}
          {store.features.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full">
              +{store.features.length - 3} more
            </span>
          )}
        </div>

        {/* Phone CTA */}
        <a
          href={`tel:${store.phone}`}
          className="block text-center w-full py-2 bg-[#006241] text-white text-[12px] font-bold rounded-full hover:bg-[#004d33] transition-colors duration-150"
        >
          {store.phone}
        </a>
      </div>
    </div>
  );
};

export default MapDetailCard;
