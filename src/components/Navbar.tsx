'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#home" className={styles.logoContainer}>
          <img src="/logo.png" alt="MIND ART DESIGNS" className={styles.logoImage} />
          <span className={styles.logoText}>
            MIND ART <span>DESIGNS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <div className={styles.links}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={styles.link}>
                {link.name}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>
            Get in Touch
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobileLinks}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={styles.mobileLink}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
            onClick={() => setIsOpen(false)}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
