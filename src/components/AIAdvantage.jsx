import React from 'react';
import { Brain, Zap, TrendingUp } from 'lucide-react';

const AIAdvantage = () => {
  const advantages = [
    {
      icon: Brain,
      title: 'Intelligent Optimization',
      description: 'Our AI models analyze millions of data points in real-time, continuously optimizing your campaigns for peak performance. What used to take weeks now happens in minutes.',
      stats: '10x Faster Optimization'
    },
    {
      icon: Zap,
      title: 'Predictive Scaling',
      description: 'Machine learning algorithms predict market trends and customer behavior before they happen. Scale winners fast, kill losers instantly, maximize every ad dollar.',
      stats: '40% Lower CAC'
    },
    {
      icon: TrendingUp,
      title: 'Automated Growth',
      description: 'From content creation to campaign management, our AI systems handle the heavy lifting while our strategists focus on breakthrough growth opportunities.',
      stats: '24/7 Performance'
    }
  ];

  return (
    <section id="ai-advantage" className="py-24 bg-[rgb(17,17,19)] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[rgba(218,255,1,0.05)] to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="display-md text-white mb-4">
            The <span className="text-[rgb(218,255,1)]">AI Advantage</span>
          </h2>
          <p className="body-lg text-[rgb(230,230,230)] max-w-2xl mx-auto">
            While competitors run manual campaigns, we deploy AI systems that work 24/7 to maximize your growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div 
                key={index}
                className="bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 hover:border-[rgb(218,255,1)] transition-all hover:-translate-y-2 relative group"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[rgb(218,255,1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-16 h-16 bg-[rgba(218,255,1,0.1)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[rgb(218,255,1)] transition-colors">
                  <Icon className="text-[rgb(218,255,1)] group-hover:text-[rgb(17,17,19)] transition-colors" size={32} />
                </div>
                
                <div className="text-2xl font-bold text-[rgb(218,255,1)] mb-4">{advantage.stats}</div>
                
                <h3 className="h2 text-white mb-4">{advantage.title}</h3>
                <p className="body-md text-[rgb(180,180,190)]">{advantage.description}</p>
              </div>
            );
          })}
        </div>

        {/* AI Visual Element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-[rgb(26,28,30)] border border-[rgb(218,255,1)] rounded-full px-8 py-4">
            <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full animate-pulse"></div>
            <span className="text-[rgb(218,255,1)] font-semibold">AI Systems Active & Optimizing</span>
            <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAdvantage;
