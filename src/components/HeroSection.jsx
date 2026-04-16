import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, TrendingUp, BarChart, Network } from 'lucide-react';

const HeroSection = () => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    const shouldEnable =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!shouldEnable || !vantaRef.current) return;

    let cancelled = false;

    const initVanta = async () => {
      const [{ default: GLOBE }, THREE] = await Promise.all([
        import('vanta/dist/vanta.globe.min'),
        import('three'),
      ]);

      if (cancelled || !vantaRef.current) return;

      vantaEffectRef.current = GLOBE({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x0b1020,
        color: 0x12d8fa,
        color2: 0x7dd3fc,
      });
    };

    initVanta();

    return () => {
      cancelled = true;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  const handlePrimaryCTA = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 96;
      const targetY = contactSection.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] pt-32 pb-20">
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg-primary)]/75 via-[var(--bg-primary)]/60 to-[var(--bg-primary)]/80" />

      <div className="container mx-auto px-6 relative z-[2] flex flex-col items-center text-center mt-10">

        {/* Industry Pill */}
        <div className="inline-flex items-center space-x-2 bg-transparent border border-[var(--accent-primary)] rounded-full px-4 py-1.5 mb-8 animate-fade-in shadow-[0_0_15px_rgba(18,216,250,0.1)]">
          <span className="text-sm font-medium text-[var(--accent-primary)] tracking-wide">
            AI-Powered Growth Agency
          </span>
        </div>

        {/* Headline */}
        <h1 className="display-lg text-[var(--text-primary)] max-w-4xl mx-auto mb-6 animate-fade-in leading-[1.1]">
          Mustache Media: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-primary)] to-[var(--accent-green)] font-bold">[AI-First Marketing]</span><br />
          That Drives Revenue
        </h1>

        {/* Subheadline */}
        <p className="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Founder-led agency combining cutting-edge AI automation with performance marketing
          expertise to scale brands profitably across Meta, Google, and emerging platforms.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in mb-24" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={handlePrimaryCTA}
            className="group flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full text-[var(--bg-primary)] font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(18,216,250,0.4)] bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-primary)] to-[var(--accent-green)] border border-transparent hover:border-white"
          >
            <Calendar size={20} />
            <span>Book Strategy Call</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full text-[var(--accent-cyan)] font-medium border border-[var(--accent-cyan)] bg-[var(--bg-secondary)] bg-opacity-50 hover:bg-opacity-80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(18,216,250,0.2)]">
            Explore Services
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>

          {/* Stat 1 */}
          <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] bg-opacity-40 border border-[var(--border-subtle)] p-4 rounded-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] bg-opacity-80 flex items-center justify-center shrink-0 border border-[var(--accent-cyan)] shadow-[inset_0_0_10px_rgba(18,216,250,0.2)]">
              <BarChart size={24} className="text-[var(--accent-green)]" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[var(--text-primary)]">$50M+</h3>
              <p className="text-sm text-[var(--text-secondary)]">Ad Spend Managed</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] bg-opacity-40 border border-[var(--border-subtle)] p-4 rounded-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] bg-opacity-80 flex items-center justify-center shrink-0 border border-[var(--accent-cyan)] shadow-[inset_0_0_10px_rgba(18,216,250,0.2)]">
              <TrendingUp size={24} className="text-[var(--accent-cyan)]" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[var(--text-primary)]">300%</h3>
              <p className="text-sm text-[var(--text-secondary)]">Avg ROAS Increase</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] bg-opacity-40 border border-[var(--border-subtle)] p-4 rounded-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] bg-opacity-80 flex items-center justify-center shrink-0 border border-[var(--accent-cyan)] shadow-[inset_0_0_10px_rgba(18,216,250,0.2)]">
              <Network size={24} className="text-[var(--accent-blue)]" />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-[var(--text-primary)]">50+</h3>
              <p className="text-sm text-[var(--text-secondary)]">Brands Scaled</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
