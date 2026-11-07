import React from "react";
import {
  FaSpotify,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const sections = [
    {
      title: "About Us",
      links: [
        "Our Company",
        "Our Coffee",
        "About Starbucks",
        "Starbucks Archive",
        "Investor Relations",
        "Customer Service",
        "Contact Us",
      ],
    },
    {
      title: "Careers",
      links: [
        "Culture and Values",
        "Belonging at Starbucks",
        "College Achievement Plan",
        "Alumni Community",
        "U.S. Careers",
        "International Careers",
      ],
    },
    {
      title: "Social Impact",
      links: [
        "Communities",
        "Starbucks Foundation",
        "Sustainability",
        "Environmental and Social Impact Reporting",
      ],
    },
    {
      title: "For Business Partners",
      links: [
        "Landlord Support Center",
        "Suppliers",
        "Corporate Gift Card Sales",
        "Office and Foodservice Coffee",
      ],
    },
    {
      title: "Order and Pick Up",
      links: [
        "Order on the App",
        "Order on the Web",
        "Delivery",
        "Order and Pick Up Options",
        "Explore and Find Coffee for Home",
      ],
    },
  ];

  const bottomLinks = [
    "Privacy Notice",
    "Consumer Health Privacy Notice",
    "Terms of Use",
    "Do Not Sell or Share My Personal Information",
    "Starbucks Transparency in Supply Chains Statement",
    "Accessibility",
    "Cookie Preferences",
  ];

  return (
    <footer className="w-full bg-white text-black antialiased font-sans px-6 md:px-10 lg:px-24 py-12 border-t-2 border-neutral-100">
      <div className="max-w-[1440px] mx-auto flex flex-col items-start justify-start text-left">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 lg:gap-12 pb-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-5 items-start text-left"
            >
              <h2 className="text-[16px] md:text-[18px] font-semibold text-neutral-900 tracking-wide">
                {section.title}
              </h2>
              <ul className="flex flex-col space-y-4 items-start text-left w-full">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="w-full text-left">
                    <a
                      href="#"
                      className="text-[14px] md:text-[15px] text-neutral-500 hover:text-neutral-900 transition-colors duration-150 block font-medium py-0.5 text-left"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        <div className="w-full h-[2px] bg-neutral-200 my-10"></div>

       
        <div className="flex items-center space-x-3 mb-10 justify-start">
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[18px]"
          >
            <FaSpotify />
          </a>
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[16px]"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[16px]"
          >
            <FaPinterestP />
          </a>
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[18px]"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[18px]"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-150 text-[15px]"
          >
            <FaXTwitter />
          </a>
        </div>

        
        <div className="w-full flex flex-col items-start text-left space-y-5 pt-2">
          <ul className="flex flex-col space-y-4 items-start text-left">
            {bottomLinks.map((link, idx) => (
              <li key={idx} className="text-left">
                <a
                  href="#"
                  className="text-[14px] md:text-[15px] text-neutral-800 font-semibold hover:underline transition-all block text-left"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[13px] md:text-[14px] text-neutral-500 pt-4 font-normal tracking-wide text-left">
            © {new Date().getFullYear()} Starbucks Coffee Company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
