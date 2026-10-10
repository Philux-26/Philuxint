import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const PROJECTS = [
    { id: 1, title: 'National Bank HQ', category: 'SECURITY & ACCESS', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', size: 'large' },
    { id: 2, title: 'Apex Logistics Fleet', category: 'TRACKING', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80', size: 'small' },
    { id: 3, title: 'Solar Array Complex', category: 'ENERGY', img: 'https://images.unsplash.com/photo-1509391366360-1e97d5261688?auto=format&fit=crop&w=800&q=80', size: 'small' },
    { id: 4, title: 'Industrial Fire Defense', category: 'FIRE SAFETY', img: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80', size: 'large' },
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
