import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ServicesInteractive.css';

const SERVICES = [
    {
        id: '01',
        title: 'VEHICLE TRACKING',
        desc: 'Advanced real-time fleet monitoring and telematics for comprehensive asset management and security.',
        img: '/images/vehicle_tracking.png'
    },
    {
        id: '02',
        title: 'SOLAR & INVERTER',
        desc: 'Premium renewable energy installations delivering uninterrupted and sustainable power for mission-critical operations.',
        img: '/images/solar_energy.png'
    },
    {
        id: '03',
        title: 'CCTV SURVEILLANCE',
        desc: 'High-definition intelligent surveillance networks providing crystal clear monitoring and situational awareness.',
        img: '/images/cctv_surveillance.png'
    },
    {
        id: '04',
        title: 'ELECTRIC FENCING',
        desc: 'Robust perimeter defense systems engineered to delay, detect, and deter unauthorized access.',
        img: '/images/electric_fencing.png'
    },
    {
        id: '05',
        title: 'ACCESS CONTROL',
        desc: 'Next-generation biometric and digital access management controlling personnel flow with absolute precision.',
        img: '/images/access_control.png'
    },
    {
        id: '06',
        title: 'FIRE ALARM & SPRINKLER',
        desc: 'Responsive fire detection and suppression infrastructure protecting life and catastrophic property loss.',
        img: '/images/fire_protection.png'
    },
];

export const ServicesInteractive = () => {
    const [activeService, setActiveService] = useState(SERVICES[0]);

    return (
        <section className="services-section bg-graphite text-white" id="services">
            <div className="container services-container">

                <div className="services-list-col">
                    <div className="label text-red" style={{ marginBottom: '2rem' }}>OUR SOLUTIONS</div>

                    <div className="services-list">
                        {SERVICES.map((srv) => {
                            const isActive = activeService.id === srv.id;
                            return (
                                <div
                                    key={srv.id}
                                    className={`service-item ${isActive ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveService(srv)}
                                >
                                    <div className="service-item-header">
                                        <span className="service-number">{srv.id}</span>
                                        <h3 className="service-title">{srv.title}</h3>
                                        <motion.div
                                            className="service-arrow"
                                            animate={{ x: isActive ? 10 : 0, opacity: isActive ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight size={24} color="var(--color-philux-red)" />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="service-desc-wrapper"
                                            >
                                                <p className="service-desc">{srv.desc}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="services-image-col">
                    <div className="services-image-wrapper">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={activeService.id}
                                initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                                animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                                className="services-image-layer"
                            >
                                <img src={activeService.img} alt={activeService.title} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
};
