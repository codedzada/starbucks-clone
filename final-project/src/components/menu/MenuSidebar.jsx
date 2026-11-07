import React from 'react';
import { Link } from 'react-router-dom';

const MenuSidebar = ({ categories, activeSubcategoryId }) => {
  return (
    <aside className="hidden md:block md:w-60 flex-shrink-0 z-10 bg-white">
      <nav className="flex flex-col gap-6 md:gap-8 pr-2 pb-6">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col">
            {/* Main Category Header (e.g. Drinks, Food) */}
            <h2 className="text-[#212121] font-bold text-[16px] tracking-wide mb-3 uppercase">
              {category.name}
            </h2>
            
            {/* Subcategories list */}
            <ul className="flex flex-row md:flex-col flex-wrap gap-x-4 gap-y-2 md:gap-y-3.5">
              {category.subcategories.map((subcat) => {
                const isSubcatActive = activeSubcategoryId === subcat.id;
                return (
                  <li key={subcat.id} className="w-auto md:w-full">
                    <Link
                      to={`/menu/${subcat.id}`}
                      className={`text-[15px] block py-0.5 transition-all duration-200 cursor-pointer ${
                        isSubcatActive
                          ? 'text-[#212121] font-extrabold md:border-l-4 md:border-[#006241] md:pl-3 md:-ml-4'
                          : 'text-gray-500 font-medium hover:text-[#006241]'
                      }`}
                    >
                      {subcat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default MenuSidebar;
