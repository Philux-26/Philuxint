import React from 'react';
import { motion } from 'framer-motion';
import './Statistics.css';

const STATS = [
    { value: 'XX+', label: 'INSTALLATIONS' },
    { value: 'XX+', label: 'CLIENTS' },
    { value: 'XX', label: 'LOCATIONS' },
    { value: 'XX+', label: 'YEARS' },
];

export const Statistics = () => {
    return (
        <section className="stats-section bg-graphite text-white">
            <div className="stats-bg-geometry"></div>

            <div className="container stats-container">
                {STATS.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="stat-item"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label label">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
