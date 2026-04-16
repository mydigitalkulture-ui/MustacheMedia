import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';

const ScrollFrameBackground = lazy(() => import('../components/ui/ScrollFrameBackground'));
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

const sectionMeta = [
  { id: 'hero', label: 'Hero' },
  { id: 'who-we-work-with', label: 'Who' },
  { id: 'services', label: 'Services' },
  { id: 'ai-advantage', label: 'AI' },
  { id: 'process', label: 'Process' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

const ScrollProgressRail = ({ activeSection, onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    mass: 0.45,
  });

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex items-center gap-3 pointer-events-none">
      <div className="relative h-56 w-[2px] rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-cyan-300 via-cyan-400 to-emerald-300"
          style={{ scaleY: progressScale }}
        />
      </div>
      <div className="pointer-events-auto flex flex-col gap-2">
        {sectionMeta.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="group flex items-center gap-2 text-xs"
              aria-label={`Scroll to ${section.label}`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-300 border-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.9)]'
                    : 'bg-transparent border-white/45 group-hover:border-cyan-200'
                }`}
              />
              <span className={`transition-colors duration-300 ${isActive ? 'text-cyan-200' : 'text-white/60 group-hover:text-cyan-100'}`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [enableBackgroundFrames, setEnableBackgroundFrames] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const observedSections = useMemo(
    () => sectionMeta.map((s) => s.id),
    []
  );

  const navigateToSection = useCallback(
    (id) => {
      const headerOffset = 96;

      const scrollNow = () => {
        const el = document.getElementById(id);
        if (!el) return false;

        const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        setActiveSection(id);
        return true;
      };

      if (scrollNow()) return;

      if (!showDeferredSections) {
        setShowDeferredSections(true);
        window.setTimeout(() => {
          scrollNow();
        }, 140);
      }
    },
    [showDeferredSections]
  );

  useEffect(() => {
    const canUseBackgroundFrames =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setEnableBackgroundFrames(canUseBackgroundFrames);

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

  useEffect(() => {
    const elements = observedSections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const nextSection = visible[0].target.id;
          setActiveSection((prev) => (prev === nextSection ? prev : nextSection));
        }
      },
      {
        threshold: [0.35],
        rootMargin: '-16% 0px -40% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observedSections, showDeferredSections]);

  return (
    <div className="min-h-screen relative">
      <ScrollProgressRail activeSection={activeSection} onNavigate={navigateToSection} />
      {enableBackgroundFrames ? (
        <Suspense fallback={null}>
          <ScrollFrameBackground
            startSelector="#who-we-work-with"
            endSelector="#contact"
          />
        </Suspense>
      ) : null}

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
