import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        quote: "Philux installed CCTV cameras and electric fencing for our facility in Lagos. The mobile phone viewing works smoothly and their installation was very neat. We now have total peace of mind.",
        name: "[Client Name]",
        org: "National Logistics Hub",
        service: "CCTV & Electric Fencing",
        img: "/images/testimonials/babatunde.jpg"
    },
    {
        quote: "The solar inverter system installed by Philux powers our security cameras and office operations without interruption. No more blackouts or high diesel costs. Very dependable team.",
        name: "[Client Name]",
        org: "Apex Manufacturing",
        service: "Solar & Inverter Power",
        img: "/images/testimonials/emeka.jpg"
    },
    {
        quote: "We had vehicle trackers and biometric access installed across our corporate fleet and offices. The real-time tracking and gate control work flawlessly. Excellent after-sales service.",
        name: "[Client Name]",
        org: "Horizon Corporate Towers",
        service: "Vehicle Tracking & Access",
        img: "/images/testimonials/hauwa.jpg"
    }
];

export const Testimonials = () => {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <section className="testimonials-section bg-off-white text-graphite">
            <div className="container">

                <div className="testimonials-header">
                    <div className="label text-red">CLIENT EXPERIENCES</div>
                    <h2 className="heading-section mt-4" style={{ maxWidth: '600px', marginTop: '1rem', letterSpacing: '-0.03em' }}>
                        Trust built through every project.
                    </h2>
                </div>

                <div className="testimonials-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="testimonial-card"
                        >
                            <div className="testimonial-text-col">
                                <p className="testimonial-quote">"{TESTIMONIALS[active].quote}"</p>
                                <div className="testimonial-author">
                                    <div className="author-name">{TESTIMONIALS[active].name}</div>
                                    <div className="author-org">{TESTIMONIALS[active].org}</div>
                                    <div className="author-service label">{TESTIMONIALS[active].service}</div>
                                </div>
                            </div>
                            <div className="testimonial-img-col">
                                <div className="testimonial-img-wrapper">
                                    <img src={TESTIMONIALS[active].img} alt="Client" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="testimonials-nav">
                    <div className="test-nav-indicator label" style={{ color: 'var(--color-graphite)' }}>
                        0{active + 1} / 0{TESTIMONIALS.length}
                    </div>
                    <div className="test-nav-progress">
                        <div
                            className="test-nav-progress-fill"
                            style={{ width: `${((active + 1) / TESTIMONIALS.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="test-nav-arrows">
                        <button className="test-nav-btn" onClick={prev} aria-label="Previous Testimonial"><ArrowLeft size={20} /></button>
                        <button className="test-nav-btn" onClick={next} aria-label="Next Testimonial"><ArrowRight size={20} /></button>
                    </div>
                </div>

            </div>
        </section>
    );
};
