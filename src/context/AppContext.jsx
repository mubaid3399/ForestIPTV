import React, { createContext, useState, useEffect } from 'react';
import { PRICING_PLANS } from '../data/pricingData';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(PRICING_PLANS[3]); // default to 12-month best value
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [notification, setNotification] = useState(null);

  const openTrialModal = (plan = null) => {
    if (plan) setSelectedPlan(plan);
    setIsTrialModalOpen(true);
  };

  const closeTrialModal = () => {
    setIsTrialModalOpen(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = {
    selectedPlan,
    setSelectedPlan,
    isTrialModalOpen,
    openTrialModal,
    closeTrialModal,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currency,
    setCurrency,
    notification,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
