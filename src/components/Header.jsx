import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
    const router = useRouter();
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

    const checkActive = (path) => {
        if (path === '/') {
            return router.pathname === '/' ? 'active' : '';
        }
        return router.pathname.startsWith(path) ? 'active' : '';
    };

    return (
        <header className={clsx('site-header', (isScrolled || isMobileMenuOpen) && 'scrolled')}>
            <div className="container header-container">
                <Link href="/" className="logo" onClick={closeMobileMenu}>
                    <img src="/logo.png" alt="Philux Logo" style={{ height: '36px', objectFit: 'contain' }} />
                </Link>

                {/* ===== DESKTOP NAVIGATION ===== */}
                <nav className="main-nav desktop-only">
                    <ul className="nav-list">
                        <li><Link href="/" className={`nav-link ${checkActive('/')}`}>Home</Link></li>
                        <li><Link href="/about" className={`nav-link ${checkActive('/about')}`}>About</Link></li>
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <Link href="/services" className={`nav-link ${checkActive('/services')}`}>Services <ChevronDown size={14} className="dropdown-icon" /></Link>
                            <div className={clsx("mega-menu", isServicesOpen && "open")}>
                                <div className="mega-menu-grid">
                                    <Link href="/services#vehicle-tracking">Vehicle Tracking</Link>
                                    <Link href="/services#solar-inverter">Solar & Inverter</Link>
                                    <Link href="/services#cctv">CCTV Surveillance</Link>
                                    <Link href="/services#electric-fencing">Electric Fencing</Link>
                                    <Link href="/services#access-control">Access Control</Link>
                                    <Link href="/services#fire-alarm">Fire Alarm & Sprinkler</Link>
                                </div>
                            </div>
                        </li>
                        <li><Link href="/shop" className={`nav-link ${checkActive('/shop')}`}>Shop</Link></li>
                        <li><Link href="/blog" className={`nav-link ${checkActive('/blog')}`}>Blog</Link></li>
                        <li><Link href="/contact" className={`nav-link ${checkActive('/contact')}`}>Contact</Link></li>
                    </ul>
                </nav>

                <div className="header-actions desktop-only">
                    <Link href="/contact" style={{ textDecoration: 'none' }}>
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
                                <li><Link href="/" className={checkActive('/')} onClick={closeMobileMenu}>Home</Link></li>
                                <li><Link href="/about" className={checkActive('/about')} onClick={closeMobileMenu}>About</Link></li>
                                <li><Link href="/services" className={checkActive('/services')} onClick={closeMobileMenu}>Services</Link></li>
                                <li><Link href="/shop" className={checkActive('/shop')} onClick={closeMobileMenu}>Shop</Link></li>
                                <li><Link href="/blog" className={checkActive('/blog')} onClick={closeMobileMenu}>Blog</Link></li>
                                <li><Link href="/contact" className={checkActive('/contact')} onClick={closeMobileMenu}>Contact</Link></li>
                                <li className="mobile-nav-cta">
                                    <Link href="/contact" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
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
