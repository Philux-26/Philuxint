import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className={clsx('site-header', (isScrolled || isMobileMenuOpen) && 'scrolled')}>
            <div className="container header-container">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                    <img src="/logo.png" alt="Philux Logo" style={{ height: '36px', objectFit: 'contain' }} />
                </Link>

                {/* ===== DESKTOP NAVIGATION ===== */}
                <nav className="main-nav desktop-only">
                    <ul className="nav-list">
                        <li><NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink></li>
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services <ChevronDown size={14} className="dropdown-icon" /></NavLink>
                            <div className={clsx("mega-menu", isServicesOpen && "open")}>
                                <div className="mega-menu-grid">
                                    <HashLink to="/services#vehicle-tracking">Vehicle Tracking</HashLink>
                                    <HashLink to="/services#solar-inverter">Solar & Inverter</HashLink>
                                    <HashLink to="/services#cctv">CCTV Surveillance</HashLink>
                                    <HashLink to="/services#electric-fencing">Electric Fencing</HashLink>
                                    <HashLink to="/services#access-control">Access Control</HashLink>
                                    <HashLink to="/services#fire-alarm">Fire Alarm & Sprinkler</HashLink>
                                </div>
                            </div>
                        </li>
                        <li><NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Shop</NavLink></li>
                        <li><NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
                    </ul>
                </nav>

                <div className="header-actions desktop-only">
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" icon="right">
                            Request a Quote
                        </Button>
                    </Link>
                </div>

                {/* ===== MOBILE MENU TOGGLE ===== */}
                <div
                    className="mobile-menu-toggle mobile-only"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* ===== MOBILE OVERLAY ===== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container">
                            <ul className="mobile-nav-list">
                                <li><NavLink to="/" end onClick={closeMobileMenu}>Home</NavLink></li>
                                <li><NavLink to="/about" onClick={closeMobileMenu}>About</NavLink></li>
                                <li><NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink></li>
                                <li><NavLink to="/shop" onClick={closeMobileMenu}>Shop</NavLink></li>
                                <li><NavLink to="/blog" onClick={closeMobileMenu}>Blog</NavLink></li>
                                <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink></li>
                                <li className="mobile-nav-cta">
                                    <Link to="/contact" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
                                        <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Request a Quote</Button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
