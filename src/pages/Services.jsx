import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Car, Eye, Key, Flame } from 'lucide-react';
import { HowWeWork } from '../components/HowWeWork';
import { FinalCta } from '../components/FinalCta';
import { Helmet } from 'react-helmet-async';
import './Services.css';

const SERVICES_DATA = [
    {
        id: 'vehicle-tracking',
        title: "Vehicle Tracking & Fleet Management",
        icon: <Car size={32} />,
        image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Maintain absolute control over your logistical assets. We deploy satellite-grade geospatial tracking systems that offer real-time telemetry, geo-fencing breach alerts, and predictive maintenance diagnostics to optimize your entire fleet operations securely.",
        features: ["Real-Time GPS Tracking", "Automated Geo-Fencing", "Fuel Matrix Analysis", "Remote Engine Deactivation"]
    },
    {
        id: 'solar-inverter',
        title: "Solar & Inverter Systems",
        icon: <Zap size={32} />,
        image: "https://images.unsplash.com/photo-1509391366360-515434f0aa66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engineered specifically for extreme climates and high-load industrial operations, our bespoke solar and deep-cycle inverter arrays provide uninterrupted, clean power. Say goodbye to grid instability and expensive diesel contingencies.",
        features: ["High-Efficiency Monocrystalline Panels", "Industrial-Grade Batteries", "Smart Grid AI Balancing", "24/7 Power Continuity"]
    },
    {
        id: 'cctv',
        title: "CCTV Surveillance",
        icon: <Eye size={32} />,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Achieve total visual dominance over your premises. We install military-grade optics featuring AI-driven facial recognition, thermal imaging for night operations, and robust NVR architectures that scale with enterprise growth.",
        features: ["4K Resolution Arrays", "AI Facial & Object Tracking", "Thermal Night Vision", "End-to-End Encryption"]
    },
    {
        id: 'electric-fencing',
        title: "Electric Fencing",
        icon: <Shield size={32} />,
        image: "https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A highly formidable physical deterrent explicitly designed for perimeter zero-breach policies. Combining lethal-grade shock thresholds with smart-zone alarm integration, creating an impenetrable fortress around your most valuable assets.",
        features: ["Multi-Zone Integration", "High-Voltage Lethality Control", "Anti-Tamper Sensors", "Central Command Reporting"]
    },
    {
        id: 'access-control',
        title: "Access Control Systems",
        icon: <Key size={32} />,
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Eliminate reliance on standard lock and key paradigms. We digitize your ingress and egress parameters with advanced biometric scanners, RFID arrays, and centralized identity management systems, ensuring total facility lockdown and audit trails.",
        features: ["Biometric Fingerprint & Iris", "Centralized Identity Management", "Time & Attendance Auditing", "Remote Lockdown Capabilities"]
    },
    {
        id: 'fire-alarm',
        title: "Fire Alarm & Sprinkler Systems",
        icon: <Flame size={32} />,
        image: "https://images.unsplash.com/photo-1623912959827-897d19451996?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Mitigate catastrophic asset destruction before it happens. Built strictly to NFPA global standards, our fire suppression and early-warning systems utilize advanced environmental telemetry to detect anomalies instantly.",
        features: ["Smoke & Thermal Detection", "NFPA Standard Compliance", "Automated Sprinkler Activation", "Immediate Station Dispatch"]
    }
];

export const Services = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Our Services | Philux International</title>
                <meta name="description" content="Explore Philux International's premium engineered services including Vehicle Tracking, Solar Power arrays, and Military-Grade CCTV systems." />
            </Helmet>

            {/* Unified Text Hero */}
            <section className="services-hero-optimized bg-graphite text-white">
                <div className="services-hero-bg"></div>
                <div className="container relative z-10 services-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red mb-4">OUR SERVICES</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            Solutions You Can <span className="text-neutral-400">Trust.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium">
                            From reliable solar power arrays to professional CCTV surveillance and vehicle tracking, our local technicians deliver long-lasting installations that keep your home and business secure.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid layout */}
            <section className="services-bento-section bg-off-white">
                <div className="container">
                    <div className="services-bento-grid">
                        {SERVICES_DATA.map((service, index) => (
                            <motion.div
                                className="service-bento-card"
                                key={service.id}
                                id={service.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
                            >
                                <div className="card-image-wrap">
                                    <img src={service.image} alt={service.title} />
                                    <div className="card-image-gradient"></div>
                                </div>
                                <div className="card-content">
                                    <div className="card-header">
                                        <div className="card-icon text-red">{service.icon}</div>
                                        <h3 className="card-title">{service.title}</h3>
                                    </div>
                                    <p className="card-desc text-neutral-400">{service.description}</p>
                                    <ul className="card-features">
                                        {service.features.map((feat, i) => (
                                            <li key={i}>
                                                <span className="bullet"></span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <HowWeWork />
            <FinalCta />
        </React.Fragment>
    );
};
