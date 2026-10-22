import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const NotFound = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-404-number',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'all' }
    )
      .fromTo(
        '.gsap-404-badge',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-404-title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
        '-=0.2'
      )
      .fromTo(
        '.gsap-404-text',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-404-buttons',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
        '-=0.2'
      )
      .fromTo(
        '.gsap-404-links',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, clearProps: 'all' },
        '-=0.2'
      );

    // Ambient floating glow
    gsap.to('.gsap-glow-1', {
      x: '+=15',
      y: '+=15',
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to('.gsap-glow-2', {
      x: '-=15',
      y: '-=15',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full min-h-[82vh] flex items-center justify-center bg-gradient-to-br from-[#efe7fc] via-[#ffffff] to-[#ffeedc] relative overflow-hidden px-4 sm:px-6 py-28 sm:py-36 font-sans">
      <SEO
        title="404 - Page Not Found | ForestIPTV"
        description="The stream or page you are looking for does not exist on ForestIPTV."
        noindex={true}
      />

      {/* Soft pastel ambient glow blobs (pure CSS) */}
      <div className="gsap-glow-1 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[#d8b4fe]/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="gsap-glow-2 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-[#fdba74]/25 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
        {/* Large Typography 404 Display */}
        <div className="space-y-2">
          <div className="gsap-404-number text-7xl sm:text-9xl font-black tracking-tight bg-gradient-to-r from-[#0088cc] via-[#ff7070] to-[#fdba74] bg-clip-text text-transparent select-none leading-none">
            404
          </div>
          <span className="gsap-404-badge inline-block px-3.5 py-1 text-xs font-bold text-[#0088cc] bg-blue-50 border border-blue-200/80 rounded-full tracking-wider">
            PAGE NOT FOUND
          </span>
        </div>

        {/* Headline */}
        <h1 className="gsap-404-title text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Oops! That stream doesn&apos;t exist
        </h1>

        {/* Explanation */}
        <p className="gsap-404-text text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          The link you followed may be broken, or the page may have been moved or removed. Let&apos;s get you back to the entertainment.
        </p>

        {/* Action Buttons (pure HTML/CSS, no images or SVGs) */}
        <div className="gsap-404-buttons flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] text-white font-bold tracking-wider uppercase px-8 py-3.5 rounded-lg shadow-md shadow-red-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer text-sm"
          >
            RETURN TO HOME
          </Link>
          <Link
            to="/channels"
            className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-7 py-3.5 rounded-lg border border-slate-200/80 transition-all duration-200 cursor-pointer text-sm"
          >
            EXPLORE CHANNELS
          </Link>
        </div>

        {/* Direct Text Links */}
        <div className="gsap-404-links pt-6 border-t border-slate-200/70">
          <span className="text-xs text-slate-500 font-medium block mb-2.5">
            Looking for something specific?
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-700">
            <Link to="/pricing" className="hover:text-[#0088cc] transition-colors">
              Pricing Plans
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/channels" className="hover:text-[#0088cc] transition-colors">
              Live Channels
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/setup" className="hover:text-[#0088cc] transition-colors">
              Setup Tutorials
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/contact" className="hover:text-[#0088cc] transition-colors">
              Support Desk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
