import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
  dark?: boolean;
}

export default function StatCounter({ value, suffix = '', prefix = '', label, className = '', dark = false }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplay(Math.round(obj.val).toLocaleString());
      },
    });

    return () => { tween.kill(); };
  }, [value]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <span ref={numberRef} className={`font-['Plus_Jakarta_Sans'] font-bold text-5xl ${dark ? 'text-[#f7f7fa]' : 'text-[#6a00ff]'}`}>
        {prefix}{display}{suffix}
      </span>
      <p className={`text-xs font-medium uppercase tracking-wider mt-2 ${dark ? 'text-[#7d718c]' : 'text-[#53445f]'}`}>{label}</p>
    </div>
  );
}
