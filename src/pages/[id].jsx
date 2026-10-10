import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { Helmet } from 'react-helmet-async';
import { ChevronLeft, Calendar, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSinglePost } from '../services/wp-api';
import { CommentSection } from '../components/CommentSection';
import { FinalCta } from '../components/FinalCta';

export default function BlogPost() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getSinglePost(id).then(res => {
            setPost(res);
            setIsLoading(false);
        }).catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-off-white">
                <Loader className="animate-spin text-red" size={64} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-off-white">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-red hover:underline">Return to Blog</Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{post.title} | Philux Insights</title>
                {/* Dynamically extract excerpt via regex if strictly necessary, but WP meta handles it */}
            </Helmet>

            <article className="single-post-container bg-off-white">

                {/* Visual Header block bleeds to top */}
                <header className="single-post-header">
                    <div className="container">
                        <Link href="/blog" className="back-link">
                            <ChevronLeft size={16} /> Back to News
                        </Link>

                        <div className="single-post-meta">
                            <div className="post-category-pill">{post.categoryName}</div>
                            <div className="post-date">
                                <Calendar size={14} /> {post.date}
                            </div>
                        </div>

                        <h1 className="single-post-title" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
                    </div>
                </header>

                <div className="container">
                    <div className="single-post-grid">

                        {/* Primary Content Column */}
                        <div className="post-content-column">
                            {post.imageUrl && (
                                <div className="post-featured-image">
                                    <img src={post.imageUrl} alt={post.title} />
                                </div>
                            )}

                            {/* Rendered WP HTML payload securely contained in wrapper for styling */}
                            <div
                                className="wp-content-payload"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <hr className="post-divider" />

                            {/* Recursive Word Press Hierarchical Comment Thread */}
                            <CommentSection postId={post.id} />
                        </div>

                        {/* Sidebar */}
                        <aside className="post-sidebar">
                            <div className="sidebar-widget">
                                <h3 className="sidebar-title">About Philux Intelligence</h3>
                                <p className="sidebar-text">
                                    Philux International maintains a dedicated roster of specialized Systems Integrators passing operational knowledge onto our commercial partners.
                                </p>
                                <hr className="sidebar-divider" />
                                <h3 className="sidebar-title">Categories</h3>
                                <ul className="sidebar-categories">
                                    <li><Link href="/blog">Security Architectures</Link></li>
                                    <li><Link href="/blog">Logistics & Tracking</Link></li>
                                    <li><Link href="/blog">Renewable Energy</Link></li>
                                    <li><Link href="/blog">Facility Management</Link></li>
                                    <li><Link href="/blog" className="text-red font-bold">Internal Projects</Link></li>
                                </ul>
                            </div>
                        </aside>

                    </div>
                </div>
            </article>

            <FinalCta />
        </React.Fragment>
    );
};
