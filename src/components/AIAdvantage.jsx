import React from 'react';
import { Brain, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import TextAnimation from './ui/scroll-text';

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' }
  })
};

const AIAdvantage = () => {
  const advantages = [
    { icon: Brain, title: 'Intelligent Optimization', description: 'Our AI models analyze millions of data points in real-time, continuously optimizing your campaigns for peak performance. What used to take weeks now happens in minutes.', stats: '10x Faster Optimization' },
    { icon: Zap, title: 'Predictive Scaling', description: 'Machine learning algorithms predict market trends and customer behavior before they happen. Scale winners fast, kill losers instantly, maximize every ad dollar.', stats: '40% Lower CAC' },
    { icon: TrendingUp, title: 'Automated Growth', description: 'From content creation to campaign management, our AI systems handle the heavy lifting while our strategists focus on breakthrough growth opportunities.', stats: '24/7 Performance' }
  ];

  return (
    <section id="ai-advantage" className="py-24 bg-[var(--bg-primary)]">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[rgba(18,216,250,0.04)] to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <TextAnimation as="h2" classname="display-md text-[var(--text-primary)] mb-4" direction="up">
            The <span className="text-[var(--accent-primary)]">AI Advantage</span>
          </TextAnimation>
          <TextAnimation as="p" classname="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto" direction="up">
            While competitors run manual campaigns, we deploy AI systems that work 24/7 to maximize your growth
          </TextAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--accent-primary)] transition-all hover:-translate-y-2 relative group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-[var(--accent-bg)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--accent-primary)] transition-colors">
                  <Icon className="text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)] transition-colors" size={32} />
                </div>
                <div className="text-2xl font-bold text-[var(--accent-primary)] mb-4">{advantage.stats}</div>
                <h3 className="h2 text-[var(--text-primary)] mb-4">{advantage.title}</h3>
                <p className="body-md text-[var(--text-muted)]">{advantage.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-3 bg-[var(--bg-secondary)] border border-[var(--accent-primary)] rounded-full px-8 py-4">
            <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
            <span className="text-[var(--accent-primary)] font-semibold">AI Systems Active &amp; Optimizing</span>
            <div className="w-2 h-2 bg-[var(--accent-primary)] rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAdvantage;
