import React from 'react';
import { Link } from 'react-router-dom';

export default function GiftCardInfoSections() {
  return (
    <div className="w-full bg-[#ECEBE9] py-16 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Sol tərəf: About eGift cards */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#212121] tracking-tight mb-4">
              About eGift cards
            </h3>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              A Starbucks eGift card (also known as an “eGift”) is a Starbucks Gift Card that is purchased and sent digitally.
            </p>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              For Senders of an eGift, go to eGift History when signed in to view, send, or resend eGifts you’ve purchased — or, to directly contact Starbucks eGift Support for help with your order.
            </p>
          </div>

          <div>
            <Link
              to="/giftcards/history"
              className="inline-block px-7 py-2.5 rounded-full border border-[#212121] text-[#212121] hover:bg-black/5 font-bold text-sm transition-all duration-150"
            >
              eGift History
            </Link>
          </div>
        </div>

        {/* Sağ tərəf: About Starbucks Gift Cards in general */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#212121] tracking-tight mb-4">
              About Starbucks Gift Cards in general
            </h3>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              Starbucks Gift Cards, including eGifts, can be used to pay in a participating Starbucks store or can be used to join the Starbucks® Rewards loyalty program.
            </p>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Register Gift Cards and eGifts to a Starbucks® Rewards account and Starbucks® Rewards members earn Stars on qualifying purchases when you pay with that card.
            </p>
          </div>

          <div>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-[#212121] text-[#212121] hover:bg-black/5 font-bold text-sm transition-all duration-150"
            >
              Card Terms & Conditions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}