import React from 'react';
import { Link } from 'react-router-dom';

const MenuNavTabs = ({ currentTab, tabs }) => {
  return (
    <div className="bg-[#f9f9f9] border-b border-gray-200/85 sticky top-0 z-30 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex space-x-8 text-[13px] font-bold uppercase tracking-wider text-[#212121]">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`py-4 transition-all duration-150 relative block cursor-pointer ${
                  isActive ? 'text-black font-extrabold' : 'text-black/60 hover:text-black'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#006241]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuNavTabs;
