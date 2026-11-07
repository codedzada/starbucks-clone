import React from 'react';
import { Link } from 'react-router-dom';
import { giftCardCategories } from '../../api/giftCardsApi';

export default function GiftCardsCategories() {
  // Sola və ya sağa scroll etmək üçün köməkçi funksiya
  const scrollContainer = (elementId, offset) => {
    const container = document.getElementById(elementId);
    if (container) {
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {giftCardCategories.map((category) => {
        // Hər kateqoriya üçün unikal ID düzəldirik (məsələn: category-1, category-2)
        const scrollContainerId = `category-scroll-${category.id}`;

        return (
          <div key={category.id} className="mb-16">

            {/* Kateqoriya Başlığı və "See all" */}
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-lg font-bold tracking-wide uppercase"
                style={{ color: '#212121' }}
              >
                {category.categoryName}
              </h2>

              <button
                onClick={() => {
                  console.log(`${category.categoryName} - See all clicked`);
                }}
                className="text-sm font-semibold text-[#006241] hover:underline cursor-pointer md:hidden"
              >
                See all
              </button>
            </div>

            {/* MOBİL ÜÇÜN: Sağa-sola scroll olan hissə (Desktopda gizlənir: md:hidden) */}
            <div className="relative flex items-center md:hidden group">

              {/* Sola ox düyməsi */}
              <button
                onClick={() => scrollContainer(scrollContainerId, -300)}
                className="absolute left-0 bg-white/90 shadow-md border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-white z-10 -ml-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Scroll Konteyneri */}
              <div
                id={scrollContainerId}
                className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide w-full scroll-smooth px-2"
              >
                {category.cards.map((card) => (
                  <Link
                    key={card.id}
                    to={`/giftcards/create/${card.id}`}
                    className="flex-shrink-0 w-[280px] cursor-pointer block transform hover:scale-[1.02] transition-transform duration-200"
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-auto object-cover block rounded-xl"
                    />
                  </Link>
                ))}
              </div>

              {/* Sağa ox düyməsi */}
              <button
                onClick={() => scrollContainer(scrollContainerId, 300)}
                className="absolute right-0 bg-white/90 shadow-md border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-white z-10 -mr-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* DESKTOP ÜÇÜN: Normal Grid Strukturu */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {category.cards.map((card) => (
                <Link
                  key={card.id}
                  to={`/giftcards/create/${card.id}`}
                  className="transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer block"
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-auto object-cover block rounded-xl"
                  />
                </Link>
              ))}
            </div>

          </div>
        );
      })}
    </section>
  );
}