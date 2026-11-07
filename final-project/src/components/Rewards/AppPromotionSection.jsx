import React from 'react';

export default function AppPromotionSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-[#E8E8D7] text-[#1e3932]">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight max-w-sm">
            It's even better in the app
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-xs">
            Download the app to access exclusive offers, challenges and more.
          </p>
          
          
          <div className="flex flex-col gap-2.5 mt-2 md:hidden items-center">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-11 w-auto object-contain"
              />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-11 w-auto object-contain"
              />
            </a>
          </div>

         
          <div className="hidden md:inline-block bg-white p-3 rounded-3xl shadow-md border border-gray-100 mt-2">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.starbucks.com/rewards/mobile-apps/" 
              alt="Starbucks Rewards App QR Code" 
              className="w-36 h-36"
            />
          </div>
        </div>

       
        <div className="flex justify-center items-center">
          <img 
            src="https://www.starbucks.com/weblx/images/rewards/download-app/demo-app-US.png" 
            alt="Starbucks rewards items: coffee, sandwich, and green phone case" 
            className="w-full max-w-[480px] h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
}