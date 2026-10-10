import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Users, HardHat, Cpu } from 'lucide-react';
import { Statistics } from '../components/Statistics';
import { FinalCta } from '../components/FinalCta';
import { Helmet } from 'react-helmet-async';

const VALUES = [
    { icon: <Shield size={24} />, title: "Uncompromising Security", desc: "We deploy military-grade architecture in civilian environments, ensuring 100% asset protection." },
    { icon: <Zap size={24} />, title: "Reliable Energy", desc: "Sustainable, continuous power grids engineered for high-demand corporate and industrial sectors." },
    { icon: <Cpu size={24} />, title: "Intelligent Integration", desc: "All our systems cohesively communicate, providing you a singular pane of glass for entire property management." },
    { icon: <HardHat size={24} />, title: "Expert Engineering", desc: "Led by certified specialists, our deployments strictly adhere to the highest global infrastructure standards." },
    { icon: <Target size={24} />, title: "Precision Delivery", desc: "We execute complex logistical deployments on-time and securely, respecting critical deadlines." },
    { icon: <Users size={24} />, title: "Client Partnership", desc: "We don't just install; we continuously partner with organizations to scale their technological fortitude." },
];

export default function About() {
    return (
        <React.Fragment>
            <Helmet>
                <title>About Us | Philux International</title>
                <meta name="description" content="Learn about Philux International's mission to pioneer integrated security, solar energy, and infrastructure solutions across Nigeria." />
            </Helmet>

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
                            Pioneering <span className="text-neutral-400">Integrated Solutions.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl">
                            Philux International is a premier engineering firm dedicated to unifying specialized security paradigms with sustainable energy infrastructure.
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
                                To engineer secure, autonomous environments for organizations globally by seamlessly amalgamating cutting-edge surveillance, robust access control, and infinite solar power solutions into a singular accessible ecosystem.
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
                                Becoming the de-facto standard in technological infrastructure—where every estate, corporation, and logical hub relies on the Philux standard for unimpeachable safety and perpetual power.
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
