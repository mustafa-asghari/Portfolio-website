import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      name: 'Kabul Sweets Bakery',
      role: 'Client',
      content: 'Fully satisfied with the result. The order system works perfectly for our bakery. ⭐⭐⭐⭐⭐',
    },
    {
      name: 'Jack Steave',
      role: 'Client',
      content: 'The portfolio website is very good and stylish. Exceeded all my expectations! ⭐⭐⭐⭐⭐',
    },
    {
      name: 'Peak Performance Retail',
      role: 'Small Business',
      content: 'The employee hourly tracker and pay rate system works perfectly. We can see clock in/out and pay fortnightly and weekly anytime. Completely satisfied! ⭐⭐⭐⭐⭐',
    },
  ];

  return (
    <section ref={ref} id="testimonials" className="py-32 md:py-48 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Client Success
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="bg-background p-12 hover:bg-card transition-all duration-500 group relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="space-y-6">
                <p className="text-muted-foreground font-light leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-display font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground font-light">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
