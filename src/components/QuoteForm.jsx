import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import './QuoteForm.css';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API Submission
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(4);
        }, 1500);
    };

    return (
        <section className="quote-section bg-off-white" id="quote">
            <div className="container quote-container">
                <div className="quote-intro">
                    <div className="label">REQUEST A QUOTE</div>
                    <h2 className="heading-section mt-4 mb-4" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>Start your project.</h2>
                    <p className="text-neutral-700" style={{ maxWidth: '400px' }}>
                        Tell us about your requirements. Our engineering team will review and contact you with a tailored solution proposal.
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
                                    <h3 className="form-step-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Request Received</h3>
                                    <p style={{ textAlign: 'center', color: 'var(--color-neutral-700)' }}>Thank you for choosing Philux. Your project request has been submitted securely and our engineering team will contact you shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
