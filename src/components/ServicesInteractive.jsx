import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from "next/link";


const SERVICES = [
    {
        id: '01',
        title: 'VEHICLE TRACKING',
        desc: 'Track your cars and fleet in real time anywhere in Nigeria. Stop car theft with instant mobile alerts and remote engine shut-off.',
        img: '/images/vehicle_tracking.png'
    },
    {
        id: '02',
        title: 'SOLAR & INVERTER',
        desc: 'Say goodbye to power blackouts. Reliable solar and inverter systems to keep your security cameras, lights, and appliances running 24/7.',
        img: '/images/solar_energy.png'
    },
    {
        id: '03',
        title: 'CCTV SURVEILLANCE',
        desc: 'Crystal-clear HD cameras with night vision and live phone streaming. Monitor your home, shop, or office from anywhere at any time.',
        img: '/images/cctv_surveillance.png'
    },
    {
        id: '04',
        title: 'ELECTRIC FENCING',
        desc: 'Keep intruders out of your property. Powerful perimeter electric fences with loud siren alarms that trigger the moment anyone touches it.',
        img: '/images/electric_fencing.png'
    },
    {
        id: '05',
        title: 'ACCESS CONTROL',
        desc: 'Control who enters your premises. Fingerprint door locks, card readers, and automatic gate barriers for residential homes and corporate offices.',
        img: '/images/access_control.png'
    },
    {
        id: '06',
        title: 'FIRE ALARM & SPRINKLER',
        desc: 'Early smoke and heat warning systems that detect fire hazards instantly and protect your property from fire damage.',
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
                                                <div className="mobile-only-img-wrapper">
                                                    <img src={srv.img} alt={srv.title} className="mobile-only-img" />
                                                </div>
                                                <p className="service-desc">{srv.desc}</p>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.15, duration: 0.4 }}
                                                    className="service-shop-cta"
                                                >
                                                    <Link href="/shop" className="label text-red shop-inline-link">
                                                        Shop related equipment <ShoppingCart size={15} strokeWidth={2.5} />
                                                    </Link>
                                                </motion.div>
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
