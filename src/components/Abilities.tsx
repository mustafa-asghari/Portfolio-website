import { motion } from 'framer-motion';

const Abilities = () => {
  const abilities = [
    '𝙒𝙚𝙗 𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩',
    '𝙐𝙄/𝙐𝙓 𝘿𝙚𝙨𝙞𝙜𝙣',
    '𝘼𝙄 𝙄𝙣𝙩𝙚𝙜𝙧𝙖𝙩𝙞𝙤𝙣',
    '𝙈𝙤𝙗𝙞𝙡𝙚 𝙁𝙞𝙧𝙨𝙩',
    '𝙎𝙀𝙊 𝙊𝙥𝙩𝙞𝙢𝙞𝙯𝙖𝙩𝙞𝙤𝙣',
    '𝘿𝙖𝙩𝙖𝙗𝙖𝙨𝙚 𝘿𝙚𝙨𝙞𝙜𝙣',
    '𝙋𝙚𝙧𝙛𝙤𝙧𝙢𝙖𝙣𝙘𝙚',
    '𝘾𝙡𝙤𝙪𝙙 𝙎𝙤𝙡𝙪𝙩𝙞𝙤𝙣𝙨',
    '𝙎𝙚𝙘𝙪𝙧𝙞𝙩𝙮',
    '𝙁𝙖𝙨𝙩 𝘿𝙚𝙡𝙞𝙫𝙚𝙧𝙮',
    '𝙄𝙣𝙣𝙤𝙫𝙖𝙩𝙞𝙤𝙣',
    '𝙀𝙭𝙘𝙚𝙡𝙡𝙚𝙣𝙘𝙚',
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden border-y border-border">
      {/* Blur gradients on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-background via-background/50 to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-12 py-12 items-center"
        animate={{
          x: [0, '-50%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        }}
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex gap-12 shrink-0 items-center">
            {abilities.map((ability, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center gap-12 shrink-0">
                <motion.h3 
                  className="text-4xl md:text-5xl font-display font-bold whitespace-nowrap text-foreground/80 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {ability}
                </motion.h3>
                {index < abilities.length - 1 && (
                  <span className="text-5xl md:text-6xl text-primary/50">•</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Abilities;
