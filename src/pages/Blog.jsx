import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { SEO } from '../components/SEO';
import Link from "next/link";

import { FinalCta } from '../components/FinalCta';
import { Button } from '../components/ui/Button';
import { getPosts, getCategories } from '../services/wp-api';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState(null);
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    useEffect(() => {
        const fetchFeed = async () => {
            cursor === null ? setIsLoading(true) : setIsFetchingMore(true);
            try {
                const res = await getPosts(6, cursor, activeCat);
                if (cursor === null) {
                    setPosts(res.posts);
                } else {
                    setPosts(prev => [...prev, ...res.posts]);
                }
                setHasNextPage(res.pageInfo.hasNextPage);
                setCursor(res.pageInfo.endCursor); // Ready for next fetch
            } catch (err) {
                console.error("GraphQL API Failure loading posts", err);
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        };
        fetchFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCat]); // activeCat triggers a fresh reset fetch, cursor load handled manually below

    const handleFilter = (catId) => {
        if (activeCat === catId) return;
        setActiveCat(catId);
        setCursor(null); // Reset pagination cursor
    };

    const handleLoadMore = () => {
        if (!hasNextPage || !cursor) return;
        setIsFetchingMore(true);
        getPosts(6, cursor, activeCat).then(res => {
            setPosts(prev => [...prev, ...res.posts]);
            setHasNextPage(res.pageInfo.hasNextPage);
            setCursor(res.pageInfo.endCursor);
            setIsFetchingMore(false);
        });
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
                                                    <Link href={`/blog/${post.id}`} className="blog-read-more" aria-label={`Read more about ${post.title}`}>
                                                        Read Full Post <ArrowRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination Logic */}
                            {hasNextPage && (
                                <div className="blog-load-more-container">
                                    <Button
                                        variant="primary"
                                        onClick={handleLoadMore}
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
}
