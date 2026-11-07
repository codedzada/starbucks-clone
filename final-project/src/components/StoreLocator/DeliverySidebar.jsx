import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdLocationOn,
  MdAddLocation,
  MdCheckCircle,
  MdDeleteOutline,
  MdDirectionsBike,
  MdHome,
  MdWork,
  MdApartment,
  MdBookmark,
  MdArrowForward,
} from 'react-icons/md';
import { useAuth } from '../../features/auth/AuthContext';
import AddAddressModal from './AddAddressModal';

const getAddressIcon = (label) => {
  switch (label?.toLowerCase()) {
    case 'home':
      return MdHome;
    case 'work':
    case 'office':
      return MdWork;
    case 'apartment':
      return MdApartment;
    default:
      return MdBookmark;
  }
};

const SirenMark = () => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#006241] flex-shrink-0">
    <svg viewBox="0 0 73 85" className="w-4 h-4">
      <path
        fill="#fff"
        d="M53.8 38.6c-2-4-9.6-7.2-17.6-7.2-8 0-15.2 3.2-17.6 7.2 0 0 3.6 8 18.4 8 13.6-.4 16.8-8 16.8-8z"
      />
    </svg>
  </span>
);

const DEFAULT_MOCK_ADDRESSES = [
  {
    id: 'mock_1',
    label: 'Home',
    street: '1585 Broadway',
    apt: 'Apt 12B',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    notes: 'Leave with doorman',
  },
  {
    id: 'mock_2',
    label: 'Work',
    street: '350 Fifth Ave',
    apt: 'Suite 400',
    city: 'New York',
    state: 'NY',
    zip: '10118',
    notes: 'Call upon arrival',
  },
  {
    id: 'mock_3',
    label: 'Apartment',
    street: '1 Whitehall St',
    apt: 'Apt 8F',
    city: 'New York',
    state: 'NY',
    zip: '10004',
    notes: 'Ring doorbell #806',
  },
  {
    id: 'mock_4',
    label: 'Other',
    street: '140 E 45th St',
    apt: 'Fl 2 (Equinox Gym)',
    city: 'New York',
    state: 'NY',
    zip: '10017',
    notes: 'Front desk lobby drop-off',
  },
  {
    id: 'mock_5',
    label: 'Other',
    street: '5 Union Square West',
    apt: 'Apt 3A',
    city: 'New York',
    state: 'NY',
    zip: '10003',
    notes: 'Leave at side entrance',
  },
];

const DeliverySidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const storageKey = `sb_delivery_addresses_${user.email}`;
    const saved = localStorage.getItem(storageKey);

    let initialAddresses = DEFAULT_MOCK_ADDRESSES;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          initialAddresses = parsed;
        }
      } catch (err) {
        console.error('Failed to parse saved delivery addresses:', err);
      }
    }

    setAddresses(initialAddresses);

    const storedActive = localStorage.getItem('starbucks_delivery_address');
    let foundMatch = initialAddresses.find((a) => {
      const full = `${a.street}${a.apt ? `, ${a.apt}` : ''}, ${a.city}, ${a.state} ${a.zip}`;
      return full === storedActive;
    });

    const activeId = foundMatch ? foundMatch.id : initialAddresses[0]?.id;
    setSelectedAddressId(activeId);

    const activeObj = initialAddresses.find((a) => a.id === activeId);
    if (activeObj) {
      updateStoredActiveAddress(activeObj);
    }
  }, [user]);

  const updateStoredActiveAddress = (addressObj) => {
    const fullAddress = `${addressObj.street}${addressObj.apt ? `, ${addressObj.apt}` : ''}, ${addressObj.city}, ${addressObj.state} ${addressObj.zip}`;
    localStorage.setItem('starbucks_delivery_address', fullAddress);
    localStorage.setItem('starbucks_order_type', 'delivery');
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id);
    updateStoredActiveAddress(addr);
  };

  const handleAddAddress = (newAddr) => {
    if (!user) return;

    const updated = [newAddr, ...addresses];
    setAddresses(updated);
    setSelectedAddressId(newAddr.id);
    updateStoredActiveAddress(newAddr);

    const storageKey = `sb_delivery_addresses_${user.email}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleDeleteAddress = (e, addrId) => {
    e.stopPropagation();
    if (!user) return;

    const updated = addresses.filter((a) => a.id !== addrId);
    setAddresses(updated);

    const storageKey = `sb_delivery_addresses_${user.email}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));

    if (selectedAddressId === addrId && updated.length > 0) {
      setSelectedAddressId(updated[0].id);
      updateStoredActiveAddress(updated[0]);
    }
  };

  const handleStartOrder = () => {
    navigate('/menu');
  };

  if (!user) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex-shrink-0 px-8 pt-10 pb-6 border-b border-gray-100">
          <h2 className="text-[26px] font-bold text-[#1e3932] leading-tight tracking-tight">
            Sign in or create<br />an account
          </h2>
          <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">
            Access Starbucks® delivery and Rewards.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <SirenMark />
              <h3 className="text-[15px] font-bold text-[#212121]">Returning customer?</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-snug">
              Sign in to enjoy Starbucks® delivery and earn Rewards.
            </p>
            <Link
              to="/login"
              id="delivery-signin-btn"
              className="block w-full text-center py-3 bg-[#006241] text-white text-[14px] font-bold rounded-full hover:bg-[#004d33] transition-colors duration-150 shadow-sm"
            >
              Sign in
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              New here?
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#f9f9f9] p-6 space-y-3">
            <h3 className="text-[15px] font-bold text-[#212121]">Join Starbucks® Rewards</h3>
            <p className="text-[13px] text-gray-500 leading-snug">
              Earn free food and drinks, unlock our best offers, and celebrate your birthday
              with a treat. It's free to join.
            </p>
            <Link
              to="/register"
              id="delivery-join-btn"
              className="block w-full text-center py-3 border-2 border-[#1e3932] text-[#1e3932] text-[14px] font-bold rounded-full hover:bg-[#1e3932] hover:text-white transition-all duration-200 text-center"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="flex-shrink-0 px-8 py-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Menu limited. Delivery pricing may differ from in-store prices. Additional fees may
            apply. Delivery orders are not eligible for Starbucks® Rewards benefits at this time.
          </p>
        </div>
      </div>
    );
  }

  const activeAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-shrink-0 px-7 pt-8 pb-5 border-b border-gray-100 bg-[#f9f9f9]/80">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <SirenMark />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#006241] bg-[#006241]/10 px-2.5 py-0.5 rounded-full">
              Rewards Member
            </span>
          </div>
        </div>
        <h2 className="text-[24px] font-bold text-[#1e3932] leading-tight tracking-tight mt-2">
          Deliver to {user.firstName || 'you'}
        </h2>
        <p className="text-[13px] text-gray-500 mt-1">
          Select or add a delivery destination below.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
        {activeAddress && (
          <div className="rounded-2xl border-2 border-[#006241] bg-[#006241]/5 p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#006241] text-white">
                  <MdLocationOn className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006241]">
                    Active Destination
                  </span>
                  <h3 className="text-[16px] font-bold text-[#1e3932]">
                    {activeAddress.label}
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006241] bg-white px-2.5 py-1 rounded-full border border-[#006241]/30">
                <MdCheckCircle className="w-3.5 h-3.5 text-[#006241]" /> Selected
              </span>
            </div>

            <div className="text-[13px] text-gray-700 font-medium leading-snug pl-1">
              <p className="font-bold text-[#212121]">
                {activeAddress.street} {activeAddress.apt && `(${activeAddress.apt})`}
              </p>
              <p className="text-gray-500">
                {activeAddress.city}, {activeAddress.state} {activeAddress.zip}
              </p>
              {activeAddress.notes && (
                <p className="text-[12px] text-gray-500 italic mt-1 bg-white/80 p-2 rounded-lg border border-gray-200/60">
                  "{activeAddress.notes}"
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-[#006241]/15 flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5 font-bold text-[#1e3932]">
                <MdDirectionsBike className="w-4 h-4 text-[#006241]" /> 15–25 min estimate
              </span>
              <span className="font-extrabold text-[#006241] bg-white px-2 py-0.5 rounded-md border border-gray-200">
                $0.00 Delivery Fee
              </span>
            </div>

            <button
              onClick={handleStartOrder}
              className="w-full mt-2 py-3 bg-[#006241] hover:bg-[#004d33] text-white text-[14px] font-bold rounded-full shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Start delivery order <MdArrowForward className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[14px] font-bold text-[#1e3932] tracking-tight">
              Saved Mock Addresses ({addresses.length})
            </h4>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1 text-[13px] font-bold text-[#006241] hover:text-[#004d33] hover:underline cursor-pointer"
            >
              <MdAddLocation className="w-4 h-4" /> Add new
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-6 px-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50">
              <p className="text-[13px] text-gray-500">No delivery addresses saved yet.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 text-[13px] font-bold text-[#006241] hover:underline"
              >
                + Add your first address
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {addresses.map((addr) => {
                const IconComponent = getAddressIcon(addr.label);
                const isSelected = addr.id === selectedAddressId;

                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    className={`group relative p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#006241] bg-[#006241]/5 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#006241] bg-[#006241]'
                            : 'border-gray-400 bg-white group-hover:border-gray-600'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-[#006241]" />
                        <span className="text-[13px] font-bold text-[#212121]">
                          {addr.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-600 truncate mt-0.5">
                        {addr.street} {addr.apt && `, ${addr.apt}`}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {addr.city}, {addr.state} {addr.zip}
                      </p>
                    </div>

                    {addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteAddress(e, addr.id)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Remove address"
                        aria-label="Remove address"
                      >
                        <MdDeleteOutline className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 px-7 py-3.5 border-t border-gray-100 bg-[#f9f9f9]">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Mock Delivery System. Delivery prices and fees are simulated for demonstration purposes.
        </p>
      </div>

      <AddAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
};

export default DeliverySidebar;
