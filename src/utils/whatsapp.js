import { APP_CONFIG } from './constants';

/**
 * Extracts digits from the phone number for the wa.me link.
 */
export const getCleanWhatsAppNumber = () => {
  return APP_CONFIG.whatsappNumber ? APP_CONFIG.whatsappNumber.replace(/[^0-9]/g, '') : '15557894788';
};

/**
 * Builds a direct WhatsApp URL with encoded message text.
 */
export const createWhatsAppUrl = (messageText) => {
  const number = getCleanWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
};

/**
 * Formats a support ticket query into a professional WhatsApp message URL.
 */
export const buildContactQueryUrl = ({ name, email, phone, subject, message }) => {
  const text = [
    `👋 *Hello ForestIPTV Support!*`,
    ``,
    `I would like to submit an inquiry from your website:`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${name || 'N/A'}`,
    `✉️ *Email:* ${email || 'N/A'}`,
    `📱 *Phone / WhatsApp:* ${phone || 'Not provided'}`,
    `📌 *Topic:* ${subject || 'General Inquiry'}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📝 *Message:*`,
    `${message || 'No additional message provided.'}`,
    ``,
    `Please assist me at your earliest convenience. Thank you!`
  ].join('\n');

  return createWhatsAppUrl(text);
};

/**
 * Formats a trial / plan activation query into a professional WhatsApp message URL.
 */
export const buildActivationQueryUrl = ({ plan, email, device }) => {
  const planTitle = plan ? `${plan.name} ($${plan.price})` : '24-Hour Free Demo Pass';
  
  const text = [
    `⚡ *New IPTV Pass Activation Request*`,
    ``,
    `Hello ForestIPTV, I am requesting my credentials from your website:`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Selected Plan:* ${planTitle}`,
    `✉️ *My Email:* ${email || 'N/A'}`,
    `📺 *Streaming Hardware:* ${device || 'Amazon Firestick'}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Please dispatch my M3U Playlist link and Xtream API login keys. Thank you!`
  ].join('\n');

  return createWhatsAppUrl(text);
};
