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

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ClientLogos />
      <WhoWeWorkWith />
      <Services />
      <AIAdvantage />
      <GrowthFramework />
      <FounderTeam />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;
