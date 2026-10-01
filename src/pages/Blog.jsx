import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FinalCta } from '../components/FinalCta';
import { Button } from '../components/ui/Button';
import { getPosts, getCategories } from '../services/wp-api';
import './Blog.css';

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    useEffect(() => {
        const fetchFeed = async () => {
            page === 1 ? setIsLoading(true) : setIsFetchingMore(true);
            try {
                const res = await getPosts(page, activeCat, 6);
                if (page === 1) {
                    setPosts(res.posts);
                } else {
                    setPosts(prev => [...prev, ...res.posts]);
                }
                setTotalPages(res.totalPages);
            } catch (err) {
                console.error("WP API Failure loading posts", err);
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        };
        fetchFeed();
    }, [page, activeCat]);

    const handleFilter = (catId) => {
        if (activeCat === catId) return;
        setActiveCat(catId);
        setPage(1);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Insights & News | Philux International</title>
                <meta name="description" content="Stay updated with the latest technological developments in security, renewable energy, and facility management." />
            </Helmet>

            {/* Unified Text Hero */}
            <section className="blog-hero-optimized bg-graphite text-white">
                <div className="blog-hero-bg"></div>
                <div className="container relative z-10 blog-hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="label text-red mb-4">OUR INSIGHTS</div>
                        <h1 className="hero-heading mt-4 mb-4" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                            News & <span className="text-neutral-400">Knowledge.</span>
                        </h1>
                        <p className="hero-subtext text-neutral-300 max-w-2xl mt-6 font-medium">
                            Read the latest deployment briefs, technological deep-dives, and strategic thought leadership from our engineering specialists.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Dynamic Blog Grid */}
            <section className="blog-feed-section bg-off-white">
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
                    ) : (
                        <>
                            <div className="blog-grid-container">
                                <AnimatePresence mode="popLayout">
                                    {posts.map((post, index) => (
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
                                                <img src={post.imageUrl} alt={post.title} />
                                            </div>
                                            <div className="blog-card-content">
                                                <div className="blog-meta">
                                                    <Calendar size={14} className="text-red" />
                                                    <span>{post.date}</span>
                                                </div>
                                                <h3 className="blog-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                                                <p className="blog-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>

                                                <div className="blog-card-action">
                                                    <Link to={`/blog/${post.id}`} className="blog-read-more" aria-label={`Read more about ${post.title}`}>
                                                        Read Full Post <ArrowRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination Logic */}
                            {page < totalPages && (
                                <div className="blog-load-more-container">
                                    <Button
                                        variant="primary"
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={isFetchingMore}
                                    >
                                        {isFetchingMore ? 'Loading...' : 'Load Older Posts'}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <FinalCta />
        </React.Fragment>
    );
};
