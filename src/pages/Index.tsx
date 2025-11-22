import { useState, lazy, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy load decorative and below-the-fold components to reduce initial JS parse/execution time
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));
const AILogo3D = lazy(() => import('@/components/AILogo3D'));
const About = lazy(() => import('@/components/About'));
const Services = lazy(() => import('@/components/Services'));
const Portfolio = lazy(() => import('@/components/Portfolio'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const AIChat = lazy(() => import('@/components/AIChat'));
const CustomCursor = lazy(() => import('@/components/CustomCursor'));

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {!isMobile && (
        <Suspense fallback={<div />}>
          <CustomCursor />
        </Suspense>
      )}
      {!isMobile && (
        <Suspense fallback={<div />}>
          <ParticleBackground />
        </Suspense>
      )}
      <Suspense fallback={<div />}>
        <AILogo3D 
          onLogoClick={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
        />
      </Suspense>
      <Suspense fallback={<div />}>
        <AIChat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
