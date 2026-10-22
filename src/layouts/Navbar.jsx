import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/navigationData';
import { asset } from '../assets/asset';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, path) => {
    if (path === '/#faq') {
      if (location.pathname === '/') {
        e.preventDefault();
        const faqElement = document.getElementById('faq');
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && (!location.hash || location.hash !== '#faq');
    }
    if (path === '/#faq') {
      return location.pathname === '/' && location.hash === '#faq';
    }
    if (path === '/guide' || path === '/setup') {
      return location.pathname === '/guide' || location.pathname === '/setup';
    }
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/90 py-2 sm:py-2.5'
          : 'bg-transparent border-b border-transparent shadow-none py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo & Title (Left) */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <img
              src={asset.logo}
              alt="ForestIPTV Free Trial - Top 4K IPTV Service Logo"
              className="h-10 sm:h-12 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="flex flex-col justify-center select-none">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 leading-tight group-hover:text-[#0088cc] transition-colors">
                IPTV Forest
              </span>
              <span className="text-xs sm:text-[13px] text-slate-500 font-normal leading-none mt-0.5">
                Top IPTV Service
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Action Button (Right) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-9">
            <nav className="flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`text-[15px] transition-colors duration-150 ${
                      active
                        ? 'text-[#0088cc] font-semibold'
                        : 'text-slate-700 hover:text-[#0088cc] font-normal'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Order IPTV Button */}
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center bg-[#0088cc] hover:bg-[#0077b5] active:bg-[#006ba3] text-white font-medium text-[15px] px-5 py-2.5 rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Order IPTV
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0088cc]/30"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-5 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-3.5 py-2.5 rounded-md text-base transition-colors ${
                    active
                      ? 'text-[#0088cc] font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-[#0088cc] hover:bg-slate-50 font-normal'
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-[#0088cc] hover:bg-[#0077b5] text-white font-medium text-base py-3 rounded shadow-sm transition-colors"
            >
              Order IPTV
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
