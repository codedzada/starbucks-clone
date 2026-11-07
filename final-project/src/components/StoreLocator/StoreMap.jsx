import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for Vite/webpack builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Universal koordinat təmizləyici (istənilən formatı yoxlayır: lat/lng, latitude/longitude, və s.)
const getValidCoords = (item) => {
  if (!item) return null;
  
  const rawLat = item.lat ?? item.latitude;
  const rawLng = item.lng ?? item.longitude;

  const lat = parseFloat(rawLat);
  const lng = parseFloat(rawLng);

  if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) {
    return null;
  }
  return [lat, lng];
};

const createStarbucksIcon = (isActive = false) => {
  const color = isActive ? '#1e3932' : '#006241';
  const scale = isActive ? 1.25 : 1;
  const borderWeight = isActive ? '2' : '1';
  
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${32 * scale}" height="${44 * scale}" viewBox="0 0 32 44">
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
      </filter>
      <g filter="url(#shadow)">
        <path d="M16 2C9.373 2 4 7.373 4 14c0 9.188 12 26 12 26s12-16.813 12-26C28 7.373 22.627 2 16 2z"
            fill="${color}" stroke="white" stroke-width="${borderWeight}"/>
        <circle cx="16" cy="14" r="6.5" fill="white" />
        <text x="16" y="17" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="900" fill="${color}">S</text>
      </g>
    </svg>
  `;
  return L.divIcon({
    html: svgContent,
    className: 'custom-starbucks-marker',
    iconSize: [32 * scale, 44 * scale],
    iconAnchor: [16 * scale, 44 * scale],
    popupAnchor: [0, -44 * scale],
  });
};

const MapController = ({ selectedStore }) => {
  const map = useMap();
  useEffect(() => {
    const coords = getValidCoords(selectedStore);
    if (!coords) return; // Əgər koordinat səhvdirsə, flyTo heç vaxt çağrılmır

    try {
      map.flyTo(coords, 15, { duration: 1.2 });
    } catch (err) {
      console.error("FlyTo error suppressed:", err);
    }
  }, [selectedStore, map]);
  return null;
};

const StoreMap = ({ stores = [], selectedStore, onStoreSelect }) => {
  const defaultLat = 40.7589;
  const defaultLng = -73.9851;

  // İlk keçərli mağazanı və ya default dəyəri tapırıq
  let centerCoords = getValidCoords(selectedStore);
  if (!centerCoords && stores.length > 0) {
    for (const store of stores) {
      centerCoords = getValidCoords(store);
      if (centerCoords) break;
    }
  }
  const [centerLat, centerLng] = centerCoords || [defaultLat, defaultLng];

  return (
    <div className="w-full h-full relative" aria-label="Interactive store map">
      <style>{`
        .leaflet-container { font-family: inherit; z-index: 1; }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 220px;
        }
        .leaflet-popup-tip-container { display: none; }
      `}</style>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        className="w-full h-full"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedStore={selectedStore} />

        {stores.map((store) => {
          const coords = getValidCoords(store);
          if (!coords) return null; // Yanlış koordinatlı elementləri render etmirik

          return (
            <Marker
              key={store.id || `${coords[0]}-${coords[1]}`}
              position={coords}
              icon={createStarbucksIcon(selectedStore?.id === store.id)}
              eventHandlers={{
                click: () => onStoreSelect(store),
              }}
            >
              <Popup>
                <div className="p-4 text-left">
                  <h4 className="font-bold text-[14px] text-[#212121] mb-1">{store.name}</h4>
                  <p className="text-[12px] text-gray-500 mb-2 leading-tight">{store.address}</p>
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className={`inline-block w-2 h-2 rounded-full ${store.openNow ? 'bg-[#006241]' : 'bg-gray-400'}`} />
                    <span className={`text-[12px] font-semibold ${store.openNow ? 'text-[#006241]' : 'text-gray-500'}`}>
                      {store.openNow ? `Open · Closes ${store.closingTime}` : `Closed`}
                    </span>
                  </div>
                  <button
                    onClick={() => onStoreSelect(store)}
                    className="w-full text-center text-[12px] font-bold text-white bg-[#006241] rounded-full py-2 px-3 hover:bg-[#004d33] transition-colors duration-150 cursor-pointer focus:outline-none"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default StoreMap;