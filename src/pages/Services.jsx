import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Car, Eye, Key, Flame, ShoppingCart } from 'lucide-react';
import { HowWeWork } from '../components/HowWeWork';
import { FinalCta } from '../components/FinalCta';
import { SEO } from '../components/SEO';
import { servicesSchema } from '../utils/seoSchemas';
import Link from "next/link";


const SERVICES_DATA = [
    {
        id: 'vehicle-tracking',
        title: "Vehicle Tracking & Fleet Management",
        icon: <Car size={32} />,
        image: "/images/services/vehicle-tracking.jpg",
        description: "Stay in total control of your personal cars, delivery vans, and commercial trucks anywhere in Nigeria. Our GPS vehicle tracking system lets you monitor live locations on your phone, check trip history, receive over-speed alerts, and shut down the engine remotely in case of theft.",
        features: ["Live GPS Phone Tracking", "Remote Engine Shut-off", "Route & Speed History", "Theft & Geo-Fence Alerts"]
    },
    {
        id: 'solar-inverter',
        title: "Solar & Inverter Power Backup",
        icon: <Zap size={32} />,
        image: "/images/services/solar-inverter.jpg",
        description: "Power outages should never compromise your safety or comfort. We install durable solar panels, pure sine wave inverters, and long-lasting deep-cycle batteries to keep your security cameras, electric fences, lights, and appliances running 24/7 without noisy generators.",
        features: ["Uninterrupted 24/7 Power", "Pure Sine Wave Inverters", "Long-Life Lithium & Deep-Cycle Batteries", "Zero Fuel & Zero Noise"]
    },
    {
        id: 'cctv',
        title: "CCTV Camera Surveillance",
        icon: <Eye size={32} />,
        image: "/images/services/cctv-surveillance.jpg",
        description: "Keep a watchful eye on your home, compound, warehouse, or office. We install crystal-clear HD and 4K security cameras with infrared night vision, motion alerts, and live phone streaming so you always know what is happening on your property from anywhere.",
        features: ["Crystal Clear HD & 4K Video", "Night Vision & Motion Detection", "Live Viewing on Your Smartphone", "Hard Drive Recording & Playback"]
    },
    {
        id: 'electric-fencing',
        title: "Perimeter Electric Fencing",
        icon: <Shield size={32} />,
        image: "/images/services/electric-fencing.jpg",
        description: "Protect your compound from intruders and trespassers. We install neat, durable high-voltage electric security fences that deliver a strong deterrent shock to keep intruders away, combined with loud sirens that sound the alarm if anyone tries to cut or climb the fence.",
        features: ["Strong Intruder Deterrent", "Loud Siren & Flasher Alerts", "Battery Backup During Blackouts", "Rust-Resistant Fence Materials"]
    },
    {
        id: 'access-control',
        title: "Access Control & Smart Entry",
        icon: <Key size={32} />,
        image: "/images/services/access-control.jpg",
        description: "Secure your doors, gates, and offices without messy keys. We install biometric fingerprint scanners, RFID card locks, video door intercoms, and automated gate barriers to ensure only authorized family members, visitors, and employees can enter your property.",
        features: ["Biometric Fingerprint & Card Access", "Automated Gate Openers & Turnstiles", "Staff Attendance Records", "Video Intercoms for Visitors"]
    },
    {
        id: 'fire-alarm',
        title: "Fire Alarm & Safety Systems",
        icon: <Flame size={32} />,
        image: "/images/services/fire-alarm.jpg",
        description: "Protect lives and valuable property before a fire spreads. We install sensitive smoke and heat detectors, manual break-glass alarms, and automated fire suppression systems for homes, commercial offices, schools, and industrial facilities across Nigeria.",
        features: ["Early Smoke & Heat Detection", "Loud Emergency Warning Sirens", "Fire Extinguisher & Sprinkler Setup", "Routine Testing & Maintenance Support"]
    }
];

export default function Services() {
    return (
        <React.Fragment>
            <SEO
                title="Security Services in Nigeria | CCTV, Car Tracking & Solar - Philux"
                description="Discover trusted security services in Nigeria by Philux: CCTV camera installation, GPS car tracking, electric fencing, access control, and 24/7 solar backup systems."
                canonical="/services"
                schema={servicesSchema}
            />

            {/* Unified Text Hero */}
            <section className="services-hero-optimized bg-graphite text-white">
                <div className="services-hero-bg"></div>
                <div className="container relative z-10 services-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red mb-4">OUR SECURITY SERVICES</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            Protection You Can <span className="text-neutral-400">Trust.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium">
                            From 24/7 CCTV surveillance and GPS vehicle tracking to perimeter electric fencing and continuous solar backup power, our security technicians deliver dependable solutions you can trust.
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
                                    <div className="card-shop-action">
                                        <Link href="/shop" className="shop-now-btn">
                                            Shop Equipment <ShoppingCart size={18} strokeWidth={2.5} />
                                        </Link>
                                    </div>
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
