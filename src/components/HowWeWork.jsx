import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
    "CONSULTATION", "SITE ASSESSMENT", "SOLUTION DESIGN", "INSTALLATION", "TESTING", "SUPPORT"
];

export const HowWeWork = () => {
    return (
        <section className="hww-section bg-off-white text-graphite">
            <div className="container">
                <div className="label mb-4">HOW WE WORK</div>
                <h2 className="heading-section" style={{ marginBottom: '4rem' }}>Our Process</h2>

                <div className="process-track-container desktop-only">
                    <div className="process-line-bg"></div>
                    <motion.div
                        className="process-line-fill"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                    ></motion.div>

                    <div className="process-steps">
                        {STEPS.map((step, i) => (
                            <div key={i} className="process-step">
                                <motion.div
                                    className="step-node"
                                    initial={{ scale: 0, backgroundColor: '#D1D5DB' }}
                                    whileInView={{ scale: 1, backgroundColor: 'var(--color-philux-red)' }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.3) }}
                                >
                                    <div className="step-node-inner"></div>
                                </motion.div>
                                <motion.div
                                    className="step-content"
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.4, delay: 0.4 + (i * 0.3) }}
                                >
                                    <div className="step-num label">0{i + 1}</div>
                                    <div className="step-name">{step}</div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile vertical timeline */}
                <div className="mobile-timeline mobile-only">
                    <div className="mobile-line-bg"></div>
                    <motion.div
                        className="mobile-line-fill"
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    ></motion.div>

                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            className="mobile-step"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="mobile-step-node"></div>
                            <div className="mobile-step-content">
                                <span className="label text-red">0{i + 1}</span>
                                <h4>{step}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
