'use client';

import { Paintbrush, Sparkles, Home, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const sideSlideLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const sideSlideRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
    }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as any, delay: 0.2 } 
    }
  };

  const circleDraw = {
    hidden: { opacity: 0, rotate: -45, scale: 0.8 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as any, delay: 0.4 } 
    }
  };

  return (
    <section id="philosophy" className={styles.aboutSection}>
      <motion.div 
        className={styles.panel}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
      >
        {/* Header */}
        <motion.div className={styles.header} variants={fadeInUp}>
          <div className={styles.subtitle}>
            <span className={styles.bolt}>✦</span> DISCOVER OUR STORY
          </div>
          <h2 className={styles.title}>About Us</h2>
          <div className={styles.underline}></div>
          <p className={styles.description}>
            We are a passionate team of designers and architects dedicated to creating beautiful, 
            functional spaces that inspire and elevate everyday living. With attention to detail and 
            commitment to excellence, we transform visions into reality.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className={styles.grid}>
          {/* Left Column */}
          <motion.div className={styles.column} variants={sideSlideLeft}>
            <div className={styles.featureCard} data-interactive="true">
              <div className={styles.featureHeader}>
                <div className={styles.iconWrapper}>
                  <Paintbrush className={styles.icon} size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.featureTitle}>Interior</h3>
              </div>
              <p className={styles.featureDesc}>
                Transform your living spaces with our expert interior design services. We blend functionality 
                and aesthetics to create spaces that reflect your unique style and personality.
              </p>
            </div>

            <div className={styles.featureCard} data-interactive="true">
              <div className={styles.featureHeader}>
                <div className={styles.iconWrapper}>
                  <Home className={styles.icon} size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.featureTitle}>Exterior</h3>
              </div>
              <p className={styles.featureDesc}>
                Make a lasting impression with stunning exterior designs that enhance curb appeal and create 
                harmonious connections between architecture and landscape.
              </p>
            </div>
          </motion.div>

          {/* Center Image Column */}
          <div className={styles.imageColumn}>
            {/* Decorative background circles */}
            <motion.div className={styles.circleBg1} variants={circleDraw}></motion.div>
            <motion.div className={styles.circleBg2} variants={circleDraw}></motion.div>
            
            <motion.div className={styles.imageWrapper} variants={imageReveal}>
              <img 
                src="/about_architecture.jpg" 
                alt="Minimalist circular architectural opening with tree canopy" 
                className={styles.image} 
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div className={styles.column} variants={sideSlideRight}>
            <div className={styles.featureCard} data-interactive="true">
              <div className={styles.featureHeader}>
                <div className={styles.iconWrapper}>
                  <Sparkles className={styles.icon} size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.featureTitle}>Decoration</h3>
              </div>
              <p className={styles.featureDesc}>
                Elevate your space with our curated decoration services. From color schemes to textiles 
                and accessories, we perfect every detail to bring your vision to life.
              </p>
            </div>

            <div className={styles.featureCard} data-interactive="true">
              <div className={styles.featureHeader}>
                <div className={styles.iconWrapper}>
                  <Ruler className={styles.icon} size={20} strokeWidth={2} />
                </div>
                <h3 className={styles.featureTitle}>Planning</h3>
              </div>
              <p className={styles.featureDesc}>
                Our meticulous planning process ensures every project runs smoothly from concept to completion, 
                with careful attention to timelines, budgets, and requirements.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
