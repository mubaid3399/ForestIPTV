import React, { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Send,
  Clock,
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowUp,
  ArrowRight,
  Check,
  Headset,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';
import { asset } from '../assets/asset';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FOOTER_COLUMNS = [
  {
    title: 'Watch',
    links: [
      { name: 'Subscription plans', to: '/pricing' },
      { name: 'Channels directory', to: '/channels' },
      { name: 'Movies & series', to: '/', hash: 'movies' },
      { name: 'Live sports', to: '/channels' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { name: 'Setup tutorials', to: '/setup' },
      { name: 'Firestick & Fire TV', to: '/setup' },
      { name: 'Smart TV (Samsung, LG, Sony)', to: '/setup' },
      { name: 'Android, iPhone & iPad', to: '/setup' },
      { name: 'Windows & Mac', to: '/setup' },
      { name: 'MAG & Formuler', to: '/setup' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Help desk', to: '/contact' },
      { name: 'FAQ', to: '/', hash: 'faq' },
      { name: 'Refund policy', to: '/refund-policy' },
      { name: 'Terms of service', to: '/terms' },
      { name: 'Privacy policy', to: '/privacy' },
    ],
  },
];

const TRUST_ITEMS = [
  { icon: Zap, title: 'Instant activation', text: 'Credentials sent within minutes' },
  { icon: RefreshCw, title: '7-day refund', text: 'Not happy? We refund you' },
  { icon: Headset, title: '24/7 support', text: 'Real people on WhatsApp & email' },
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Encrypted payments' },
];

const PAYMENT_METHODS = ['PayPal', 'Visa', 'Mastercard', 'Crypto'];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const linkClass =
  'text-sm text-zinc-400 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline underline-offset-4';

const SocialButton = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors duration-200 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
  >
    {children}
  </a>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | done | error

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      return;
    }
    // TODO: connect to your email provider / API endpoint here
    setStatus('done');
    setEmail('');
  };

  if (status === 'done') {
    return (
      <p
        role="status"
        className="flex items-center gap-2 text-sm text-emerald-300"
      >
        <Check className="h-4 w-4" /> You&apos;re subscribed. Watch your inbox for offers.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 p-1.5 pl-5 focus-within:border-emerald-400/60">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Your email address"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'footer-email-error' : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
        >
          Subscribe
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {status === 'error' && (
        <p id="footer-email-error" role="alert" className="mt-2 pl-5 text-xs text-red-400">
          Enter a valid email address, for example name@example.com.
        </p>
      )}
    </form>
  );
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scrolls to a section on the home page, navigating there first if needed.
  const goToSection = useCallback(
    (hash) => {
      const scroll = () =>
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });

      if (location.pathname === '/') {
        scroll();
      } else {
        navigate('/');
        setTimeout(scroll, 350);
      }
    },
    [location.pathname, navigate]
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const renderLink = (item) =>
    item.hash ? (
      <button
        type="button"
        onClick={() => goToSection(item.hash)}
        className={`${linkClass} text-left`}
      >
        {item.name}
      </button>
    ) : (
      <Link to={item.to} className={linkClass}>
        {item.name}
      </Link>
    );

  return (
    <div className="flex w-full justify-center bg-white pb-10 pt-4 sm:pb-16">
      <footer
        className="relative mx-auto w-[92%] max-w-[1440px] overflow-hidden rounded-[28px] border border-white/10 bg-[#18181B] font-sans text-zinc-300 shadow-2xl sm:rounded-[36px]"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Forest IPTV footer
        </h2>

        {/* Soft ambient glow */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />

        <div className="relative z-10 px-6 sm:px-10 lg:px-14">
          {/* ---------- Band 1: call to action ---------- */}
          <div className="flex flex-col gap-8 border-b border-white/10 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Start streaming in minutes
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Choose a plan, get your login details by email, and set up on any
                device. If it doesn&apos;t work for you, you have 7 days to ask for
                a refund.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]"
              >
                View plans
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={APP_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* ---------- Band 2: trust row ---------- */}
          <ul className="grid grid-cols-1 gap-6 border-b border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{title}</span>
                  <span className="block text-[13px] text-zinc-400">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* ---------- Band 3: main grid ---------- */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 lg:grid-cols-12 lg:gap-12">
            {/* Brand + newsletter */}
            <div className="col-span-2 space-y-6 lg:col-span-5">
              <Link to="/" className="inline-block" aria-label="Forest IPTV home">
                <img
                  src={asset.logo}
                  alt="ForestIPTV Free Trial - 25,000+ Channels Streaming Logo"
                  className="h-10 w-auto object-contain sm:h-11"
                />
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Live TV, movies and sports in HD on the devices you already own,
                with a support team that answers when you need help.
              </p>

              <div className="flex items-center gap-3">
                <SocialButton href={APP_CONFIG.whatsappLink} label="Chat with us on WhatsApp">
                  <MessageCircle className="h-[18px] w-[18px]" />
                </SocialButton>
                {APP_CONFIG.telegramLink && (
                  <SocialButton href={APP_CONFIG.telegramLink} label="Message us on Telegram">
                    <Send className="h-[18px] w-[18px]" />
                  </SocialButton>
                )}
                <SocialButton href={`mailto:${APP_CONFIG.supportEmail}`} label="Email support">
                  <Mail className="h-[18px] w-[18px]" />
                </SocialButton>
              </div>

              <div className="pt-2">
                <p className="mb-3 text-sm font-semibold text-white">
                  Get offers and new-channel updates
                </p>
                <NewsletterForm />
              </div>
            </div>

            {/* Link columns */}
            {FOOTER_COLUMNS.map((col, i) => (
              <nav
                key={col.title}
                aria-label={col.title}
                className={`${i === 2 ? 'col-span-2 sm:col-span-1' : 'col-span-1'} lg:col-span-2`}
              >
                <h3 className="mb-5 text-base font-semibold tracking-tight text-white">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((item) => (
                    <li key={item.name}>{renderLink(item)}</li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ---------- Support strip ---------- */}
          <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[13px] text-zinc-400 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <a
              href={`mailto:${APP_CONFIG.supportEmail}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              {APP_CONFIG.supportEmail}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Average response time: under 5 minutes
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              SSL encrypted
            </span>
          </div>

          {/* ---------- Bottom bar ---------- */}
          <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-6 text-xs text-zinc-500 md:flex-row">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Forest IPTV. All rights reserved.
            </p>

            <div
              className="flex items-center gap-3 rounded-full border border-white/5 bg-zinc-900/60 px-4 py-1.5 text-zinc-400"
              aria-label={`Accepted payments: ${PAYMENT_METHODS.join(', ')}`}
            >
              <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{PAYMENT_METHODS.join(' · ')}</span>
            </div>

            <div className="flex items-center gap-5">
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link to="/refund-policy" className="transition-colors hover:text-white">
                Refunds
              </Link>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-emerald-400/50 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;