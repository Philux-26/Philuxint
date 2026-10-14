import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const PROJECTS = [
    { id: 1, title: 'National Bank HQ', category: 'SECURITY & ACCESS', img: '/images/projects/national-bank.jpg', size: 'large' },
    { id: 2, title: 'Apex Logistics Fleet', category: 'TRACKING', img: '/images/projects/apex-logistics.jpg', size: 'small' },
    { id: 3, title: 'Solar Array Complex', category: 'ENERGY', img: '/images/projects/solar-complex.jpg', size: 'small' },
    { id: 4, title: 'Industrial Fire Defense', category: 'FIRE SAFETY', img: '/images/projects/fire-defense.jpg', size: 'large' },
];

export const FeaturedProjects = () => {
    return (
        <section className="projects-section" id="projects">
            <div className="container">

                <div className="projects-header">
                    <div className="label">PORTFOLIO</div>
                    <div className="projects-header-content">
                        <h2 className="heading-section">Featured Projects</h2>
                        <Button variant="secondary" icon="none" href="#projects-all" style={{ border: 'none', padding: 0 }}>
                            VIEW ALL PROJECTS <ArrowRight size={18} style={{ marginLeft: 8 }} />
                        </Button>
                    </div>
                </div>

                <div className="projects-grid">
                    {PROJECTS.map((proj, i) => (
                        <motion.a
                            href="#project-detail"
                            key={proj.id}
                            className={`project-card ${proj.size}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className="project-image-wrapper">
                                <div className="project-overlay"></div>
                                <img src={proj.img} alt={proj.title} />
                            </div>
                            <div className="project-hover-content">
                                <div className="project-meta">
                                    <span className="project-category">{proj.category}</span>
                                    <h3 className="project-title">{proj.title}</h3>
                                </div>
                                <div className="project-view-indicator">
                                    <span>VIEW PROJECT</span>
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
};
