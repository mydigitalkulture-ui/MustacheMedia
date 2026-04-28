import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';

const WhoWeWorkWith = lazy(() => import('../components/WhoWeWorkWith'));
const Services = lazy(() => import('../components/Services'));
const AIAdvantage = lazy(() => import('../components/AIAdvantage'));
const GrowthFramework = lazy(() => import('../components/GrowthFramework'));
const ClientLogos = lazy(() => import('../components/ClientLogos'));
const FounderTeam = lazy(() => import('../components/FounderTeam'));
const FinalCTA = lazy(() => import('../components/FinalCTA'));
const Footer = lazy(() => import('../components/Footer'));

const sectionRevealVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 34,
    x: index % 2 === 0 ? -14 : 14,
    scale: 0.985,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
};

const AnimatedSection = ({ children, delay = 0, className = '', index = 0, reduceMotion = false }) => {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22, margin: '-6%' }}
      variants={sectionRevealVariants}
      transition={{ type: 'spring', stiffness: 90, damping: 22, mass: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    let timerId;
    let idleId;
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setShowDeferredSections(true), { timeout: 800 });
    } else {
      timerId = window.setTimeout(() => setShowDeferredSections(true), 350);
    }

    return () => {
      if (typeof idleId === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (typeof timerId === 'number') {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />
      <AnimatedSection delay={0.02} index={0} reduceMotion={shouldReduceMotion}>
        <HeroSection />
      </AnimatedSection>

      {showDeferredSections ? (
        <Suspense fallback={null}>
          <AnimatedSection className="will-change-transform" delay={0.03} index={1} reduceMotion={shouldReduceMotion}>
            <div id="who-we-work-with">
              <WhoWeWorkWith />
            </div>
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.05} index={2} reduceMotion={shouldReduceMotion}>
            <Services />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.07} index={3} reduceMotion={shouldReduceMotion}>
            <AIAdvantage />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.09} index={4} reduceMotion={shouldReduceMotion}>
            <GrowthFramework />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.11} index={5} reduceMotion={shouldReduceMotion}>
            <ClientLogos />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.13} index={6} reduceMotion={shouldReduceMotion}>
            <FounderTeam />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.15} index={7} reduceMotion={shouldReduceMotion}>
            <FinalCTA />
          </AnimatedSection>
          <AnimatedSection className="will-change-transform" delay={0.17} index={8} reduceMotion={shouldReduceMotion}>
            <Footer />
          </AnimatedSection>
        </Suspense>
      ) : null}
    </div>
  );
};

export default Home;
