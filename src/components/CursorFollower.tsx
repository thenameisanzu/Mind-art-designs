'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CursorFollower.module.css';

export default function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.' + styles.interactiveCard) ||
        target.closest('[data-interactive="true"]');

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <motion.div
      className={styles.cursor}
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
      animate={{
        scale: hovered ? 1.6 : 1,
        backgroundColor: hovered ? 'rgba(197, 168, 128, 0.15)' : 'rgba(197, 168, 128, 0.03)',
        borderColor: hovered ? 'rgba(197, 168, 128, 0.9)' : 'rgba(197, 168, 128, 0.3)',
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
    />
  );
}
