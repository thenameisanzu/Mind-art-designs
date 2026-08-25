'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.css';

const projects = [
  {
    id: 1,
    title: 'Lebin Residence',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Aroor, Kerala',
    image: '/residential.jpg',
    desc: 'A modern tropical residential sanctuary designed to blend tropical aesthetics with contemporary open-plan spaces. It features exposed clay tile ceilings, custom teak wood panels, and sliding windows that merge indoor living areas with landscaped side gardens.',
    specs: {
      area: '4,200 sq.ft',
      year: '2025',
      client: 'Mr. Lebin & Family',
      materials: 'Exposed Teak Wood, Polished Kota Stone, Clay Roof Tiles',
    }
  },
  {
    id: 2,
    title: 'Kanjikuzhy Commercial Center',
    category: 'commercial',
    categoryLabel: 'Commercial',
    location: 'Kanjikuzhy, Kottayam, Kerala',
    image: '/commercial.jpg',
    desc: 'A forward-thinking boutique office and retail commercial space designed with a striking steel facade and glass portal walls. The building optimizes solar orientation, natural cross-ventilation, and flexible interior work spaces.',
    specs: {
      area: '5,800 sq.ft',
      year: '2024',
      client: 'MADarc Studio Partnership',
      materials: 'Structural Steel Portal Frames, High-Performance Low-E Glass, Terrazzo',
    }
  },
  {
    id: 3,
    title: 'Rahul Residence',
    category: 'interior',
    categoryLabel: 'Interior',
    location: 'Meenadom, Kottayam, Kerala',
    image: '/interior.jpg',
    desc: 'A contemporary tropical villa boasting double-height living room ceilings, custom exposed concrete features, and warm hardwood panelling. The layout frames internal garden courtyards that invite daylight and ambient cool air into the house core.',
    specs: {
      area: '3,800 sq.ft',
      year: '2025',
      client: 'Mr. Rahul K.',
      materials: 'Board-formed Concrete, Custom Wood Joints, Micro-concrete Flooring',
    }
  },
  {
    id: 4,
    title: 'Sreelayam Residence & Landscape',
    category: 'landscape',
    categoryLabel: 'Landscape',
    location: 'Mallapally, Kerala',
    image: '/landscape.jpg',
    desc: 'A vernacular integration project connecting modern structures with a heritage garden environment. The design features walking pathways of local natural stone, reflective water basins, and landscaping that celebrates the indigenous tropical flora of Kerala.',
    specs: {
      area: '5,200 sq.ft',
      year: '2026',
      client: 'Sreejith M. & Family',
      materials: 'Traditional Clay Roof Tiles, Laterite Wall Cladding, Local River Pebbles',
    }
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Interior', value: 'interior' },
    { label: 'Landscape & Concept', value: 'landscape' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const openLightbox = (id: number) => {
    const idx = projects.findIndex(p => p.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < projects.length - 1 ? prev + 1 : 0));
    }
  };

  const prevProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : projects.length - 1));
    }
  };

  const currentProject = lightboxIndex !== null ? projects[lightboxIndex] : null;

  return (
    <section id="showcase" className="section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="section-subtitle">Showcase</span>
        <h2 className="section-title">
          Sculpting Spaces, <span>Capturing Light</span>
        </h2>
        <p className="section-desc">
          Browse through our curated portfolio of residential, commercial, interior, and landscape masterworks. Click on any project to explore design concepts and detailed technical specifications.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        className={styles.filterContainer}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${activeFilter === f.value ? styles.active : ''}`}
            onClick={() => setActiveFilter(f.value)}
            data-interactive="true"
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Portfolio Grid with layout animations */}
      <motion.div 
        className={styles.grid}
        layout
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              className={styles.projectCard}
              onClick={() => openLightbox(project.id)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              data-interactive="true"
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={styles.image}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayIcon}>
                    <Maximize2 size={20} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <span className={styles.projectCategory}>{project.categoryLabel}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectLocation}>{project.location}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Premium Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {currentProject && (
          <motion.div 
            className={styles.lightbox} 
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox" data-interactive="true">
              <X size={28} />
            </button>
            
            <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevProject} aria-label="Previous Project" data-interactive="true">
              <ChevronLeft size={36} />
            </button>
            <button className={`${styles.navBtn} ${styles.next}`} onClick={nextProject} aria-label="Next Project" data-interactive="true">
              <ChevronRight size={36} />
            </button>

            <motion.div 
              className={styles.lightboxContent} 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className={styles.lightboxGrid}>
                
                {/* Image Column */}
                <div className={styles.lightboxImageContainer}>
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title} 
                    className={styles.lightboxImage}
                    loading="lazy"
                  />
                </div>

                {/* Data/Detail Column */}
                <div className={styles.lightboxDetails}>
                  <div>
                    <span className={styles.lightboxCategory}>{currentProject.categoryLabel}</span>
                    <h3 className={styles.lightboxTitle}>{currentProject.title}</h3>
                    <p className={styles.lightboxLocation}>{currentProject.location}</p>
                    
                    <div className={styles.divider}></div>
                    
                    <p className={styles.lightboxDesc}>{currentProject.desc}</p>
                  </div>

                  <div className={styles.specsGrid}>
                    <h4 className={styles.specsHeader}>Project Specifications</h4>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Total Footprint:</span>
                      <span className={styles.specValue}>{currentProject.specs.area}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Completion:</span>
                      <span className={styles.specValue}>{currentProject.specs.year}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Partner/Client:</span>
                      <span className={styles.specValue}>{currentProject.specs.client}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>Core Materials:</span>
                      <span className={styles.specValue}>{currentProject.specs.materials}</span>
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="btn btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                    onClick={closeLightbox}
                    data-interactive="true"
                  >
                    Inquire About Similar Design
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
