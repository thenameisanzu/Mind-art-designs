'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
  {
    id: 1,
    quote: "Collaborating with Mindart Designs was transformative. They translated our vision into a modern, tropical sanctuary that perfectly handles Kerala's climate while maintaining open, light-filled spaces. Every single day in the Lebin Residence feels incredibly refreshing.",
    author: "Lebin & Merlyn",
    role: "Owners",
    project: "Lebin Residence"
  },
  {
    id: 2,
    quote: "Mindart Designs brought exceptional design clarity and project management rigor to our commercial center in Kottayam. The glass and steel portal facades create a striking civic landmark that stands out while maximizing interior floor flexibility.",
    author: "Dr. Abraham Thomas",
    role: "Partner",
    project: "Kanjikuzhy Commercial Center"
  },
  {
    id: 3,
    quote: "The custom double-height living room and exposed concrete courtyard layouts are architectural triumphs. They perfectly understood our need to connect the indoors with green nature. The ventilation is so natural that we rarely need air conditioning.",
    author: "Rahul K.",
    role: "Owner",
    project: "Rahul Residence"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const nextReview = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  const prevReview = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const current = reviews[activeIndex];

  // Carousel transition variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    })
  } as any;

  return (
    <section id="reviews" className={`${styles.testimonialSection} section`}>
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="section-subtitle">Testimonials</span>
        <h2 className="section-title">
          Shared Visions, <span>Built Realities</span>
        </h2>
        <p className="section-desc">
          Hear from our clients who have entrusted us with their visions, resulting in landmark structures and highly customized living sanctuaries.
        </p>
      </motion.div>

      <motion.div 
        className={styles.sliderContainer}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        {/* Decorative Quote Icon */}
        <div className={styles.quoteIconWrapper}>
          <Quote size={80} strokeWidth={0.5} />
        </div>

        {/* Review Content */}
        <div className={styles.sliderContent}>
          <div className={styles.carouselWrapper}>
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slide}
              >
                <p className={styles.quoteText}>"{current.quote}"</p>
                
                <div className={styles.meta}>
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{current.author}</span>
                    <span className={styles.authorRole}>
                      {current.role}, <span className={styles.project}>{current.project}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls (positioned stable outside the slide animation) */}
          <div className={styles.controlsRow}>
            <div className={styles.navArrows}>
              <button 
                onClick={prevReview} 
                className={styles.navBtn} 
                aria-label="Previous review"
                data-interactive="true"
              >
                <ChevronLeft size={20} />
              </button>
              <span className={styles.fraction}>
                {activeIndex + 1} <span>/</span> {reviews.length}
              </span>
              <button 
                onClick={nextReview} 
                className={styles.navBtn} 
                aria-label="Next review"
                data-interactive="true"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Decorative background grid line */}
      <div className={styles.bgLine}></div>
    </section>
  );
}
