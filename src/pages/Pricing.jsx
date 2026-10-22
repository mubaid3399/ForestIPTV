import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  CreditCard,
  MessageSquare,
  Plus,
  Tv,
  Zap,
  ChevronDown,
  RotateCcw,
  Users,
  X,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { PRICING_PLANS } from '../data/pricingData';
import { useApp } from '../hooks/useApp';
import { APP_CONFIG } from '../utils/constants';
import { asset } from '../assets/asset';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const Pricing = () => {
  const { openTrialModal, setSelectedPlan } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-pricing-hero-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' }
    )
      .fromTo(
        '.gsap-pricing-hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-pricing-hero-cta',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      );

    // Subtle glow breathing
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

    // Pricing Cards Stagger - robust fromTo with once: true and clearProps: all
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
          trigger: '.gsap-pricing-cards-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Comparison Block
    gsap.fromTo(
      '.gsap-pricing-comparison',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-pricing-comparison',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // FAQ Items Stagger
    gsap.fromTo(
      '.gsap-pricing-faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-pricing-faq-section',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const pricingFaqs = [
    {
      q: 'How fast will I receive my IPTV credentials after payment?',
      a: 'Activation is automated and instant! The moment your checkout is completed, our system automatically dispatches your Username, Password, Server URL, and M3U playlist link to your provided email address and WhatsApp within 60 seconds.',
    },
    {
      q: 'Are there any hidden fees or recurring monthly subscriptions?',
      a: 'No, absolutely not. All IPTV Forest passes are one-time payments for the full duration selected (1, 2, 3, 4, or 5 years). We never store your payment details or automatically recharge your card.',
    },
    {
      q: 'Can I stream on multiple devices at the same time?',
      a: 'Standard subscriptions allow installation on multiple devices (Firestick, Smart TV, phone, etc.), but only 1 stream can be active at any given moment. If you require 2 to 5 simultaneous screens, please reach out to our WhatsApp team for a discounted multi-room pass.',
    },
    {
      q: 'What is your refund and satisfaction guarantee policy?',
      a: 'We offer an unconditional 7-day money-back guarantee. If our technical team cannot solve any buffering or compatibility issue on your device, we will issue a full 100% refund promptly.',
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Cryptocurrency (Bitcoin, Ethereum, USDT) for maximum privacy.',
    },
  ];

  const pricingSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: 'ForestIPTV Subscription Pass',
        description:
          'High-speed 4K & FHD IPTV subscription with 25,000+ live channels, 80,000+ VODs, anti-freeze technology, and instant activation.',
        brand: {
          '@type': 'Brand',
          name: 'ForestIPTV',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '70.00',
          highPrice: '240.00',
          offerCount: '5',
          offers: PRICING_PLANS.map((plan) => ({
            '@type': 'Offer',
            name: `${plan.duration} IPTV Subscription Pass`,
            price: plan.price.toFixed(2),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: 'https://forestiptvfreetrial.online/pricing',
            seller: {
              '@type': 'Organization',
              name: 'ForestIPTV',
            },
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1940',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: pricingFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div ref={containerRef} className="w-full bg-white text-slate-900 font-sans pb-16 sm:pb-24">
      <SEO
        title="IPTV Subscription Plans & Pricing | ForestIPTV Free Trial Passes from $5.83/mo"
        description="Compare affordable ForestIPTV subscription plans. 1 to 5-year prepaid passes starting at just $5.83/month with instant activation, 25,000+ channels, and 7-day money-back guarantee."
        keywords="IPTV subscription, buy IPTV, IPTV price, cheap IPTV, best IPTV deals, 1 year IPTV subscription, Forest IPTV pricing, IPTV free trial pass, 4K IPTV subscription"
        canonicalPath="/pricing"
        jsonLd={pricingSchema}
      />

      {/* =========================================================================
          1. HERO SECTION (100% Home Page DNA: Pastel Background + Glows)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#efe7fc] via-[#ffffff] to-[#ffeedc] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Soft pastel ambient glow blobs */}
        <div className="gsap-glow-1 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#d8b4fe]/30 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
        <div className="gsap-glow-2 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#fdba74]/35 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/70 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">

            {/* Main Headline */}
            <h1 className="gsap-pricing-hero-title text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.18]">
              Subscription Plans & <span className="text-[#0088cc]">Pricing</span>
            </h1>

            {/* Description */}
            <p className="gsap-pricing-hero-text text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto">
              Select your ideal IPTV pass. Enjoy instant automated activation, 15,000+ live channels, the largest movie library in the world, and 24/7 priority customer support with zero contracts.
            </p>

            {/* Action Buttons */}
            <div className="gsap-pricing-hero-cta flex flex-wrap items-center justify-center gap-4 pt-1">
              <a
                href="#plans"
                className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] text-white font-bold tracking-wider uppercase px-9 py-4 rounded-lg shadow-md shadow-red-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                EXPLORE ALL PLANS
              </a>
            </div>

            {/* Clean 4-Item Trust Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Instant 60s Activation
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                No Automatic Renewals
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                7-Day Money-Back Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                24/7 Dedicated Support
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PRICING CARDS ROW (100% Inspired by Home's Pricing Cards)
         ========================================================================= */}
      <section id="plans" className="gsap-pricing-cards-section w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading & Subtitle */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Choose Your Subscription Plan
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Select your ideal IPTV pass. Enjoy instant automated activation, 15,000+ live channels, and 24/7 priority customer support.
            </p>
          </div>

          {/* Pricing Cards Row - STRICTLY ONE ROW (Grid-cols-5 on desktop & flex-nowrap on all screens) */}
          <div className="flex flex-nowrap overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 xl:gap-5 justify-start lg:justify-center items-stretch pb-6 lg:pb-0 scrollbar-none">
            {PRICING_PLANS.map((plan) => {
              const isFeatured = plan.popular;
              return (
                <div
                  key={plan.id}
                  className={`gsap-pricing-card w-[260px] sm:w-[275px] lg:w-full min-h-[720px] sm:min-h-[760px] rounded-[24px] sm:rounded-[26px] pt-10 sm:pt-12 pb-12 sm:pb-14 px-3.5 sm:px-4 xl:px-5 flex flex-col items-center text-center hover:-translate-y-1.5 transition-transform duration-200 shrink-0 ${isFeatured ? 'bg-[#fff0f2] shadow-sm' : 'bg-[#edf7fd]'
                    }`}
                >
                  {/* Plan Title (2 Lines matching reference) */}
                  <div
                    className={`font-semibold text-base sm:text-lg xl:text-[19px] leading-snug ${isFeatured ? 'text-[#f87171]' : 'text-[#38bdf8]'
                      }`}
                  >
                    <div>{plan.duration} IPTV</div>
                    <div>Subscription</div>
                  </div>

                  {/* Price */}
                  <div className="text-4xl sm:text-[44px] xl:text-[46px] font-bold text-slate-900 tracking-tight my-6 sm:my-7">
                    ${plan.price}
                  </div>

                  {/* BUY IPTV Button (2 Lines matching reference) */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(plan);
                      openTrialModal(plan);
                    }}
                    className={`w-full max-w-[170px] py-4 rounded-lg font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs flex flex-col items-center justify-center leading-tight mb-8 sm:mb-10 text-xs sm:text-sm ${isFeatured
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
                        className="text-slate-800 text-[14px] sm:text-[15px] xl:text-[16px] font-medium leading-snug"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. STOP OVERPAYING FOR CABLE — CUT THE CORD & SAVE $1,200+/YEAR
         ========================================================================= */}
      <section className="w-full bg-[#f8fafc]/80 py-16 sm:py-20 lg:py-24 border-y border-slate-200/70">
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
          <div className="gsap-pricing-comparison grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12">

            {/* Left Column: dollers.png Illustration with Floating Savings Badges */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative">
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
            <div className="lg:col-span-7 space-y-5">

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
                  href="#plans"
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
          4. MULTI-ROOM & RESELLER NOTICE CARD
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-10">
        <div className="rounded-3xl bg-[#f8fafc] border border-slate-200/90 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0088cc]">
              <Users className="w-3.5 h-3.5" />
              Multi-Screen & Reseller Sub-Panels
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Need 2–5 Concurrent Streams or Wholesale Credits?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Standard plans include 1 active connection. If you want multi-room access for the entire family or wish to start your own IPTV business with our reseller panel, talk with our desk.
            </p>
          </div>

          <a
            href={APP_CONFIG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-7 py-4 rounded-xl shadow-sm transition-all duration-200 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Sales Desk</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE FORESTIPTV PLANS? (Exact 3 Pastel Cards from Home Page)
         ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Why IPTV Forest is the Ultimate Choice
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Step into a new era of entertainment with IPTV Forest, a{' '}
              <strong className="font-bold text-slate-800">Top IPTV Service</strong> trusted by
              streamers worldwide.
            </p>
          </div>

          {/* 3 Pastel Cards matching exact width and typography */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 justify-items-center max-w-[1140px] mx-auto">

            {/* Card 1: Unlimited Access */}
            <div className="group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#fff0f4] shadow-sm hover:shadow-md transition-all duration-300 text-left">
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
                  corner of the world. From sports and movies to news and entertainment.
                </p>
              </div>
            </div>

            {/* Card 2: High-Quality Streaming */}
            <div className="group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f0f7fe] shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <div className="w-52 h-52 rounded-full bg-[#dbeafe] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#dbeafe] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.qualityIcon}
                  alt="High-Quality Streaming"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
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
            <div className="group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f8f3ff] shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <div className="w-52 h-52 rounded-full bg-[#ede4fd] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#ede4fd] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.supportIcon}
                  alt="24/7 Support"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
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
          5. PRICING & BILLING FAQS (Exact 100% Home FAQ DNA)
         ========================================================================= */}
      <section className="gsap-pricing-faq-section w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Pricing Questions
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              Everything you need to know about payments, activations, and our guarantee.
            </p>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {pricingFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="gsap-pricing-faq-item rounded-[14px] bg-[#f0f4f8] overflow-hidden transition-colors duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-5 sm:py-6 cursor-pointer focus:outline-none transition-colors duration-150 hover:bg-[#e6edf4]"
                  >
                    <span className="text-slate-800 text-base sm:text-[19px] font-semibold tracking-normal pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 text-slate-600 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 text-[#0088cc]' : 'rotate-0'
                        }`}
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-slate-600 text-sm sm:text-[16px] leading-relaxed border-t border-slate-200/50">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BOTTOM CALL TO ACTION (Home Page Style)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#18181B] via-[#232329] to-[#18181B] text-white p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          {/* Ambient subtle glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0088cc]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff7070]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088cc] bg-blue-950/80 border border-blue-800 px-3.5 py-1.5 rounded-full inline-block">
              24/7 Automated Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade to IPTV Forest?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Join thousands of satisfied viewers today. Select any subscription plan above or test our service risk-free with our 7-day money-back guarantee.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#plans"
                className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] text-white font-bold tracking-wider uppercase px-8 py-4 rounded-lg shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                CHOOSE YOUR PLAN
              </a>
              <a
                href={APP_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-7 py-4 rounded-lg border border-zinc-700 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Ask an Operator</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
