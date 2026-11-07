import React from 'react';
import GiftCardsHero from '../components/GiftCards/GiftCardsHero';
import GiftCardsSection from '../components/GiftCards/GiftCardsSection'; 
import GiftCardsCategories from '../components/GiftCards/GiftCardsCategories'; 
import GiftCardActions from '../components/GiftCards/GiftCardActions';
import GiftCardFAQ from '../components/GiftCards/GiftCardFAQ';
import GiftCardInfoSections from '../components/GiftCards/GiftCardInfoSections';

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-white">
      
      <GiftCardsHero />
      <GiftCardsSection />
      <GiftCardsCategories />
      <GiftCardActions />
      <GiftCardFAQ />
      <GiftCardInfoSections />
    </main>
  );
}