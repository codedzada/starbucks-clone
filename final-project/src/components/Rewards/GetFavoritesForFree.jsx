import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const starLevels = [25, 60, 100, 200, 300, 400];

const GetFavoritesForFree = ({ activeStar, setActiveStar, rewardData, loading }) => {
  return (
    <section className="w-full bg-[#FEFCF7] py-8 sm:py-16 flex justify-center items-center">
      <div className="w-full max-w-[1020px] px-3 sm:px-6">
        
        <div className="w-full bg-[#FEFCF7] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#e2dcd3]/60 shadow-md flex flex-col">
          
          {/* Header Tab Section */}
          <div className="bg-[#F1E9DB] pt-8 sm:pt-10 pb-0 border-b border-[#e2dcd3]/70 relative flex flex-col items-center">
            <h2 className="text-[22px] sm:text-[30px] font-black text-[#1e3932] mb-5 sm:mb-7 text-center leading-tight px-4">
              Get your favorites for free
            </h2>

            {/* Scrollable Tab Container */}
            <div className="w-full overflow-x-auto scrollbar-none flex justify-start sm:justify-center items-center space-x-6 sm:space-x-10 px-6 pb-3 relative z-10 snap-x snap-mandatory">
              {starLevels.map((stars) => (
                <button
                  key={stars}
                  onClick={() => setActiveStar(stars)}
                  className={`font-black text-[17px] sm:text-xl pb-2 relative transition-colors cursor-pointer flex-shrink-0 select-none snap-center ${
                    activeStar === stars ? 'text-[#1e3932]' : 'text-[#1e3932]/60 hover:text-[#1e3932]'
                  }`}
                >
                  {stars}★
                  {activeStar === stars && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[4px] bg-[#006241] rounded-t-full z-20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Body Section */}
          <div className="bg-[#F0ECE5] p-6 sm:p-12 min-h-[300px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-14 w-full animate-pulse px-2"
                >
                  <div className="w-32 h-32 sm:w-44 sm:h-44 bg-[#1e3932]/10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-4 w-full max-w-md">
                    <div className="h-6 bg-[#1e3932]/10 rounded w-1/3 mx-auto md:mx-0" />
                    <div className="h-4 bg-[#1e3932]/10 rounded w-3/4 mx-auto md:mx-0" />
                    <div className="h-4 bg-[#1e3932]/10 rounded w-5/6 mx-auto md:mx-0" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeStar}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-14 w-full px-2"
                >
                  <div className="relative flex items-center justify-center flex-shrink-0 select-none">
                    {rewardData?.isNew && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#006241] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-sm z-10">
                        NEW
                      </span>
                    )}
                    <div className="flex items-center gap-3 sm:gap-5">
                      {rewardData?.images?.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt="Reward item"
                          className="w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="max-w-md text-center md:text-left flex-shrink">
                    <span className="text-[12px] sm:text-[14px] font-black text-[#006241] tracking-wider uppercase block mb-1.5">
                      {activeStar} Stars Category
                    </span>
                    <p className="text-[#1e3932] text-[16px] sm:text-[19px] md:text-[21px] font-bold leading-relaxed">
                      {rewardData?.description}
                    </p>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GetFavoritesForFree;