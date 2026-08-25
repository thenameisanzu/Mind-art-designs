'use client';

import { ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Top Section */}
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <a href="#home" className={styles.logoContainer}>
              <img src="/logo.png" alt="MIND ART DESIGNS" className={styles.logoImage} />
            </a>
            <p className={styles.brandDesc}>
              Bespoke architectural designs that fuse conceptual art with spatial functionality.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.header}>Studio</h4>
            <div className={styles.linksGrid}>
              <a href="#home" className={styles.link}>Home</a>
              <a href="#philosophy" className={styles.link}>Philosophy</a>
              <a href="#services" className={styles.link}>Services</a>
              <a href="#showcase" className={styles.link}>Showcase</a>
              <a href="#reviews" className={styles.link}>Reviews</a>
              <a href="#contact" className={styles.link}>Contact</a>
            </div>
          </div>

          <div className={styles.socialCol}>
            <h4 className={styles.header}>Connect</h4>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/mindartdesigns/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/search/top/?q=Mind%20Art%20Designs-MADarc" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
            <p className={styles.tagline}>Join our design updates.</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomRow}>
          <span className={styles.copyright}>
            &copy; {currentYear} Mindart Designs. All rights reserved.
          </span>
          
          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to Top">
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
