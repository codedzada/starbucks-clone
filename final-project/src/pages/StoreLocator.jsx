import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';

import { storesData } from '../data/storesData';
import { getFilteredStores } from '../utils/storeFilters';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStore } from '../redux/storeSlice';

import PickupSidebar    from '../components/StoreLocator/PickupSidebar';
import DeliverySidebar  from '../components/StoreLocator/DeliverySidebar';
import MapDetailCard    from '../components/StoreLocator/MapDetailCard';
import StoreMap         from '../components/StoreLocator/StoreMap';
import DeliveryGraphic  from '../components/StoreLocator/DeliveryGraphic';

const StoreLocator = () => {
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state.store.selectedStore);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('type') === 'delivery' ? 'delivery' : 'pickup';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [activeFilters, setActiveFilters] = useState([]);   // array of filter IDs
  const [selectedStore, setSelectedStoreLocal] = useState(reduxStore); // store object | null
  const [showFilter,    setShowFilter]    = useState(false); // filter panel open
  const [mobileView,    setMobileView]    = useState('list'); // 'list' | 'map'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'delivery' ? { type: 'delivery' } : {});
  };

  const filteredStores = useMemo(
    () => getFilteredStores(storesData, searchQuery, activeFilters),
    [searchQuery, activeFilters]
  );

  const handleToggleFilter = useCallback((filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  }, []);

  const handleApplyFilters = useCallback((draftFilters) => {
    setActiveFilters(draftFilters);
    setShowFilter(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery('');
  }, []);

  const handleSelectStore = useCallback((store) => {
    setSelectedStoreLocal(store);
    dispatch(setSelectedStore(store));
    setMobileView('map');
  }, [dispatch]);

  const sidebarHidden = activeTab === 'pickup' && mobileView === 'map';

  return (
    <div
      className="flex flex-col"
      style={{ height: 'calc(100vh - 100px)' }}
      aria-label="Find a Starbucks Store"
    >

      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center">
        <div
          className="inline-flex rounded-full p-1 bg-gray-100 border border-gray-200"
          role="tablist"
          aria-label="Order type"
        >
          {['pickup', 'delivery'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all duration-200 cursor-pointer capitalize ${
                activeTab === tab
                  ? 'bg-[#006241] text-white shadow-sm'
                  : 'text-[#006241] hover:bg-gray-200/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'pickup' && (
          <div className="ml-auto flex md:hidden gap-2">
            {['list', 'map'].map((view) => (
              <button
                key={view}
                onClick={() => setMobileView(view)}
                className={`px-4 py-2 text-[12px] font-semibold rounded-full border transition-all duration-150 cursor-pointer capitalize ${
                  mobileView === view
                    ? 'bg-[#006241] text-white border-[#006241]'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">

        <aside
          className={`
            w-full md:w-[400px] lg:w-[420px] flex-shrink-0
            flex flex-col bg-white border-r border-gray-200
            overflow-hidden relative
            ${sidebarHidden ? 'hidden md:flex' : 'flex'}
          `}
          aria-label="Store list sidebar"
        >
          {activeTab === 'pickup' ? (
            <PickupSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              onClearFilters={handleClearFilters}
              filteredStores={filteredStores}
              selectedStoreId={selectedStore?.id}
              onSelectStore={handleSelectStore}
              showFilter={showFilter}
              onOpenFilter={() => setShowFilter(true)}
              onApplyFilter={handleApplyFilters}
              onCloseFilter={() => setShowFilter(false)}
            />
          ) : (
            <DeliverySidebar />
          )}
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {activeTab === 'pickup' ? (
            <div className={`w-full h-full relative ${mobileView === 'list' ? 'hidden md:block' : 'block'}`}>

              <MapDetailCard
                store={selectedStore}
                onClose={() => setSelectedStore(null)}
              />

              <button
                className="hidden md:flex absolute bottom-8 left-4 z-[1000] items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg text-[13px] font-semibold text-[#212121] hover:shadow-xl hover:text-[#006241] transition-all duration-200 border border-gray-200 cursor-pointer"
                aria-label="Use my current location"
              >
                <MdOutlineLocationOn className="w-4 h-4 text-[#006241]" />
                Use current location
              </button>

              <StoreMap
                stores={filteredStores}
                selectedStore={selectedStore}
                onStoreSelect={handleSelectStore}
              />
            </div>
          ) : (
            <DeliveryGraphic />
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        .animate-float  { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default StoreLocator;
