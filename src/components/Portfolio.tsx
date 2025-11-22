import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const projects = [
    {
      title: 'AlignTech',
      category: 'E-Commerce',
      client: 'Online Retail',
      image: project1,
      tools: 'React, Stripe, E-commerce',
      link: 'https://aligntech.net.co',
    },
    {
      title: 'Work Stat Tracker',
      category: 'Employee Management',
      client: 'HR Solutions',
      image: project2,
      tools: 'React, Time Tracking, Payroll',
      link: 'https://work-stat-tracker.lovable.app',
    },
    {
      title: 'Kabul Cake Canvas',
      category: 'Bakery Orders',
      client: 'Kabul Sweets Bakery',
      image: project3,
      tools: 'React, Order System',
      link: 'https://kabul-cake-canvas.lovable.app',
    },
  ];

  return (
    <section ref={ref} id="portfolio" className="py-32 md:py-48 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            My Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={isMobile ? {} : {
                scale: 1.03,
                z: 50,
              }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.5, 
                delay: isMobile ? 0 : index * 0.1,
                scale: { duration: 0.3 },
              }}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              className="group relative overflow-hidden aspect-video bg-background block"
            >
              {/* Grayscale image */}
              <div className="absolute inset-0">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  style={{
                    filter: hoveredIndex === index ? 'grayscale(0%)' : 'grayscale(100%)',
                  }}
                  animate={{
                    scale: (hoveredIndex === index && !isMobile) ? 1.1 : 1,
                  }}
                  transition={{ duration: isMobile ? 0.3 : 0.7, ease: [0.19, 1, 0.22, 1] }}
                />
                {/* Blue tint removed to show true colors */}
              </div>
              
              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 bg-background/95 flex flex-col justify-end p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 20
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{project.client}</p>
                <p className="text-xs text-muted-foreground/70 mb-4">{project.tools}</p>
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-sm font-medium">View Case</span>
                  <motion.div
                    animate={{ 
                      x: hoveredIndex === index ? [0, 5, 0] : 0,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Thin accent border */}
              <motion.div
                className="absolute inset-0 border border-primary/0"
                animate={{ borderColor: hoveredIndex === index ? 'hsl(195 100% 50% / 0.5)' : 'hsl(195 100% 50% / 0)' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
