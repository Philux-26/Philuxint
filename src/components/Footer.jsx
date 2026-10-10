import Link from "next/link";
import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/Button';

export const Footer = () => {
    return (
        <footer className="site-footer bg-graphite text-white">
            <div className="footer-geometry-bg"></div>

            <div className="container footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <a href="/" className="logo logo-white" style={{ display: 'block' }}>
                            <img src="/logo.png" alt="Philux Logo" style={{ height: '36px', objectFit: 'contain' }} />
                        </a>
                        <p className="footer-positioning">
                            Integrated technology, security, energy, and intelligent infrastructure solutions for a safer environment.
                        </p>
                        <div className="footer-socials" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <motion.a whileHover={{ y: -5, scale: 1.1, color: "var(--color-philux-red)" }} transition={{ duration: 0.2 }} href="https://www.facebook.com/philuxint" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--color-neutral-300)' }}>
                                <Facebook size={22} strokeWidth={1.5} />
                            </motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1, color: "var(--color-philux-red)" }} transition={{ duration: 0.2 }} href="https://www.instagram.com/philuxint/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--color-neutral-300)' }}>
                                <Instagram size={22} strokeWidth={1.5} />
                            </motion.a>
                            <motion.a whileHover={{ y: -5, scale: 1.1, color: "var(--color-philux-red)" }} transition={{ duration: 0.2 }} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--color-neutral-300)' }}>
                                <Linkedin size={22} strokeWidth={1.5} />
                            </motion.a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4 className="footer-col-title label">Company</h4>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/shop">Shop</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4 className="footer-col-title label">Services</h4>
                            <ul>
                                <li><a href="#">Vehicle Tracking</a></li>
                                <li><a href="#">Solar &amp; Inverter</a></li>
                                <li><a href="#">CCTV Surveillance</a></li>
                                <li><a href="#">Electric Fencing</a></li>
                                <li><a href="#">Access Control</a></li>
                                <li><a href="#">Fire Protection</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-cta">
                        <h4 className="footer-col-title label">Ready to start?</h4>
                        <Button variant="primary" icon="right" href="#quote">Request a Quote</Button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Philux International. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
