import React from 'react';
import { motion } from 'framer-motion';
import './LocationsMarquee.css';

const CITIES = [
    "LAGOS", "ABUJA", "PORT HARCOURT", "ASABA", "KANO", "OWERRI", "BENIN",
    "LAGOS", "ABUJA", "PORT HARCOURT", "ASABA", "KANO", "OWERRI", "BENIN" // Duplicated for seamless loop
];

export const LocationsMarquee = () => {
    return (
        <section className="locations-marquee-section bg-graphite">
            <div className="marquee-label">OPERATING NATIONWIDE:</div>
            <div className="marquee-container">
                <motion.div
                    className="marquee-track"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {CITIES.map((city, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-city">{city}</span>
                            <span className="marquee-separator">/</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
