import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

export default function RewardsTermsSection() {
  return (
    <section className="py-14 px-4 md:px-12 bg-[#F9F9F9] text-[#191919] text-xs md:text-sm leading-relaxed border-t border-gray-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
       
        <div>
          <h3 className="font-bold text-[#686868] text-sm md:text-base mb-1.5 tracking-wide">Terms of use</h3>
          <p className="font-medium text-[#2d2d2d]">
            For full program details visit{' '}
            <a 
              href="https://www.starbucks.com/rewards/terms" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#006241] font-semibold underline inline-flex items-center gap-0.5 hover:text-black"
            >
              starbucks.com/rewards/terms <FiExternalLink className="w-3 h-3" />
            </a>.
          </p>
          <p className="font-medium text-[#2d2d2d] mt-2">
            Starbucks® Rewards benefits are available at participating Starbucks stores. Not all stores have the ability to honor Rewards at this time. Visit the{' '}
            <a 
              href="https://www.starbucks.com/store-locator" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#006241] font-semibold underline inline-flex items-center gap-0.5 hover:text-black"
            >
              Starbucks Store Locator <FiExternalLink className="w-3 h-3" />
            </a>{' '}
            and search for locations honoring "Redeem Rewards".
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
         
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Earn Rate</h4>
              <ul className="list-disc pl-5 space-y-2 font-medium text-[#2d2d2d]">
                <li><strong className="text-[#191919] font-bold">Green members</strong> earn 1 Star per $1 spent at participating stores.</li>
                <li><strong className="text-[#191919] font-bold">Gold members</strong> earn 1.2 Stars per $1 spent at participating stores.</li>
                <li><strong className="text-[#191919] font-bold">Reserve members</strong> earn 1.7 Stars per $1 spent at participating stores.</li>
                <li>Stars are not earned on purchases of Starbucks Cards, Starbucks Card reloads* and alcohol. Stars are not earned on tax or tips. See Starbucks® Rewards Terms and Conditions for details and earn rates.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Redeeming Rewards</h4>
              <p className="font-medium text-[#2d2d2d]">
                At participating stores. Some restrictions apply. Free food and beverage Rewards may be redeemed at participating stores and exclude alcoholic beverages and multi-serve items. For details, see Starbucks® Rewards Terms and Conditions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">*Digital Starbucks Card Reload Bonus Stars</h4>
              <p className="font-medium text-[#2d2d2d]">
                Digitally reload $30+ to your Starbucks Card in your Starbucks account to receive 10 Bonus Stars or $50+ to receive 25 Bonus Stars. Max 25 Bonus Stars per transaction.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Star Expiration</h4>
              <p className="font-medium text-[#2d2d2d] mb-2">
                Green member Stars (including partial Stars) earned toward free food and drink Rewards expire 6 months after they are earned. Green members may extend their Star expiration date by one month by completing one of the following in the calendar month prior to the original Star expiration date: 1) make a qualifying purchase at a participating store. Excludes purchases of Starbucks Cards, alcohol and delivery services; 2) Redeem a Reward at a participating store; or 3) Digitally reload $30 or more to your Starbucks Card through the app or web.
              </p>
              <p className="font-medium text-[#2d2d2d]">
                Stars don't expire as long as you maintain Gold or Reserve status. See Starbucks® Rewards Terms and Conditions for details.
              </p>
            </div>
          </div>

          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Birthday Reward</h4>
              <ul className="list-disc pl-5 space-y-2 font-medium text-[#2d2d2d]">
                <li><strong className="text-[#191919] font-bold">Green members:</strong> Redeemable on member's birthday only, at participating stores.</li>
                <li><strong className="text-[#191919] font-bold">Gold members:</strong> Redeemable for 7 days starting on member's birthday, at participating stores.</li>
                <li><strong className="text-[#191919] font-bold">Reserve members:</strong> Redeemable for 30 days starting on member's birthday, at participating stores.</li>
                <li>Free birthday drink must be standard menu size.</li>
                <li>Excludes alcohol and multi-serve items. To qualify, you must have made at least one Star-earning transaction prior to your birthday each year.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Mod Monday</h4>
              <p className="font-medium text-[#2d2d2d]">
                Redeemable at participating stores. Members will receive one free customization each month, up to $2.25 (pre-tax) each. Not valid for use with Rewards or other offers, discounts or promotions.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Personal Cup Benefit</h4>
              <p className="font-medium text-[#2d2d2d]">
                Starbucks Rewards members earn 2x Stars on their transaction when using a clean personal cup at participating stores.
              </p>
            </div>
          </div>

        </div>

        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-bold text-[#686868] text-sm md:text-base mb-2 tracking-wide">Partnerships</h4>
          <div className="space-y-1.5 font-medium text-[#2d2d2d]">
            <p>
              <sup>1</sup> Delta{' '}
              <a href="https://www.delta.com" target="_blank" rel="noopener noreferrer" className="text-[#006241] font-semibold underline inline-flex items-center gap-0.5 hover:text-black">
                Terms and Conditions <FiExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p>
              <sup>2</sup> Marriott Bonvoy{' '}
              <a href="https://www.marriott.com" target="_blank" rel="noopener noreferrer" className="text-[#006241] font-semibold underline inline-flex items-center gap-0.5 hover:text-black">
                Terms and Conditions <FiExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}