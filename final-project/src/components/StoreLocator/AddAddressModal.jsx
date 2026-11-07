import React, { useState } from 'react';
import { MdClose, MdLocationOn, MdHome, MdWork, MdApartment, MdBookmark } from 'react-icons/md';

const LABEL_OPTIONS = [
  { label: 'Home', icon: MdHome },
  { label: 'Work', icon: MdWork },
  { label: 'Apartment', icon: MdApartment },
  { label: 'Other', icon: MdBookmark },
];

const AddAddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [label, setLabel] = useState('Home');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [zip, setZip] = useState('10001');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!street.trim()) newErrors.street = 'Street address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!zip.trim()) newErrors.zip = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newAddress = {
      id: `addr_${Date.now()}`,
      label,
      street: street.trim(),
      apt: apt.trim(),
      city: city.trim(),
      state: state.trim() || 'NY',
      zip: zip.trim(),
      notes: notes.trim(),
    };

    onAddAddress(newAddress);
    setStreet('');
    setApt('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-address-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-100 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#f9f9f9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006241]/10 flex items-center justify-center text-[#006241]">
              <MdLocationOn className="w-5 h-5" />
            </div>
            <h2 id="add-address-title" className="text-[18px] font-bold text-[#1e3932]">
              Add New Delivery Address
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-[13px] font-bold text-[#212121] mb-2">
              Address Label
            </label>
            <div className="grid grid-cols-4 gap-2">
              {LABEL_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = label === opt.label;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => setLabel(opt.label)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-[12px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#006241] bg-[#006241]/10 text-[#006241] shadow-xs'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#212121] mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. 1585 Broadway"
              className={`w-full px-3.5 py-2.5 text-[14px] text-[#212121] bg-white border rounded-xl focus:outline-none transition-all ${
                errors.street
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-300 focus:border-[#006241] focus:ring-1 focus:ring-[#006241]'
              }`}
            />
            {errors.street && (
              <p className="text-[11px] text-red-500 mt-1">{errors.street}</p>
            )}
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#212121] mb-1">
              Apt, Suite, Building (Optional)
            </label>
            <input
              type="text"
              value={apt}
              onChange={(e) => setApt(e.target.value)}
              placeholder="e.g. Apt 4B or Floor 3"
              className="w-full px-3.5 py-2.5 text-[14px] text-[#212121] bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241] transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[13px] font-bold text-[#212121] mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="New York"
                className="w-full px-3 py-2 text-[13px] text-[#212121] bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241]"
              />
              {errors.city && (
                <p className="text-[10px] text-red-500 mt-0.5">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#212121] mb-1">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="NY"
                className="w-full px-3 py-2 text-[13px] text-[#212121] bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#212121] mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="10001"
                className="w-full px-3 py-2 text-[13px] text-[#212121] bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241]"
              />
              {errors.zip && (
                <p className="text-[10px] text-red-500 mt-0.5">{errors.zip}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#212121] mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Leave at front door or ring bell #4"
              className="w-full px-3.5 py-2 text-[13px] text-[#212121] bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241] transition-all resize-none"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-[14px] font-bold text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#006241] hover:bg-[#004d33] text-white text-[14px] font-bold rounded-full shadow-md transition-colors cursor-pointer"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
