import React from 'react';
import { Button } from './ui/Button';
import './FinalCta.css';
import { Phone, MessageCircle } from 'lucide-react';

export const FinalCta = () => {
    return (
        <section className="final-cta-section bg-graphite text-white">
            <div className="cta-geometry-bg"></div>

            <div className="container cta-container">
                <h2 className="heading-display cta-headline">
                    LET'S BUILD A SMARTER,<br />SAFER ENVIRONMENT.
                </h2>

                <div className="cta-actions">
                    <Button variant="primary" icon="right" href="#quote" className="btn-large">
                        Request a Quote
                    </Button>

                    <div className="cta-secondary-actions">
                        <a href="https://wa.me/something" className="cta-link-icon">
                            <MessageCircle size={20} />
                            <span>WhatsApp Us</span>
                        </a>
                        <a href="tel:+234" className="cta-link-icon">
                            <Phone size={20} />
                            <span>Call Sales</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
