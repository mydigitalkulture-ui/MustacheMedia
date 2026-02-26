import React from 'react';
import { Search, Lightbulb, Rocket, LineChart, RefreshCw } from 'lucide-react';

const GrowthFramework = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Deep Discovery',
      description: 'Comprehensive audit of your current marketing, competitive landscape, and growth opportunities. We identify what\'s working, what\'s broken, and where the biggest wins hide.'
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'AI Strategy Blueprint',
      description: 'Custom growth strategy combining AI automation, performance channels, and creative angles. We map out the exact path from your current state to your revenue goals.'
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Rapid Deployment',
      description: 'Launch optimized campaigns across Meta, Google, and high-converting channels within 7 days. Speed matters, but precision matters more - we deliver both.'
    },
    {
      number: '04',
      icon: LineChart,
      title: 'Scale & Optimize',
      description: 'AI-powered optimization runs 24/7 while our team identifies breakthrough opportunities. We scale winners aggressively and cut losers ruthlessly.'
    },
    {
      number: '05',
      icon: RefreshCw,
      title: 'Continuous Innovation',
      description: 'Monthly strategy sessions, new channel testing, and creative refresh. We stay ahead of platform changes and market shifts to maintain your competitive edge.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-[rgb(26,28,30)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="display-md text-white mb-4">
            Our <span className="text-[rgb(218,255,1)]">Growth Framework</span>
          </h2>
          <p className="body-lg text-[rgb(218,218,218)] max-w-2xl mx-auto">
            A proven 5-step system that's scaled 50+ brands from 6 to 8 figures
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="bg-[rgb(17,17,19)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 hover:border-[rgb(218,255,1)] transition-all group relative overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] font-bold text-[rgb(38,40,42)] group-hover:text-[rgba(218,255,1,0.1)] transition-colors">
                  {step.number}
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[rgba(218,255,1,0.1)] rounded-xl flex items-center justify-center group-hover:bg-[rgb(218,255,1)] transition-colors">
                      <Icon className="text-[rgb(218,255,1)] group-hover:text-[rgb(17,17,19)] transition-colors" size={28} />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[rgb(218,255,1)] text-sm font-bold">STEP {step.number}</span>
                      <div className="h-px flex-grow bg-[rgba(255,255,255,0.1)]"></div>
                    </div>
                    <h3 className="h2 text-white mb-3">{step.title}</h3>
                    <p className="body-md text-[rgb(161,161,170)]">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Connector Visual */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="h-px w-16 bg-[rgb(218,255,1)]"></div>
            <span className="text-sm text-[rgb(161,161,170)]">Average time to first results: 14-30 days</span>
            <div className="h-px w-16 bg-[rgb(218,255,1)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthFramework;
