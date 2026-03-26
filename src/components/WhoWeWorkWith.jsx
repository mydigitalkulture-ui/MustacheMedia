import React from 'react';
import { Zap, ShoppingCart, TrendingUp, Smartphone, Globe, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import TextAnimation from './ui/scroll-text';

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
  })
};

const WhoWeWorkWith = () => {
  const audiences = [
    { icon: ShoppingCart, title: 'E-commerce Brands', description: 'Scaling DTC brands with AI-powered ad optimization and conversion strategies' },
    { icon: TrendingUp, title: 'Quick Commerce', description: 'Rapid-growth platforms leveraging hyper-local targeting and instant delivery marketing' },
    { icon: Smartphone, title: 'SaaS Companies', description: 'B2B and B2C software companies optimizing customer acquisition costs' },
    { icon: Globe, title: 'Digital Products', description: 'Course creators, info products, and digital service providers maximizing LTV' },
    { icon: Rocket, title: 'Growth-Stage Startups', description: 'Venture-backed companies scaling from 6 to 8 figures with performance marketing' },
    { icon: Zap, title: 'Enterprise Brands', description: 'Established brands modernizing with AI automation and data-driven strategies' }
  ];

  return (
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <TextAnimation as="h2" classname="display-md text-[var(--text-primary)] mb-4" direction="up">
            Who We <span className="text-[var(--accent-primary)]">Work With</span>
          </TextAnimation>
          <TextAnimation as="p" classname="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto" direction="up">
            We partner with ambitious brands ready to leverage AI and performance marketing for exponential growth
          </TextAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-10%' }}
                className="feature-card group hover-lift"
              >
                <div className="w-14 h-14 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[var(--accent-primary)] transition-colors">
                  <Icon className="text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)] transition-colors" size={28} />
                </div>
                <h3 className="h3 text-[var(--text-primary)] mb-3">{audience.title}</h3>
                <p className="body-md text-[var(--text-muted)]">{audience.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
