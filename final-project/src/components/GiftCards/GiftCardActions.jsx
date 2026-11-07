import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../../features/auth/AuthContext';
import CheckBalanceModal from './CheckBalanceModal';
import AuthGuardModal from './AuthGuardModal';

export default function GiftCardActions() {
  const { user } = useAuth();
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Auth guard: only signed-in users can check their balance
  const handleCheckBalance = () => {
    if (!user) {
      message.error('Please sign in or create an account to check your card balance.');
      setIsAuthModalOpen(true);
      return;
    }
    setIsBalanceModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Card 1: Received a gift card? */}
        <div className="bg-[#F1F0EB] rounded-3xl py-12 px-8 sm:px-12 flex flex-col items-center text-center justify-between shadow-sm border border-gray-200/50">
          <div>
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#212121] tracking-tight mb-3">
              Received a gift card?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
              Add or reload funds, check your balance and register your card here. Plus, earn perks when you join Starbucks® Rewards.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/giftcards/add-or-reload"
              className="px-6 py-2.5 rounded-full border-2 border-[#006241] text-[#006241] hover:bg-[#006241]/5 font-bold text-sm transition-all duration-150"
            >
              Add or reload
            </Link>

            {/* Check balance — guarded for authenticated users only */}
            <button
              id="check-balance-btn"
              type="button"
              onClick={handleCheckBalance}
              className="px-6 py-2.5 rounded-full bg-[#006241] hover:bg-[#006241]/90 text-white font-bold text-sm shadow-sm transition-all duration-150 cursor-pointer"
            >
              Check balance
            </button>
          </div>
        </div>

        {/* Card 2: Sent a card? */}
        <div className="bg-[#F1F0EB] rounded-3xl py-12 px-8 sm:px-12 flex flex-col items-center text-center justify-between shadow-sm border border-gray-200/50">
          <div>
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#212121] tracking-tight mb-3">
              Sent a card?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-10">
              View your eGift history to send, resend eGifts, or contact Starbucks eGift Support.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/giftcards/history"
              className="px-6 py-2.5 rounded-full border-2 border-[#006241] text-[#006241] hover:bg-[#006241]/5 font-bold text-sm transition-all duration-150"
            >
              eGift history
            </Link>
          </div>
        </div>

      </div>

      {/* Check Balance Drawer — only reachable when authenticated */}
      <CheckBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
      />

      {/* Auth Guard Modal — shown when a guest clicks "Check balance" */}
      <AuthGuardModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Sign in to check your balance"
        description="You need a Starbucks account to check your gift card balance. Sign in or create a free account to get started."
      />
    </div>
  );
}