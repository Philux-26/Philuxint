import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Loader, Eye, X, MessageSquare, ShieldCheck, Layers, ChevronLeft, ChevronRight, PhoneCall, Flame, Timer, Clock } from 'lucide-react';
import Link from 'next/link';
import { SEO } from '../components/SEO';
import { createShopSchema } from '../utils/seoSchemas';
import { FinalCta } from '../components/FinalCta';
import { getProducts, getProductCategories } from '../services/wp-api';

// ==========================================
// COUNTDOWN TIMER HOOK & COMPONENTS
// ==========================================
function useCountdown(targetDate, onExpire) {
    const [timeLeft, setTimeLeft] = useState(() => {
        if (!targetDate) return null;
        const diff = new Date(targetDate).getTime() - Date.now();
        if (diff <= 0) return null;
        return {
            total: diff,
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    });

    useEffect(() => {
        if (!targetDate) {
            setTimeLeft(null);
            return;
        }

        const updateTimer = () => {
            const diff = new Date(targetDate).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft(null);
                if (onExpire) onExpire();
            } else {
                setTimeLeft({
                    total: diff,
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetDate, onExpire]);

    return timeLeft;
}

function CardCountdown({ targetDate, onExpire }) {
    const timeLeft = useCountdown(targetDate, onExpire);
    if (!timeLeft) return null;

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div className="card-countdown-ribbon" onClick={(e) => e.stopPropagation()}>
            <div className="card-countdown-header">
                <Flame size={12} className="card-countdown-flame" />
                <span className="card-countdown-lbl">Sale ends in</span>
            </div>
            <div className="card-countdown-timer">
                {timeLeft.days > 0 && (
                    <span className="card-time-unit"><strong>{timeLeft.days}</strong>d</span>
                )}
                <span className="card-time-unit"><strong>{pad(timeLeft.hours)}</strong>h</span>
                <span className="card-time-unit"><strong>{pad(timeLeft.minutes)}</strong>m</span>
                <span className="card-time-unit card-time-sec"><strong>{pad(timeLeft.seconds)}</strong>s</span>
            </div>
        </div>
    );
}

function ModalCountdown({ targetDate, onExpire }) {
    const timeLeft = useCountdown(targetDate, onExpire);
    if (!timeLeft) return null;

    const pad = (n) => String(n).padStart(2, '0');

    return (
        <div className="modal-countdown-panel">
            <div className="modal-countdown-top">
                <div className="modal-countdown-title-wrap">
                    <Flame size={15} className="modal-countdown-icon-fire" />
                    <span className="modal-countdown-title">LIMITED-TIME SPECIAL OFFER</span>
                </div>
                <span className="modal-countdown-urgency">Ends soon</span>
            </div>

            <div className="modal-countdown-grid">
                <div className="modal-countdown-box">
                    <span className="modal-countdown-num">{pad(timeLeft.days)}</span>
                    <span className="modal-countdown-unit">DAYS</span>
                </div>
                <span className="modal-countdown-divider">:</span>
                <div className="modal-countdown-box">
                    <span className="modal-countdown-num">{pad(timeLeft.hours)}</span>
                    <span className="modal-countdown-unit">HOURS</span>
                </div>
                <span className="modal-countdown-divider">:</span>
                <div className="modal-countdown-box">
                    <span className="modal-countdown-num">{pad(timeLeft.minutes)}</span>
                    <span className="modal-countdown-unit">MINS</span>
                </div>
                <span className="modal-countdown-divider">:</span>
                <div className="modal-countdown-box modal-countdown-box-sec">
                    <span className="modal-countdown-num text-red">{pad(timeLeft.seconds)}</span>
                    <span className="modal-countdown-unit">SECS</span>
                </div>
            </div>
        </div>
    );
}

const PRODUCTS_PER_PAGE = 9;

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All Equipment');
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Modal & Gallery Switcher State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'overview'

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getProducts(30),
            getProductCategories()
        ])
            .then(([prodRes, catRes]) => {
                setProducts(prodRes.products || []);
                setCategories(catRes || []);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error("WooGraphQL Failure: ", e);
                setIsLoading(false);
            });
    }, []);

    // Revert product to regular price when sale schedule expires
    const handleProductExpire = (productId) => {
        setProducts(prev => prev.map(p => {
            if (p.id === productId) {
                return {
                    ...p,
                    onSale: false,
                    saleEndDate: null,
                    price: p.regularPrice || p.price,
                    regularPrice: null,
                    salePrice: null,
                    discountPercent: null
                };
            }
            return p;
        }));

        setSelectedProduct(prev => {
            if (prev && prev.id === productId) {
                return {
                    ...prev,
                    onSale: false,
                    saleEndDate: null,
                    price: prev.regularPrice || prev.price,
                    regularPrice: null,
                    salePrice: null,
                    discountPercent: null
                };
            }
            return prev;
        });
    };

    // Lock body scrolling when modal is open
    useEffect(() => {
        if (selectedProduct) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProduct]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProduct(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setActiveImgIdx(0);
        setActiveTab('specs');
    };

    const validCats = categories.filter(c => c.name?.toLowerCase() !== 'uncategorized');
    const displayCategories = ['All Equipment', ...validCats.map(c => c.name)];

    // Filter & Sort Products
    let filteredProducts = activeCategory === 'All Equipment'
        ? products
        : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
            const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
            return priceA - priceB;
        });
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => {
            const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ''), 10) || 0;
            const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ''), 10) || 0;
            return priceB - priceA;
        });
    }

    // Pagination Calculations (9 equipment items per page)
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNum) => {
        if (pageNum === '...' || pageNum === currentPage || pageNum < 1 || pageNum > totalPages) return;
        setCurrentPage(pageNum);
        const gridElement = document.getElementById('shop-main-section');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getPageNumbers = (current, total) => {
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (current <= 4) {
            return [1, 2, 3, 4, 5, '...', total];
        }
        if (current >= total - 3) {
            return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
        }
        return [1, '...', current - 1, current, current + 1, '...', total];
    };

    const getWhatsAppUrl = (p) => {
        const text = `Hello Philux International, I am interested in purchasing the "${p.name}" priced at ${p.price}. Please provide invoice and delivery details.`;
        return `https://wa.me/2348062899450?text=${encodeURIComponent(text)}`;
    };

    return (
        <React.Fragment>
            <SEO
                title="Security Cameras, Car Trackers & Solar Systems | Philux Store Nigeria"
                description="Shop genuine CCTV cameras, GPS car trackers, solar inverters, lithium batteries, and electric fence equipment with fast delivery across Nigeria."
                canonical="/shop"
                schema={createShopSchema(products)}
            />

            {/* Hero Section */}
            <section className="about-hero bg-graphite text-white">
                <div className="about-hero-bg"></div>
                <div className="container about-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red">SECURITY &amp; SOLAR STORE</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            Security &amp; Energy <span className="text-neutral-400">Equipment.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium">
                            Procure genuine CCTV cameras, vehicle tracking systems, solar inverters, and access control hardware with verified warranties and direct engineer installation across Nigeria.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section id="shop-main-section" className="shop-main bg-off-white text-graphite" style={{ padding: '80px 0' }}>
                <div className="container">

                    {/* Filter & Sort Bar */}
                    <div className="shop-horizontal-filter">
                        <ul className="horizontal-category-list">
                            {displayCategories.map(cat => (
                                <li key={cat}>
                                    <button
                                        type="button"
                                        className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="shop-sort-horizontal">
                            <Filter size={16} color="var(--color-neutral-500)" />
                            <select
                                className="bg-transparent text-graphite border-none outline-none cursor-pointer font-medium"
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="latest">Sort by Latest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="shop-results-meta">
                        <span className="text-neutral-500 font-medium">
                            Showing <strong>{filteredProducts.length > 0 ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> equipment models
                        </span>
                    </div>

                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                            <Loader className="spinner text-red" size={48} />
                        </div>
                    ) : (
                        <>
                            <motion.div layout className="product-grand-grid">
                                <AnimatePresence mode="popLayout">
                                    {paginatedProducts.length > 0 ? (
                                        paginatedProducts.map((product) => {
                                            const galleryCount = product.galleryImages?.length || 1;
                                            return (
                                                <motion.div
                                                    layout
                                                    key={product.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.35 }}
                                                    className="product-card-grand"
                                                >
                                                    {/* Image Area with Gallery Counter & Quick View Overlay */}
                                                    <div className="product-grand-img" onClick={() => openProductModal(product)} style={{ cursor: 'pointer' }}>
                                                        <div className="product-badge-group">
                                                            {product.saleEndDate ? (
                                                                <span className="product-sale-pill product-flash-pill">
                                                                    <Flame size={11} /> LIMITED DEAL
                                                                </span>
                                                            ) : product.onSale ? (
                                                                <span className="product-sale-pill">SALE</span>
                                                            ) : null}
                                                            <span className="product-gallery-pill">
                                                                <Layers size={12} /> {galleryCount} {galleryCount === 1 ? 'Photo' : 'Photos'}
                                                            </span>
                                                        </div>

                                                        <img
                                                            src={product.img}
                                                            alt={product.name}
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.currentTarget.onerror = null;
                                                                e.currentTarget.src = "/images/cctv_surveillance.webp";
                                                            }}
                                                        />

                                                        {/* Scheduled Sale Live Countdown Ribbon */}
                                                        {product.saleEndDate && (
                                                            <CardCountdown
                                                                targetDate={product.saleEndDate}
                                                                onExpire={() => handleProductExpire(product.id)}
                                                            />
                                                        )}

                                                        <div className="product-grand-overlay">
                                                            <button
                                                                type="button"
                                                                className="btn-premium-cart"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openProductModal(product);
                                                                }}
                                                            >
                                                                <Eye size={18} /> View Specs &amp; Gallery
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Card Body */}
                                                    <div className="product-grand-info">
                                                        <div className="label text-red mb-2" style={{ marginBottom: '0.5rem', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                                                            {product.category}
                                                        </div>

                                                        <h3
                                                            className="product-grand-title"
                                                            onClick={() => openProductModal(product)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {product.name}
                                                        </h3>

                                                        {/* Key Specifications Chips */}
                                                        {product.specifications && product.specifications.length > 0 && (
                                                            <div className="product-specs-snippet">
                                                                {product.specifications.map((spec, i) => (
                                                                    <span key={i} className="spec-chip">
                                                                        {spec.label ? (
                                                                            <><strong>{spec.label}:</strong> {spec.value}</>
                                                                        ) : (
                                                                            <span>{spec.value}</span>
                                                                        )}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Price & Action Buttons */}
                                                        <div className="product-card-footer">
                                                            <div className="product-price-container">
                                                                {product.onSale && product.regularPrice ? (
                                                                    <div className="product-discount-price-box">
                                                                        <span className="product-sale-price">{product.price}</span>
                                                                        <span className="product-regular-price">{product.regularPrice}</span>
                                                                        {product.discountPercent && (
                                                                            <span className="product-discount-badge">{product.discountPercent} OFF</span>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="product-grand-price">{product.price}</div>
                                                                )}
                                                            </div>

                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                <button
                                                                    type="button"
                                                                    className="btn-card-specs"
                                                                    onClick={() => openProductModal(product)}
                                                                >
                                                                    Specs <ChevronRight size={14} />
                                                                </button>
                                                                <a
                                                                    href={getWhatsAppUrl(product)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn-card-whatsapp"
                                                                    title="Order directly on WhatsApp"
                                                                >
                                                                    <MessageSquare size={14} /> Order
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    ) : (
                                        <div style={{ padding: '60px 20px', textAlign: 'center', width: '100%', color: 'var(--color-neutral-500)', gridColumn: '1 / -1' }}>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-graphite)' }}>No Equipment Found</h3>
                                            <p>There are no products listed in this category yet.</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Page Pagination Controls (9 products per page) */}
                            {totalPages > 1 && (
                                <nav className="shop-pagination" aria-label="Shop equipment pagination">
                                    <button
                                        type="button"
                                        className="pagination-btn pagination-nav"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        aria-label="Previous Page"
                                    >
                                        <ChevronLeft size={18} /> Prev
                                    </button>

                                    {getPageNumbers(currentPage, totalPages).map((p, idx) => (
                                        p === '...' ? (
                                            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">&hellip;</span>
                                        ) : (
                                            <button
                                                key={p}
                                                type="button"
                                                className={`pagination-btn ${currentPage === p ? 'active' : ''}`}
                                                onClick={() => handlePageChange(p)}
                                                aria-label={`Page ${p}`}
                                                aria-current={currentPage === p ? 'page' : undefined}
                                            >
                                                {p}
                                            </button>
                                        )
                                    ))}

                                    <button
                                        type="button"
                                        className="pagination-btn pagination-nav"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        aria-label="Next Page"
                                    >
                                        Next <ChevronRight size={18} />
                                    </button>
                                </nav>
                            )}
                        </>
                    )}

                </div>
            </section>

            {/* ====================================================
                PRODUCT DETAILS & SPECIFICATIONS MODAL
                ==================================================== */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="product-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="product-modal-dialog"
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                className="product-modal-close"
                                onClick={() => setSelectedProduct(null)}
                                aria-label="Close details"
                            >
                                <X size={20} />
                            </button>

                            {/* Column 1: Multi-Image Gallery Switcher */}
                            <div className="product-modal-gallery-col">
                                <div className="product-modal-main-img-box">
                                    <img
                                        src={
                                            (selectedProduct.galleryImages && selectedProduct.galleryImages[activeImgIdx]) ||
                                            selectedProduct.img
                                        }
                                        alt={selectedProduct.name}
                                        className="product-modal-main-img"
                                    />
                                </div>

                                {/* Thumbnail Switcher for "Other Images" */}
                                {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 1 && (
                                    <>
                                        <div className="product-modal-thumbs-label">
                                            Product Images ({selectedProduct.galleryImages.length})
                                        </div>
                                        <div className="product-modal-thumbs">
                                            {selectedProduct.galleryImages.map((imgSrc, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    className={`product-modal-thumb-btn ${activeImgIdx === idx ? 'active' : ''}`}
                                                    onClick={() => setActiveImgIdx(idx)}
                                                >
                                                    <img src={imgSrc} alt={`${selectedProduct.name} photo ${idx + 1}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Column 2: Product Info, Specifications & Actions */}
                            <div className="product-modal-details-col">
                                <div className="product-modal-header-meta">
                                    <span className="label text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}>
                                        {selectedProduct.category}
                                    </span>
                                    <span className="product-modal-stock-badge">
                                        In Stock &bull; Certified
                                    </span>
                                </div>

                                <h2 className="product-modal-title">{selectedProduct.name}</h2>

                                {/* Scheduled Sale Live Countdown in Modal */}
                                {selectedProduct.saleEndDate && (
                                    <ModalCountdown
                                        targetDate={selectedProduct.saleEndDate}
                                        onExpire={() => handleProductExpire(selectedProduct.id)}
                                    />
                                )}

                                <div className="product-modal-price-box">
                                    {selectedProduct.onSale && selectedProduct.regularPrice ? (
                                        <div className="modal-discount-row">
                                            <span className="modal-sale-price">{selectedProduct.price}</span>
                                            <span className="modal-regular-price">{selectedProduct.regularPrice}</span>
                                            {selectedProduct.discountPercent && (
                                                <span className="modal-discount-tag">{selectedProduct.discountPercent} OFF</span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="product-modal-price">{selectedProduct.price}</div>
                                    )}
                                </div>

                                {/* Tabs: Specifications vs Overview */}
                                <div className="product-modal-tabs">
                                    <button
                                        type="button"
                                        className={`product-modal-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('specs')}
                                    >
                                        Technical Specifications
                                    </button>
                                    <button
                                        type="button"
                                        className={`product-modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview &amp; Description
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="product-modal-tab-content">
                                    {activeTab === 'specs' ? (
                                        <div className="specs-table-wrapper">
                                            <table className="specs-table">
                                                <tbody>
                                                    {selectedProduct.specifications && selectedProduct.specifications.length > 0 ? (
                                                        selectedProduct.specifications.map((spec, idx) => (
                                                            <tr key={idx}>
                                                                {spec.label ? (
                                                                    <>
                                                                        <td className="specs-label">{spec.label}</td>
                                                                        <td className="specs-value">{spec.value}</td>
                                                                    </>
                                                                ) : (
                                                                    <td className="specs-value" colSpan="2" style={{ fontWeight: 600 }}>
                                                                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-red)', marginRight: '10px', verticalAlign: 'middle' }}></span>
                                                                        {spec.value}
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td className="specs-label">Information</td>
                                                            <td className="specs-value">Contact Philux for specialized engineering datasheet.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div
                                            className="product-description-prose"
                                            dangerouslySetInnerHTML={{
                                                __html: selectedProduct.description || selectedProduct.shortDescription || "<p>Genuine certified equipment from Philux International.</p>"
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="product-modal-actions">
                                    <a
                                        href={getWhatsAppUrl(selectedProduct)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-modal-whatsapp"
                                    >
                                        <MessageSquare size={18} /> Order via WhatsApp
                                    </a>
                                    <Link
                                        href={`/contact?equipment=${encodeURIComponent(selectedProduct.name)}`}
                                        className="btn-modal-quote"
                                    >
                                        <PhoneCall size={16} /> Request Quote / Consultation
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FinalCta />
        </React.Fragment>
    );
};
