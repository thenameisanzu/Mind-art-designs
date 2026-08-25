'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis buttery smooth scroll with high friction
    const lenis = new Lenis({
      lerp: 0.06, // Low lerp for strong friction cushioning
      wheelMultiplier: 0.65, // Dampen mouse wheel spins to prevent flying past
      touchMultiplier: 1.2,
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
