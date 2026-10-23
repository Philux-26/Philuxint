import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronLeft, Calendar, Loader, User } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { createBlogPostSchema } from '../../utils/seoSchemas';
import { CommentSection } from '../../components/CommentSection';
import { FinalCta } from '../../components/FinalCta';
import { getSinglePost, getAllPostIds, getCategories } from '../../services/wp-api';

function getCategoryDescription(categoryName = '') {
    const cat = (categoryName || '').toLowerCase();

    if (cat.includes('cctv') || cat.includes('surveillance')) {
        return "Philux International deploys enterprise-grade IP CCTV surveillance, AI motion detection, and 24/7 solar-backed recording systems to secure estates, commercial facilities, and residential properties across Nigeria.";
    }
    if (cat.includes('solar') || cat.includes('energy') || cat.includes('inverter')) {
        return "Philux International engineers reliable solar and inverter power backup solutions, ensuring continuous 24/7 power for critical security infrastructure and businesses throughout Nigeria.";
    }
    if (cat.includes('track') || cat.includes('vehicle') || cat.includes('fleet')) {
        return "Philux International provides advanced GPS vehicle telematics, remote engine immobilization, and real-time fleet monitoring to protect logistics and corporate assets nationwide.";
    }
    if (cat.includes('access') || cat.includes('control') || cat.includes('biometric') || cat.includes('turnstile')) {
        return "Philux International provides smart biometric access control, RFID turnstiles, and automated time-attendance systems to control entry points for high-security facilities and corporate offices in Nigeria.";
    }
    if (cat.includes('fence') || cat.includes('fencing') || cat.includes('electric')) {
        return "Philux International designs and installs certified high-voltage perimeter electric fencing with smart siren triggers to safeguard residential compounds and commercial perimeters.";
    }
    if (cat.includes('project') || cat.includes('deployment') || cat.includes('case')) {
        return "Philux International delivers turnkey security, energy, and intelligent infrastructure integration across Nigeria. Explore our real-world engineering project case studies and enterprise field installations.";
    }

    // Default fallback
    return "Philux International maintains a dedicated roster of certified Systems Integrators providing direct operational security, tracking, and clean energy engineering for homes and businesses across Nigeria.";
}

export default function BlogPost({ post: initialPost, categories: initialCategories = [] }) {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState(initialPost);
    const [categories, setCategories] = useState(initialCategories);
    const [isLoading, setIsLoading] = useState(!initialPost);

    // Fetch categories for sidebar if not pre-rendered
    useEffect(() => {
        if (!categories || categories.length === 0) {
            getCategories().then(cats => {
                if (cats && cats.length > 0) setCategories(cats);
            }).catch(console.error);
        }
    }, [categories]);

    // Dynamic client-side fetch for newly published WordPress posts not in the static build
    useEffect(() => {
        if (initialPost) {
            setPost(initialPost);
            setIsLoading(false);
            return;
        }

        if (router.isReady && id) {
            setIsLoading(true);
            getSinglePost(id)
                .then(data => {
                    setPost(data);
                })
                .catch(err => {
                    console.error("Failed to load post dynamically:", err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id, initialPost, router.isReady]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-off-white" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <Loader className="spinner text-red" size={48} />
                <p className="text-neutral-500">Loading article...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-off-white" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <h1 className="text-3xl font-bold mb-4" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Article Not Found</h1>
                <p className="text-neutral-600 mb-6" style={{ marginBottom: '1.5rem', color: '#666' }}>The requested post may have been moved or unpublished.</p>
                <Link href="/blog" className="btn btn-primary" style={{ textDecoration: 'none' }}>Return to Blog</Link>
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
                canonical={`/blog/${post.slug || post.id}`}
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
                            {post.author && (
                                <div className="post-author" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', opacity: 0.85 }}>
                                    <User size={13} /> {post.author}
                                </div>
                            )}
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
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/cctv_surveillance.webp";
                                        }}
                                    />
                                </div>
                            )}

                            {/* Rendered WP HTML payload securely contained in wrapper for styling */}
                            <div
                                className="wp-content-payload"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {post.tags && post.tags.length > 0 && (
                                <div className="post-tags-container" style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag-pill bg-neutral-200 text-graphite label" style={{ padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '11px', textTransform: 'uppercase' }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <hr className="post-divider" />

                            {/* WordPress Hierarchical Comment Thread */}
                            <CommentSection postId={post.id} />
                        </div>

                        {/* Sidebar */}
                        <aside className="post-sidebar">
                            <div className="sidebar-widget">
                                <h3 className="sidebar-title">
                                    About Philux {post.categoryName || 'Intelligence'}
                                </h3>
                                <p className="sidebar-text">
                                    {getCategoryDescription(post.categoryName)}
                                </p>
                                <hr className="sidebar-divider" />
                                <h3 className="sidebar-title">Categories</h3>
                                <ul className="sidebar-categories">
                                    {categories.map((cat) => {
                                        const isActive = (post.categoryName && post.categoryName.toLowerCase() === cat.name.toLowerCase()) || (post.categoryId && post.categoryId === cat.id);
                                        return (
                                            <li key={cat.id || cat.slug}>
                                                <Link
                                                    href={`/blog?cat=${cat.id}`}
                                                    className={isActive ? 'text-red font-bold' : ''}
                                                    style={isActive ? { color: 'var(--color-red)', fontWeight: 700 } : {}}
                                                >
                                                    {cat.name}
                                                </Link>
                                            </li>
                                        );
                                    })}
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
        const [post, categories] = await Promise.all([
            getSinglePost(params.id),
            getCategories()
        ]);

        if (!post) {
            return { notFound: true };
        }
        return {
            props: {
                post,
                categories: categories || []
            }
        };
    } catch (err) {
        console.error("getStaticProps error:", err);
        return { notFound: true };
    }
}
