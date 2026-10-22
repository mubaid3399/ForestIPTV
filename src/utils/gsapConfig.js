import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Safely register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Set default animation easing and defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.7,
  });
}

export { gsap, ScrollTrigger, useGSAP };
