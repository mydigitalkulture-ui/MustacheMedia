import { lazy, Suspense, useEffect, useState } from 'react';
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

const Home = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [enableBackgroundFrames, setEnableBackgroundFrames] = useState(false);

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

  return (
    <div className="min-h-screen relative">
      {enableBackgroundFrames ? (
        <Suspense fallback={null}>
          <ScrollFrameBackground
            startSelector="#who-we-work-with"
            endSelector="#contact"
          />
        </Suspense>
      ) : null}

      <Header />
      <HeroSection />

      {showDeferredSections ? (
        <Suspense fallback={null}>
          <div id="who-we-work-with">
            <WhoWeWorkWith />
          </div>
          <Services />
          <AIAdvantage />
          <GrowthFramework />
          <ClientLogos />
          <FounderTeam />
          <FinalCTA />
          <Footer />
        </Suspense>
      ) : null}
    </div>
  );
};

export default Home;
