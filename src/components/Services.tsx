import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Cpu } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      icon: Palette,
      title: 'Web Design & UI Systems',
      description: 'Minimalist, precision-engineered interfaces that captivate and convert.',
    },
    {
      icon: Code,
      title: 'Next.js Development',
      description: 'Ultra-fast, scalable architectures built with cutting-edge technology.',
    },
    {
      icon: Cpu,
      title: 'AI + Automation',
      description: 'Intelligent systems that think, adapt, and deliver beyond expectations.',
    },
  ];

  return (
    <section ref={ref} id="services" className="py-32 md:py-48 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group bg-background p-12 hover:bg-card transition-all duration-500 relative overflow-hidden"
              >
                {/* Accent line on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 right-0 h-px bg-primary origin-left"
                />
                
                <motion.div 
                  className="space-y-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360,
                    }}
                    whileTap={{ 
                      rotate: 180,
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className="w-12 h-12 text-primary" />
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-display font-semibold"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    animate={{
                      opacity: [1, 0.8, 1],
                    }}
                    {...({} as any)}
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{service.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
