'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', projectType: 'residential', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} strokeWidth={1.5} />,
      label: 'Email Enquiries',
      value: 'studio@mindartdesigns.com',
      href: 'mailto:studio@mindartdesigns.com'
    },
    {
      icon: <Phone size={20} strokeWidth={1.5} />,
      label: 'Call the Studio',
      value: '+91 80897 11252',
      href: 'tel:+918089711252'
    },
    {
      icon: <MapPin size={20} strokeWidth={1.5} />,
      label: 'Kerala Studio',
      value: 'Thundiyil Arcade, MGM High School Junction, South Pampady, Pampady, Kerala 686502',
      href: 'https://maps.google.com/?q=Mind+Art+Designs+Pampady+Kerala'
    },
    {
      icon: <Clock size={20} strokeWidth={1.5} />,
      label: 'Studio Hours',
      value: 'Monday – Saturday, 09:30 – 18:30 IST',
      href: ''
    }
  ];

  return (
    <section id="contact" className="section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="section-subtitle">Collaborate</span>
        <h2 className="section-title">
          Begin Your <span>Architectural Journey</span>
        </h2>
        <p className="section-desc">
          Ready to construct your vision? Contact our studio to set up an initial consultation with our principal design team.
        </p>
      </motion.div>

      <div className={styles.grid}>
        
        {/* Left Side: Contact Information */}
        <motion.div 
          className={styles.infoCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={styles.infoWrapper}>
            <h3 className={styles.infoTitle}>Studio Information</h3>
            <p className={styles.infoDesc}>
              For commission inquiries, architectural designs, or career opportunities at our Kerala studio.
            </p>
            
            <div className={styles.infoItems}>
              {contactInfo.map((info, idx) => (
                <div key={idx} className={styles.infoItem}>
                  <div className={styles.iconContainer}>{info.icon}</div>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{info.label}</span>
                    {info.href ? (
                      <a href={info.href} target="_blank" rel="noopener noreferrer" className={styles.infoValue} data-interactive="true">
                        {info.value}
                      </a>
                    ) : (
                      <span className={styles.infoValueStatic}>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div 
          className={styles.formCol}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                className={styles.successBanner}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <CheckCircle2 size={40} className={styles.successIcon} />
                <div className={styles.successText}>
                  <h4>Inquiry Received</h4>
                  <p>Thank you for reaching out to Mindart Designs. Our studio representative will contact you within 24 business hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      data-interactive="true"
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      data-interactive="true"
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="projectType" className={styles.label}>Project Scope</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formState.projectType}
                    onChange={handleInputChange}
                    className={styles.select}
                    disabled={isSubmitting}
                    data-interactive="true"
                  >
                    <option value="residential">Residential Villa (Custom Home)</option>
                    <option value="commercial">Commercial / Exhibition Space</option>
                    <option value="interior">Bespoke Interior Curation</option>
                    <option value="landscape">Landscape Design & Masterplanning</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Project details & Vision *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Outline your plot location, approximate space requirements, and stylistic preferences..."
                    disabled={isSubmitting}
                    data-interactive="true"
                  />
                  {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary ${styles.submitBtn}`} 
                  disabled={isSubmitting}
                  data-interactive="true"
                >
                  {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
                  <Send size={14} />
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
