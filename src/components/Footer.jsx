import React from 'react';
import { Instagram, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import Globe from './ui/globe';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      'AI Marketing & Automation',
      'Performance Marketing',
      'E-commerce Advertising',
      'Social Media Marketing',
      'Video Production',
      'Data Analytics'
    ],
    company: [
      'About Us',
      'Our Process',
      'Case Studies',
      'Blog',
      'Careers'
    ],
    resources: [
      'Free Consultation',
      'AI Marketing Guide',
      'Growth Framework',
      'Contact Us'
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:mydigitalkulture@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] pt-20 pb-8 overflow-hidden">

      {/* Globe Background */}
      <div className="absolute -right-24 -bottom-24 opacity-65 pointer-events-none select-none z-0">
        <Globe size={520} />
      </div>
      {/* Radial mask so globe blends into footer */}
      <div className="absolute right-0 bottom-0 w-[520px] h-[520px] bg-[radial-gradient(ellipse_at_bottom_right,transparent_40%,var(--bg-secondary)_75%)] pointer-events-none z-[1]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Mustache Media</h3>
            <p className="text-[var(--text-secondary)] mb-6">
              AI-powered marketing agency helping ambitious brands scale profitably through performance marketing and automation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:growth@mustachemedia.in" className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <Mail size={18} />
                <span>growth@mustachemedia.in</span>
              </a>
              <a href="tel:+919833581238" className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                <Phone size={18} />
                <span>+91 98335 81238</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a key={index} href={social.href} aria-label={social.label} className="footer-social-link">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href="#services" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-[var(--text-secondary)]">
              © {currentYear} Mustache Media. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
