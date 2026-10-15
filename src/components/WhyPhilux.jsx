import React from 'react';
import { motion } from 'framer-motion';

const BENEFITS = [
    { title: "Certified Technicians", text: "Experienced security technicians ensure clean, safe, and durable installations that follow standard safety codes." },
    { title: "Complete Security Systems", text: "Your CCTV cameras, electric fence, vehicle tracking, and solar power work together smoothly for total protection." },
    { title: "Proven Field Experience", text: "Years of practical experience protecting homes, commercial offices, schools, and vehicle fleets across Nigerian cities." },
    { title: "24/7 Power Continuity", text: "Our systems stay online round the clock with solar and battery backup, so your security cameras never turn off during blackouts." },
    { title: "Reliable Local Support", text: "Prompt customer service, regular maintenance, and quick warranty support to keep your systems running at all times." }
];

export const WhyPhilux = () => {
    return (
        <section className="why-section bg-off-white text-graphite" id="why-philux">
            <div className="container why-container">

                <div className="why-left">
                    <div className="why-sticky">
                        <div className="label">THE PHILUX PROMISE</div>
                        <h2 className="heading-section mt-4" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Why Choose Philux</h2>
                        <p className="why-subtext">
                            We don&apos;t just sell equipment. We install complete, dependable security systems built to protect your property and keep working when you need them most.
                        </p>
                    </div>
                </div>

                <div className="why-right">
                    <div className="why-timeline">
                        {BENEFITS.map((b, i) => (
                            <motion.div
                                key={i}
                                className="benefit-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <div className="benefit-node">
                                    <div className="benefit-circle"></div>
                                    {i !== BENEFITS.length - 1 && <div className="benefit-line"></div>}
                                </div>
                                <div className="benefit-content">
                                    <h3 className="benefit-title">{b.title}</h3>
                                    <p className="benefit-text">{b.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
