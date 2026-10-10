import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const IntroSection = () => {
    return (
        <section className="intro-section" id="about">
            <div className="container intro-container">
                <div className="intro-label-col">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="label"
                    >
                        WHO WE ARE
                    </motion.div>
                </div>

                <div className="intro-content-col">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="intro-statement heading-section"
                    >
                        We are an integrated technology &amp; engineering firm delivering uncompromising security, reliable energy, and intelligent infrastructure solutions for modern environments.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Button variant="secondary" icon="right" href="#discover" className="intro-discover-btn">
                            DISCOVER PHILUX
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
