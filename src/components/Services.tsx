'use client';

import { Home, Building2, Trees, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

export default function Services() {
  const services = [
    {
      icon: <Home size={32} strokeWidth={1} />,
      title: 'Residential Architecture',
      desc: 'Bespoke luxury estates and modern villas designed with environmental dialogue. We create residential sanctuaries tailored to your cognitive comfort and daily rituals.',
    },
    {
      icon: <Building2 size={32} strokeWidth={1} />,
      title: 'Commercial & Cultural',
      desc: 'Public museums, boutique galleries, and forward-thinking workspaces. We prioritize circulation efficiency, sculptural facades, and dramatic light capture.',
    },
    {
      icon: <Palette size={32} strokeWidth={1} />,
      title: 'Interior Design Curation',
      desc: 'Bespoke interior architecture, custom furniture curation, and meticulous material specifications. We align interior shapes with overall structural volumes.',
    },
    {
      icon: <Trees size={32} strokeWidth={1} />,
      title: 'Landscape & Masterplanning',
      desc: 'Integrating structural volumes with natural topologies. Designing botanical pavilions, reflecting water-scapes, and sustainable site masterplans.',
    },
  ];

  // Stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  } as any;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  } as any;

  return (
    <section id="services" className={`${styles.servicesSection} section`}>
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="section-subtitle">Expertise</span>
        <h2 className="section-title">
          Architecting Beyond <span>Physics</span>
        </h2>
        <p className="section-desc">
          We offer comprehensive design services, bringing conceptual clarity, master craftsmanship, and rigor to projects across scales.
        </p>
      </motion.div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service, idx) => (
          <motion.div 
            key={idx} 
            className={styles.card}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            data-interactive="true"
          >
            <div className={styles.iconContainer}>{service.icon}</div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.desc}</p>
            <div className={styles.cardCorner}></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
