import { useRef, useEffect } from 'react';

export function useScrollVelocity() {
  const velocityRef = useRef(0);
  const directionRef = useRef<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const now = Date.now();
      const dt = (now - lastTime.current) / 1000;
      if (dt > 0) {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY.current;
        const rawVelocity = delta / (dt * 60);
        const clamped = Math.max(-3, Math.min(3, rawVelocity));
        velocityRef.current = clamped * 0.1;
        directionRef.current = delta > 0 ? 'down' : 'up';
        lastScrollY.current = scrollY;
        lastTime.current = now;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return { velocityRef, directionRef };
}
