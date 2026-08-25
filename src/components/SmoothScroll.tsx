'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis buttery smooth scroll with lower speed and smoother cushioning
    const lenis = new Lenis({
      lerp: 0.04, // Lower lerp for slower and smoother scroll inertia
      wheelMultiplier: 0.40, // Significantly reduce wheel scroll speed so it scrolls slowly
      syncTouch: false, // Let mobile/touch devices scroll natively to prevent stutters
      infinite: false,
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as any).lenisInstance = lenis;
    }

    // Connect Lenis to requestAnimationFrame loop
    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    // Sync with Framer Motion scroll indicators
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (typeof window !== 'undefined') {
        (window as any).lenisInstance = null;
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
