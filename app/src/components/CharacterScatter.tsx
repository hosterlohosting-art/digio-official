import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CharacterScatterProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
}

export default function CharacterScatter({ text, className = '', as: Tag = 'h2', delay = 0 }: CharacterScatterProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll('.char');
    gsap.set(chars, { opacity: 0, y: 30 });
    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    return () => {
      tween.kill();
    };
  }, [delay]);

  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split('').map((char, ci) => (
            <span key={ci} className="char inline-block" style={{ whiteSpace: 'pre' }}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
