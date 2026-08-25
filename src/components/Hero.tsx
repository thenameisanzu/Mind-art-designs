'use client';

import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks mobile width for layout offsets
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tracks the scroll progress of the 450vh hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a very snappy spring to smooth out scroll events on mobile/touch screens
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 800, // Snap quickly to scroll position
    damping: 50,    // Perfectly damped catching up
    mass: 0.1,      // Incredibly responsive, zero noticeable lag
  });

  // Default coordinate offsets relative to center for the 4 grid blocks
  const xLeft = isMobile ? "-25vw" : "-20vw";
  const xRight = isMobile ? "25vw" : "20vw";
  const yTop = isMobile ? "-12vh" : "-14vh";
  const yBottom = isMobile ? "12vh" : "14vh";

  // Top Left Image path translations (Moves down first, then to center)
  const tlX = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"], { clamp: true });
  const tlY = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [yTop, yBottom, yBottom, "0vh", "0vh"], { clamp: true });

  // Bottom Right Image path translations (Moves up first, then to center)
  const brX = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [xRight, xRight, xRight, "0vw", "0vw"], { clamp: true });
  const brY = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [yBottom, yTop, yTop, "0vh", "0vh"], { clamp: true });

  // Bottom Left Image path translations (Stays bottom-left, then merges center)
  const blX = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [xLeft, xLeft, xLeft, "0vw", "0vw"], { clamp: true });
  const blY = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [yBottom, yBottom, yBottom, "0vh", "0vh"], { clamp: true });

  // Top Right Image (Hero Background) translations (Stays top-right, then merges center)
  const trX = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [xRight, xRight, xRight, "0vw", "0vw"], { clamp: true });
  const trY = useTransform(smoothProgress, [0, 0.2, 0.25, 0.5, 1], [yTop, yTop, yTop, "0vh", "0vh"], { clamp: true });

  // Top Right Image (Hero background) expands to premium card panel after merge phase
  const startWidth = isMobile ? "42vw" : "36vw";
  const startHeight = isMobile ? "18vh" : "24vh";
  const endWidth = isMobile ? "92vw" : "94vw";
  const endHeight = isMobile ? "75vh" : "82vh";

  const heroWidth = useTransform(smoothProgress, [0, 0.5, 0.8, 1], [startWidth, startWidth, endWidth, endWidth], { clamp: true });
  const heroHeight = useTransform(smoothProgress, [0, 0.5, 0.8, 1], [startHeight, startHeight, endHeight, endHeight], { clamp: true });

  // Fade out other images as the main hero expands (slower fadeout)
  const underImagesOpacity = useTransform(smoothProgress, [0.5, 0.7, 1], [1, 0, 0], { clamp: true });

  // Animate background image blur overlay opacity (buttery-smooth hardware-accelerated rendering)
  const blurOpacity = useTransform(smoothProgress, [0.6, 0.75, 1], [0, 1, 1], { clamp: true });

  // Fade in the dark/warm color overlay over the expanded hero photo at the last point
  const overlayOpacity = useTransform(smoothProgress, [0.6, 0.75, 1], [0, 0.85, 0.85], { clamp: true });

  // Fade in content typography ONLY at the last point of the hero section
  const contentOpacity = useTransform(smoothProgress, [0.65, 0.8, 1], [0, 1, 1], { clamp: true });
  const contentY = useTransform(smoothProgress, [0.65, 0.8, 1], [20, 0, 0], { clamp: true });

  // Image assets mapped to grid
  const images = {
    topLeft: '/interior.jpg',
    topRight: '/hero.jpg', // Main expanded hero background
    bottomLeft: '/commercial.jpg',
    bottomRight: '/landscape.jpg'
  };

  // Centering transform template to keep images centered relative to their width/height under translations
  const transformTemplate = (_: any, generatedTransform: string) => `translate(-50%, -50%) ${generatedTransform}`;

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        <div className={styles.choreographyArea}>
          
          {/* Top Left Image */}
          <motion.div
            style={{ x: tlX, y: tlY, opacity: underImagesOpacity }}
            transformTemplate={transformTemplate}
            className={`${styles.baseImage} ${styles.z10}`}
          >
            <img src={images.topLeft} alt="Interior Design Curation" className={styles.img} />
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div
            style={{ x: brX, y: brY, opacity: underImagesOpacity }}
            transformTemplate={transformTemplate}
            className={`${styles.baseImage} ${styles.z20}`}
          >
            <img src={images.bottomRight} alt="Residential Villa Project" className={styles.img} />
          </motion.div>

          {/* Bottom Left Image */}
          <motion.div
            style={{ x: blX, y: blY, opacity: underImagesOpacity }}
            transformTemplate={transformTemplate}
            className={`${styles.baseImage} ${styles.z30}`}
          >
            <img src={images.bottomLeft} alt="Commercial Architecture Center" className={styles.img} />
          </motion.div>

          {/* Top Right Image (Hero background that expands to full screen) */}
          <motion.div
            style={{
              x: trX,
              y: trY,
              width: heroWidth,
              height: heroHeight,
            }}
            transformTemplate={transformTemplate}
            className={`${styles.baseImage} ${styles.z40}`}
          >
            {/* Clear Image (Base Layer) */}
            <img 
              src={images.topRight} 
              alt="MADarc Landscape Design" 
              className={styles.img} 
            />

            {/* Blurred Image Overlay (Opacity animated for hardware acceleration) */}
            <motion.img 
              src={images.topRight} 
              alt="" 
              className={styles.img} 
              style={{ 
                position: 'absolute',
                inset: 0,
                filter: 'blur(12px)',
                opacity: blurOpacity,
                transform: 'scale(1.05)', // Hide fuzzy blur bleed behind rounded corners
                pointerEvents: 'none'
              }}
            />
            
            {/* Soft cream overlay that dims the image slightly for text contrast */}
            <motion.div 
              style={{ opacity: overlayOpacity }} 
              className={styles.expandedOverlay}
            />
          </motion.div>

          {/* Staggered typography contents (fades in at bottom) */}
          <motion.div 
            style={{ opacity: contentOpacity, y: contentY }}
            transformTemplate={transformTemplate}
            className={styles.container}
          >
            <div className={styles.content}>
              <span className={styles.subtitle}>MINDART DESIGNS</span>
              <h1 className={styles.title}>
                Where Mind Meets <span>Architecture</span>
              </h1>
              <p className={styles.description}>
                We design spaces that inspire, elevate, and transform. Merging conceptual thinking with artistic precision to build environments that resonate with the human spirit.
              </p>

              <div className={styles.actions}>
                <a href="#showcase" className="btn btn-primary" data-interactive="true">
                  View Showcase
                </a>
                <a href="#contact" className="btn btn-outline" data-interactive="true">
                  Start Project
                </a>
              </div>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div 
            style={{ opacity: underImagesOpacity }}
            className={styles.scrollDown}
          >
            <span>Scroll Down to Begin</span>
            <ArrowDown size={16} className={styles.arrowIcon} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
