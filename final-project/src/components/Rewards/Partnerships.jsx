import React from 'react';

const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
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

const partnershipsData = [
  {
    id: 'delta',
    logo: (
      <div className="flex flex-col items-center select-none">
        <div className="flex items-center gap-2">
          <span className="text-[#C8102E] text-xs font-black tracking-widest uppercase">▲ DELTA</span>
        </div>
        <span className="text-[#002855] text-2xl sm:text-3xl font-black tracking-wider uppercase mt-0.5">
          SKYMILES<span className="text-xs align-top">®</span>
        </span>
      </div>
    ),
    description: "Link your Delta account to earn miles, Bonus Stars and access to exclusive offers.¹",
    link: "https://deltastarbucks.com",
  },
  {
    id: 'marriott',
    logo: (
      <div className="flex flex-col items-center select-none">
        <span className="text-[#1C1C1C] text-xs sm:text-sm font-black tracking-[0.25em] uppercase">MARRIOTT</span>
        <span className="text-[#1C1C1C] text-2xl sm:text-3xl font-black tracking-widest uppercase relative">
          BONV<span className="underline decoration-2 underline-offset-4 decoration-[#D68A5C]">O</span>Y<span className="text-xs align-top">®</span>
        </span>
      </div>
    ),
    description: "Link your accounts to earn points, Bonus Stars and access to exciting member experiences.²",
    link: "https://marriottbonvoy.com",
  },
];

const Partnerships = () => {
  return (
    <section className="w-full bg-[#FAF7F2] py-16 sm:py-20 border-t border-[#e2dcd3]/60 flex justify-center items-center">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 flex flex-col items-center w-full">
        
        <div className="text-center space-y-3 mb-10 sm:mb-12 max-w-[620px]">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#1e3932] tracking-tight leading-[1.2]">
            Partnerships
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#191919] font-medium opacity-90 leading-relaxed">
            Link your accounts to unlock perks from our partners, all while earning more Stars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[960px]">
          {partnershipsData.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#ECE6D9]/60 hover:bg-[#ECE6D9]/80 transition-colors duration-300 rounded-[28px] p-8 sm:p-10 flex flex-col items-center justify-between text-center min-h-[280px]"
            >
              <div className="h-16 flex items-center justify-center">
                {partner.logo}
              </div>

              <p className="text-[14px] sm:text-[15px] text-[#1e3932] font-medium my-6 leading-relaxed max-w-[340px]">
                {partner.description}
              </p>

              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#006241] text-[#006241] hover:bg-[#006241]/10 px-5 py-2 rounded-full font-bold text-sm transition-all duration-200"
              >
                View details
                <ExternalLinkIcon className="w-4 h-4 mb-0.5" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partnerships;