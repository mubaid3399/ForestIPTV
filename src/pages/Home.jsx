import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Plus, Check, X, ArrowRight } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { PRICING_PLANS } from '../data/pricingData';
import { FAQ_ITEMS } from '../data/faqData';
import { asset } from '../assets/asset';
import MoviesBanner from '../components/MoviesBanner';
import WhatIsIptvForest from '../components/WhatIsIptvForest';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const Home = () => {
  const { openTrialModal, setSelectedPlan } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const containerRef = useRef(null);

  const displayedPlans = showAllPlans ? PRICING_PLANS : PRICING_PLANS.slice(0, 4);

  const homeFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.slice(0, 8).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  useGSAP(() => {
    // Hero Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-hero-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' }
    )
      .fromTo(
        '.gsap-hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-hero-cta',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-hero-image',
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.75, ease: 'power2.out', clearProps: 'all' },
        '-=0.5'
      );

    // Ambient Glow Subtle Floating
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

    // Why IPTV Forest Section Stagger
    gsap.fromTo(
      '.gsap-why-header',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-why-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.gsap-why-card',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-why-section',
          start: 'top 82%',
          once: true,
        },
      }
    );

    // Pricing Plans Stagger
    gsap.fromTo(
      '.gsap-pricing-card',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-pricing-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Cable vs IPTV Comparison
    gsap.fromTo(
      '.gsap-savings-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-savings-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // FAQ Accordion Stagger
    gsap.fromTo(
      '.gsap-faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-faq-section',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pb-8 sm:pb-12">
      <SEO
        title="ForestIPTV Free Trial | Best 4K & FHD IPTV Streaming Service 2026"
        description="Experience ForestIPTV with our instant 24-hour free trial pass. Stream 25,000+ live HD/4K channels and 80,000+ VOD movies with anti-freeze servers and 99.9% uptime."
        keywords="Forest IPTV, Forest IPTV Free Trial, IPTV free trial 24h, buy IPTV subscription, 4K IPTV streaming, anti freeze IPTV server, IPTV Firestick, IPTV Smarters Pro, live sports IPTV USA UK"
        canonicalPath="/"
        jsonLd={homeFaqSchema}
      />

      {/* =========================================================================
          1. HERO SECTION (Custom Pastel Background + Gateway to Entertainment)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#efe7fc] via-[#ffffff] to-[#ffeedc] pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 lg:pb-24">
        {/* Soft pastel ambient glow blobs matching reference screenshot */}
        <div className="gsap-glow-1 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#d8b4fe]/30 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
        <div className="gsap-glow-2 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#fdba74]/35 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/70 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Content & CTA Button */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-left">
              <h1 className="gsap-hero-title text-2xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.18]">
                Your Gateway to Premium Entertainment
              </h1>

              <p className="gsap-hero-text text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal">
                As a <strong className="font-bold text-slate-800">Top IPTV Service</strong>,{' '}
                <span className="font-bold text-[#0088cc]">IPTV Forest</span> brings you seamless
                access to thousands of live channels, blockbuster movies, and on-demand content from
                around the globe. We combine speed, stability, and superior streaming quality to
                ensure an unmatched viewing experience. Whether you’re passionate about live sports,
                the latest TV series, or family-friendly shows, IPTV Forest delivers it all with
                24/7 support and affordable packages. Upgrade your entertainment today with IPTV
                Forest—where quality meets reliability.
              </p>

              <div className="gsap-hero-cta pt-2">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] text-white font-bold tracking-wider uppercase px-10 py-5 rounded-lg shadow-md shadow-red-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  BUY IPTV
                </Link>
              </div>
            </div>

            {/* Right Column: Multi-device Responsive Showcase */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
              <picture className="gsap-hero-image w-full flex justify-center items-center">
                {/* Desktop screen: min-width 1024px uses bg.png */}
                <source media="(min-width: 1024px)" srcSet={asset.bg} />
                {/* Smaller screens (tablets & mobiles) use bgmob.png */}
                <img
                  src={asset.bgmob}
                  alt="IPTV Forest Across All Devices"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl h-auto object-contain drop-shadow-2xl"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHY IPTV FOREST IS THE ULTIMATE CHOICE
         ========================================================================= */}
      <section className="gsap-why-section w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Subtitle */}
          <div className="gsap-why-header max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Why IPTV Forest is the Ultimate Choice
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Step into a new era of entertainment with IPTV Forest, a{' '}
              <strong className="font-bold text-slate-800">Top IPTV Service</strong> trusted by
              streamers worldwide. Imagine thousands of live channels, blockbuster movies, and
              exclusive shows.
            </p>
          </div>

          {/* 3 Pastel Feature Cards matching exact width and typography */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 justify-items-center max-w-[1140px] mx-auto">
            {/* Card 1: Unlimited Access */}
            <div className="gsap-why-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#fff0f4] shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 text-left">
              {/* Soft decorative background circles */}
              <div className="w-52 h-52 rounded-full bg-[#fce0e8] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#fce0e8] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.accessIcon}
                  alt="Unlimited Access"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  Unlimited Access
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  With IPTV Forest, you can enjoy thousands of international TV channels from every
                  corner of the world. From sports and movies to news and ...
                </p>
              </div>
            </div>

            {/* Card 2: High-Quality Streaming */}
            <div className="gsap-why-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f0f7fe] shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 text-left">
              {/* Soft decorative background circles */}
              <div className="w-52 h-52 rounded-full bg-[#dbeafe] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#dbeafe] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.qualityIcon}
                  alt="High-Quality Streaming"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)] "
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  High-Quality Streaming
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  Say goodbye to buffering and interruptions. IPTV Forest uses powerful servers and
                  advanced technology to deliver smooth, HD-quality streaming.
                </p>
              </div>
            </div>

            {/* Card 3: 24/7 Support */}
            <div className="gsap-why-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f8f3ff] shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 text-left">
              {/* Soft decorative background circles */}
              <div className="w-52 h-52 rounded-full bg-[#ede4fd] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#ede4fd] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.supportIcon}
                  alt="24/7 Support"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)] "
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  24/7 Support
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  Entertainment doesn't have to be expensive. IPTV Forest offers flexible,
                  budget-friendly plans and round-the-clock customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRICING & SUBSCRIPTION PLANS SECTION (Exact UI from Image 2)
         ========================================================================= */}
      <section id="pricing" className="gsap-pricing-section w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Subtitle */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Subscription Plans & Pricing
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Select your ideal IPTV pass. Enjoy instant automated activation, 15,000+ live channels, and 24/7 priority customer support.
            </p>
          </div>

          {/* Pricing Cards Row - Exact UI Match with Loose Spacious Height */}
          <div className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-7 max-w-[1440px] mx-auto">
            {displayedPlans.map((plan) => {
              const isFeatured = plan.popular;
              return (
                <div
                  key={plan.id}
                  className={`gsap-pricing-card w-[275px] sm:w-[285px] min-h-[720px] sm:min-h-[760px] rounded-[26px] pt-12 pb-14 px-6 flex flex-col items-center text-center hover:-translate-y-1.5 transition-transform duration-200 shrink-0 ${isFeatured ? 'bg-[#fff0f2]' : 'bg-[#edf7fd]'
                    }`}
                >
                  {/* Plan Title (2 Lines matching reference) */}
                  <div
                    className={`font-semibold text-lg sm:text-[19px] leading-snug ${isFeatured ? 'text-[#f87171]' : 'text-[#38bdf8]'
                      }`}
                  >
                    <div>{plan.duration} IPTV</div>
                    <div>Subscription</div>
                  </div>

                  {/* Price */}
                  <div className="text-4xl sm:text-[46px] font-bold text-slate-900 tracking-tight my-6 sm:my-7">
                    ${plan.price}
                  </div>

                  {/* BUY IPTV Button (2 Lines matching reference) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan);
                      openTrialModal(plan);
                    }}
                    className={`w-full max-w-[180px] py-4 rounded-lg font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs flex flex-col items-center justify-center leading-tight mb-8 sm:mb-10 ${isFeatured
                      ? 'bg-[#f87171] hover:bg-[#ef4444] text-white'
                      : 'bg-[#38bdf8] hover:bg-[#0284c7] text-white'
                      }`}
                  >
                    <span>BUY IPTV</span>
                  </button>

                  {/* Features List (Loose, airy, and full height) */}
                  <div className="w-full flex-1 flex flex-col justify-evenly py-2 space-y-6 sm:space-y-7 text-start">
                    {plan.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="text-slate-800 !text-[20px] sm:text-[16px] font-medium leading-relaxed"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* See More Plans Button (Reveals 5th card) */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAllPlans(!showAllPlans)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80 transition-all duration-200 shadow-xs hover:shadow cursor-pointer"
            >
              <span>{showAllPlans ? 'See Less Plans' : 'See More Plans'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${showAllPlans ? 'rotate-180' : ''
                  }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3B. STOP OVERPAYING FOR CABLE — CUT THE CORD & SAVE $1,200+/YEAR
         ========================================================================= */}
      <section className="gsap-savings-section w-full bg-[#f8fafc]/80 py-16 sm:py-20 lg:py-24 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Stop Overpaying for Cable <span className="text-emerald-600">Save $1,200+</span> Every Year
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Traditional cable and satellite TV companies trap you in expensive 2-year contracts with hidden box rental fees and annual price hikes. See how much you save by switching to IPTV Forest.
            </p>
          </div>

          {/* 2-Column Comparison Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12">

            {/* Left Column: dollers.png Illustration with Floating Savings Badges */}
            <div className="gsap-savings-card lg:col-span-5 flex flex-col items-center justify-center text-center relative">
              <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center">
                {/* Ambient glow under the image */}
                <div className="absolute inset-0 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none scale-75" />

                <img
                  src={asset.dollers}
                  alt="Overpaying for expensive cable bills"
                  className="w-full max-h-[380px] sm:max-h-[440px] object-contain relative z-10 drop-shadow-xl"
                />

                {/* Floating Badge 1 (Top Left): The Problem */}
                <div className="absolute top-2 left-0 sm:-left-4 z-20 bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2 shadow-md text-left">
                  <div className="text-[10px] font-bold uppercase text-rose-500">Typical Cable Bill</div>
                  <div className="text-sm font-extrabold text-rose-700">$140+/Month</div>
                </div>

                {/* Floating Badge 2 (Bottom Right): The Solution */}
                <div className="absolute bottom-4 right-0 sm:-right-4 z-20 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 shadow-md text-left">
                  <div className="text-[10px] font-bold uppercase text-emerald-600">With ForestIPTV</div>
                  <div className="text-sm font-extrabold text-emerald-800">From $5.83/Mo</div>
                </div>
              </div>

              <div className="mt-4 text-xs font-semibold text-slate-500 italic">
                *Don't let overpriced cable bills weigh down your monthly household budget.
              </div>
            </div>

            {/* Right Column: Comparative Side-by-Side Breakdown */}
            <div className="gsap-savings-card lg:col-span-7 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Traditional Cable Card */}
                <div className="rounded-2xl bg-rose-50/60 border border-rose-200/80 p-5 space-y-3.5 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                      Traditional Cable TV
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                      Overpriced
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-rose-900 font-sans">
                    $1,440 – $1,920
                    <span className="text-xs font-medium text-rose-600 block">per year ($120–$160/month)</span>
                  </div>

                  <ul className="space-y-2 text-xs text-rose-900/90 font-medium pt-1">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>2-Year strict lock-in contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Mandatory box rental fees ($15+/mo)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Limited to 150–200 regional channels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Hefty cancellation penalty fees</span>
                    </li>
                  </ul>
                </div>

                {/* ForestIPTV Card */}
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/90 p-5 space-y-3.5 text-left relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/70">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      IPTV Forest Pass
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Smart Choice
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-emerald-900 font-sans">
                    $70.00
                    <span className="text-xs font-medium text-emerald-700 block">per full year ($5.83/month)</span>
                  </div>

                  <ul className="space-y-2 text-xs text-emerald-950 font-medium pt-1">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Zero contracts — 100% prepaid pass</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>No box rentals — works on your devices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>15,000+ live channels & 80,000+ VODs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>7-Day unconditional money-back guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Total Savings Highlight Callout */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-[#0088cc] text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="space-y-1 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Your Guaranteed Annual Savings:
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    $1,370+ Saved Every Year
                  </div>
                  <p className="text-xs text-white/90">
                    Keep your hard-earned money while getting 10x more entertainment in crystal-clear 4K.
                  </p>
                </div>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer"
                >
                  <span>Select a Plan</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. LATEST MOVIES BANNER (Powered by OMDb API - No Hover Effects)
         ========================================================================= */}
      <MoviesBanner />

      {/* =========================================================================
          5. WHAT IS IPTV FOREST? SECTION
         ========================================================================= */}
      <WhatIsIptvForest />

      {/* =========================================================================
          6. FREQUENTLY ASKED QUESTIONS (Matching Reference Screenshot Style)
         ========================================================================= */}
      <section id="faq" className="gsap-faq-section w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Find quick answers to common questions about our 24-hour free trial, device setup, and IPTV Forest service.
            </p>
          </div>

          {/* FAQ Accordion List - Exact UI match to reference screenshot */}
          <div className="space-y-3 sm:space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.question}
                  className="gsap-faq-item bg-[#f0f4f8] hover:bg-[#e9eff6] rounded-xs sm:rounded-sm transition-colors duration-150 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span className="text-[16px] sm:text-[17.5px] font-medium text-slate-900 leading-snug">
                      {item.question}
                    </span>
                    <span className="text-slate-600 shrink-0">
                      <Plus
                        className={`w-5 h-5 text-slate-700 transition-transform duration-300 ease-in-out ${
                          isOpen ? 'rotate-45 text-slate-900' : 'rotate-0'
                        }`}
                        strokeWidth={1.75}
                      />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-5 pt-1.5 text-slate-600 text-[15px] sm:text-[16px] leading-relaxed border-t border-slate-200/60">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
