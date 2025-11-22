import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let frameId: number;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (frameId) return; // Skip if frame is already scheduled
      
      frameId = requestAnimationFrame(() => {
        setMousePosition({ x: lastX, y: lastY });
        setTrail(prev => [
          { x: lastX, y: lastY, id: Date.now() },
          ...prev.slice(0, 5),
        ]);
        frameId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((point) => (
        <div
          key={point.id}
          className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary/20 pointer-events-none z-[9999] mix-blend-screen transition-opacity duration-500 opacity-0"
          style={{
            transform: `translate3d(${point.x - 6}px, ${point.y - 6}px, 0) scale(0.5)`,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x - 8}px, ${mousePosition.y - 8}px, 0)`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
      </div>

      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9998] mix-blend-screen transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0)`,
        }}
      />
    </>
  );
}
