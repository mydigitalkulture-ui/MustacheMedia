import React from 'react';
import { Zap, ShoppingCart, TrendingUp, Smartphone, Globe, Rocket } from 'lucide-react';

const WhoWeWorkWith = () => {
  const audiences = [
    {
      icon: ShoppingCart,
      title: 'E-commerce Brands',
      description: 'Scaling DTC brands with AI-powered ad optimization and conversion strategies'
    },
    {
      icon: TrendingUp,
      title: 'Quick Commerce',
      description: 'Rapid-growth platforms leveraging hyper-local targeting and instant delivery marketing'
    },
    {
      icon: Smartphone,
      title: 'SaaS Companies',
      description: 'B2B and B2C software companies optimizing customer acquisition costs'
    },
    {
      icon: Globe,
      title: 'Digital Products',
      description: 'Course creators, info products, and digital service providers maximizing LTV'
    },
    {
      icon: Rocket,
      title: 'Growth-Stage Startups',
      description: 'Venture-backed companies scaling from 6 to 8 figures with performance marketing'
    },
    {
      icon: Zap,
      title: 'Enterprise Brands',
      description: 'Established brands modernizing with AI automation and data-driven strategies'
    }
  ];

  return (
    <section className="py-24 bg-[rgb(17,17,19)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="display-md text-white mb-4">
            Who We <span className="text-[rgb(218,255,1)]">Work With</span>
          </h2>
          <p className="body-lg text-[rgb(230,230,230)] max-w-2xl mx-auto">
            We partner with ambitious brands ready to leverage AI and performance marketing for exponential growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index}
                className="feature-card group hover-lift"
              >
                <div className="w-14 h-14 bg-[rgba(218,255,1,0.1)] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[rgb(218,255,1)] transition-colors">
                  <Icon className="text-[rgb(218,255,1)] group-hover:text-[rgb(17,17,19)] transition-colors" size={28} />
                </div>
                <h3 className="h3 text-white mb-3">{audience.title}</h3>
                <p className="body-md text-[rgb(180,180,190)]">{audience.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
