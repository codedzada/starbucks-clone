import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import StarbucksLogo from '../../assets/starbucks-icon.svg';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Check if current page is an auth page (hides nav links)
  const isAuthPage = ['/login', '/register', '/account/signin', '/account/create'].includes(
    location.pathname
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Shared NavLink class builder — green bottom border when active
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'border-b-4 border-[#006241] h-full flex items-center text-[#006241]'
      : 'hover:text-[#006241] transition-colors duration-150 h-full flex items-center';

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <nav className="w-full h-[100px] bg-white border-b border-gray-200/80 shadow-md relative z-50">
        <div className="max-w-[1510px] h-full mx-auto flex items-center justify-between px-6">

          {/* LEFT: Logo + primary nav links */}
          <div className="flex items-center h-full gap-0">
            <Link to="/" className="w-[52px] h-[52px] cursor-pointer flex-shrink-0">
              <img src={StarbucksLogo} alt="Starbucks Logo" className="w-full h-full object-contain" />
            </Link>

            {!isAuthPage && (
              <ul className="hidden md:flex space-x-9 font-black text-[13px] tracking-[0.15em] text-[#212121] uppercase h-full items-center pl-8">
                <li className="h-full flex items-center">
                  <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
                </li>
                <li className="h-full flex items-center">
                  <NavLink to="/rewards" className={navLinkClass}>Rewards</NavLink>
                </li>
                <li className="h-full flex items-center">
                  <NavLink to="/giftcards" className={navLinkClass}>Gift Cards</NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* RIGHT: Find a Store + Auth buttons + Mobile hamburger */}
          {!isAuthPage && (
            <div className="flex items-center">

              {/* Desktop right-side row */}
              <div className="hidden md:flex items-center h-[100px] gap-10">

                {/* Find a Store — NavLink with active green bottom border */}
                <NavLink
                  to="/store-locator"
                  className={({ isActive }) =>
                    isActive
                      ? 'group flex items-center gap-2 text-[14px] font-bold text-[#006241] border-b-4 border-[#006241] h-full cursor-pointer'
                      : 'group flex items-center gap-2 text-[14px] font-bold text-[#212121] hover:text-[#006241] transition-colors duration-150 h-full cursor-pointer'
                  }
                >
                  {({ isActive }) => (
                    <>
                      <svg
                        className={`w-5 h-5 fill-current transition-colors duration-150 ${
                          isActive ? 'text-[#006241]' : 'text-black group-hover:text-[#006241]'
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span className="tracking-wide">Find a store</span>
                    </>
                  )}
                </NavLink>

                {/* Sign in / Join now / User avatar */}
                <div className="flex items-center gap-4 font-bold text-[14px]">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#006241] flex items-center justify-center text-white font-bold text-sm">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                        <span className="text-[#212121] hidden lg:block">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-[7px] border border-black rounded-full hover:bg-black/5 transition-all duration-150 text-[#212121] tracking-wide cursor-pointer"
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/account/signin"
                        className="px-5 py-[7px] border border-black rounded-full hover:bg-black/5 transition-all duration-150 text-[#212121] tracking-wide cursor-pointer inline-block"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/account/create"
                        className="px-5 py-[7px] bg-black text-white rounded-full hover:bg-black/85 transition-all duration-150 border border-black tracking-wide cursor-pointer inline-block"
                      >
                        Join now
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="block md:hidden w-8 h-8 relative focus:outline-none ml-4"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <style>{`
                  .hamburger-line {
                    position: absolute;
                    width: 24px;
                    height: 2px;
                    background-color: #212121;
                    border-radius: 2px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  }
                  .hamburger-line:nth-child(1) { top: 10px; left: 4px; }
                  .hamburger-line:nth-child(2) { top: 16px; left: 4px; width: 24px; }
                  .hamburger-line:nth-child(3) { top: 22px; left: 4px; }
                  .hamburger-open .hamburger-line:nth-child(1) { transform: rotate(45deg); top: 16px; width: 24px; }
                  .hamburger-open .hamburger-line:nth-child(2) { opacity: 0; transform: translateX(-10px); }
                  .hamburger-open .hamburger-line:nth-child(3) { transform: rotate(-45deg); top: 16px; width: 24px; }
                `}</style>
                <div className={`w-full h-full relative ${isOpen ? 'hamburger-open' : ''}`}>
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Mobile Slide-out Drawer ── */}
      <div
        className={`fixed inset-0 top-[100px] z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[68%] max-w-[340px] bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex-1 px-8 pt-12 flex flex-col justify-start overflow-y-auto">

            {/* Primary nav links */}
            <ul className="space-y-7 text-[22px] font-medium text-[#212121]">
              <li>
                <NavLink
                  to="/menu"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block transition-colors duration-150 ${isActive ? 'text-[#006241]' : 'hover:text-[#006241]'}`
                  }
                >
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rewards"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block transition-colors duration-150 ${isActive ? 'text-[#006241]' : 'hover:text-[#006241]'}`
                  }
                >
                  Rewards
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/giftcards"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block transition-colors duration-150 ${isActive ? 'text-[#006241]' : 'hover:text-[#006241]'}`
                  }
                >
                  Gift Cards
                </NavLink>
              </li>
            </ul>

            <div className="w-full h-[2px] bg-gray-300/70 my-8 flex-shrink-0" />

            <div className="space-y-8">
              {/* Auth section */}
              {user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-[#006241] flex items-center justify-center text-white font-bold text-lg">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#212121]">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="px-5 py-[7px] border border-black rounded-full hover:bg-black/5 transition-all duration-150 text-[#212121] tracking-wide text-left"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 text-[15px] font-bold">
                  <Link
                    to="/account/signin"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-[7px] border border-black rounded-full hover:bg-black/5 transition-all duration-150 text-[#212121] tracking-wide inline-block"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/account/create"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-[7px] bg-black text-white rounded-full hover:bg-black/85 transition-all duration-150 border border-black tracking-wide inline-block"
                  >
                    Join now
                  </Link>
                </div>
              )}

              {/* Find a store — active green colour on mobile */}
              <NavLink
                to="/store-locator"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-2 text-[15px] font-bold pt-2 transition-colors duration-150 ${
                    isActive ? 'text-[#006241]' : 'text-[#212121] hover:text-[#006241]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={`w-5 h-5 fill-current transition-colors duration-150 ${
                        isActive ? 'text-[#006241]' : 'text-black group-hover:text-[#006241]'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="tracking-wide">Find a store</span>
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;