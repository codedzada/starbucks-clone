import React, { useState } from 'react';

// Icon və SVG komponentləri (əvvəlki kimi qalır)
const BirthdayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const StarOutlineIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 8.5 22 9.5 17 14.5 18.5 21.5 12 18 5.5 21.5 7 14.5 2 9.5 9 8.5 12 2" />
  </svg>
);

const ModMondaysIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8H6a2 2 0 0 0-2 2v6a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-6a2 2 0 0 0-2-2z" />
    <path d="M16 11h2.5a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H16" />
    <path d="M6 5h10" />
  </svg>
);

const TrophyIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6c0 3.6-2 6-6 6s-6-2.4-6-6a6 6 0 0 1 6-6z" />
  </svg>
);

const ReloadIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PersonalCupIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const StarsWontExpireIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DoubleStarDaysIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 9 22 9 17 14 18.5 21 12 17 5.5 21 7 14 2 9 9 9 12 2" />
  </svg>
);

const GlobalExperiencesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ReserveCardIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const GreenBottomLeftSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M-10 120 C20 100, 40 95, 75 105 C65 75, 40 65, -10 70" fill="#122A20" />
    <path d="M-10 120 C15 75, 25 55, 45 30 C60 45, 50 70, -10 120" fill="#18362B" />
    <path d="M20 80 C45 65, 60 67, 80 80 C70 55, 55 50, 20 80" fill="#204639" />
    <path d="M-10 120 Q45 85, 95 95" stroke="#163B2F" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="90" r="7" fill="#CBA258" />
    <circle cx="64" cy="93" r="6" fill="#D6B87B" />
    <circle cx="39" cy="97" r="5" fill="#917036" />
  </svg>
);

const GreenBottomRightSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 170 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 140 C140 120, 120 115, 90 125 C105 100, 125 90, 180 95" fill="#18362B" />
    <path d="M180 140 C145 100, 135 80, 110 50 C125 65, 135 85, 180 140" fill="#122A20" />
    <path d="M120 90 C90 75, 75 77, 55 90 C70 65, 85 60, 120 90" fill="#204639" />
    <path d="M150 70 C130 45, 120 35, 90 25 C105 40, 115 55, 150 70" fill="#18362B" />
    <path d="M180 140 Q120 100, 65 110" stroke="#163B2F" strokeWidth="2" strokeLinecap="round" />
    <circle cx="120" cy="105" r="7" fill="#CBA258" />
    <circle cx="134" cy="99" r="6" fill="#D6B87B" />
    <circle cx="106" cy="111" r="5" fill="#917036" />
  </svg>
);

const GoldBottomLeftSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M-10 120 C20 100, 40 95, 75 105 C65 75, 40 65, -10 70" fill="#B28F4D" opacity="0.45" />
    <path d="M-10 120 C15 75, 25 55, 45 30 C60 45, 50 70, -10 120" fill="#9A7736" opacity="0.45" />
    <path d="M20 80 C45 65, 60 67, 80 80 C70 55, 55 50, 20 80" fill="#F0E3CB" opacity="0.4" />
    <path d="M-10 120 Q45 85, 95 95" stroke="#F0E3CB" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <circle cx="50" cy="90" r="7" fill="#F0E3CB" opacity="0.75" />
    <circle cx="64" cy="93" r="6" fill="#FAF5EB" opacity="0.75" />
    <circle cx="39" cy="97" r="5" fill="#9A7736" opacity="0.6" />
  </svg>
);

const GoldBottomRightSVG = ({ className }) => (
  <svg className={className} viewBox="0 0 170 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M180 140 C140 120, 120 115, 90 125 C105 100, 125 90, 180 95" fill="#9A7736" opacity="0.45" />
    <path d="M180 140 C145 100, 135 80, 110 50 C125 65, 135 85, 180 140" fill="#B28F4D" opacity="0.45" />
    <path d="M120 90 C90 75, 75 77, 55 90 C70 65, 85 60, 120 90" fill="#F0E3CB" opacity="0.4" />
    <path d="M150 70 C130 45, 120 35, 90 25 C105 40, 115 55, 150 70" fill="#9A7736" opacity="0.4" />
    <path d="M180 140 Q120 100, 65 110" stroke="#F0E3CB" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <circle cx="120" cy="105" r="7" fill="#F0E3CB" opacity="0.75" />
    <circle cx="134" cy="99" r="6" fill="#FAF5EB" opacity="0.75" />
    <circle cx="106" cy="111" r="5" fill="#9A7736" opacity="0.6" />
  </svg>
);

const ReserveBottomDecoration = ({ className }) => (
  <svg className={className} viewBox="0 0 350 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0,65 L 0,35 C 0,25 15,25 15,35 L 15,65
             M 30,65 L 30,35 C 30,25 45,25 45,35 L 45,65
             M 60,65 L 60,35 C 60,25 75,25 75,35 L 75,65
             M 90,65 L 90,35 C 90,25 105,25 105,35 L 105,65
             M 120,65 L 120,35 C 120,25 135,25 135,35 L 135,65
             M 150,65 L 150,35 C 150,25 165,25 165,35 L 165,65
             M 180,65 L 180,35 C 180,25 195,25 195,35 L 195,65
             M 210,65 L 210,35 C 210,25 225,25 225,35 L 225,65
             M 240,65 L 240,35 C 240,25 255,25 255,35 L 255,65
             M 270,65 L 270,35 C 270,25 285,25 285,35 L 285,65
             M 300,65 L 300,35 C 300,25 315,25 315,35 L 315,65
             M 330,65 L 330,35 C 330,25 345,25 345,35 L 345,65"
      fill="#282828" />
    <path d="M 15,65 L 15,40 C 15,30 30,30 30,40 L 30,65
             M 45,65 L 45,40 C 45,30 60,30 60,40 L 60,65
             M 75,65 L 75,40 C 75,30 90,30 90,40 L 90,65
             M 105,65 L 105,40 C 105,30 120,30 120,40 L 120,65
             M 135,65 L 135,40 C 135,30 150,30 150,40 L 150,65
             M 165,65 L 165,40 C 165,30 180,30 180,40 L 180,65
             M 195,65 L 195,40 C 195,30 210,30 210,40 L 210,65
             M 225,65 L 225,40 C 225,30 240,30 240,40 L 240,65
             M 255,65 L 255,40 C 255,30 270,30 270,40 L 270,65
             M 285,65 L 285,40 C 285,30 300,30 300,40 L 300,65
             M 315,65 L 315,40 C 315,30 330,30 330,40 L 330,65"
      fill="#1A1A1A" />
  </svg>
);

const GetRewardedForYourRoutine = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const width = container.getBoundingClientRect().width;
    const cardStep = width > 768 ? width / 3 : width * 0.85;
    const index = Math.round(scrollLeft / cardStep);
    setActiveIndex(Math.max(0, Math.min(2, index)));
  };

  return (
    /* Buradakı bg-[#FEFCF7] dəqiq Starbucks fon tonunu təmin edir */
    <section className="w-full bg-[#FEFCF7] py-16 sm:py-20 md:py-24 border-t border-[#e2dcd3]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 flex flex-col items-center w-full overflow-hidden">

        <div className="text-center space-y-3 mb-16 sm:mb-20 max-w-[620px]">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#1e3932] tracking-tight leading-[1.2]">
            Get rewarded for your routine
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#191919] font-medium opacity-95">
            As your status grows, so do your benefits.
          </p>
        </div>

        <div
          id="rewards-cards-container"
          onScroll={handleScroll}
          className="flex overflow-x-auto flex-nowrap gap-6 snap-x snap-mandatory md:grid md:grid-cols-3 w-[calc(100%+3rem)] -mx-6 px-6 md:w-full md:mx-0 md:px-0 max-w-[1240px] items-stretch pb-6 md:pb-0 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >

          {/* Green Status */}
          <div className="relative bg-[#006241] text-white rounded-[28px] p-6 sm:p-8 pb-24 flex flex-col justify-between overflow-hidden shadow-md h-[580px] w-[85%] sm:w-[350px] md:w-full flex-shrink-0 snap-center">
            <div className="flex flex-col justify-start">
              <div className="text-center mb-8 flex-shrink-0">
                <h3 className="text-[22px] sm:text-2xl font-black mb-1">Green status</h3>
                <span className="text-[#a3c6b8] text-xs sm:text-[13px] font-bold tracking-wide">
                  Less than 500★ earned each year
                </span>
              </div>

              <ul className="space-y-4 text-[13px] sm:text-sm font-medium z-10 leading-relaxed">
                <li className="flex items-start gap-4">
                  <BirthdayIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Free treat on your birthday</span>
                </li>
                <li className="flex items-start gap-4">
                  <StarOutlineIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Earn 1★ per $1 spent</span>
                </li>
                <li className="flex items-start gap-4">
                  <ModMondaysIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Free Mod Mondays—customize your drink once a month, on us</span>
                </li>
                <li className="flex items-start gap-4">
                  <TrophyIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Early access, personalized offers and games</span>
                </li>
                <li className="flex items-start gap-4">
                  <ReloadIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Bonus Stars for qualifying digital reloads to your Starbucks Card</span>
                </li>
                <li className="flex items-start gap-4">
                  <PersonalCupIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Double Stars with personal cup</span>
                </li>
              </ul>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[90px] overflow-hidden pointer-events-none">
              <GreenBottomLeftSVG className="absolute bottom-0 left-0 w-[120px] h-[90px]" />
              <GreenBottomRightSVG className="absolute bottom-0 right-0 w-[130px] h-[100px]" />
            </div>
          </div>

          {/* Gold Status */}
          <div className="relative bg-[#cba258] text-[#171717] rounded-[28px] p-6 sm:p-8 pb-24 flex flex-col justify-between overflow-hidden shadow-md h-[580px] w-[85%] sm:w-[350px] md:w-full flex-shrink-0 snap-center">
            <div className="flex flex-col justify-start">
              <div className="text-center mb-8 flex-shrink-0">
                <h3 className="text-[22px] sm:text-2xl font-black mb-1">Gold status</h3>
                <span className="text-[#594220] text-xs sm:text-[13px] font-bold tracking-wide">
                  500+★ earned each year
                </span>
              </div>

              <ul className="space-y-4 text-[13px] sm:text-sm font-semibold z-10 leading-relaxed">
                <li className="flex items-start gap-4">
                  <BirthdayIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>7 days to redeem your birthday treat</span>
                </li>
                <li className="flex items-start gap-4">
                  <StarOutlineIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Earn 1.2★ per $1 spent</span>
                </li>
                <li className="flex items-start gap-4">
                  <StarsWontExpireIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Stars won't expire</span>
                </li>
                <li className="flex items-start gap-4">
                  <ModMondaysIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Free Mod Mondays—customize your drink once a month, on us</span>
                </li>
                <li className="flex items-start gap-4">
                  <TrophyIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Early access, personalized offers and games</span>
                </li>
                <li className="flex items-start gap-4">
                  <ReloadIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Bonus Stars for qualifying digital reloads to your Starbucks Card</span>
                </li>
                <li className="flex items-start gap-4">
                  <PersonalCupIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>Double Stars with personal cup</span>
                </li>
                <li className="flex items-start gap-4">
                  <DoubleStarDaysIcon className="w-5 h-5 shrink-0 opacity-90 mt-0.5" />
                  <span>4 more Double Star Days per year</span>
                </li>
              </ul>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[90px] overflow-hidden pointer-events-none">
              <GoldBottomLeftSVG className="absolute bottom-0 left-0 w-[120px] h-[90px]" />
              <GoldBottomRightSVG className="absolute bottom-0 right-0 w-[130px] h-[100px]" />
            </div>
          </div>

          {/* Reserve Status */}
          <div className="relative bg-[#171717] text-white rounded-[28px] p-6 sm:p-8 pb-24 flex flex-col justify-between overflow-hidden shadow-md h-[580px] w-[85%] sm:w-[350px] md:w-full flex-shrink-0 snap-center">
            <div className="flex flex-col justify-start">
              <div className="text-center mb-8 flex-shrink-0">
                <h3 className="text-[22px] sm:text-2xl font-black mb-1">Reserve status</h3>
                <span className="text-[#cba258] text-xs sm:text-[13px] font-bold tracking-wide">
                  2,500+★ earned each year
                </span>
              </div>

              <ul className="space-y-4 text-[13px] sm:text-sm font-medium z-10 leading-relaxed">
                <li className="flex items-start gap-4 text-white">
                  <BirthdayIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>30 days to redeem your birthday treat</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <StarOutlineIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Earn 1.7★ per $1 spent</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <StarsWontExpireIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Stars won't expire</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <ModMondaysIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Free Mod Mondays—customize your drink once a month, on us</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <TrophyIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Early access, personalized offers and games</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <ReloadIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Bonus Stars for qualifying digital reloads to your Starbucks Card</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <PersonalCupIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Double Stars with personal cup</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <GlobalExperiencesIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>Access to exclusive global coffee experiences</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <ReserveCardIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>A free personalized Reserve Card to mark your achievement</span>
                </li>
                <li className="flex items-start gap-4 text-white">
                  <DoubleStarDaysIcon className="w-5 h-5 shrink-0 text-[#cba258] mt-0.5" />
                  <span>6 more Double Star Days per year</span>
                </li>
              </ul>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[50px] overflow-hidden pointer-events-none">
              <ReserveBottomDecoration className="absolute bottom-0 left-0 w-full h-[50px]" />
            </div>
          </div>

        </div>

        {/* Mobile indicators */}
        <div className="flex justify-center items-center gap-3 mt-8 md:hidden">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                const container = document.getElementById('rewards-cards-container');
                if (container) {
                  const width = container.getBoundingClientRect().width;
                  const cardStep = width > 768 ? width / 3 : width * 0.85;
                  container.scrollTo({ left: idx * cardStep, behavior: 'smooth' });
                }
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'bg-[#1e3932] scale-125'
                  : 'bg-transparent border border-[#1e3932] opacity-50'
              }`}
              aria-label={`Go to card ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GetRewardedForYourRoutine;