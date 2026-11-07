const FEATURE_MAP = {
  'cafe-seating': 'Café Seating',
  'starbucks-wifi': 'Starbucks Wi-Fi',
  'redeem-rewards': 'Redeem Rewards',
  'nitro-cold-brew': 'Nitro Cold Brew',
  'outdoor-seating': 'Outdoor Seating',
  'mobile-order': 'Mobile Order',
  'drive-thru': 'Drive-Thru',
};

export function getFilteredStores(stores, searchQuery, activeFilters) {
  const query = searchQuery.toLowerCase().trim();

  return stores.filter((store) => {
    if (query) {
      const matchSearch = 
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.zip.includes(query);
      
      if (!matchSearch) return false;
    }
    if (activeFilters.length > 0) {
      return activeFilters.every((filterId) => {
        if (filterId === 'open-now') return store.openNow;
        if (filterId === 'open-24hrs') return store.hours?.includes('24');
        if (filterId === 'in-store') return true;
        
        const featureName = FEATURE_MAP[filterId];
        return featureName ? store.features?.includes(featureName) : false;
      });
    }

    return true;
  });
}