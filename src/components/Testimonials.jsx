import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Testimonials.css';

const TESTIMONIALS = [
    {
        quote: "The level of engineering precision Philux brought to our facility's security infrastructure is unmatched in the region.",
        name: "[Client Name]",
        org: "National Logistics Hub",
        service: "Integrated Security",
        img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "Transitioning our manufacturing plant to Philux solar solutions reduced our operational downtime to absolute zero.",
        name: "[Client Name]",
        org: "Apex Manufacturing",
        service: "Solar & Inverter",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
    },
    {
        quote: "From initial consultation to final integration, their team demonstrated an extraordinary understanding of modern access control.",
        name: "[Client Name]",
        org: "Horizon Corporate Towers",
        service: "Access Control",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
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
