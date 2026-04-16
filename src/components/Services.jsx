import React, { useEffect, useRef } from 'react';
import { Bot, Target, ShoppingBag, Share2, Video, BarChart3 } from 'lucide-react';
import TextAnimation from './ui/scroll-text';
import { motion } from 'framer-motion';

const Services = () => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    const shouldEnable = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shouldEnable || !vantaRef.current) return;

    let cancelled = false;

    const initVanta = async () => {
      const [{ default: FOG }, THREE] = await Promise.all([
        import('vanta/dist/vanta.fog.min'),
        import('three'),
      ]);

      if (cancelled || !vantaRef.current) return;

      vantaEffectRef.current = FOG({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0x12d8fa,
        midtoneColor: 0x0f2f49,
        lowlightColor: 0x0b1020,
        baseColor: 0x070b14,
        blurFactor: 0.6,
        speed: 1.4,
        zoom: 1.1,
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
    <section id="services" className="relative py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgb(10,13,20)]/80 via-[rgb(10,13,20)]/65 to-[rgb(10,13,20)]/85" />

      <div className="container mx-auto px-6 relative z-[2]">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center space-x-2 bg-[var(--accent-bg)] border border-[var(--accent-primary)] rounded-full px-6 py-2 mb-6"
          >
            <span className="text-[var(--accent-primary)] text-sm font-semibold">AI-First Services</span>
          </motion.div>
          <TextAnimation as="h2" classname="display-md text-[var(--text-primary)] mb-4" direction="up">
            Services Built for the <span className="text-[var(--accent-primary)]">AI Era</span>
          </TextAnimation>
          <TextAnimation as="p" classname="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto" direction="up" lineAnime={true}>
            Every service is enhanced with cutting-edge AI technology to deliver results faster, smarter, and more profitably
          </TextAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: '-10%' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="feature-card group cursor-pointer"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(26,28,30)] via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                    <Icon className="text-[var(--bg-primary)]" size={24} />
                  </div>
                </div>

                <h3 className="h3 text-[var(--text-primary)] mb-3">{service.title}</h3>
                <p className="body-md text-[var(--text-muted)] mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full"></div>
                      <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
