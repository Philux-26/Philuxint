import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

const SERVICES = [
    { id: '01', title: 'VEHICLE TRACKING', img: '/images/vehicle_tracking.webp' },
    { id: '02', title: 'SOLAR & ENERGY', img: '/images/solar_energy.webp' },
    { id: '03', title: 'CCTV SURVEILLANCE', img: '/images/cctv_surveillance.webp' },
    { id: '04', title: 'ACCESS CONTROL', img: '/images/access_control.webp' },
    { id: '05', title: 'ELECTRIC FENCING', img: '/images/electric_fencing.webp' },
];

const HEADLINES = ["TOTAL PROTECTION.", "SMART SECURITY.", "PEACE OF MIND."];

export const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Preload all hero images in browser memory so slide transitions are instant
        SERVICES.forEach((service) => {
            if (typeof window !== 'undefined') {
                const preloadImg = new window.Image();
                preloadImg.src = service.img;
            }
        });

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % SERVICES.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-backgrounds">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeIndex}
                        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', scale: 1 }}
                        animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1.03 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            clipPath: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
                            scale: { duration: 6, ease: "linear" },
                            opacity: { duration: 1 }
                        }}
                        className="hero-image-layer"
                    >
                        <div className="image-overlay" />
                        <img
                            src={SERVICES[activeIndex].img}
                            alt={SERVICES[activeIndex].title}
                            fetchpriority={activeIndex === 0 ? "high" : "auto"}
                            decoding="async"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="container hero-content-container">
                <div className="hero-content">
                    <h1 className="hero-heading heading-display">
                        {HEADLINES.map((line, i) => (
                            <div key={i} style={{ overflow: 'hidden' }}>
                                <motion.span
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.15), ease: [0.65, 0, 0.05, 1] }}
                                    className="hero-headline-line text-white block"
                                >
                                    {line}
                                </motion.span>
                            </div>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="hero-subtext"
                    >
                        Nigeria&apos;s trusted security services company. We protect homes, offices, estates, and vehicles with reliable CCTV, car tracking, electric fencing, and 24/7 solar backup power.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="hero-actions"
                    >
                        <Button variant="primary" icon="right" href="#quote">Request a Quote</Button>
                        <Button variant="secondary" icon="up-right" href="#services" className="hero-btn-secondary">Explore Our Services</Button>
                    </motion.div>
                </div>
            </div>

            <div className="hero-service-indicator container">
                <div className="indicator-wrapper">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="indicator-text label"
                        >
                            {SERVICES[activeIndex].id} / {SERVICES[activeIndex].title}
                        </motion.div>
                    </AnimatePresence>
                    <div className="indicator-track">
                        {SERVICES.map((srv, idx) => (
                            <div key={srv.id} className="indicator-segment">
                                {idx === activeIndex && (
                                    <motion.div
                                        className="indicator-fill"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 6, ease: "linear" }}
                                    />
                                )}
                                {idx < activeIndex && <div className="indicator-fill full" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
