import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Radio,
  Play,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Trophy,
  Film,
  Globe,
  X,
  Tv,
} from 'lucide-react';
import { CHANNEL_CATEGORIES, HIGHLIGHTED_PACKAGES } from '../data/channelsData';
import { useApp } from '../hooks/useApp';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const Channels = () => {
  const { openTrialModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-channels-hero-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' }
    )
      .fromTo(
        '.gsap-channels-hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-channels-hero-cta',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      );

    // Ambient glow breathing
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

    // Metrics Strip
    gsap.fromTo(
      '.gsap-channels-metric-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-channels-metric-section',
          start: 'top 88%',
          once: true,
        },
      }
    );

    // Filter Bar
    gsap.fromTo(
      '.gsap-channels-filter',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-channels-filter',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Package Cards Stagger
    gsap.fromTo(
      '.gsap-channel-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-channels-grid-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // 3 Feature Cards
    gsap.fromTo(
      '.gsap-channels-feature-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-channels-features-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // FAQ Items
    gsap.fromTo(
      '.gsap-channels-faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-channels-faq-section',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const filteredPackages = HIGHLIGHTED_PACKAGES.filter((pkg) => {
    const matchesCategory =
      selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesQuery =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.channels.some((ch) => ch.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const channelFaqs = [
    {
      q: 'How frequently is the channel lineup updated?',
      a: 'Our systems refresh the channel roster and ingest transponders automatically every 24 hours. When major sporting tournaments, PPV events, or new broadcast channels launch, they appear automatically in your playlist without requiring manual re-installation.',
    },
    {
      q: 'Can I request custom channels or specific regional packages?',
      a: 'Yes! If there is a regional sports channel, international news network, or cinema feed you cannot find, contact our 24/7 WhatsApp or email support desk. Our engineers can allocate custom transponders to your account.',
    },
    {
      q: 'What internet speed is recommended for smooth 4K 60FPS streaming?',
      a: 'We recommend a stable internet connection of at least 25-30 Mbps for native 4K 60FPS Ultra HD feeds, and 12-15 Mbps for Full HD 1080p. Our built-in H.265 (HEVC) compression ensures buffer-free streaming even on standard home Wi-Fi.',
    },
    {
      q: 'Are live PPV events and fight nights included in standard packages?',
      a: 'Yes, absolutely. All ForestIPTV subscriptions include unrestricted access to all major live Pay-Per-View events including UFC, boxing, WWE, Premier League, UEFA Champions League, Formula 1, and NFL Sunday Ticket at zero additional charge.',
    },
    {
      q: 'How do I synchronize the 7-day Electronic Program Guide (EPG)?',
      a: 'Our EPG URL is embedded directly into your M3U playlist and Xtream Codes API credentials. Once you sign into IPTV Smarters, TiviMate, or IBO Player, the full 7-day TV schedule and program metadata syncs automatically in under 30 seconds.',
    },
  ];

  const channelsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'ForestIPTV Live Channel Packages & Categories',
        description: 'Comprehensive lineup of 25,000+ live premium global channels and 80,000+ VODs.',
        itemListElement: HIGHLIGHTED_PACKAGES.slice(0, 8).map((pkg, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: pkg.title,
          description: `${pkg.count} in category ${pkg.category}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: channelFaqs.map((faq) => ({
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
        title="Live Channels & VOD List (25,000+ Channels) | ForestIPTV Streaming"
        description="Explore ForestIPTV's massive channel lineup: 25,000+ live global TV channels, premium sports packages (EPL, NFL, UFC, NBA), cinema networks, and 80,000+ 4K movies & series."
        keywords="IPTV channels, IPTV channel list, live sports IPTV, 4K IPTV channels, UK IPTV channels, USA IPTV channels, Arabic IPTV, French IPTV, PPV IPTV, Forest IPTV channels"
        canonicalPath="/channels"
        jsonLd={channelsSchema}
      />

      {/* =========================================================================
          1. HERO SECTION (100% Home & Pricing DNA: Pastel Background + Glows)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#efe7fc] via-[#ffffff] to-[#ffeedc] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Soft pastel ambient glow blobs */}
        <div className="gsap-glow-1 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#d8b4fe]/30 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
        <div className="gsap-glow-2 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#fdba74]/35 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/70 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>25,480+ Global Channels Broadcasting Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="gsap-channels-hero-title text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.18]">
              Explore Over <span className="text-[#0088cc]">25,000+ Live Channels</span> & 4K Feeds
            </h1>

            {/* Description */}
            <p className="gsap-channels-hero-text text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto">
              Stream crystal-clear live television from every corner of the globe. From major sports tournaments and PPV events to cinema premieres and regional news, browse our indexed transponders and find your favorite channels.
            </p>

            {/* Action Buttons */}
            <div className="gsap-channels-hero-cta flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] text-white font-bold tracking-wider uppercase px-9 py-4 rounded-lg shadow-md shadow-red-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                BUY IPTV PLAN
              </Link>
              <button
                type="button"
                onClick={() => openTrialModal()}
                className="inline-flex items-center justify-center bg-[#0088cc] hover:bg-[#0077b5] active:bg-[#006ba3] text-white font-semibold px-8 py-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                GET 24H TRIAL
              </button>
            </div>

            {/* Clean 4-Item Trust Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                25,000+ Live Channels
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Ultra HD 4K 60FPS
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                7-Day EPG TV Guide
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Anti-Freeze Servers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LIVE METRICS STRIP (4-Stat Trust Bar)
         ========================================================================= */}
      <section className="gsap-channels-metric-section relative -mt-8 sm:-mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 sm:p-6 text-center">
          <div className="gsap-channels-metric-item space-y-1 border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">25,480+</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Live TV Channels</div>
          </div>
          <div className="gsap-channels-metric-item space-y-1 md:border-r border-slate-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0088cc]">3,800+</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Live Sports Feeds</div>
          </div>
          <div className="gsap-channels-metric-item space-y-1 border-r border-slate-100 last:border-r-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#f87171]">82,000+</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">VOD Movies & Series</div>
          </div>
          <div className="gsap-channels-metric-item space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.9%</div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">Anti-Freeze Uptime</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SEARCH & CATEGORY FILTER BAR
         ========================================================================= */}
      <section className="gsap-channels-filter max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Find Your Favorite Channels & Networks
          </h2>
          <p className="mt-3.5 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
            Filter by category or search by network name (e.g., Sky Sports, HBO, ESPN, NBC, Canal+) to see what is included in your ForestIPTV pass.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search channels, matches or networks (e.g. Sky Sports, HBO, TNT, ESPN, Canal+)..."
              className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-slate-50 border border-slate-200/90 rounded-2xl text-slate-900 text-sm sm:text-base placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 px-2">
              <span>
                Showing results for <strong className="text-slate-800">"{searchQuery}"</strong>
              </span>
              <span>{filteredPackages.length} package categories found</span>
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto pb-4">
          {CHANNEL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0088cc] text-white shadow-md shadow-blue-500/20 font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white font-bold' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. CHANNEL PACKAGES GRID
         ========================================================================= */}
      <section className="gsap-channels-grid-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.title}
                className="gsap-channel-card bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Resolution + 60FPS Live Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      {pkg.resolution}
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      Anti-Freeze HEVC
                    </span>
                  </div>

                  {/* Package Title */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                    {pkg.title}
                  </h3>

                  {/* Channel List Items */}
                  <div className="space-y-2 mb-6">
                    {pkg.channels.map((ch) => (
                      <div
                        key={ch}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-100 text-sm font-medium text-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Play className="w-3.5 h-3.5 text-[#0088cc] fill-[#0088cc] shrink-0" />
                          <span className="truncate">{ch}</span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 shrink-0 bg-slate-200/70 px-2 py-0.5 rounded">
                          4K UHD
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openTrialModal()}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-[#0088cc] text-white transition-colors cursor-pointer shadow-xs hover:shadow"
                  >
                    <span>Stream These Channels</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-slate-50 rounded-3xl border border-slate-200/80">
            <Radio className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">
              No packages matching "{searchQuery}"
            </h3>
            <p className="text-sm text-slate-600 mt-2 mb-6">
              Over 25,480 channels are broadcasting live. Clear your search or choose "All Categories" to see all packages.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center justify-center bg-[#0088cc] hover:bg-[#0077b5] text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          5. WHY STREAM WITH FORESTIPTV — 3 PASTEL FEATURE CARDS (Home DNA)
         ========================================================================= */}
      <section className="gsap-channels-features-section w-full bg-[#f8fafc]/80 py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Broadcasting Technology Built for Sports & Cinema
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Every channel stream is delivered through our private high-bandwidth CDN network with anti-freeze load balancing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[1140px] mx-auto">
            {/* Card 1: 4K 60FPS */}
            <div className="gsap-channels-feature-card w-full rounded-[24px] p-8 sm:p-9 flex flex-col justify-start relative overflow-hidden bg-[#fff0f4] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-48 h-48 rounded-full bg-[#fce0e8] absolute -top-10 -right-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#ff7070] mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  Ultra HD 4K 60FPS Sports
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Experience every Premier League goal, UFC knockout, and Formula 1 race in uncompressed 60 frames-per-second broadcast quality with zero motion blur.
                </p>
              </div>
            </div>

            {/* Card 2: 7-Day EPG */}
            <div className="gsap-channels-feature-card w-full rounded-[24px] p-8 sm:p-9 flex flex-col justify-start relative overflow-hidden bg-[#f0f7fe] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-48 h-48 rounded-full bg-[#dbeafe] absolute -top-10 -right-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#0088cc] mb-6">
                  <Tv className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  7-Day Interactive EPG Guide
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Never miss your favorite show. Our Electronic Program Guide updates automatically every 24 hours, giving you a full 7-day schedule across all major networks.
                </p>
              </div>
            </div>

            {/* Card 3: Multi-Language */}
            <div className="gsap-channels-feature-card w-full rounded-[24px] p-8 sm:p-9 flex flex-col justify-start relative overflow-hidden bg-[#f8f3ff] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-48 h-48 rounded-full bg-[#ede4fd] absolute -top-10 -right-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-purple-600 mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                  Multi-Language Audio & Subtitles
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Switch between English, Spanish, French, German, and Arabic commentary seamlessly with dual-audio track support and instant closed captioning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CHANNEL FREQUENTLY ASKED QUESTIONS (Matching Home Accordion Style)
         ========================================================================= */}
      <section className="gsap-channels-faq-section w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Channel & Broadcast FAQs
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Common questions regarding our channel lineup, sports transponders, and EPG schedules.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {channelFaqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="gsap-channels-faq-item bg-[#f0f4f8] hover:bg-[#e9eff6] rounded-xs sm:rounded-sm transition-colors duration-150 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4 sm:py-5 px-6 sm:px-8 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span className="text-[16px] sm:text-[17.5px] font-medium text-slate-900 leading-snug">
                      {item.q}
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
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-5 pt-1.5 text-slate-600 text-[15px] sm:text-[16px] leading-relaxed border-t border-slate-200/60">
                        {item.a}
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
          7. BOTTOM CTA BANNER (High-Converting Gradient Box)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-[#0088cc] to-blue-700 text-white p-8 sm:p-12 lg:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Instant 60-Second Automated Delivery
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Stream 25,000+ Channels in 4K?
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
              Get instant automated activation. Zero contracts, no expensive cable boxes, and a 7-day unconditional money-back guarantee.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
            >
              ORDER IPTV PASS
            </Link>
            <button
              type="button"
              onClick={() => openTrialModal()}
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-7 py-4 rounded-xl border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
            >
              REQUEST 24H TRIAL
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Channels;
