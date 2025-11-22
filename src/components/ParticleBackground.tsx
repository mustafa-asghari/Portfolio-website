import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? 15 : 50;

    // Create particles with varied sizes
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 191, 255, 0.5)';
        ctx.fillStyle = i % 3 === 0 ? 'rgba(0, 191, 255, 0.4)' : 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections with blue tint
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.15;
            ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />
      
      {/* Additional decorative elements */}
      <motion.div
        className="fixed top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 0 }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ zIndex: 0 }}
      />
    </>
  );
};

export default ParticleBackground;
