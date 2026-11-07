/**
 * DeliveryGraphic.jsx
 *
 * Right-pane decorative view shown when the Delivery tab is active.
 * Dark green background + floating illustration + wave SVG.
 * Purely presentational — no props needed.
 */

import React from 'react';
import deliveryIllustration from '../../assets/delivery_illustration.png';

const DeliveryGraphic = () => (
  <div className="w-full h-full bg-[#1e3932] relative overflow-hidden flex flex-col justify-center items-center">

    {/* Floating illustration */}
    <img
      src={deliveryIllustration}
      alt="Starbucks Delivery Graphic"
      className="max-w-[75%] md:max-w-[65%] max-h-[70%] object-contain z-10 select-none pointer-events-none drop-shadow-2xl animate-float"
    />

    {/* Decorative wave at the bottom */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[100px] text-[#f9f9f9] fill-current"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,55.05,18,83,26.13,175.78,53.28,235.35,72.41,321.39,56.44Z" />
      </svg>
    </div>
  </div>
);

export default DeliveryGraphic;
