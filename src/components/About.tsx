import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Github, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Typewriter from '@/components/Typewriter';

const About = () => {
  const skills = [
    { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable code' },
    { icon: Palette, title: 'UX/UI Design', description: 'Crafting beautiful user experiences' },
    { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency' },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{ minHeight: '4.5rem' }}
              >
                <Typewriter text="Mustafa Asghari" delay={200} speed={60} />
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4 text-muted-foreground"
              >
                <p className="text-lg font-light" style={{ minHeight: '1.75rem' }}>
                  <Typewriter 
                    text="Software Developer | Brisbane, Australia" 
                    delay={1000}
                    speed={40}
                  />
                </p>
                <p className="text-base leading-relaxed" style={{ minHeight: '4.5rem' }}>
                  <Typewriter 
                    text="Experienced full-stack developer with 3 years of professional experience building modern web applications. Specialized in creating high-performance, scalable solutions using React, Next.js, TypeScript, and Node.js. Passionate about delivering pixel-perfect designs and exceptional user experiences."
                    delay={2000}
                    speed={20}
                  />
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    Python
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    JavaScript
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    Next.js
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    C#
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm"
                  >
                    Java
                  </motion.span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4 mt-8"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.open('https://github.com/mustafa-asghari', '_blank')}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.location.href = 'mailto:asghari.mustafa99@gmail.com'}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </motion.div>
            </div>
            
            <div className="relative h-[380px] w-[380px] max-w-full mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative w-full h-full"
              >
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-primary/20 rounded-full"
                  style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-2 border-primary/30 rounded-full"
                  style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-16 border border-foreground/20"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'translateZ(0)' }}>
                  <div className="text-center space-y-4">
                    <MapPin className="w-12 h-12 mx-auto text-primary" />
                    <div>
                      <p className="text-2xl font-bold">Brisbane</p>
                      <p className="text-muted-foreground">Australia</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <skill.icon className="w-12 h-12 mb-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground text-sm">{skill.description}</p>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
