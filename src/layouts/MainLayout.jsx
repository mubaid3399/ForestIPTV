import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Modal from '../components/common/Modal';
import { useApp } from '../hooks/useApp';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const MainLayout = () => {
  const { notification } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#0088cc] selection:text-white antialiased">
      <ScrollToTop />
      
      {/* Editorial Micro-Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-zinc-900/90 border border-emerald-500/40 shadow-xl backdrop-blur-md text-xs font-mono animate-in slide-in-from-top-2 duration-200">
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="text-zinc-200">{notification.message}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-0">
        <Outlet />
      </main>

      {/* Instant Pass Modal */}
      <Modal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
