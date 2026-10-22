import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../utils/gsapConfig';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // Instant scroll to top on route change to prevent ScrollTrigger race conditions
    window.scrollTo(0, 0);

    // Give the DOM a frame to settle, then refresh ScrollTrigger positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
