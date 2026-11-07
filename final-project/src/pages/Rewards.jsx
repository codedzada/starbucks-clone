import React, { useState, useEffect } from 'react';
import { fetchRewardByStars } from '../api/rewardsApi';
import RewardsHero from '../components/Rewards/RewardsHero';
import HowItWorks from '../components/Rewards/HowItWorks';
import GetRewardedForYourRoutine from '../components/Rewards/GetRewardedForYourRoutine';
import GetFavoritesForFree from '../components/Rewards/GetFavoritesForFree';
import Partnerships from '../components/Rewards/Partnerships';
import EasyToGetStarted from '../components/Rewards/EasyToGetStarted';
import QuestionsSection from '../components/Rewards/QuestionsSection';
import AppPromotionSection from '../components/Rewards/AppPromotionSection';
import RewardsTermsSection from '../components/Rewards/RewardsTermsSection';

const Rewards = () => {
  const [activeStar, setActiveStar] = useState(25);
  const [rewardData, setRewardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRewardData = async () => {
      setLoading(true);
      try {
        const data = await fetchRewardByStars(activeStar);
        setRewardData(data);
      } catch (error) {
        console.error("Error loading reward data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRewardData();
  }, [activeStar]);

  return (
    <div className="w-full bg-[#F1E9DB] font-sans antialiased text-[#191919]">
      {/* Hero Section */}
      <RewardsHero />
      <HowItWorks />
      <GetRewardedForYourRoutine />
      <GetFavoritesForFree
        activeStar={activeStar}
        setActiveStar={setActiveStar}
        rewardData={rewardData}
        loading={loading}
      />
      <Partnerships /> 
      <EasyToGetStarted />
      <QuestionsSection />
      <AppPromotionSection />
      <RewardsTermsSection /> 
    </div>
  );
};

export default Rewards;