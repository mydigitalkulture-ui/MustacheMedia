import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const HeroSection = () => {
  const handlePrimaryCTA = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryCTA = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1562575214-da9fcf59b907?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrfDE3NzA3MTIxNzR8MA&ixlib=rb-4.1.0&q=85"
          alt="AI Technology"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(17,17,19)]/80 via-[rgb(17,17,19)]/60 to-[rgb(17,17,19)]"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[rgba(218,255,1,0.1)] border border-[rgb(218,255,1)] rounded-full px-6 py-2 mb-8">
            <span className="text-[rgb(218,255,1)] text-sm font-semibold">AI-Powered Growth Agency</span>
          </div>

          {/* Headline */}
          <h1 className="display-lg text-white mb-6 animate-fade-in">
            Mustache Media:<br />
            <span className="text-[rgb(218,255,1)]">AI-First Marketing</span><br />
            That Drives Revenue
          </h1>

          {/* Subheadline */}
          <p className="body-lg text-[rgb(230,230,230)] max-w-2xl mx-auto mb-12">
            Founder-led agency combining cutting-edge AI automation with performance marketing expertise to scale brands profitably across Meta, Google, and emerging platforms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handlePrimaryCTA} className="btn-primary flex items-center space-x-2 group">
              <Calendar size={20} />
              <span>Book Strategy Call</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleSecondaryCTA} className="btn-secondary">
              Explore Services
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">$50M+</div>
              <div className="text-sm text-[rgb(180,180,190)]">Ad Spend Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">300%</div>
              <div className="text-sm text-[rgb(180,180,190)]">Avg ROAS Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">50+</div>
              <div className="text-sm text-[rgb(180,180,190)]">Brands Scaled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[rgb(218,255,1)] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[rgb(218,255,1)] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
