import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineLocationOn, MdSearch, MdClose } from 'react-icons/md';
import StarbucksLogo from '../assets/starbucks-icon.svg';

const GetStarted = () => {
  const [address, setAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setStatusMessage('Locating your position...');
    setTimeout(() => {
      setAddress('1585 Broadway, New York, NY 10036');
      setIsLocating(false);
      setStatusMessage('Location found!');
      setTimeout(() => setStatusMessage(''), 2000);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsChecking(true);
    setStatusMessage('Checking delivery coverage in your area...');

    setTimeout(() => {
      setStatusMessage('Connecting with DoorDash...');
      setTimeout(() => {
        // Save delivery address to local storage
        localStorage.setItem('starbucks_delivery_address', address);
        localStorage.setItem('starbucks_order_type', 'delivery');
        setIsChecking(false);
        navigate('/menu');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col font-sans">
      {/* Mini Header */}
      <header className="w-full h-[72px] bg-white border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link to="/" className="w-10 h-10 cursor-pointer">
          <img src={StarbucksLogo} alt="Starbucks Logo" className="w-full h-full object-contain" />
        </Link>
        <h1 className="text-[16px] font-bold text-[#212121] tracking-wide">
          Starbucks® Delivery
        </h1>
        <button
          onClick={() => navigate('/store-locator')}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-gray-600"
          aria-label="Back to store locator"
        >
          <MdClose className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-12 md:py-20 max-w-[500px] mx-auto w-full">
        <div className="w-full bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#212121] tracking-tight leading-tight mb-2 text-center">
            Where should we deliver?
          </h2>
          <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed">
            Enter your delivery address below. We'll search for Starbucks stores in your neighborhood partnering with DoorDash.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                disabled={isChecking}
                className="w-full pl-4 pr-12 py-3.5 text-[15px] text-[#212121] bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241] transition-all duration-200 placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MdSearch className="w-6 h-6" />
              </span>
            </div>

            {/* Geolocation trigger */}
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating || isChecking}
              className="w-full py-3 px-4 border border-gray-300 rounded-full text-[14px] font-bold text-[#212121] hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdOutlineLocationOn className="w-4 h-4 text-[#006241]" />
              {isLocating ? 'Locating...' : 'Use my current location'}
            </button>

            {/* Action State Messages */}
            {statusMessage && (
              <div className="flex items-center justify-center gap-2 py-2 text-[13px] font-medium text-[#006241] animate-pulse">
                {isChecking || isLocating ? (
                  <div className="w-4 h-4 border-2 border-[#006241] border-t-transparent rounded-full animate-spin" />
                ) : null}
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={!address.trim() || isChecking}
              className="w-full py-3.5 bg-[#006241] text-white text-[15px] font-bold rounded-full hover:bg-[#004d33] transition-colors duration-150 shadow-md cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed mt-2"
            >
              {isChecking ? 'Checking availability...' : 'Find stores and start order'}
            </button>
          </form>
        </div>

        {/* Footer Fine Print */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-[11px] text-gray-400 leading-relaxed px-4">
            Menu limited. Menu pricing for delivery may be higher than posted in stores or as marked. Additional fees may apply. Delivery orders are not eligible for Starbucks® Rewards benefits at this time.
          </p>
          <div className="flex items-center justify-center gap-4 text-[12px] font-semibold text-[#006241]">
            <Link to="/store-locator" className="hover:underline">
              Find a Pickup Store
            </Link>
            <span className="text-gray-300">|</span>
            <a href="https://www.starbucks.com/delivery" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Delivery FAQs
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
