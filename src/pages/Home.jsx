import React from 'react';
import HeroSection from '../components/HeroSection';
import ClientLogos from '../components/ClientLogos';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import Services from '../components/Services';
import AIAdvantage from '../components/AIAdvantage';
import GrowthFramework from '../components/GrowthFramework';
import FounderTeam from '../components/FounderTeam';
import FinalCTA from '../components/FinalCTA';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Workflow from '@/components/workflow';
import ScrollFrameBackground from '../components/ui/ScrollFrameBackground';

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Scroll-driven frame animation: plays from WhoWeWorkWith → FinalCTA */}
      <ScrollFrameBackground
        startSelector="#who-we-work-with"
        endSelector="#contact"
      />

      <Header />
      <HeroSection />

      {/* Frame animation background starts here */}
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
    </div>
  );
};

export default Home;
