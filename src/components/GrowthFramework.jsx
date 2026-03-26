import React from 'react';
import { Search, Lightbulb, Rocket, LineChart, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import TextAnimation from './ui/scroll-text';

const rowVariants = {
  hidden: { opacity: 0, x: -40, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' }
  })
};

const GrowthFramework = () => {
  const steps = [
    { number: '01', icon: Search, title: 'Deep Discovery', description: "Comprehensive audit of your current marketing, competitive landscape, and growth opportunities. We identify what's working, what's broken, and where the biggest wins hide." },
    { number: '02', icon: Lightbulb, title: 'AI Strategy Blueprint', description: 'Custom growth strategy combining AI automation, performance channels, and creative angles. We map out the exact path from your current state to your revenue goals.' },
    { number: '03', icon: Rocket, title: 'Rapid Deployment', description: 'Launch optimized campaigns across Meta, Google, and high-converting channels within 7 days. Speed matters, but precision matters more - we deliver both.' },
    { number: '04', icon: LineChart, title: 'Scale & Optimize', description: 'AI-powered optimization runs 24/7 while our team identifies breakthrough opportunities. We scale winners aggressively and cut losers ruthlessly.' },
    { number: '05', icon: RefreshCw, title: 'Continuous Innovation', description: 'Monthly strategy sessions, new channel testing, and creative refresh. We stay ahead of platform changes and market shifts to maintain your competitive edge.' }
  ];

  return (
    <section id="process" className="py-24 bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <TextAnimation as="h2" classname="display-md text-[var(--text-primary)] mb-4" direction="up">
            Our <span className="text-[var(--accent-primary)]">Growth Framework</span>
          </TextAnimation>
          <TextAnimation as="p" classname="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto" direction="up">
            A proven 5-step system that's scaled 50+ brands from 6 to 8 figures
          </TextAnimation>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--accent-primary)] transition-all group relative overflow-hidden"
              >
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] font-bold text-[var(--bg-tertiary)] group-hover:text-[rgba(18,216,250,0.08)] transition-colors select-none">
                  {step.number}
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center group-hover:bg-[var(--accent-primary)] transition-colors">
                      <Icon className="text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)] transition-colors" size={28} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[var(--accent-primary)] text-sm font-bold">STEP {step.number}</span>
                      <div className="h-px flex-grow bg-[var(--border-subtle)]"></div>
                    </div>
                    <h3 className="h2 text-[var(--text-primary)] mb-3">{step.title}</h3>
                    <p className="body-md text-[var(--text-secondary)]">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2">
            <div className="h-px w-16 bg-[var(--accent-primary)]"></div>
            <span className="text-sm text-[var(--text-secondary)]">Average time to first results: 14-30 days</span>
            <div className="h-px w-16 bg-[var(--accent-primary)]"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GrowthFramework;
