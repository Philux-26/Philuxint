import React from 'react';
import { Button } from './ui/Button';
import { Phone, MessageCircle } from 'lucide-react';
import { trackContactClick } from '../utils/analytics';

export const FinalCta = () => {
    return (
        <section className="final-cta-section bg-graphite text-white">
            <div className="cta-geometry-bg"></div>

            <div className="container cta-container">
                <h2 className="heading-display cta-headline">
                    PROTECT YOUR PROPERTY<br />&amp; ASSETS TODAY.
                </h2>

                <div className="cta-actions">
                    <Button variant="primary" icon="right" href="#quote" className="btn-large">
                        Request a Quote
                    </Button>

                    <div className="cta-secondary-actions">
                        <a
                            href="https://wa.me/2349064646062"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-link-icon"
                            onClick={() => trackContactClick('whatsapp')}
                        >
                            <MessageCircle size={20} />
                            <span>WhatsApp Us</span>
                        </a>
                        <a
                            href="tel:+2349064646062"
                            className="cta-link-icon"
                            onClick={() => trackContactClick('phone')}
                        >
                            <Phone size={20} />
                            <span>Call Sales</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
