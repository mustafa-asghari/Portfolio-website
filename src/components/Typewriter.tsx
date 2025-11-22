import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  speed?: number;
}

export default function Typewriter({ text, delay = 0, className = '', speed = 50 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, delay, speed, text]);

  return (
    <span className={`${className} relative inline-block`} style={{ minWidth: '1ch' }}>
      {displayText}
      {displayText.length < text.length && (
        <span
          className="inline-block w-0.5 h-[1em] bg-primary ml-1"
          style={{ 
            animation: 'blink 1s infinite',
            position: 'absolute',
            transform: 'translateZ(0)',
          }}
        />
      )}
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
