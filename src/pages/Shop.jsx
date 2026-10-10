import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Filter, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FinalCta } from '../components/FinalCta';
import { getProducts, getProductCategories } from '../services/wp-api';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All Equipment');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getProducts(30),
            getProductCategories()
        ])
            .then(([prodRes, catRes]) => {
                setProducts(prodRes.products);
                setCategories(catRes);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error("WooGraphQL Failure: ", e);
                setIsLoading(false);
            });
    }, []);

    // Fallback mock categories if plugin hasn't synced categories well yet
    const displayCategories = categories.length > 0
        ? ['All Equipment', ...categories.map(c => c.name)]
        : ['All Equipment', 'CCTV Surveillance', 'Solar & Inverter', 'Access Control'];

    const filteredProducts = activeCategory === 'All Equipment'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <React.Fragment>
            <Helmet>
                <title>Shop | Philux Engineering Hardware</title>
                <meta name="description" content="Procure commercial-grade infrastructure, surveillance, and energy equipment directly from Philux International." />
            </Helmet>

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

            <section className="shop-main bg-off-white text-graphite" style={{ padding: '80px 0' }}>
                <div className="container">

                    <div className="shop-horizontal-filter">
                        <ul className="horizontal-category-list">
                            {displayCategories.map(cat => (
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

                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                            <Loader className="spinner text-red" size={48} />
                        </div>
                    ) : (
                        <motion.div layout className="product-grand-grid">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
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
                                                {/* If Brand exists later via ACF/Tags, render here */}
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: 'var(--color-neutral-500)' }}>
                                        No products found in this category.
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                </div>
            </section>

            <FinalCta />
        </React.Fragment>
    );
};
