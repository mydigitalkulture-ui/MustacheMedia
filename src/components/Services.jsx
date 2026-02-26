import React from 'react';
import { Bot, Target, ShoppingBag, Share2, Video, BarChart3 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI Marketing & Automation',
      description: 'Leverage GPT-powered content creation, predictive analytics, and automated campaign optimization to scale your marketing 10x faster.',
      image: 'https://images.unsplash.com/photo-1571677246347-5040036b95cc',
      features: ['AI Content Generation', 'Predictive Analytics', 'Smart Automation']
    },
    {
      icon: Target,
      title: 'Performance Marketing',
      description: 'Data-driven Meta & Google Ads campaigns engineered for maximum ROAS. We optimize every dollar for profitable growth.',
      image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86',
      features: ['Meta Ads', 'Google Ads', 'ROAS Optimization']
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce & Quick Commerce',
      description: 'Specialized strategies for online stores and rapid delivery platforms. From product launches to scale campaigns.',
      image: 'https://images.unsplash.com/photo-1707157281599-d155d1da5b4c',
      features: ['Product Launch', 'Cart Optimization', 'Retention Campaigns']
    },
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'AI-enhanced social strategies that build communities and drive conversions across all major platforms.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      features: ['Content Strategy', 'Community Building', 'Influencer Marketing']
    },
    {
      icon: Video,
      title: 'Video Editing & AI Videos',
      description: 'Professional video production combined with AI-generated content. Create scroll-stopping creatives at scale.',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b',
      features: ['AI Video Generation', 'Professional Editing', 'UGC Content']
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & Dashboards',
      description: 'Real-time performance dashboards and AI-powered insights. Make data-driven decisions with confidence.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      features: ['Custom Dashboards', 'Predictive Modeling', 'Attribution Tracking']
    }
  ];

  return (
    <section id="services" className="py-24 bg-[rgb(26,28,30)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-[rgba(218,255,1,0.1)] border border-[rgb(218,255,1)] rounded-full px-6 py-2 mb-6">
            <span className="text-[rgb(218,255,1)] text-sm font-semibold">AI-First Services</span>
          </div>
          <h2 className="display-md text-white mb-4">
            Services Built for the <span className="text-[rgb(218,255,1)]">AI Era</span>
          </h2>
          <p className="body-lg text-[rgb(230,230,230)] max-w-2xl mx-auto">
            Every service is enhanced with cutting-edge AI technology to deliver results faster, smarter, and more profitably
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="feature-card group cursor-pointer"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(26,28,30)] via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-[rgb(218,255,1)] rounded-lg flex items-center justify-center">
                    <Icon className="text-[rgb(17,17,19)]" size={24} />
                  </div>
                </div>
                
                <h3 className="h3 text-white mb-3">{service.title}</h3>
                <p className="body-md text-[rgb(180,180,190)] mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[rgb(218,255,1)] rounded-full"></div>
                      <span className="text-sm text-[rgb(230,230,230)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
