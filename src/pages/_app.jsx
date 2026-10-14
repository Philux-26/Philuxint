import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Lenis from '@studio-freight/lenis';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GA_TRACKING_ID, META_PIXEL_ID, trackPageView } from '../utils/analytics';
import '../index.css';
import '../components/DeploymentsCarousel.css';
import '../components/FeaturedProjects.css';
import '../components/FinalCta.css';
import '../components/Footer.css';
import '../components/Header.css';
import '../components/Hero.css';
import '../components/HowWeWork.css';
import '../components/Industries.css';
import '../components/IntroSection.css';
import '../components/LocationsMarquee.css';
import '../components/QuoteForm.css';
import '../components/ScrollToTop.css';
import '../components/ServicesInteractive.css';
import '../components/Statistics.css';
import '../components/Testimonials.css';
import '../components/ui/Button.css';
import '../components/WhyPhilux.css';
import './About.css';
import './Blog.css';
import './BlogPost.css';
import './Contact.css';
import './Services.css';
import './Shop.css';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    // Track dynamic route changes for GA4 & Meta Pixel
    useEffect(() => {
        const handleRouteChange = (url) => {
            trackPageView(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <HelmetProvider>
            {/* Google Analytics 4 (Only active when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured) */}
            {GA_TRACKING_ID && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <Script
                        id="google-analytics-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_TRACKING_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </>
            )}

            {/* Meta Pixel (Only active when NEXT_PUBLIC_META_PIXEL_ID is configured) */}
            {META_PIXEL_ID && (
                <>
                    <Script
                        id="meta-pixel-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${META_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                </>
            )}

            <div className="philux-app">
                <Header />
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </HelmetProvider>
    );
}
