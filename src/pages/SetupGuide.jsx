import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Tv,
  Monitor,
  Smartphone,
  Laptop,
  Check,
  Copy,
  MessageSquare,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronRight,
  Plus,
  KeyRound,
  Download,
  Flame,
  ArrowRight
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';
import { asset } from '../assets/asset';
import { useApp } from '../hooks/useApp';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const SetupGuide = () => {
  const { showNotification } = useApp();
  const [activeDevice, setActiveDevice] = useState('firestick');
  const [copiedKey, setCopiedKey] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-guide-hero-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' }
    )
      .fromTo(
        '.gsap-guide-hero-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-guide-hero-cta',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-guide-hero-trust',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-guide-hero-card',
        { y: 25, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, clearProps: 'all' },
        '-=0.5'
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

    // Device selector tabs stagger
    gsap.fromTo(
      '.gsap-device-tab',
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-device-tabs-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Installation Console
    gsap.fromTo(
      '.gsap-install-console',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '#installation-console',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // 3 Feature Cards
    gsap.fromTo(
      '.gsap-guide-feature-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-guide-features-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Setup FAQs
    gsap.fromTo(
      '.gsap-guide-faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-guide-faq-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // CTA Banner
    gsap.fromTo(
      '.gsap-guide-cta-banner',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-guide-cta-banner',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const copyToClipboard = (text, key, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (showNotification) {
      showNotification(`${label} copied to clipboard!`);
    }
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const deviceGuides = {
    firestick: {
      id: 'firestick',
      title: 'Amazon Firestick',
      fullTitle: 'Amazon Fire TV Stick & Fire TV Cube',
      tagline: 'Compatible with Firestick 4K, 4K Max, Lite & Fire TV 4K Cube',
      icon: Tv,
      image: asset.firestick,
      badge: 'Most Popular',
      recommendedApp: 'IPTV Smarters Pro',
      alternativeApp: 'TiviMate IPTV',
      setupTime: '~3 Minutes',
      downloaderCode: '78522',
      apkUrl: 'https://www.iptvsmarters.com/smarters.apk',
      steps: [
        {
          title: 'Install the Downloader App',
          desc: 'From your Fire TV Home screen, go to Find > Search. Type "Downloader", select the official orange Downloader app icon, and click Download / Get.',
          highlight: 'Find > Search > Downloader',
        },
        {
          title: 'Enable Unknown Sources in Fire TV Settings',
          desc: 'Navigate to Settings > My Fire TV > Developer Options. Ensure "Install Unknown Apps" or "Apps from Unknown Sources" is toggled ON for Downloader.',
          highlight: 'Settings > My Fire TV > Developer Options',
        },
        {
          title: 'Download IPTV Smarters Pro via Code 78522',
          desc: 'Open Downloader, enter the quick shortcode 78522 in the URL field and click "Go". Once the download finishes, select "Install" and then "Open".',
          code: '78522',
          codeLabel: 'Downloader Code',
        },
        {
          title: 'Select "Login with Xtream Codes API"',
          desc: 'When the player launches, accept terms and click "Login with Xtream Codes API". This format guarantees 7-day EPG TV schedules and categorized channels.',
          highlight: 'Login with Xtream Codes API',
        },
        {
          title: 'Enter Your ForestIPTV Account Info',
          desc: 'Fill in Any Name (e.g. ForestIPTV), followed by your assigned Username, Password, and Server Portal URL sent to your email or WhatsApp message.',
          hasCredentials: true,
        },
        {
          title: 'Enjoy Buffer-Free 4K Streaming',
          desc: 'Click "Add User". Your 25,000+ live channels, VOD movies, and PPV sports will synchronize automatically in seconds. You are all set!',
        },
      ],
    },
    android: {
      id: 'android',
      title: 'Android & Google TV',
      fullTitle: 'Android TV, Google TV & Android Boxes',
      tagline: 'Compatible with Nvidia Shield, Mi Box, Sony/TCL/Philips Google TVs & Phones',
      icon: Smartphone,
      image: asset.androidTv,
      badge: 'Play Store App',
      recommendedApp: 'IPTV Smarters Pro',
      alternativeApp: 'TiviMate / XCIPTV',
      setupTime: '~2 Minutes',
      downloaderCode: '78522',
      steps: [
        {
          title: 'Open the Google Play Store',
          desc: 'On your Android TV or Android mobile device, open the official Google Play Store from your application dashboard.',
          highlight: 'Google Play Store',
        },
        {
          title: 'Install IPTV Smarters Pro or XCIPTV',
          desc: 'Search for "IPTV Smarters Pro" (or "XCIPTV") and click Install. Both players support hardware-accelerated 4K 60FPS playback.',
          highlight: 'IPTV Smarters Pro',
        },
        {
          title: 'Launch App & Select Xtream Codes',
          desc: 'Open the installed player and choose "Add User" followed by "Login with Xtream Codes API".',
          highlight: 'Login with Xtream Codes API',
        },
        {
          title: 'Input Your Assigned Credentials',
          desc: 'Type ForestIPTV as the profile name, then input your Username, Password, and Portal URL as provided in your activation message.',
          hasCredentials: true,
        },
        {
          title: 'Synchronize 25,000+ Channels',
          desc: 'Tap "Log In". Your live channels, electronic program guide (EPG), and on-demand movies will load within 30 seconds.',
        },
      ],
    },
    apple: {
      id: 'apple',
      title: 'Apple TV & iOS',
      fullTitle: 'Apple TV 4K, iPhone & iPad',
      tagline: 'Compatible with Apple TV 4K (tvOS), iPhone 11-16, iPad & Apple Silicon Macs',
      icon: Tv,
      image: asset.appleTv,
      badge: 'Retina 4K Support',
      recommendedApp: 'Smarters Player Lite',
      alternativeApp: 'IPTVX / GSE Smart IPTV',
      setupTime: '~3 Minutes',
      steps: [
        {
          title: 'Open the Apple App Store',
          desc: 'On your Apple TV 4K, iPhone, or iPad, open the native Apple App Store.',
          highlight: 'Apple App Store',
        },
        {
          title: 'Install Smarters Player Lite',
          desc: 'Search for "Smarters Player Lite" (free on App Store) or "IPTVX" and press "Get" to download and install.',
          highlight: 'Smarters Player Lite',
        },
        {
          title: 'Select Xtream Codes API Profile',
          desc: 'Open the app, agree to terms, and choose "Login with Xtream Codes API".',
          highlight: 'Login with Xtream Codes API',
        },
        {
          title: 'Fill In Your Account Details',
          desc: 'Enter "ForestIPTV" as Name, followed by your assigned Username, Password, and Portal URL.',
          hasCredentials: true,
        },
        {
          title: 'Stream with Apple AVPlayer Decoding',
          desc: 'Tap "Add User". Enjoy ultra-smooth hardware-accelerated playback with Dolby Audio and instant channel switching.',
        },
      ],
    },
    smarttv: {
      id: 'smarttv',
      title: 'Smart TV (Samsung & LG)',
      fullTitle: 'Samsung Tizen & LG webOS Smart TVs',
      tagline: 'Compatible with all Samsung (2017+) and LG (webOS 3.0+) televisions',
      icon: Monitor,
      image: asset.smartTv,
      badge: 'No Box Required',
      recommendedApp: 'IBO Player',
      alternativeApp: 'Smart IPTV (SIPTV) / Nanomid',
      setupTime: '~4 Minutes',
      steps: [
        {
          title: 'Open the Smart TV App Store',
          desc: 'Press the Home button on your TV remote and navigate to the Samsung Smart Hub App Store or LG Content Store.',
          highlight: 'Samsung Smart Hub / LG Content Store',
        },
        {
          title: 'Install IBO Player (Recommended)',
          desc: 'Search for "IBO Player" or "Smart IPTV" and click Install directly on your TV.',
          highlight: 'IBO Player',
        },
        {
          title: 'Note Down Your TV MAC Address & Device Key',
          desc: 'Launch IBO Player. Your TV MAC Address (e.g., 00:1A:79:...) and Device Key will appear prominently on screen.',
          highlight: 'MAC Address & Device Key',
        },
        {
          title: 'Send MAC to Our WhatsApp Desk (Instant Sync)',
          desc: 'Send your TV MAC Address directly to our WhatsApp support technician. Our automated server binds and uploads your playlist in under 120 seconds.',
          hasWhatsAppHelp: true,
        },
        {
          title: 'Restart App and Start Watching',
          desc: 'Restart IBO Player on your television. All live channel groups, sports leagues, and movies will be fully synchronized.',
        },
      ],
    },
    pc: {
      id: 'pc',
      title: 'Windows PC & Mac',
      fullTitle: 'Windows 11 / 10 & macOS Workstations',
      tagline: 'Compatible with Windows desktop/laptops, MacBooks, iMacs & Web Browsers',
      icon: Laptop,
      image: asset.windowsPc,
      badge: 'Desktop 4K',
      recommendedApp: 'IPTV Smarters Desktop',
      alternativeApp: 'VLC Media Player',
      setupTime: '~2 Minutes',
      steps: [
        {
          title: 'Download Desktop Player or VLC',
          desc: 'Download IPTV Smarters for Windows (.exe) or Mac (.dmg). Alternatively, install VLC Media Player for lightweight streaming.',
          highlight: 'IPTV Smarters for Desktop',
        },
        {
          title: 'Run the Setup & Launch Application',
          desc: 'Open the downloaded file and complete the quick installation process on your PC or Mac.',
        },
        {
          title: 'Authenticate with Xtream Codes API',
          desc: 'Select "Login with Xtream Codes API" (or in VLC: Media > Open Network Stream and paste your M3U link).',
          hasCredentials: true,
        },
        {
          title: 'Enjoy Full HD & 4K on Your Monitor',
          desc: 'Browse categories, search channels, or watch in picture-in-picture mode while multitasking on your computer.',
        },
      ],
    },
  };

  const current = deviceGuides[activeDevice];

  const guideFaqs = [
    {
      q: 'Where do I find my ForestIPTV login credentials?',
      a: 'Immediately after your order or free trial request is processed, our system automatically sends your username, password, server portal URL, and M3U playlist link to your email and WhatsApp.',
    },
    {
      q: 'Can I use my subscription across multiple devices?',
      a: 'Yes! You can configure your credentials on multiple devices (e.g. Firestick in the living room and phone on the go). Note: standard single-connection plans stream on 1 active screen at a time. Multi-room plans allow simultaneous streaming.',
    },
    {
      q: 'What should I do if channels buffer or freeze?',
      a: 'ForestIPTV uses high-capacity anti-freeze routing. If buffering occurs: (1) Restart your router and streaming device, (2) Switch player buffer size from Normal to High in Smarters settings, or (3) Connect your TV via Ethernet cable instead of 2.4GHz Wi-Fi.',
    },
    {
      q: 'Do I need a VPN to stream IPTV Forest?',
      a: 'In most cases, no VPN is required as our streams are encrypted with SSL. However, if your ISP blocks IPTV during major football matches, a premium VPN (like ExpressVPN or NordVPN) ensures uninterrupted playback.',
    },
    {
      q: 'How do I refresh or update the EPG (TV Guide)?',
      a: 'In IPTV Smarters Pro or TiviMate, go to Settings > EPG / TV Guide and click "Update EPG" or "Refresh Playlist". It updates all schedules for the next 7 days in seconds.',
    },
  ];

  const guideSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        name: 'How to Install ForestIPTV on Amazon Firestick',
        description:
          'Step-by-step walkthrough to install IPTV Smarters Pro and activate ForestIPTV on Fire TV Stick in under 3 minutes.',
        totalTime: 'PT3M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Install Downloader',
            text: 'From your Fire TV Home screen, go to Find > Search. Type "Downloader" and install the orange app.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enable Developer Options',
            text: 'Go to Settings > My Fire TV > Developer Options. Toggle "Install Unknown Apps" to ON for Downloader.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Code 78522',
            text: 'Launch Downloader, enter quick code 78522 in the URL bar, download and install IPTV Smarters Pro.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Login & Stream',
            text: 'Open IPTV Smarters Pro, enter your ForestIPTV credentials (Username, Password, Server URL), and click Add User.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: guideFaqs.map((faq) => ({
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
        title="How to Setup IPTV on Firestick, Smart TV, Android & iOS | ForestIPTV Guide"
        description="Step-by-step setup guides to install ForestIPTV on Amazon Firestick, Smart TV, Android TV, Apple TV, PC, and MAG in under 3 minutes with zero buffering."
        keywords="IPTV setup guide, install IPTV Firestick, IPTV Smarters Pro setup, Downloader code IPTV, Fire TV IPTV, Smart TV IPTV setup, TiviMate setup, Forest IPTV guide"
        canonicalPath="/setup"
        jsonLd={guideSchema}
      />

      {/* =========================================================================
          1. HERO SECTION (2-Column Layout, 100% Home Page DNA)
         ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#efe7fc] via-[#ffffff] to-[#ffeedc] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24">
        {/* Soft pastel ambient glow blobs */}
        <div className="gsap-glow-1 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#d8b4fe]/30 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
        <div className="gsap-glow-2 absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#fdba74]/35 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/70 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Heading, Copy & Action Buttons */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">

              {/* Main Headline */}
              <h1 className="gsap-guide-hero-title text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.18]">
                Stream <span className="text-[#0088cc]">ForestIPTV</span> on Any Screen in Under 3 Minutes
              </h1>

              {/* Description */}
              <p className="gsap-guide-hero-text text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal">
                Follow our visual, step-by-step installation walkthroughs to configure IPTV Forest on your Amazon Firestick, Smart TV, Android Box, Apple TV, or Windows PC. Get instant access to 25,000+ live 4K channels with zero technical complications.
              </p>

              {/* Action Buttons */}
              <div className="gsap-guide-hero-cta flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] text-white font-bold tracking-wider uppercase px-9 py-4 sm:py-4.5 rounded-lg shadow-md shadow-red-200/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  BUY IPTV PLAN
                </Link>
              </div>

              {/* Clean 3-Item Trust Bar */}
              <div className="gsap-guide-hero-trust pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  25,000+ Channels Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Ultra HD 4K 60FPS
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Anti-Freeze Servers
                </span>
              </div>
            </div>

            {/* Right Column: Hero Device Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="gsap-guide-hero-card w-full max-w-md bg-white rounded-lg p-3.5 sm:p-4 shadow-2xl shadow-purple-900/10 border border-slate-200/80 relative">
                {/* Image Frame */}
                <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.fullTitle}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {current.badge}
                    </span>
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-sm font-bold tracking-tight">{current.fullTitle}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Recommended: {current.recommendedApp}</div>
                  </div>
                </div>

                {/* Micro Quick Specs Below Hero Image */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Setup Duration</span>
                    <span className="text-xs font-bold text-slate-800">{current.setupTime}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Protocol</span>
                    <span className="text-xs font-bold text-[#0088cc]">Xtream Codes API</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. DEVICE SELECTOR (Bespoke 5-Card Grid, Perfectly Balanced)
         ========================================================================= */}
      <section className="gsap-device-tabs-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Select Your Streaming Device
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base">
            Click your platform below to reveal verified, step-by-step instructions.
          </p>
        </div>

        {/* 5-Device Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {Object.entries(deviceGuides).map(([key, item]) => {
            const Icon = item.icon;
            const isActive = activeDevice === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setActiveDevice(key);
                  const guideElem = document.getElementById('installation-console');
                  if (guideElem) {
                    guideElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`gsap-device-tab group text-left rounded-2xl p-3.5 sm:p-4 transition-colors duration-200 cursor-pointer border flex flex-col justify-between ${isActive
                  ? 'bg-white border-[#0088cc] shadow-lg shadow-blue-500/15 ring-2 ring-[#0088cc]/20 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-sm'
                  }`}
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-200/60 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isActive && (
                      <span className="absolute top-1.5 right-1.5 text-[10px] font-bold bg-[#0088cc] text-white px-2 py-0.5 rounded-full shadow-xs">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0088cc]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.setupTime}</span>
                  </div>

                  <h3 className={`font-bold text-sm sm:text-[15px] tracking-tight ${isActive ? 'text-[#0088cc]' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 truncate">{item.recommendedApp.split(' ')[0]}</span>
                  <span className={`transition-transform duration-200 ${isActive ? 'text-[#0088cc] translate-x-0.5' : 'text-slate-400'}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. INSTALLATION CONSOLE (Bespoke 2-Column Console Layout)
         ========================================================================= */}
      <section id="installation-console" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="gsap-install-console bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12">

          {/* Top Console Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0088cc] uppercase tracking-wider">
                  Step-by-Step Installation
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500">
                  {current.setupTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                How to Set Up on {current.fullTitle}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {current.tagline}
              </p>
            </div>

            <a
              href={APP_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1e8f49] text-xs font-bold px-4 py-2.5 rounded-lg border border-[#25D366]/30 transition-colors self-start sm:self-center shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Need Remote Help?</span>
            </a>
          </div>

          {/* 2-Column Main Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column (lg:col-span-5): Photo & Quick Credentials Box */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

              {/* Photo Frame in Natural 16:9 Aspect Ratio */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-md bg-slate-950">
                <img
                  src={current.image}
                  alt={current.fullTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Recommended Application
                  </div>
                  <div className="text-lg font-bold">
                    {current.recommendedApp}
                  </div>
                </div>
              </div>

              {/* Xtream API Credentials Quick Card */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <KeyRound className="w-3.5 h-3.5 text-[#0088cc]" />
                    Xtream Codes API Format
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Profile Name</span>
                    <span className="font-bold text-slate-800">ForestIPTV</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Username</span>
                    <span className="font-bold text-slate-800">[Sent via Email / WhatsApp]</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Password</span>
                    <span className="font-bold text-slate-800">[Sent via Email / WhatsApp]</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Server Portal URL</span>
                      <span className="font-bold text-slate-800 font-mono text-xs">http://line.foreststream.net:80</span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard('http://line.foreststream.net:80', 'server', 'Server URL')
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0088cc] hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                    >
                      {copiedKey === 'server' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Downloader Quick Code (if applicable) */}
                {current.downloaderCode && (
                  <div className="pt-1">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-amber-700" />
                        <div>
                          <div className="text-[10px] font-bold text-amber-700 uppercase">Downloader Code</div>
                          <div className="text-sm font-mono font-bold text-slate-900">{current.downloaderCode}</div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(current.downloaderCode, 'code', 'Downloader Code')
                        }
                        className="text-xs font-bold text-amber-900 bg-white hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        {copiedKey === 'code' ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column (lg:col-span-7): Numbered Steps Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                {current.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 text-left"
                  >
                    {/* Number Badge */}
                    <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-blue-500/20">
                      {idx + 1}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 space-y-1.5">
                      <div className="text-base font-bold text-slate-900 tracking-tight">
                        {step.title}
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {step.desc}
                      </p>

                      {/* Highlight Tag */}
                      {step.highlight && (
                        <div className="pt-1.5">
                          <span className="inline-block text-xs font-mono font-medium text-slate-700 bg-slate-100 border border-slate-200/90 px-2.5 py-1 rounded-md">
                            {step.highlight}
                          </span>
                        </div>
                      )}

                      {/* Code Pill */}
                      {step.code && (
                        <div className="pt-2 flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                            Code: {step.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(step.code, 'step-code', 'Downloader code')}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0088cc] hover:underline cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                      )}

                      {/* WhatsApp Help Button in Step 4 for Smart TV */}
                      {step.hasWhatsAppHelp && (
                        <div className="pt-2">
                          <a
                            href={APP_CONFIG.whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Send TV MAC on WhatsApp</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clean Bottom Assistance Bar */}
              <div className="rounded-2xl p-5 bg-[#f0f7fe] border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block sm:inline">Stuck or need verification? </strong>
                  Our technical operators will activate or configure your stream on live chat.
                </div>
                <a
                  href={APP_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs transition-colors shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat With Technician</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. WHY SETUP WITH FORESTIPTV IS EFFORTLESS (100% Home Page DNA: 3 Pastel Cards)
         ========================================================================= */}
      <section className="gsap-guide-features-section w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Setup with ForestIPTV is Effortless
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              We engineered our streaming architecture so you can sit back and enjoy crystal-clear live television without complex configurations.
            </p>
          </div>

          {/* 3 Pastel Cards (Exact dimensions and styling as Home page) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 justify-items-center max-w-[1140px] mx-auto">

            {/* Card 1: Instant Auto-Activation */}
            <div className="gsap-guide-feature-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#fff0f4] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-52 h-52 rounded-full bg-[#fce0e8] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#fce0e8] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.accessIcon}
                  alt="Instant Activation"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  Instant Auto-Activation
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  No waiting around. The moment your subscription or free trial is confirmed, your credentials and pre-built playlists are dispatched instantly via automated email.
                </p>
              </div>
            </div>

            {/* Card 2: 4K & Anti-Freeze Hardware */}
            <div className="gsap-guide-feature-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f0f7fe] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-52 h-52 rounded-full bg-[#dbeafe] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#dbeafe] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.qualityIcon}
                  alt="Anti-Freeze Streaming"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  Anti-Freeze Streaming
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  Our streams support H.265 video compression and hardware acceleration, delivering true 60FPS sports and cinema with zero stutter on standard home broadband.
                </p>
              </div>
            </div>

            {/* Card 3: 24/7 Human Setup Support */}
            <div className="gsap-guide-feature-card group w-full max-w-[360px] min-h-[460px] rounded-[24px] p-9 sm:p-10 flex flex-col justify-start relative overflow-hidden bg-[#f8f3ff] shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
              <div className="w-52 h-52 rounded-full bg-[#ede4fd] absolute -top-10 -right-10 pointer-events-none" />
              <div className="w-56 h-56 rounded-full bg-[#ede4fd] absolute -bottom-24 -left-6 pointer-events-none" />

              <div className="relative z-10 flex flex-col">
                <img
                  src={asset.supportIcon}
                  alt="24/7 Support"
                  className="w-[74px] h-[74px] rounded-full object-contain mb-8 [filter:hue-rotate(130deg)_saturate(1.2)]"
                />
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mb-4">
                  24/7 Human Support
                </h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-[1.65] font-normal">
                  Never get stranded with an error code. Our technical support operators are active 24/7 on WhatsApp and Telegram to troubleshoot any device in real-time.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SETUP FAQS (Exact 100% Home Page FAQ DNA)
         ========================================================================= */}
      <section className="gsap-guide-faq-section w-full bg-white py-16 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Setup Questions
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl mx-auto">
              Find instant answers to common IPTV player setup questions.
            </p>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {guideFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="gsap-guide-faq-item rounded-[14px] bg-[#f0f4f8] overflow-hidden transition-colors duration-200"
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
          6. BOTTOM CALL TO ACTION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-guide-cta-banner relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#18181B] via-[#232329] to-[#18181B] text-white p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          {/* Subtle ambient glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0088cc]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff7070]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0088cc] bg-blue-950/80 border border-blue-800 px-3.5 py-1.5 rounded-full inline-block">
              24/7 Activation Guaranteed
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Television Experience?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Order your subscription today with instant delivery or contact our live operator team for personalized device setup.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center bg-[#ff7070] hover:bg-[#ff5757] text-white font-bold tracking-wider uppercase px-8 py-4 rounded-lg shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                VIEW SUBSCRIPTION PLANS
              </Link>
              <a
                href={APP_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-7 py-4 rounded-lg border border-zinc-700 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Talk with an Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SetupGuide;
