import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Calendar } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { createBlogPostSchema } from '../../utils/seoSchemas';
import { CommentSection } from '../../components/CommentSection';
import { FinalCta } from '../../components/FinalCta';
import { getSinglePost, getAllPostIds } from '../../services/wp-api';

export default function BlogPost({ post }) {
    if (!post) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-off-white">
                <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-red hover:underline">Return to Blog</Link>
            </div>
        );
    }

    const strippedExcerpt = post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) : "Security tips, car safety advice, and insights from Philux International.";
    const schemaData = createBlogPostSchema(post);

    return (
        <React.Fragment>
            <SEO
                title={`${post.title} | Philux Insights`}
                description={strippedExcerpt}
                canonical={`/blog/${post.id}`}
                ogType="article"
                ogImage={post.imageUrl || undefined}
                schema={schemaData}
            />

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

                            {/* Recursive WordPress Hierarchical Comment Thread */}
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
}

export async function getStaticPaths() {
    try {
        const ids = await getAllPostIds();
        const paths = ids.map((id) => ({
            params: { id: id.toString() }
        }));
        return {
            paths,
            fallback: false
        };
    } catch (err) {
        console.warn("getStaticPaths fallback engaged:", err);
        return {
            paths: [],
            fallback: false
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const post = await getSinglePost(params.id);
        if (!post) {
            return { notFound: true };
        }
        return {
            props: {
                post
            }
        };
    } catch (err) {
        console.error("getStaticProps error:", err);
        return { notFound: true };
    }
}
