import { motion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background lines - disabled on mobile for performance */}
      {!isMobile && <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
          animate={{ 
            x: ['100%', '-100%'],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ 
            x: ['-100%', '100%'],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-2/3 right-1/4 w-3 h-3 border border-primary/50"
          animate={{
            rotate: [0, 180, 360],
            y: [0, 20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>}

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 min-h-[600px] flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-center space-y-12 max-w-5xl mx-auto w-full"
        >
          {/* Main Headline */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tight"
          >
            <span>𝙋𝙧𝙚𝙘𝙞𝙨𝙞𝙤𝙣.</span>
            <br />
            <span>𝙋𝙚𝙧𝙛𝙤𝙧𝙢𝙖𝙣𝙘𝙚.</span>
            <br />
            <span className="accent-text">𝙋𝙚𝙧𝙛𝙚𝙘𝙩𝙞𝙤𝙣.</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide min-h-[3.5rem]"
          >
            <Typewriter 
              text="I build sleek, high-performance websites that define the future of digital experience."
              delay={isMobile ? 0 : 2000}
              speed={isMobile ? 10 : 30}
            />
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-20 bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
