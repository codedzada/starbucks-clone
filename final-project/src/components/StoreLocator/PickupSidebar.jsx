/**
 * PickupSidebar.jsx
 *
 * Left panel shown when the "Pickup" tab is active.
 * Renders: search bar, filter button + chips, store count,
 * the scrollable store list (or empty state), and the
 * slide-in FilterPanel overlay.
 */

import React, { useRef } from 'react';
import { FiSliders } from 'react-icons/fi';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import StoreCard from './StoreCard';
import { allFeatures } from '../../data/storesData';

// ── Small inline helper: a single active-filter chip ─────────────────────────
const FilterChip = ({ filterId, label, onRemove }) => (
  <button
    onClick={() => onRemove(filterId)}
    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e6f4ec] text-[#006241] text-[11px] font-semibold hover:bg-[#d0ecda] transition-colors duration-150 cursor-pointer focus:outline-none"
    aria-label={`Remove ${label} filter`}
  >
    {label}
    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
);

// ── Small inline helper: footer legal links ───────────────────────────────────
const FooterLinks = () => {
  const links = ['Privacy Notice', 'Terms of Use', 'Do Not Share My Personal Information'];
  return (
    <div className="px-5 py-6 space-y-2 border-t border-gray-100">
      {links.map((label) => (
        <a
          key={label}
          href="#"
          className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-[#006241] transition-colors duration-150"
        >
          {label}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────────────────────
const PickupSidebar = ({
  searchQuery,
  onSearchChange,
  activeFilters,
  onToggleFilter,
  onClearFilters,
  filteredStores,
  selectedStoreId,
  onSelectStore,
  showFilter,
  onOpenFilter,
  onApplyFilter,
  onCloseFilter,
}) => {
  // Ref used to scroll the matching card into view when a pin is clicked on the map
  const listRef = useRef(null);

  return (
    <>
      {/* ── Search + Filter button row ── */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={onSearchChange} onSearch={() => {}} />
          </div>

          {/* Filter toggle — turns green when filters are active */}
          <button
            onClick={onOpenFilter}
            aria-label="Open filters"
            aria-expanded={showFilter}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-[13px] font-semibold transition-all duration-150 cursor-pointer flex-shrink-0 ${
              activeFilters.length > 0
                ? 'bg-[#006241] text-white border-[#006241]'
                : 'bg-white text-[#212121] border-gray-300 hover:border-gray-400'
            }`}
          >
            <FiSliders className="w-4 h-4" />
            <span>Filter</span>
            {/* Active count badge */}
            {activeFilters.length > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-white text-[#006241] text-[10px] font-bold flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips — one per selected filter */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {activeFilters.map((fId) => {
              const feature = allFeatures.find((x) => x.id === fId);
              return (
                <FilterChip
                  key={fId}
                  filterId={fId}
                  label={feature?.label ?? fId}
                  onRemove={onToggleFilter}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── Result count label ── */}
      {filteredStores.length > 0 && (
        <div className="flex-shrink-0 px-5 pt-3 pb-1">
          <p className="text-[12px] text-gray-500 font-medium">
            {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} found
            {searchQuery && (
              <span className="text-gray-400"> for &ldquo;{searchQuery}&rdquo;</span>
            )}
          </p>
        </div>
      )}

      {/* ── Scrollable store list ── */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto"
        role="list"
        aria-label="List of nearby Starbucks stores"
      >
        {filteredStores.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-start px-5 py-8">
            <h2 className="text-[22px] font-bold text-[#212121] mb-1">No stores were found.</h2>
            <p className="text-[14px] text-gray-500 mb-6">Do you want to look further away?</p>
            <button
              onClick={onClearFilters}
              className="px-5 py-2.5 bg-[#006241] text-white rounded-full text-[13px] font-bold hover:bg-[#004d33] transition-colors duration-200 cursor-pointer"
            >
              Expand Search
            </button>
          </div>
        ) : (
          <>
            {filteredStores.map((store) => (
              <div key={store.id} data-store-id={store.id} role="listitem">
                <StoreCard
                  store={store}
                  isActive={selectedStoreId === store.id}
                  onClick={() => onSelectStore(store)}
                />
              </div>
            ))}
            <FooterLinks />
          </>
        )}
      </div>

      {/* ── Filter panel slide-in overlay ── */}
      <div
        className={`absolute inset-0 transform transition-transform duration-300 ease-in-out z-[60] ${
          showFilter ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {showFilter && (
          <FilterPanel
            activeFilters={activeFilters}
            onApply={onApplyFilter}
            onClose={onCloseFilter}
          />
        )}
      </div>
    </>
  );
};

export default PickupSidebar;
