import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import image from './hero_logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of fixed header
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgb(17,17,19)]/70 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={image} onClick={() => scrollToSection('hero')} alt="Mustache Media Logo" className="h-10 w-70 mr-3 cursor-pointer" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('ai-advantage')} className="text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              AI Advantage
            </button>
            <button onClick={() => scrollToSection('process')} className="text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection('team')} className="text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Team
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary">
              Book a Call
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => scrollToSection('services')} className="block text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('ai-advantage')} className="block text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              AI Advantage
            </button>
            <button onClick={() => scrollToSection('process')} className="block text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Process
            </button>
            <button onClick={() => scrollToSection('team')} className="block text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors">
              Team
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-primary w-full">
              Book a Call
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
