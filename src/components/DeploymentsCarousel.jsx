import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram as IgIcon, X } from 'lucide-react';

const DEPLOYMENTS = [
    { id: 1, videoSrc: '/videos/Solar_installation.mp4' },
    { id: 2, videoSrc: '/videos/Inverter.mp4' },
    { id: 3, videoSrc: '/videos/Smart_Lock.mp4' },
    { id: 4, videoSrc: '/videos/Ads.mp4' },
];

export const DeploymentsCarousel = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (activeVideo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [activeVideo]);

    return (
        <section className="deployments-carousel-section bg-graphite text-white">
            <div className="container">
                <div className="carousel-header-flex">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="label text-red mb-2">RECENT WORK</div>
                        <h2 className="heading-section">Security Installations in Action</h2>
                        <p className="text-neutral-300 max-w-2xl mt-4">See our security technicians at work across Lagos and nationwide. Watch real installations of CCTV cameras, car tracking, electric fencing, and solar backup systems.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, delay: 0.2 }}
                        className="carousel-cta-wrapper"
                    >
                        <a href="https://www.instagram.com/philuxint/" target="_blank" rel="noopener noreferrer" className="creative-ig-cta">
                            <div className="ig-icon-wrapper">
                                <IgIcon size={20} />
                            </div>
                            <span className="ig-cta-text">Explore Our Instagram</span>
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="carousel-track-container mt-12 pb-12">
                <div className="carousel-track">
                    {DEPLOYMENTS.map((item) => (
                        <DeploymentCard key={item.id} item={item} onSelect={() => setActiveVideo(item)} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeVideo && (
                    <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
                )}
            </AnimatePresence>
        </section>
    );
};

const DeploymentCard = ({ item, onSelect }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMouseEnter = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play().catch((e) => console.log('Video play error:', e));
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0.5;
        }
    };

    return (
        <motion.div
            className="deployment-card shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            onClick={onSelect}
        >
            <video
                ref={videoRef}
                src={`${item.videoSrc}#t=0.5`}
                className={`deployment-video ${isPlaying ? 'playing' : ''}`}
                preload="metadata"
                loop
                muted
                playsInline
            />

            <div className="deployment-overlay">
                <div className="deployment-status">
                    {isPlaying ? <div className="recording-dot" /> : <Play size={14} fill="white" />}
                    <span>{isPlaying ? 'PLAYING PREVIEW' : 'CLICK TO WATCH'}</span>
                </div>
            </div>
        </motion.div>
    );
};

const VideoModal = ({ item, onClose }) => {
    return (
        <motion.div
            className="video-cinematic-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <div className="modal-close-btn" onClick={onClose}><X size={32} /></div>

            <motion.div
                className="video-cinematic-content"
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    src={item.videoSrc}
                    controls
                    autoPlay
                    className="full-cinematic-player"
                    playsInline
                />
            </motion.div>
        </motion.div>
    );
};
