import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, Sparkles, MessageCircle, Mail, Tv } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { SUPPORTED_DEVICES, APP_CONFIG } from '../../utils/constants';
import { buildActivationQueryUrl } from '../../utils/whatsapp';

export const Modal = () => {
  const { isTrialModalOpen, closeTrialModal, selectedPlan, showNotification } = useApp();
  const [email, setEmail] = useState('');
  const [device, setDevice] = useState('Amazon Firestick');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappActivationUrl, setWhatsappActivationUrl] = useState('');

  if (!isTrialModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Generate pre-filled WhatsApp activation URL
    const waUrl = buildActivationQueryUrl({ plan: selectedPlan, email, device });
    setWhatsappActivationUrl(waUrl);

    // Launch WhatsApp directly in a new tab/window
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked, WhatsApp link available on screen', err);
    }

    setIsSubmitted(true);
    showNotification('Activation formatted! Opening WhatsApp to send your request.');
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    closeTrialModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Soft Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog Box matching ForestIPTV Light UI */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 font-sans text-left">
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0088cc] via-[#ff7070] to-emerald-500" />

        {/* Soft Pastel Ambient Glows in Card Background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#efe7fc]/70 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#ffeedc]/70 rounded-full blur-2xl pointer-events-none" />

        {/* Circular Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer shadow-2xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative p-6 sm:p-8 z-10">
          {!isSubmitted ? (
            <>
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-bold text-emerald-700">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {selectedPlan ? 'Instant Plan Activation' : '24-Hour Free Demo Pass'}
                </span>

                {selectedPlan && (
                  <span className="text-xs font-bold text-[#0088cc] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    ${selectedPlan.price} One-Time
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight mb-2 leading-snug">
                {selectedPlan ? `Activate: ${selectedPlan.name}` : 'Request 24H Free Stream Access'}
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Receive your instant M3U playlist URL and Xtream API login credentials to stream 25,000+ live 4K channels on your hardware.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Target Hardware
                  </label>
                  <div className="relative">
                    <Tv className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-[#0088cc] focus:ring-4 focus:ring-[#0088cc]/10 shadow-xs transition-all cursor-pointer"
                    >
                      {SUPPORTED_DEVICES.map((d) => (
                        <option key={d.name} value={d.name} className="text-slate-900">
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Coral Action Button matching Home & Pricing */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold tracking-wider uppercase text-white bg-[#ff7070] hover:bg-[#ff5757] active:bg-[#f04848] shadow-md shadow-red-200/60 hover:shadow-lg transition-all duration-200 cursor-pointer text-sm sm:text-base select-none"
                  >
                    <span>GENERATE PASS CREDENTIALS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>No credit card required for trial • Automated 60s delivery</span>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Credentials Dispatched!
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your IPTV playlist URL and Xtream API login keys were generated and sent to:
                </p>
                <div className="pt-2">
                  <span className="inline-block font-semibold text-[#0088cc] bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-lg text-sm">
                    {email}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-4">
                <a
                  href={whatsappActivationUrl || APP_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Activation Request on WhatsApp →</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full inline-flex items-center justify-center py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Dismiss Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
