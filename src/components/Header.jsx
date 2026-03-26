import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import image from './hero_logo.png';

const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'ai-advantage', label: 'AI Advantage' },
  { id: 'process', label: 'Process' },
  { id: 'team', label: 'Team' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(item.id);
            return;
          }
        }
      }
      
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const top = heroEl.offsetTop;
        const height = heroEl.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveTab('hero');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/70 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img src={image} alt="Mustache Media Logo" className="h-10 w-auto mr-3" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 rounded-full font-medium transition-colors"
                style={{ transformStyle: "preserve-3d" }}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="header-active-tab-desktop"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 bg-[var(--accent-bg)] rounded-full -z-10"
                  />
                )}
                <span className={`relative z-10 ${activeTab === item.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors'}`}>
                  {item.label}
                </span>
              </button>
            ))}
            <div className="pl-4">
              <button onClick={() => scrollToSection('contact')} className="btn-primary py-2 px-6 min-h-[44px] text-sm">
                Book a Call
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[var(--text-primary)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col items-start space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-3 rounded-xl font-medium w-full text-left"
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="header-active-tab-mobile"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 bg-[var(--accent-bg)] rounded-xl -z-10"
                  />
                )}
                <span className={`relative z-10 ${activeTab === item.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {item.label}
                </span>
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')} className="btn-primary w-full mt-4">
              Book a Call
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
