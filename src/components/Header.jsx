import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from './ui/Button';
import './Header.css';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={clsx('site-header', isScrolled && 'scrolled')}>
            <div className="container header-container">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Philux Logo" style={{ height: '36px', objectFit: 'contain' }} />
                </Link>

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
                    {/* Primary lead capture button routes natively to the contact suite */}
                    <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <Button variant="primary" icon="right">
                            Request a Quote
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};
