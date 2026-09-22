import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
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
                <a href="/" className="logo">
                    <img src="/logo.png" alt="Philux Logo" style={{ height: '36px', objectFit: 'contain' }} />
                </a>

                <nav className="main-nav desktop-only">
                    <ul className="nav-list">
                        <li><a href="#" className="nav-link">Home</a></li>
                        <li><a href="#" className="nav-link">About</a></li>
                        <li
                            className="nav-item-dropdown"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <a href="#" className="nav-link">Services <ChevronDown size={14} className="dropdown-icon" /></a>
                            <div className={clsx("mega-menu", isServicesOpen && "open")}>
                                <div className="mega-menu-grid">
                                    <a href="#">Vehicle Tracking</a>
                                    <a href="#">Solar & Inverter</a>
                                    <a href="#">CCTV Surveillance</a>
                                    <a href="#">Electric Fencing</a>
                                    <a href="#">Access Control</a>
                                    <a href="#">Fire Alarm & Sprinkler</a>
                                </div>
                            </div>
                        </li>
                        <li><a href="#" className="nav-link">Shop</a></li>
                        <li><a href="#" className="nav-link">Blog</a></li>
                        <li><a href="#" className="nav-link">Contact</a></li>
                    </ul>
                </nav>

                <div className="header-actions desktop-only">
                    <Button variant="primary" icon="right" href="#quote">
                        Request a Quote
                    </Button>
                </div>
            </div>
        </header>
    );
};
