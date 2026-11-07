import React, { useState, useEffect } from 'react';
import { IoCarOutline } from 'react-icons/io5';
import { MdOutlineChair, MdOutlineWifi, MdOutlineStar, MdOutlineSmartphone, MdCheck, MdOutlineHome } from 'react-icons/md';
import { RiCupLine } from 'react-icons/ri';
import { PiLeafLight } from 'react-icons/pi';
import { BiTimeFive } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';

const FILTER_ITEMS = [
  // Store Hours
  { id: 'open-now', label: 'Open Now', category: 'hours', icon: <BiTimeFive className="w-5 h-5" /> },
  { id: 'open-24hrs', label: 'Open 24 hours per day', category: 'hours', icon: <BiTimeFive className="w-5 h-5" /> },
  
  // Order & Pick Up Options
  { id: 'mobile-order', label: 'Order ahead', category: 'pickup', icon: <MdOutlineSmartphone className="w-5 h-5" /> },
  { id: 'order-ahead-without-account', label: 'Order ahead without account', category: 'pickup', icon: <MdOutlineSmartphone className="w-5 h-5" /> },
  { id: 'in-store', label: 'In store', category: 'pickup', icon: <MdOutlineHome className="w-5 h-5" /> },
  { id: 'drive-thru', label: 'Drive-Thru', category: 'pickup', icon: <IoCarOutline className="w-5 h-5" /> },
  
  // Amenities
  { id: 'cafe-seating', label: 'Café Seating', category: 'amenities', icon: <MdOutlineChair className="w-5 h-5" /> },
  { id: 'starbucks-wifi', label: 'Starbucks Wi-Fi', category: 'amenities', icon: <MdOutlineWifi className="w-5 h-5" /> },
  { id: 'redeem-rewards', label: 'Redeem Rewards', category: 'amenities', icon: <MdOutlineStar className="w-5 h-5" /> },
  { id: 'nitro-cold-brew', label: 'Nitro Cold Brew', category: 'amenities', icon: <RiCupLine className="w-5 h-5" /> },
  { id: 'outdoor-seating', label: 'Outdoor Seating', category: 'amenities', icon: <PiLeafLight className="w-5 h-5" /> },
];

const FilterPanel = ({ activeFilters = [], onApply, onClose }) => {
  const [draftFilters, setDraftFilters] = useState([]);

  // Initialize draft filters from activeFilters when the panel opens
  useEffect(() => {
    setDraftFilters(activeFilters);
  }, [activeFilters]);

  const handleToggle = (id) => {
    setDraftFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setDraftFilters([]);
  };

  const handleApply = () => {
    onApply?.(draftFilters);
  };

  const hoursFilters = FILTER_ITEMS.filter((f) => f.category === 'hours');
  const pickupFilters = FILTER_ITEMS.filter((f) => f.category === 'pickup');
  const amenitiesFilters = FILTER_ITEMS.filter((f) => f.category === 'amenities');

  const FilterRow = ({ item }) => {
    const isChecked = draftFilters.includes(item.id);
    return (
      <button
        onClick={() => handleToggle(item.id)}
        aria-pressed={isChecked}
        className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 cursor-pointer text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span className={`text-gray-500 flex-shrink-0 ${isChecked ? 'text-[#006241]' : 'text-gray-500'}`}>
            {item.icon}
          </span>
          <span className={`text-[14px] leading-tight font-medium ${isChecked ? 'text-[#212121] font-semibold' : 'text-[#212121]'}`}>
            {item.label}
          </span>
        </div>
        {isChecked && (
          <span className="w-5 h-5 rounded-full bg-[#006241] flex items-center justify-center">
            <MdCheck className="w-3.5 h-3.5 text-white" />
          </span>
        )}
      </button>
    );
  };

  const SectionHeader = ({ title }) => (
    <div className="px-5 py-3.5 bg-[#f2f0eb] border-y border-gray-200/80">
      <h3 className="text-[11px] font-black tracking-[0.14em] uppercase text-gray-500 leading-none">
        {title}
      </h3>
    </div>
  );

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Store filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200/80 flex-shrink-0">
        <h2 className="text-[20px] font-bold text-[#212121] tracking-tight">Filters</h2>
        <button
          onClick={onClose}
          aria-label="Close filters"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors duration-150 cursor-pointer focus:outline-none"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Options List */}
      <div className="flex-1 overflow-y-auto">
        <SectionHeader title="Store Hours" />
        <div className="flex flex-col bg-white">
          {hoursFilters.map((f) => (
            <FilterRow key={f.id} item={f} />
          ))}
        </div>

        <SectionHeader title="Order & Pick Up Options" />
        <div className="flex flex-col bg-white">
          {pickupFilters.map((f) => (
            <FilterRow key={f.id} item={f} />
          ))}
        </div>

        <SectionHeader title="Amenities" />
        <div className="flex flex-col bg-white">
          {amenitiesFilters.map((f) => (
            <FilterRow key={f.id} item={f} />
          ))}
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="flex-shrink-0 px-5 py-4 border-t border-gray-200/80 bg-white flex items-center justify-between gap-4">
        {draftFilters.length > 0 ? (
          <button
            onClick={handleClearAll}
            className="text-[14px] font-bold text-[#006241] hover:underline cursor-pointer focus:outline-none"
          >
            Clear all
          </button>
        ) : (
          <span className="text-[13px] text-gray-400">0 filters selected</span>
        )}

        <button
          onClick={handleApply}
          className="px-6 py-2.5 bg-[#006241] text-white text-[14px] font-bold rounded-full hover:bg-[#004d33] transition-all duration-150 shadow-sm hover:shadow cursor-pointer focus:outline-none min-w-[120px] text-center"
        >
          Apply{draftFilters.length > 0 ? ` (${draftFilters.length})` : ''}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
