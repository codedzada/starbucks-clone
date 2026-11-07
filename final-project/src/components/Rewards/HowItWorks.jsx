import React from 'react';
import { Link } from 'react-router-dom';
import collectStarsIcon from '../../assets/collect-stars.svg';
import freeTreatsIcon from '../../assets/free-treats.svg';
import unlockBenefitsIcon from '../../assets/unlock-benefits.svg';

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#FEFCF7] py-16 sm:py-20 md:py-24 border-t border-[#e2dcd3]/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 flex flex-col items-center">

        <div className="text-center space-y-3 mb-16 sm:mb-20 max-w-[620px]">
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-black text-[#1e3932] tracking-tight">
            How it works
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#191919] font-medium leading-relaxed">
            Start sipping your way to delicious Rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full max-w-[1100px]">

          <div className="flex flex-col items-center text-center space-y-4 px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src={collectStarsIcon}
                alt="Create an account"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1e3932]">
              1. Create an account
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#191919] leading-relaxed max-w-[280px] font-medium opacity-90">
              To get started, <Link to="/account/create" className="text-[#006241] underline hover:no-underline font-semibold">join now</Link>. You can also join in the app to get access to the full range of Starbucks® Rewards benefits.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src={freeTreatsIcon}
                alt="Order and earn Stars"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1e3932]">
              2. Order and pay how you’d like
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#191919] leading-relaxed max-w-[280px] font-medium opacity-90">
              Use cash, credit/debit card or save some time and pay right through the app. You’ll collect Stars all ways.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src={unlockBenefitsIcon}
                alt="Earn Stars, get Rewards"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1e3932]">
              3. Earn Stars, get Rewards
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#191919] leading-relaxed max-w-[280px] font-medium opacity-90">
              As you earn Stars, you can redeem them for free coffee, tea, festive drinks and more. Start redeeming with as little as 25 Stars!
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;