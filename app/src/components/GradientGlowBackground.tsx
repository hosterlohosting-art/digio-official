import { useEffect, useState } from 'react';

export default function GradientGlowBackground() {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; top: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate static random values on client mount to avoid SSR mismatch and hydration issues
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2, // 2px to 5px
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * -20, // Negative delay so they start immediately at different points
      duration: Math.random() * 15 + 15, // 15s to 30s
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0d0520] overflow-hidden select-none pointer-events-none" style={{ zIndex: 0 }}>
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes floatOrb1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(8%, 15%, 0) scale(1.15); }
          100% { transform: translate3d(-5%, -10%, 0) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-12%, 10%, 0) scale(0.9); }
          100% { transform: translate3d(8%, -8%, 0) scale(1.1); }
        }
        @keyframes floatOrb3 {
          0% { transform: translate3d(0, 0, 0) scale(0.95); }
          50% { transform: translate3d(10%, -12%, 0) scale(1.1); }
          100% { transform: translate3d(-8%, 8%, 0) scale(1); }
        }
        @keyframes floatOrb4 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-8%, -15%, 0) scale(1.1); }
          100% { transform: translate3d(12%, 5%, 0) scale(0.9); }
        }
        @keyframes floatParticleUp {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translate3d(30px, -150px, 0); opacity: 0; }
        }
      `}</style>

      {/* Large Glowing Orbs with GPU-accelerated drift */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#6a00ff] opacity-[0.32] blur-[130px] will-change-transform" 
        style={{ animation: 'floatOrb1 24s infinite alternate ease-in-out' }}
      />
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#3b0a75] opacity-[0.45] blur-[140px] will-change-transform" 
        style={{ animation: 'floatOrb2 28s infinite alternate ease-in-out' }}
      />
      <div 
        className="absolute top-[25%] left-[35%] w-[40vw] h-[40vw] rounded-full bg-[#c7a7ff] opacity-[0.15] blur-[150px] will-change-transform" 
        style={{ animation: 'floatOrb3 32s infinite alternate ease-in-out' }}
      />
      <div 
        className="absolute top-[10%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-[#8c33ff] opacity-[0.22] blur-[120px] will-change-transform" 
        style={{ animation: 'floatOrb4 22s infinite alternate ease-in-out' }}
      />

      {/* Tech Grid Pattern (extremely subtle alignment helper) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40" 
        style={{ maskImage: 'radial-gradient(circle at 50% 50%, #000 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 60%, transparent 100%)' }}
      />

      {/* Floating Micro-Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#eee7ff] blur-[0.5px] will-change-transform"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `floatParticleUp ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Dark Vignettes & Gradient overlays to bind the layout and improve contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0d0520_100%)] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0520]/20 via-[#0d0520]/45 to-[#0d0520]" />
    </div>
  );
}
