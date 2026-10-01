import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Filter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FinalCta } from '../components/FinalCta';
import './Shop.css';

const CATEGORIES = ['All Equipment', 'CCTV Surveillance', 'Solar & Inverter', 'Access Control', 'Vehicle Tracking', 'Electric Fencing', 'Fire Protection'];

const PRODUCTS = [
    { id: 1, name: 'Philux 4K Matrix Dome', category: 'CCTV Surveillance', price: '₦299,000', img: '/images/cctv_surveillance.png' },
    { id: 2, name: 'Titan Solar Inverter 5kW', category: 'Solar & Inverter', price: '₦1,250,000', img: '/images/solar_energy.png' },
    { id: 3, name: 'Nexus Biometric Terminal', category: 'Access Control', price: '₦450,000', img: '/images/access_control.png' },
    { id: 4, name: 'FleetCommand Tracker V2', category: 'Vehicle Tracking', price: '₦150,000', img: '/images/vehicle_tracking.png' },
    { id: 5, name: 'Perimeter Energizer Core', category: 'Electric Fencing', price: '₦890,000', img: '/images/electric_fencing.png' },
    { id: 6, name: 'Smart Optical Smoke Sensor', category: 'Fire Protection', price: '₦85,000', img: '/images/fire_protection.png' },
];

export const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All Equipment');

    const filteredProducts = activeCategory === 'All Equipment'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <React.Fragment>
            <Helmet>
                <title>Shop | Philux Engineering Hardware</title>
                <meta name="description" content="Procure commercial-grade infrastructure, surveillance, and energy equipment directly from Philux International." />
            </Helmet>

            {/* Hero perfectly mirroring the About Page classes to guarantee 100% alignment */}
            <section className="about-hero bg-graphite text-white">
                <div className="about-hero-bg"></div>
                <div className="container about-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red">COMMERCIAL EQUIPMENT</div>
                        <h1 className="hero-heading mt-4 mb-4">
                            Hardware <span className="text-neutral-400">Shop.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl">
                            Procure professional-grade infrastructure, surveillance, and energy equipment engineered for absolute reliability across demanding corporate environments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main E-commerce Layout without Sidebar */}
            <section className="shop-main bg-off-white text-graphite" style={{ padding: '80px 0' }}>
                <div className="container">

                    {/* Horizontal Elegant Filter Bar */}
                    <div className="shop-horizontal-filter">
                        <ul className="horizontal-category-list">
                            {CATEGORIES.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="shop-sort-horizontal">
                            <Filter size={16} color="var(--color-neutral-500)" />
                            <select className="bg-transparent text-graphite border-none outline-none cursor-pointer font-medium">
                                <option>Sort by Latest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="shop-results-meta">
                        <span className="text-neutral-500 font-medium">Showing {filteredProducts.length} premium results</span>
                    </div>

                    {/* Grand Product Grid - Expanded images */}
                    <motion.div layout className="product-grand-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="product-card-grand"
                                >
                                    <div className="product-grand-img">
                                        <img src={product.img} alt={product.name} />
                                        <div className="product-grand-overlay">
                                            <button className="btn-premium-cart">
                                                <ShoppingCart size={20} /> Add to Order
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-grand-info">
                                        <div className="label text-red mb-2" style={{ marginBottom: '0.75rem' }}>{product.category}</div>
                                        <h3 className="product-grand-title">{product.name}</h3>
                                        <div className="product-grand-price">{product.price}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </section>

            <FinalCta />
        </React.Fragment>
    );
};
