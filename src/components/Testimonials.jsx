import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "Philux installed CCTV cameras and electric fencing for our facility in Lagos. The mobile phone viewing works smoothly and their installation was very neat. We now have total peace of mind.",
        role: "Facility Operations Director",
        org: "National Logistics Hub",
        location: "Ikeja, Lagos",
        service: "CCTV & Electric Fencing",
        initials: "NL",
        img: null // Privacy-first placeholder
    },
    {
        id: 2,
        quote: "The solar inverter system installed by Philux powers our security cameras and office operations without interruption. No more blackouts or high diesel costs. Very dependable team.",
        role: "Plant Infrastructure Lead",
        org: "Apex Manufacturing",
        location: "Ogun Industrial Zone",
        service: "Solar & Inverter Power",
        initials: "AM",
        img: null
    },
    {
        id: 3,
        quote: "We had vehicle trackers and biometric access installed across our corporate fleet and offices. The real-time tracking and gate control work flawlessly. Excellent after-sales service.",
        role: "Fleet & Security Manager",
        org: "Horizon Corporate Towers",
        location: "Victoria Island, Lagos",
        service: "Vehicle Tracking & Access",
        initials: "HT",
        img: null
    }
];

function ClientAvatar({ client }) {
    const [imgFailed, setImgFailed] = useState(false);

    if (client.img && !imgFailed) {
        return (
            <div className="client-avatar-wrapper">
                <img
                    src={client.img}
                    alt={client.org}
                    className="client-avatar-img"
                    onError={() => setImgFailed(true)}
                />
                <span className="client-verified-badge" title="Verified Philux Client">
                    <ShieldCheck size={11} strokeWidth={2.5} />
                </span>
            </div>
        );
    }

    // Minimal, refined monogram placeholder
    return (
        <div className="client-avatar-wrapper client-avatar-placeholder" aria-label={client.org}>
            <span className="client-avatar-initials">{client.initials}</span>
            <span className="client-verified-badge" title="Verified Philux Client">
                <ShieldCheck size={11} strokeWidth={2.5} />
            </span>
        </div>
    );
}

export const Testimonials = () => {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    const current = TESTIMONIALS[active];

    return (
        <section className="testimonials-section bg-off-white text-graphite" id="testimonials">
            <div className="container">

                <div className="testimonials-header">
                    <div className="label text-red">CLIENT EXPERIENCES</div>
                    <h2 className="heading-section mt-4" style={{ maxWidth: '640px', marginTop: '1rem', letterSpacing: '-0.03em' }}>
                        Trust built through reliable execution.
                    </h2>
                </div>

                <div className="testimonials-container-minimal">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="testimonial-card-minimal"
                        >
                            {/* Top Meta: Star Rating & Verified Status */}
                            <div className="testimonial-top-meta">
                                <div className="testimonial-stars" aria-label="5 star rating">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                                    ))}
                                </div>
                                <span className="testimonial-verified-tag">
                                    <ShieldCheck size={13} className="text-red" />
                                    <span>Verified Project</span>
                                </span>
                            </div>

                            {/* Minimalist Quote Statement */}
                            <blockquote className="testimonial-quote-minimal">
                                &ldquo;{current.quote}&rdquo;
                            </blockquote>

                            {/* Author & Service Info Row */}
                            <div className="testimonial-author-row">
                                <div className="testimonial-author-left">
                                    <ClientAvatar client={current} />
                                    <div className="testimonial-author-text">
                                        <div className="author-role">{current.role}</div>
                                        <div className="author-org-meta">
                                            <span>{current.org}</span>
                                            <span className="author-meta-divider">&bull;</span>
                                            <span className="author-location">{current.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="testimonial-service-pill">
                                    {current.service}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="testimonials-nav-minimal">
                    <div className="test-nav-indicator label" style={{ color: 'var(--color-graphite)' }}>
                        0{active + 1} / 0{TESTIMONIALS.length}
                    </div>

                    <div className="test-nav-dots">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`test-dot-btn ${active === i ? 'active' : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className="test-nav-arrows">
                        <button
                            type="button"
                            className="test-nav-btn"
                            onClick={prev}
                            aria-label="Previous Testimonial"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            type="button"
                            className="test-nav-btn"
                            onClick={next}
                            aria-label="Next Testimonial"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};
