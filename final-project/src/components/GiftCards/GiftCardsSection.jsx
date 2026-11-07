import React from 'react';
import { Link } from 'react-router-dom';

const giftCardData = [
  {
    id: 1,
    iconUrl: 'https://www.starbucks.com/weblx/images/gift/email-icon.png',
    title: 'Surprise them via email',
    description: "Choose a design they'll love and send a card straight to their inbox.",
    buttonText: 'Shop now',
    isExternal: false,
  },
  {
    id: 2,
    iconUrl: 'https://www.starbucks.com/weblx/images/gift/app-icon.png',
    title: 'Send a digital treat',
    description: 'Gift a little delight in the Starbucks app or via iMessage, or send it through social.',
    buttonText: 'Gift from your phone',
    isExternal: true,
  },
  {
    id: 3,
    iconUrl: 'https://www.starbucks.com/weblx/images/gift/store-icon.png', // Və ya uyğun şəkil URL-i
    title: 'Browse physical cards',
    description: 'Looking to gift irl? Visit your local coffeehouse or a Starbucks Card retailer near you, or order a gift card online.',
    buttonText: 'More ways to gift',
    isExternal: true,
  },
  {
    id: 4,
    iconUrl: 'https://www.starbucks.com/weblx/images/gift/bulk-icon.png', // Və ya uyğun şəkil URL-i
    title: 'Bring joy to larger groups',
    description: 'Make everyone’s day and send many gift cards in one go. Minimum 15 cards per order.',
    buttonText: 'Shop now',
    isExternal: true,
  },
];

const GiftCardsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {giftCardData.map((item) => (
          <div key={item.id} className="flex flex-col items-center justify-between h-full p-4">
            {/* Top Content */}
            <div className="flex flex-col items-center">
              {/* Image Icon */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img
                  src={item.iconUrl}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6">
              {item.isExternal ? (
                <a
                  href="#"
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-full border border-[#006241] text-[#006241] font-semibold text-sm hover:bg-[#006241]/10 transition-colors duration-200"
                >
                  {item.buttonText}
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <Link
                  to="/giftcards/create/101"
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-full border border-[#006241] text-[#006241] font-semibold text-sm hover:bg-[#006241]/10 transition-colors duration-200"
                >
                  {item.buttonText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftCardsSection;