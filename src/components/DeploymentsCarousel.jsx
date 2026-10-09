import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Instagram as IgIcon, X } from 'lucide-react';
import './DeploymentsCarousel.css';

const DEPLOYMENTS = [
    { id: 1, title: 'Solar Array Integration', location: 'Lekki Phase 1', videoSrc: '/videos/sample_solar.mp4', fullVideoSrc: '/videos/full_solar.mp4', poster: '/images/solar_energy.png' },
    { id: 2, title: 'CCTV Matrix Installation', location: 'Victoria Island HQ', videoSrc: '/videos/sample_cctv.mp4', fullVideoSrc: '/videos/full_cctv.mp4', poster: '/images/cctv_surveillance.png' },
    { id: 3, title: 'Vehicle Tracking Deploy', location: 'Apapa Logistics', videoSrc: '/videos/sample_tracking.mp4', fullVideoSrc: '/videos/full_tracking.mp4', poster: '/images/vehicle_tracking.png' },
    { id: 4, title: 'Corporate Access Control', location: 'Ikoyi Offices', videoSrc: '/videos/sample_access.mp4', fullVideoSrc: '/videos/full_access.mp4', poster: '/images/access_control.png' },
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
                        <div className="label text-red mb-2">FIELD OPERATIONS</div>
                        <h2 className="heading-section">Recent Deployments</h2>
                        <p className="text-neutral-300 max-w-2xl mt-4">Witness our engineering teams in action across Nigeria. Hover to preview snippets, click to watch full deployments natively.</p>
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
            if (!videoRef.current.src) {
                videoRef.current.src = item.videoSrc;
            }
            videoRef.current.play().catch((e) => console.log('Video play error:', e));
        }
    };

    const handleMouseLeave = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
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
            <div className="deployment-poster" style={{ backgroundImage: `url(${item.poster})` }}></div>

            <video
                ref={videoRef}
                className={`deployment-video ${isPlaying ? 'playing' : ''}`}
                preload="none"
                loop
                muted
                playsInline
                poster={item.poster}
            />

            <div className="deployment-overlay">
                <div className="deployment-status">
                    {isPlaying ? <div className="recording-dot" /> : <Play size={14} fill="white" />}
                    <span>{isPlaying ? 'PREVIEWING' : 'CLICK FOR FULL'}</span>
                </div>

                <div className="deployment-info">
                    <h3 className="deployment-title">{item.title}</h3>
                    <p className="deployment-location">{item.location}</p>
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
                    src={item.fullVideoSrc || item.videoSrc}
                    controls
                    autoPlay
                    className="full-cinematic-player"
                    playsInline
                />

                <div className="video-modal-info">
                    <h2>{item.title}</h2>
                    <p>{item.location}</p>
                    <div className="live-badge mt-4 border border-red text-red px-3 py-1 rounded inline-block text-sm font-bold bg-black bg-opacity-50 blur-0">
                        NATIVE HTML5 THEATRE
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
