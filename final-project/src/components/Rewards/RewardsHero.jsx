import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import rewardsHeroImg from '../../assets/rewards-hero.png';

const RewardsHero = () => {
  return (
    <section className="max-w-[1440px] mx-auto min-h-[560px] lg:min-h-[640px] px-6 sm:px-10 lg:px-16 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
      
      <div className="w-full lg:w-1/2 flex flex-col items-center text-center space-y-4 sm:space-y-5">
        <span className="text-[12px] sm:text-[14px] font-black tracking-[0.25em] text-[#8c6239] uppercase">
          STARBUCKS® REWARDS
        </span>

        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] font-extrabold text-[#1e3932] leading-[1.15] tracking-tight max-w-[420px]">
          Free coffee is just the beginning
        </h1>

        <p className="text-[14px] sm:text-[16px] text-[#1e3932] font-medium leading-[1.5] max-w-[380px]">
          Join now to start enjoying exclusive benefits and unlocking more of what you love.
        </p>

        <div className="pt-2">
          <Link
            to="/account/create"
            className="inline-block px-6 py-[9px] bg-[#006241] hover:bg-[#004d33] text-white font-bold text-[15px] rounded-full transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            Join now
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="w-[300px] h-[360px] sm:w-[360px] sm:h-[430px] lg:w-[440px] lg:h-[510px] rounded-t-[210px] rounded-b-[210px] overflow-hidden shadow-sm flex-shrink-0"
        >
          <img
            src={rewardsHeroImg}
            alt="Starbucks Rewards Coffee"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

    </section>
  );
};

export default RewardsHero;
