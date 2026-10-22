import React from 'react';
import { asset } from '../assets/asset';

export const WhatIsIptvForest = () => {
  const bulletPoints = [
    'Watch live sports with crystal-clear quality.',
    'Explore family-friendly content for all ages.',
    'Experience ultra-fast servers with zero downtime.',
    'Stream on multiple devices anytime, anywhere.',
  ];

  const featureCards = [
    {
      title: 'Endless Global Channels',
      bg: 'bg-[#fff1f2]',
      border: 'border-[#ffe4e6]',
    },
    {
      title: 'Seamless HD Streaming',
      bg: 'bg-[#f0f7fe]',
      border: 'border-[#e0f2fe]',
    },
    {
      title: 'Affordable Premium Plans',
      bg: 'bg-[#f5f0ff]',
      border: 'border-[#ede4fd]',
    },
    {
      title: '24/7 Dedicated Support',
      bg: 'bg-[#fef8ed]',
      border: 'border-[#fef3c7]',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#fffbfc] to-[#fef6f8] py-16 sm:py-20 lg:py-24">
      {/* Soft ambient pastel glow blobs matching reference screenshot */}
      <div className="absolute top-1/4 right-0 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#ffdada]/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#e0f2fe]/35 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight">
            What is IPTV Forest?
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Description & Bullets */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-slate-600 text-base sm:text-[17px] leading-[1.8] font-normal">
              IPTV Forest is not just another streaming service—it is a premium entertainment
              experience designed for those who demand more. As a{' '}
              <strong className="font-bold text-slate-900">Top IPTV Service</strong>, IPTV Forest
              offers access to thousands of exclusive channels, blockbuster movies, and live events
              from around the world, all delivered in stunning HD and ultra-reliable quality. Imagine
              a world where your favorite content is always at your fingertips, without buffering,
              delays, or limitations. With state-of-the-art technology, dedicated servers, and 24/7
              professional support, IPTV Forest redefines the way you watch television. It's not only
              about watching—it's about elevating your lifestyle with entertainment that is seamless,
              sophisticated, and truly limitless.
            </p>

            {/* Bullet points with square icons matching screenshot */}
            <ul className="space-y-3 pt-2 text-slate-700 text-[15px] sm:text-[16px]">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-slate-700 mt-2.5 rounded-[1px] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: best-iptv Image with Red Ambience Glow */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Ambient red/pink glow blob behind the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-red-400/25 rounded-full blur-[80px] pointer-events-none" />

            <img
              src={asset.bestIptv}
              alt="What is ForestIPTV Free Trial - Best 4K IPTV Streaming Service"
              className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] lg:max-w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Bottom Feature Cards (2x2 Grid matching reference screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-14 sm:mt-18">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bg} border ${card.border} rounded-2xl py-6 px-6 text-center shadow-xs transition-shadow duration-200`}
            >
              <h3 className="text-slate-800 font-bold text-lg sm:text-[19px] tracking-tight">
                {card.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsIptvForest;
