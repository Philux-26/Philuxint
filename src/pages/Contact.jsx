import Link from "next/link";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { organizationSchema } from '../utils/seoSchemas';
import { QuoteForm } from '../components/QuoteForm';
import { LocationsMarquee } from '../components/LocationsMarquee';

export default function Contact() {
    return (
        <React.Fragment>
            <SEO
                title="Contact Philux Security | Lagos & Nationwide Security Company"
                description="Contact Philux International, Nigeria's trusted security company for CCTV installation, vehicle tracking, electric fencing, access control, and solar energy."
                canonical="/contact"
                schema={organizationSchema}
            />

            {/* Unified Text Hero */}
            <section className="contact-hero-optimized bg-graphite text-white">
                <div className="contact-hero-bg"></div>
                <div className="container relative z-10 hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red mb-4">CONTACT US</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            Get in <span className="text-neutral-400">Touch.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium mb-8">
                            Whether you need CCTV cameras for your home, GPS trackers for your vehicles, or an electric fence for your compound, our security team in Lagos is ready to help you.
                        </p>

                        <div className="contact-social-flex">
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://www.facebook.com/philuxint"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Visit Philux International on Facebook"
                            >
                                <Facebook size={24} strokeWidth={1.5} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://www.instagram.com/philuxint/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Visit Philux International on Instagram"
                            >
                                <Instagram size={24} strokeWidth={1.5} />
                            </motion.a>
                            <motion.a
                                whileHover={{ y: -5 }}
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link"
                                aria-label="Visit Philux International on LinkedIn"
                            >
                                <Linkedin size={24} strokeWidth={1.5} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Corporate Intel 4-Grid */}
            <section className="contact-intel-section bg-off-white">
                <div className="container">
                    <div className="intel-4-grid">
                        <motion.div className="intel-glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className="icon-wrapper"><MapPin size={28} /></div>
                            <h4>Head Office</h4>
                            <p>44, Engr Oyindamola street, <br />Off Latols street, Governors Road, <br />Ikotun, Lagos.</p>
                        </motion.div>

                        <motion.div className="intel-glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="icon-wrapper"><Phone size={28} /></div>
                            <h4>Phone & WhatsApp</h4>
                            <p>(+234) 906-464-6062</p>
                            <a href="https://wa.me/2349064646062" target="_blank" rel="noopener noreferrer" className="whatsapp-link mt-3 text-red font-bold flex items-center gap-2 hover:underline">
                                Message on WhatsApp
                            </a>
                        </motion.div>

                        <motion.div className="intel-glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <div className="icon-wrapper"><Mail size={28} /></div>
                            <h4>Email Address</h4>
                            <p>info@philuxint.com.ng</p>
                        </motion.div>

                        <motion.div className="intel-glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <div className="icon-wrapper"><Clock size={28} /></div>
                            <h4>Opening Hours</h4>
                            <p>Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Standalone Quote Engine */}
            <section className="contact-form-section bg-off-white pb-32">
                <div className="container">
                    <div className="form-engine-wrapper">
                        <div className="text-center mb-12">
                            <h2 className="heading-section text-graphite">Send a Request</h2>
                            <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
                                Use our secure intake form below to let us know exactly what you need. Our team will get back to you with a comprehensive quote and plan.
                            </p>
                        </div>
                        <div className="form-payload-container shadow-2xl bg-white rounded-3xl overflow-hidden">
                            <QuoteForm />
                        </div>
                    </div>
                </div>
            </section>

            <LocationsMarquee />

        </React.Fragment>
    );
};
