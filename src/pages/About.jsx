import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users, HardHat, Cpu } from 'lucide-react';
import { Statistics } from '../components/Statistics';
import { FinalCta } from '../components/FinalCta';
import { SEO } from '../components/SEO';

const VALUES = [
    { icon: <Shield size={24} />, title: "Uncompromising Security", desc: "We provide high-quality security systems that keep your properties and loved ones safe round the clock." },
    { icon: <Zap size={24} />, title: "24/7 Power Backup", desc: "We back up your security systems with dependable solar and inverter energy so they never go off during blackouts." },
    { icon: <Cpu size={24} />, title: "All-in-One Protection", desc: "Your cameras, alarms, fences, and tracking connect together smoothly so you can monitor everything easily on your phone." },
    { icon: <HardHat size={24} />, title: "Certified Technicians", desc: "Our experienced security technicians carry out neat, safe, and durable installations that follow standard safety codes." },
    { icon: <Target size={24} />, title: "Prompt Delivery", desc: "We value your time and safety. From initial consultation to site inspection and installation, we deliver without delay." },
    { icon: <Users size={24} />, title: "Dependable Support", desc: "We don't just install and leave; we provide ongoing maintenance and quick customer support whenever you need us." },
];

export default function About() {
    return (
        <React.Fragment>
            <SEO
                title="About Us | Philux Security Services Company Nigeria"
                description="Learn about Philux International, a leading security services company in Nigeria providing CCTV installation, vehicle tracking, electric fencing, and solar backup power."
                canonical="/about"
            />

            {/* About Hero */}
            <section className="about-hero bg-graphite text-white">
                <div className="about-hero-bg"></div>
                <div className="container about-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red">WHO WE ARE</div>
                        <h1 className="hero-heading mt-4 mb-4">
                            Securing Homes & <span className="text-neutral-400">Businesses in Nigeria.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl">
                            Philux International is a trusted security services company in Nigeria dedicated to protecting people, properties, and vehicles with reliable electronic security and 24/7 solar backup power.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-section bg-off-white">
                <div className="container">
                    <div className="mission-grid">
                        <motion.div
                            className="mission-block"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="heading-section">Our Mission</h3>
                            <p className="text-neutral-700">
                                To make homes, estates, and businesses across Nigeria safe and secure by providing dependable CCTV surveillance, vehicle tracking, electric fencing, and continuous solar power backed by prompt local support.
                            </p>
                        </motion.div>

                        <motion.div
                            className="mission-block"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="heading-section">Our Vision</h3>
                            <p className="text-neutral-700">
                                To be Nigeria&apos;s most trusted security company, known for keeping families, businesses, and communities completely safe and well-powered.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="values-section">
                <div className="container">
                    <div className="values-header">
                        <div className="label text-red">OUR ETHOS</div>
                        <h2 className="heading-section mt-4 mb-4">Core Values</h2>
                    </div>

                    <div className="values-grid">
                        {VALUES.map((val, i) => (
                            <motion.div
                                className="value-card"
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="value-icon-wrapper text-red">
                                    {val.icon}
                                </div>
                                <h4 className="value-title">{val.title}</h4>
                                <p className="text-neutral-600">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Statistics />
            <FinalCta />
        </React.Fragment>
    );
};
