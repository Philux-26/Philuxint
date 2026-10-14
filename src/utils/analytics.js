/**
 * Philux International - Conversion & Event Analytics Engine
 * Supports Google Analytics 4 (GA4) and Meta Pixel (Facebook)
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

/**
 * Log page view on route transitions
 */
export const trackPageView = (url) => {
    if (typeof window === 'undefined') return;

    // GA4 Page View
    if (window.gtag && GA_TRACKING_ID) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }

    // Meta Pixel Page View
    if (window.fbq && META_PIXEL_ID) {
        window.fbq('track', 'PageView');
    }
};

/**
 * High-value Lead Conversion Event (Form submissions)
 */
export const trackLeadConversion = ({ service, projectType, location, contactMethod }) => {
    if (typeof window === 'undefined') return;

    // GA4 standard generate_lead event
    if (window.gtag) {
        window.gtag('event', 'generate_lead', {
            event_category: 'Leads',
            event_label: service || 'General Quote',
            service_requested: service,
            project_type: projectType,
            location: location,
            preferred_contact: contactMethod,
            currency: 'NGN',
        });
    }

    // Meta Pixel standard Lead event
    if (window.fbq) {
        window.fbq('track', 'Lead', {
            content_name: service || 'Engineering Quote',
            content_category: projectType,
            currency: 'NGN',
        });
    }
};

/**
 * High-intent Direct Contact Click (WhatsApp, Phone Call)
 */
export const trackContactClick = (channel = 'whatsapp') => {
    if (typeof window === 'undefined') return;

    if (window.gtag) {
        window.gtag('event', 'contact', {
            event_category: 'Engagement',
            event_label: channel,
            method: channel,
        });
    }

    if (window.fbq) {
        window.fbq('trackCustom', 'ContactInitiated', {
            channel: channel,
        });
    }
};
