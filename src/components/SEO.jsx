import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../utils/constants';

/**
 * Production SEO component for ForestIPTV (forestiptvfreetrial.online)
 * Dynamically synchronizes document title, meta tags, OpenGraph, Twitter Cards,
 * canonical links, and JSON-LD structured data schemas.
 */
export const SEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  noindex = false,
  jsonLd = null,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const canonicalUrl = `${APP_CONFIG.siteUrl}${currentPath === '/' ? '' : currentPath}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${APP_CONFIG.siteUrl}${ogImage}`;

  const fullTitle = title.includes('ForestIPTV')
    ? title
    : `${title} | ForestIPTV Free Trial`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to safely set or create a <meta> tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:site_name', 'ForestIPTV Free Trial');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:image', fullOgImage);
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // 6. JSON-LD Dynamic Structured Data
    const scriptId = 'page-jsonld-schema';
    let scriptEl = document.getElementById(scriptId);

    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Clean up injected page-specific schema on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [fullTitle, description, keywords, canonicalUrl, fullOgImage, ogType, noindex, jsonLd]);

  // Support React 19 native head element hoisting
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
    </>
  );
};

export default SEO;
