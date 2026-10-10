import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
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

    return (
        <HelmetProvider>
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
