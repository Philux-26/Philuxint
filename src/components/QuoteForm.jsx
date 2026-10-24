import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { trackLeadConversion } from '../utils/analytics';

const SERVICES = ['Vehicle Tracking', 'Solar & Inverter', 'CCTV Surveillance', 'Electric Fencing', 'Access Control', 'Fire Alarm & Sprinkler'];
const PROJECT_TYPES = ['Residential', 'Commercial', 'Industrial', 'Government/Public', 'Other'];
const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp'];

export const QuoteForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', company: '', email: '', phone: '',
        service: '', location: '', projectType: '',
        description: '', contactMethod: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const nextStep = (e) => {
        e.preventDefault();
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const TARGET_EMAIL = 'realtundeonline@gmail.com';
    const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;
    const LOCAL_API_URL = '/api/send-email.php';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: formData.name,
            company: formData.company || 'N/A',
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            location: formData.location,
            projectType: formData.projectType,
            description: formData.description,
            contactMethod: formData.contactMethod,
            _subject: `New Philux Quote: ${formData.service || 'Security'} from ${formData.name}`,
            _template: 'table',
            _captcha: 'false',
        };

        const isLocal = typeof window !== 'undefined' && 
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (isLocal) {
            // In local development, Next.js static dev server cannot execute PHP (returns 405).
            // Directly submit to FormSubmit targeting realtundeonline@gmail.com
            try {
                await fetch(FORMSUBMIT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
            } catch (err) {
                console.warn('Local dev submission note:', err);
            }
        } else {
            // In production, execute the cPanel PHP script sending directly via PHP mail() to realtundeonline@gmail.com
            try {
                const res = await fetch(LOCAL_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!res.ok) {
                    // Fallback to FormSubmit if server PHP mail temporarily fails
                    await fetch(FORMSUBMIT_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                }
            } catch (err) {
                console.warn('Production endpoint fallback to FormSubmit:', err);
                try {
                    await fetch(FORMSUBMIT_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                } catch (fbErr) {
                    console.error('Submission error:', fbErr);
                }
            }
        }

        trackLeadConversion({
            service: formData.service,
            projectType: formData.projectType,
            location: formData.location,
            contactMethod: formData.contactMethod
        });

        setIsSubmitting(false);
        setStep(4);
    };

    return (
        <section className="quote-section bg-off-white" id="quote">
            <div className="container quote-container">
                <div className="quote-intro">
                    <div className="label">REQUEST A QUOTE</div>
                    <h2 className="heading-section mt-4 mb-4" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Start your project.</h2>
                    <p className="text-neutral-700" style={{ maxWidth: '400px' }}>
                        Tell us what you want to protect. Our security team will review your request and get back to you with a free, customized quotation.
                    </p>
                </div>

                <div className="quote-form-wrapper">
                    <div className="form-progress">
                        <div className="progress-bar">
                            <div
                                className="progress-fill bg-red"
                                style={{ width: step >= 4 ? '100%' : `${((step - 1) / 2) * 100}%` }}
                            ></div>
                        </div>
                        <div className="progress-steps label text-red">
                            {step < 4 ? `STEP 0${step} / 03` : 'COMPLETE'}
                        </div>
                    </div>

                    <div className="form-body">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form
                                    key="step1"
                                    onSubmit={nextStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="quote-form-step"
                                >
                                    <h3 className="form-step-title">Contact Details</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                                        </div>
                                        <div className="form-group">
                                            <label>Company / Organization</label>
                                            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 XXX XXXX" />
                                        </div>
                                    </div>
                                    <div className="form-actions right">
                                        <Button type="submit">Next Step</Button>
                                    </div>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.form
                                    key="step2"
                                    onSubmit={nextStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="quote-form-step"
                                >
                                    <h3 className="form-step-title">Project Details</h3>
                                    <div className="form-group">
                                        <label>Primary Service Interested In</label>
                                        <select required name="service" value={formData.service} onChange={handleChange}>
                                            <option value="" disabled>Select a service...</option>
                                            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Project Location</label>
                                            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, State / Region" />
                                        </div>
                                        <div className="form-group">
                                            <label>Project Type</label>
                                            <select required name="projectType" value={formData.projectType} onChange={handleChange}>
                                                <option value="" disabled>Select project type...</option>
                                                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-actions space-between">
                                        <button type="button" className="btn-text label" onClick={prevStep}>Back</button>
                                        <Button type="submit">Next Step</Button>
                                    </div>
                                </motion.form>
                            )}

                            {step === 3 && (
                                <motion.form
                                    key="step3"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="quote-form-step"
                                >
                                    <h3 className="form-step-title">Message & Preferences</h3>
                                    <div className="form-group">
                                        <label>Project Description</label>
                                        <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Please provide brief details about your requirement..." rows="4"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Preferred Contact Method</label>
                                        <select required name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                                            <option value="" disabled>Select contact method...</option>
                                            {CONTACT_METHODS.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-actions space-between">
                                        <button type="button" className="btn-text label" onClick={prevStep}>Back</button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                        </Button>
                                    </div>
                                </motion.form>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="quote-form-success"
                                >
                                    <div className="success-icon">✓</div>
                                    <h3 className="form-step-title" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>Request Received</h3>
                                    <p style={{ textAlign: 'center', color: 'var(--color-neutral-700)', maxWidth: '440px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                        Thank you for choosing Philux Security. Your request details have been dispatched to <strong>realtundeonline@gmail.com</strong>. Our security engineering team will review and contact you shortly.
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '340px', alignItems: 'center' }}>
                                        <a
                                            href={`https://wa.me/2349064646062?text=${encodeURIComponent(`Hello Philux Security, I submitted a quote request for ${formData.service || 'Security Solutions'}.\n\nName: ${formData.name}\nProject: ${formData.projectType || 'Standard'}\nLocation: ${formData.location || 'Lagos'}\nPhone: ${formData.phone}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                width: '100%',
                                                padding: '0.85rem 1.25rem',
                                                backgroundColor: '#25D366',
                                                color: '#ffffff',
                                                borderRadius: '6px',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                textDecoration: 'none',
                                                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
                                            }}
                                        >
                                            <span>💬</span> Need It Faster? Chat on WhatsApp
                                        </a>

                                        <button
                                            type="button"
                                            className="btn-text"
                                            onClick={() => {
                                                setFormData({
                                                    name: '', company: '', email: '', phone: '',
                                                    service: '', location: '', projectType: '',
                                                    description: '', contactMethod: ''
                                                });
                                                setStep(1);
                                            }}
                                            style={{ marginTop: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--color-neutral-500)' }}
                                        >
                                            Submit another request
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
