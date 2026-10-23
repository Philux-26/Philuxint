import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { SEO } from '../components/SEO';
import { ChevronLeft, Calendar, Loader, User } from 'lucide-react';
import { getSinglePost, getCategories } from '../services/wp-api';
import { CommentSection } from '../components/CommentSection';
import { FinalCta } from '../components/FinalCta';

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

    return "Philux International maintains a dedicated roster of certified Systems Integrators providing direct operational security, tracking, and clean energy engineering for homes and businesses across Nigeria.";
}

export default function BlogPost() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategories().then(cats => {
            if (cats && cats.length > 0) setCategories(cats);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        if (router.isReady && id) {
            window.scrollTo(0, 0);
            setIsLoading(true);
            getSinglePost(id).then(res => {
                setPost(res);
                setIsLoading(false);
            }).catch(err => {
                console.error(err);
                setIsLoading(false);
            });
        }
    }, [id, router.isReady]);

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

    return (
        <React.Fragment>
            <SEO
                title={`${post.title} | Philux Insights`}
                description={post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) : "Security tips, car safety advice, and updates from Philux International."}
                canonical={`/${post.slug || id}`}
                ogType="article"
                ogImage={post.imageUrl || undefined}
            />

            <article className="single-post-container bg-off-white">
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

                            <div
                                className="wp-content-payload"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            <hr className="post-divider" />

                            <CommentSection postId={post.id} />
                        </div>

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
};
