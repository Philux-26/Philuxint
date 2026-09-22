import React from 'react';
import { motion } from 'framer-motion';
import './WhyPhilux.css';

const BENEFITS = [
    { title: "Professional Installation", text: "Expert engineering teams ensure seamless deployment with rigorous safety standards." },
    { title: "Integrated Solutions", text: "Unified infrastructure where security, power, and tracking systems work intelligently together." },
    { title: "Technical Expertise", text: "Forward-thinking technology deployment grounded in decades of industry experience." },
    { title: "Reliability Built-in", text: "Engineered solutions targeting zero downtime operations for mission-critical facilities." },
    { title: "Ongoing Support", text: "Dedicated maintenance and monitoring ensuring your systems remain perfectly operational." }
];

export const WhyPhilux = () => {
    return (
        <section className="why-section bg-off-white text-graphite" id="why-philux">
            <div className="container why-container">

                <div className="why-left">
                    <div className="why-sticky">
                        <div className="label">THE PHILUX STANDARD</div>
                        <h2 className="heading-section mt-4" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Why Philux</h2>
                        <p className="why-subtext">
                            We transcend basic installation to deliver sophisticated infrastructure designed for maximum reliability and structural integrity.
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
