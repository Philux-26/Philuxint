import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INDS = [
    { name: 'Corporate & Commercial', img: '/images/industries/corporate.webp' },
    { name: 'Industrial & Manufacturing', img: '/images/industries/industrial.webp' },
    { name: 'Residential Estates', img: '/images/industries/residential.webp' },
    { name: 'Fleet & Logistics', img: '/images/industries/logistics.webp' }
];

export const Industries = () => {
    const [hovered, setHovered] = useState(0);

    return (
        <section className="industries-section bg-graphite text-white">
            <div className="container">
                <div className="label text-red" style={{ marginBottom: '1rem' }}>ENVIRONMENTS & SOLUTIONS</div>
                <h2 className="heading-section" style={{ marginBottom: '3rem' }}>Industries We Serve</h2>

                <div className="industries-interactive">
                    <div className="ind-tabs-col">
                        {INDS.map((ind, i) => (
                            <div
                                key={i}
                                className={`ind-tab ${hovered === i ? 'active' : ''}`}
                                onMouseEnter={() => setHovered(i)}
                                onClick={() => setHovered(i)}
                            >
                                <div className="ind-tab-header">
                                    <span className="ind-tab-num">0{i + 1}</span>
                                    <h3 className="ind-tab-name">{ind.name}</h3>
                                </div>

                                <AnimatePresence>
                                    {hovered === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="ind-mobile-anim-wrapper"
                                        >
                                            <div className="ind-mobile-img-wrapper">
                                                <img src={ind.img} alt={ind.name} className="ind-mobile-img" />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                    <div className="ind-img-col">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={hovered}
                                src={INDS[hovered].img}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                alt={INDS[hovered].name}
                                className="ind-img"
                            />
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
