import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import Link from "next/link";
import { useRouter } from 'next/router';

import { FinalCta } from '../components/FinalCta';
import { Button } from '../components/ui/Button';
import { getPosts, getCategories } from '../services/wp-api';

const POSTS_PER_PAGE = 9;

export default function Blog() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    // Read ?cat=ID query parameter from URL if arriving from post sidebar
    useEffect(() => {
        if (router.isReady && router.query.cat) {
            const catId = parseInt(router.query.cat, 10);
            if (!isNaN(catId)) {
                setActiveCat(catId);
                setCurrentPage(1);
            }
        }
    }, [router.isReady, router.query.cat]);

    useEffect(() => {
        const fetchFeed = async () => {
            setIsLoading(true);
            try {
                // Fetch up to 100 posts for the active category for fast, instant client pagination
                const res = await getPosts(100, null, activeCat);
                setPosts(res.posts || []);
                setCurrentPage(1);
            } catch (err) {
                console.error("GraphQL API Failure loading posts", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeed();
    }, [activeCat]);

    const handleFilter = (catId) => {
        if (activeCat === catId) return;
        setActiveCat(catId);
        setCurrentPage(1);
    };

    // Calculate pagination values
    const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    const paginatedPosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    const handlePageChange = (pageNum) => {
        if (pageNum === '...' || pageNum === currentPage || pageNum < 1 || pageNum > totalPages) return;
        setCurrentPage(pageNum);
        const feedElement = document.getElementById('blog-feed-container');
        if (feedElement) {
            feedElement.scrollIntoView({ behavior: 'smooth' });
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

    return (
        <React.Fragment>
            <SEO
                title="Security Tips, Safety Advice & News | Philux International"
                description="Helpful security guides, car tracking tips, CCTV advice, and solar power updates for Nigerian homeowners and businesses."
                canonical="/blog"
            />

            {/* Unified Text Hero */}
            <section className="blog-hero-optimized bg-graphite text-white">
                <div className="blog-hero-bg"></div>
                <div className="container relative z-10 blog-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red mb-4">SECURITY BLOG</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            News &amp; <span className="text-neutral-400">Security Tips.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium">
                            Practical security guides, car tracking advice, and solar power tips from our experienced security specialists in Nigeria.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Blog Grid */}
            <section id="blog-feed-container" className="blog-feed-section bg-off-white">
                <div className="container">

                    {/* Category Filter Taxonomy */}
                    <div className="blog-filter-container">
                        <div className="blog-filter-tabs">
                            <button
                                className={`filter-pill ${activeCat === null ? 'active' : ''}`}
                                onClick={() => handleFilter(null)}
                            >
                                All Posts
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`filter-pill ${activeCat === cat.id ? 'active' : ''}`}
                                    onClick={() => handleFilter(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="blog-loader-container">
                            <Loader className="spinner text-red" size={48} />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="blog-empty-state" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>No Articles Found</h3>
                            <p className="text-neutral-600" style={{ marginBottom: '1.5rem' }}>There are no articles currently published under this category.</p>
                            <Button variant="primary" onClick={() => handleFilter(null)}>
                                View All Articles
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="blog-grid-container">
                                <AnimatePresence mode="popLayout">
                                    {paginatedPosts.map((post) => (
                                        <motion.article
                                            key={post.id}
                                            className="blog-card"
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="blog-card-image">
                                                <div className="blog-category-badge">{post.categoryName}</div>
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "/images/cctv_surveillance.webp";
                                                    }}
                                                />
                                            </div>
                                            <div className="blog-card-content">
                                                <div className="blog-meta">
                                                    <Calendar size={14} className="text-red" />
                                                    <span className="blog-date" style={{ color: 'whitesmoke' }}>{post.date}</span>
                                                </div>
                                                <h3 className="blog-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>

                                                {/* Render Tags if available from GraphQL */}
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="blog-tags" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                                                        {post.tags.map(tag => (
                                                            <span key={tag} className="tag-pill bg-neutral-200 text-graphite label" style={{ padding: '0.2rem 0.5rem', fontSize: '10px' }}>#{tag}</span>
                                                        ))}
                                                    </div>
                                                )}

                                                <p className="blog-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>

                                                <div className="blog-card-action">
                                                    <Link href={`/blog/${post.slug || post.id}`} className="blog-read-more" aria-label={`Read more about ${post.title}`}>
                                                        Read Full Post <ArrowRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Page Pagination Controls (9 cards per page) */}
                            {totalPages > 1 && (
                                <nav className="blog-pagination" aria-label="Blog articles pagination">
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

            <FinalCta />
        </React.Fragment>
    );
}
