import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  Headset,
  Check,
  Plus,
  User,
  Phone,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';
import { useApp } from '../hooks/useApp';
import { buildContactQueryUrl } from '../utils/whatsapp';
import { gsap, useGSAP } from '../utils/gsapConfig';
import SEO from '../components/SEO';

export const Contact = () => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappQueryUrl, setWhatsappQueryUrl] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.gsap-contact-badge',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' }
    )
      .fromTo(
        '.gsap-contact-title',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-contact-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' },
        '-=0.4'
      )
      .fromTo(
        '.gsap-contact-hero-cta',
        { y: 15, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, clearProps: 'all' },
        '-=0.3'
      )
      .fromTo(
        '.gsap-contact-trust-bar',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
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

    // 3 Support Channel Cards
    gsap.fromTo(
      '.gsap-contact-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-contact-cards-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Ticket Form Card
    gsap.fromTo(
      '.gsap-contact-form-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-contact-form-card',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Contact FAQs
    gsap.fromTo(
      '.gsap-contact-faq-item',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-contact-faq-section',
          start: 'top 85%',
          once: true,
        },
      }
    );

    // Bottom CTA Banner
    gsap.fromTo(
      '.gsap-contact-cta-banner',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.gsap-contact-cta-banner',
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Generate pre-filled WhatsApp link with the user's structured inquiry
    const waUrl = buildContactQueryUrl(formData);
    setWhatsappQueryUrl(waUrl);

    // Launch WhatsApp directly in a new tab/window
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked, WhatsApp link available on screen', err);
    }

    setSubmitted(true);
    showNotification('Inquiry formatted! Opening WhatsApp to send your ticket.');
  };

  const contactFaqs = [
    {
      q: 'How quickly will an operator respond to my support ticket?',
      a: 'For fastest response (< 4 minutes), reach out via our official WhatsApp desk. Ticket submissions sent via this form or direct email are answered by our on-duty technicians within 15–30 minutes, 24 hours a day, 7 days a week.',
    },
    {
      q: 'Can I get live step-by-step assistance setting up my device?',
      a: 'Yes, absolutely! Our support technicians can guide you through installing IPTV Smarters Pro, TiviMate, or IBO Player on your Amazon Firestick, Smart TV, Android box, or Apple TV in real time via WhatsApp or email walkthroughs.',
    },
    {
      q: 'What should I do if I haven’t received my activation credentials?',
      a: 'Activation credentials are automatically sent to your email and WhatsApp within 60 seconds of checkout. If you do not see it in your primary inbox, please check your Spam/Junk folder, or message us directly on WhatsApp with your invoice number for instant re-dispatch.',
    },
    {
      q: 'Can I request custom channel packages or multi-room connections?',
      a: 'Yes! We offer discounted multi-room passes (2 to 5 simultaneous screens) and custom channel playlists. Submit a ticket above selecting "Multi-Room Connection" or chat with our WhatsApp desk for an instant custom quote.',
    },
  ];

  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'ForestIPTV Customer Support & Free Trial Desk',
        description:
          '24/7 dedicated support desk for instant IPTV activation, technical assistance, and trial requests.',
        url: 'https://forestiptvfreetrial.online/contact',
        mainEntity: {
          '@type': 'ContactPoint',
          telephone: '+1-555-789-4788',
          contactType: 'customer service',
          email: 'support@forestiptv.com',
          availableLanguage: ['English', 'Spanish', 'French', 'German', 'Arabic'],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: contactFaqs.map((faq) => ({
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
        title="Contact Support & Instant 24-Hour Free Trial | ForestIPTV Help Desk"
        description="Get in touch with 24/7 ForestIPTV customer care via WhatsApp or ticket. Request your free trial pass, setup assistance, or payment inquiries with instant replies."
        keywords="Forest IPTV contact, Forest IPTV WhatsApp, IPTV customer support, Forest IPTV free trial request, IPTV help desk 24/7, IPTV activation help"
        canonicalPath="/contact"
        jsonLd={contactSchema}
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
            <div className="gsap-contact-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Dedicated Support & Live Operator Desk</span>
            </div>

            {/* Main Headline */}
            <h1 className="gsap-contact-title text-3xl sm:text-4xl lg:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.18]">
              Get in Touch with <span className="text-[#0088cc]">ForestIPTV Support</span>
            </h1>

            {/* Description */}
            <p className="gsap-contact-text text-slate-600 text-base sm:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto">
              Have questions about our subscription plans, need instant activation assistance, or want custom channel allocations? Our team is available 24/7/365 to help you.
            </p>

            {/* Action Buttons */}
            <div className="gsap-contact-hero-cta flex flex-wrap items-center justify-center gap-4 pt-1">
              <a
                href={APP_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CHAT ON WHATSAPP</span>
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center bg-[#0088cc] hover:bg-[#0077b5] text-white font-semibold text-sm px-8 py-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                EXPLORE PLANS
              </Link>
            </div>

            {/* Clean 4-Item Trust Bar */}
            <div className="gsap-contact-trust-bar pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                &lt; 4-Minute Response Time
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                24/7/365 Continuous Shift
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Real Technical Operators
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Multi-Language Assistance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SUPPORT CHANNELS (3-Card Feature Row)
         ========================================================================= */}
      <section className="gsap-contact-cards-section relative -mt-8 sm:-mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* WhatsApp Card */}
          <div className="gsap-contact-card bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                [FASTEST RESPONSE]
              </div>
              <h3 className="text-xl font-bold text-slate-900">WhatsApp Operator Desk</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with our active operators for instant activation, playlist loading, or questions. Average response latency under 4 minutes.
              </p>
            </div>
            <div className="pt-5">
              <a
                href={APP_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs transition-colors"
              >
                <span>Start WhatsApp Chat →</span>
              </a>
            </div>
          </div>

          {/* Email Support Card */}
          <div className="gsap-contact-card bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0088cc] border border-blue-100 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0088cc]">
                [DIRECT EMAIL]
              </div>
              <h3 className="text-xl font-bold text-slate-900">Official Help Desk</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ideal for billing receipts, enterprise multi-room passes, and detailed installation walkthroughs. All emails answered in &lt; 30 minutes.
              </p>
              <div className="font-semibold text-slate-800 text-sm bg-slate-50 py-2 px-3 rounded-lg border border-slate-100 truncate">
                {APP_CONFIG.supportEmail}
              </div>
            </div>
            <div className="pt-5">
              <a
                href={`mailto:${APP_CONFIG.supportEmail}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-slate-900 hover:bg-[#0088cc] text-white transition-colors"
              >
                <span>Send Direct Email →</span>
              </a>
            </div>
          </div>

          {/* 24/7 Coverage Card */}
          <div className="gsap-contact-card bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-transform duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                [OPERATIONAL WINDOW]
              </div>
              <h3 className="text-xl font-bold text-slate-900">24/7/365 Global Shifts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our technicians actively monitor transponder nodes during all major sporting events (Premier League, UEFA, NFL, UFC) to guarantee zero downtime.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 px-3 rounded-lg border border-emerald-100">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Ingest Nodes 100% Operational</span>
              </div>
            </div>
            <div className="pt-5">
              <Link
                to="/pricing"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
              >
                <span>View IPTV Passes →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TICKET DISPATCH SECTION (Light Elevated Form Card)
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="gsap-contact-form-card bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
          {/* Top Decorative Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0088cc] via-[#ff7070] to-emerald-500" />

          <div className="p-7 sm:p-12 lg:p-14">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Dispatch a Support Ticket
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Fill in your inquiry below and an engineer will review your ticket and reply promptly.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      WhatsApp / Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Inquiry Topic
                    </label>
                    <div className="relative">
                      <HelpCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all cursor-pointer"
                      >
                        <option value="General Question">General Specification Question</option>
                        <option value="Device Setup Assistance">Device Setup & M3U Loading</option>
                        <option value="Trial Pass Request">24-Hour Free Demo Request</option>
                        <option value="Multi-Room Connection">Multi-Room Pass (2-5 Screens)</option>
                        <option value="Billing & Renewal">Billing & Renewal Inquiries</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your hardware, preferred streaming app, or question..."
                    className="w-full p-4 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all resize-none"
                  />
                </div>

                {/* Coral CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 py-4 px-9 rounded-xl font-bold tracking-wider uppercase text-white bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] shadow-md shadow-red-200/60 hover:shadow-lg transition-all duration-200 cursor-pointer text-sm sm:text-base select-none"
                  >
                    <Send className="w-4 h-4" />
                    <span>SUBMIT TICKET REQUEST</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Inquiry Formatted & Sent to WhatsApp!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your inquiry has been packaged into WhatsApp. If WhatsApp didn't open automatically, click the button below to chat with our live operator desk now.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={whatsappQueryUrl || APP_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-7 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Question', message: '' });
                    }}
                    className="inline-flex items-center justify-center py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CONTACT FREQUENTLY ASKED QUESTIONS (Home Accordion Style)
         ========================================================================= */}
      <section className="gsap-contact-faq-section w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Frequently Asked Support Questions
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto">
              Quick answers regarding response latency, device setup help, and credential delivery.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {contactFaqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="gsap-contact-faq-item bg-[#f0f4f8] hover:bg-[#e9eff6] rounded-xs sm:rounded-sm transition-colors duration-150 overflow-hidden"
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
          5. BOTTOM HIGH-CONVERTING CTA BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="gsap-contact-cta-banner rounded-3xl bg-gradient-to-r from-emerald-600 via-[#0088cc] to-blue-700 text-white p-8 sm:p-12 lg:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Immediate Setup Assistance
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Need Help Configuring Your Screen?
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed">
              Our technicians can walk you through the setup on your Amazon Firestick, Smart TV, or Android device right now.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href={APP_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>MESSAGE ON WHATSAPP</span>
            </a>
            <Link
              to="/setup"
              className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-7 py-4 rounded-xl border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer"
            >
              VIEW SETUP GUIDES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
