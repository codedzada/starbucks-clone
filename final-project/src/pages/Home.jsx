import React from "react";
import heroFreeMod from "../assets/hero-free-mod.jpg";
import blendedEnergy from "../assets/blended-energy.jpg";
import smoresImg from "../assets/smores.jpg";
import passionfruitGuava from "../assets/passionfruit-guava.jpg";
import proteinBoost from "../assets/protein-boost.jpg";

const Home = () => {
  return (
    <div className="w-full flex flex-col antialiased bg-white animate-fadeIn">
      {/* Banner */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="w-full bg-[#364531] text-white py-8 px-4 sm:py-5 sm:px-6 md:py-[36px]">
          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6 text-center">
            <span className="text-[14px] sm:text-[16px] md:text-[18px] font-bold tracking-tight">
              It's a great day for coffee
            </span>
            <button className="px-4 py-[6px] sm:px-[18px] sm:py-[7px] md:py-[8px] border-2 border-white rounded-full text-[13px] sm:text-[14px] md:text-[15px] font-bold hover:bg-white/10 transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0">
              Start an order
            </button>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-stretch mt-4 sm:mt-8 mb-10 sm:mb-8">
        <div className="w-full sm:w-1/2 bg-[#f2f0eb] relative sm:min-h-auto flex items-center justify-center">
          <img
            src={heroFreeMod}
            alt="Free Mod Monday"
            className="w-full h-auto block sm:h-full sm:absolute sm:inset-0 sm:object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 bg-[#006242] text-white py-12 px-6 sm:px-8 md:py-16 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          <div className="max-w-[420px] flex flex-col items-center space-y-4 md:space-y-5">
            <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold tracking-tight leading-[1.2]">
              Next Free Mod Monday is 7/20
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-[1.6] font-medium">
              Once a month, Starbucks® Rewards members get one free
              customization on any handcrafted drink like cold foam, syrup or
              popping pearls. You can enjoy it too, when you join.*
            </p>
            <div className="pt-2">
              <button className="px-5 py-[8px] border border-white rounded-full text-[14px] sm:text-[15px] font-bold hover:bg-white/10 transition-all duration-150 cursor-pointer">
                Join now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col-reverse sm:flex-row items-stretch mb-10 sm:mb-8">
        <div className="w-full sm:w-1/2 bg-[#006242] text-white py-12 px-6 sm:px-8 md:py-16 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          <div className="max-w-[420px] flex flex-col items-center space-y-4 md:space-y-5">
            <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold tracking-tight leading-[1.2]">
              New Blended Energy Refreshers
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-[1.6] font-medium">
              Now you can order your favorite Energy Refreshers frozen for an
              ultra-refreshing way to power up. Try a flavor you already love or
              new Passionfruit Guava.
            </p>
            <div className="pt-2">
              <button className="px-5 py-[8px] border border-white rounded-full text-[14px] sm:text-[15px] font-bold hover:bg-white/10 transition-all duration-150 cursor-pointer">
                Order now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 bg-[#f2f0eb] relative sm:min-h-auto flex items-center justify-center">
          <img
            src={blendedEnergy}
            alt="New Blended Energy Refreshers"
            className="w-full h-auto block sm:h-full sm:absolute sm:inset-0 sm:object-cover"
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-stretch mb-10 sm:mb-8">
        <div className="w-full sm:w-1/2 bg-[#f2f0eb] relative sm:min-h-auto flex items-center justify-center">
          <img
            src={smoresImg}
            alt="S'mores is officially back"
            className="w-full h-auto block sm:h-full sm:absolute sm:inset-0 sm:object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 bg-[#1e543b] text-white py-12 px-6 sm:py-16 sm:px-10 md:py-24 md:px-16 lg:px-24 flex flex-col items-center justify-center text-center">
          <div className="max-w-[520px] flex flex-col items-center space-y-5 md:space-y-6">
            <h1 className="text-[26px] sm:text-[30px] md:text-[40px] lg:text-[50px] font-bold tracking-tight leading-[1.15]">
              S’mores is officially back
            </h1>
            <p className="text-[15px] sm:text-[17px] md:text-[19px] lg:text-[22px] leading-[1.5] font-medium opacity-95">
              Here for summer only. Enjoy the S’mores Frappuccino® Blended
              Beverage, made with the original recipe—and the new S’mores Cold
              Brew and Iced S’mores Chai—before they’re gone.**
            </p>
            <div className="pt-4">
              <button className="px-6 py-[10px] sm:px-7 sm:py-[11px] bg-white text-[#1e543b] rounded-full text-[15px] sm:text-[16px] font-bold hover:bg-white/90 transition-all duration-150 cursor-pointer tracking-wide">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col-reverse sm:flex-row items-stretch mb-10 sm:mb-8">
        <div className="w-full sm:w-1/2 bg-[#2d5d43] text-white py-12 px-6 sm:px-8 md:py-16 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          <div className="max-w-[420px] flex flex-col items-center space-y-4 md:space-y-5">
            <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold tracking-tight leading-[1.2]">
              New Passionfruit Guava Refreshers
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-[1.6] font-medium">
              A vibrant, juicy drink crafted with mango-pineapple flavored
              pearls. Add lemonade or coconutmilk and your choice of energy.
            </p>
            <div className="pt-2">
              <button className="px-5 py-[8px] border border-white rounded-full text-[14px] sm:text-[15px] font-bold hover:bg-white/10 transition-all duration-150 cursor-pointer">
                Order now
              </button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 bg-[#f2f0eb] relative sm:min-h-auto flex items-center justify-center">
          <img
            src={passionfruitGuava}
            alt="New Passionfruit Guava Refreshers"
            className="w-full h-auto block sm:h-full sm:absolute sm:inset-0 sm:object-cover"
          />
        </div>
      </div>

      {/* Section 5 */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-stretch mb-6 sm:mb-8">
        <div className="w-full sm:w-1/2 bg-[#f2f0eb] relative sm:min-h-auto flex items-center justify-center">
          <img
            src={proteinBoost}
            alt="Go-to favorites + protein boost"
            className="w-full h-auto block sm:h-full sm:absolute sm:inset-0 sm:object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 bg-[#1e543b] text-white py-12 px-6 sm:px-8 md:py-16 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          <div className="max-w-[460px] flex flex-col items-center space-y-4 md:space-y-5">
            <h1 className="text-[22px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold tracking-tight leading-[1.2]">
              Go–to favorites + protein boost
            </h1>
            <p className="text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] leading-[1.6] font-medium opacity-95">
              Add up to 23g of protein per grande. Iced Vanilla Protein Cream
              Shaken Espresso, Vanilla Protein Cream Cold Brew, Iced Banana
              Cream Protein Matcha.
            </p>
            <div className="pt-2">
              <button className="px-5 py-[8px] border border-white rounded-full text-[14px] sm:text-[15px] font-bold hover:bg-white/10 transition-all duration-150 cursor-pointer">
                Order now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="w-full bg-white border-t border-gray-100 py-6 md:py-8 px-6 md:px-12">
        <div className="max-w-[760px] mx-auto flex flex-col items-center text-center space-y-4 md:space-y-6 text-black font-normal tracking-wide">
          <p className="text-[13px] md:text-[14px] leading-[1.6] max-w-[560px]">
            *Redeemable at participating stores. Members will receive one free
            customization each month, up to $2.25 (pre-tax) each. Not valid for
            use with Rewards or other offers, discounts or promotions.
          </p>
          <p className="text-[13px] md:text-[14px] font-medium">
            **Product availability varies by location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
