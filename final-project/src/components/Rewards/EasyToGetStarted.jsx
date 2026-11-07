import React from 'react';

const ExternalLinkIcon = ({ className = "w-3.5 h-3.5 inline ml-0.5 mb-0.5" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const AccountIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#CBA258]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="24" cy="24" r="20" strokeDasharray="3 3" />
    <circle cx="24" cy="18" r="7" />
    <path d="M12 36c0-6 5.3-10 12-10s12 4 12 10" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#CBA258]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="14" y="8" width="20" height="32" rx="4" />
    <line x1="20" y1="34" x2="28" y2="34" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 16h.01M22 22h4m-3 4h2" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 20c-2 2-2 6 0 8M40 20c2 2 2 6 0 8" strokeDasharray="2 2" />
  </svg>
);

const CupStarIcon = () => (
  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#CBA258]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M10 16h24v16a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V16z" />
    <path d="M34 20h4a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-4" />
    <polygon points="22 21 23.5 24.5 27 25 24.5 27.5 25 31 22 29 19 31 19.5 27.5 17 25 20.5 24.5 22 21" fill="#CBA258" stroke="none" />
    <path d="M16 10l1 2M22 8l.5 2.5M28 10l-1 2" strokeLinecap="round" />
  </svg>
);

const EasyToGetStarted = () => {
  return (
    <section className="w-full bg-[#F1E9DB] py-10 sm:py-16 flex justify-center items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 md:px-12 lg:px-16 w-full flex justify-center">
        
        <div className="bg-[#F1E9DB] rounded-[32px] p-2 sm:p-10 md:p-12 w-full max-w-[1100px] flex flex-col md:flex-row items-center gap-6 lg:gap-16">
          
          {/* Oval Şəkil Hissəsi */}
          <div className="w-full md:w-[42%] flex justify-center shrink-0">
            <div className="w-[280px] h-[190px] sm:w-[300px] sm:h-[360px] rounded-[100px] sm:rounded-[140px] overflow-hidden shadow-sm">
              <img 
                src="https://www.starbucks.com/weblx/images/rewards/getting-started/sr6-get-started-en-US.png" 
                alt="Starbucks drinks enjoyed" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mətnlər və İkonlar Hissəsi */}
          <div className="w-full md:w-[58%] flex flex-col items-center text-center space-y-4 sm:space-y-6">
            
            <div className="space-y-2">
              <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-black text-[#1e3932] tracking-tight leading-tight">
                Free to join, easy to get started
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#191919] font-medium">
                <a href="#join" className="underline hover:no-underline font-semibold text-[#006241]">Join now</a>
                {" "}or{" "}
                <a href="#app" className="underline hover:no-underline font-semibold text-[#006241]">
                  download the app <ExternalLinkIcon />
                </a>
              </p>
            </div>

            {/* Mobildə 3-lü Yanaşı İkon Düzülüşü */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full pt-2 sm:pt-4">
              
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <AccountIcon />
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e3932] leading-tight max-w-[100px] sm:max-w-[120px]">
                  Create an account
                </span>
              </div>

              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <PhoneIcon />
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e3932] leading-tight max-w-[100px] sm:max-w-[120px]">
                  Order and pay your way
                </span>
              </div>

              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <CupStarIcon />
                <span className="text-[12px] sm:text-[14px] font-bold text-[#1e3932] leading-tight max-w-[100px] sm:max-w-[120px]">
                  Earn Stars, get Rewards
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EasyToGetStarted;