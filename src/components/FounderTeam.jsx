import React from 'react';
import { Award, Users, Target, CheckCircle } from 'lucide-react';

const FounderTeam = () => {
  const founderQualities = [
    'AI & Performance Marketing Expert',
    '10+ Years Industry Experience',
    'Personally Oversees Every Strategy',
    'Direct Access to Founder'
  ];

  const teamStrengths = [
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Expert strategists who understand your business goals and market dynamics'
    },
    {
      icon: Users,
      title: 'Execution Team',
      description: 'Skilled specialists in ads, creative, analytics, and automation'
    },
    {
      icon: Award,
      title: 'Quality Focus',
      description: 'Founder-led quality control ensures excellence in every campaign'
    }
  ];

  return (
    <section id="team" className="py-24 bg-[rgb(17,17,19)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="display-md text-white mb-4">
            <span className="text-[rgb(218,255,1)]">Founder-Led</span> Excellence
          </h2>
          <p className="body-lg text-[rgb(218,218,218)] max-w-2xl mx-auto">
            You're not getting a junior account manager. You're getting direct access to proven expertise and a dedicated team that treats your growth like their own.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Founder Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnxlbnwwfHx8fDE3NzA3MTIyMzJ8MA&ixlib=rb-4.1.0&q=85"
                alt="Founder"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(17,17,19)] via-transparent to-transparent"></div>
              
              {/* Founder Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[rgb(26,28,30)]/90 backdrop-blur-lg border border-[rgb(218,255,1)] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[rgb(218,255,1)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-[rgb(17,17,19)]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Your Founder-Led Advantage</h3>
                    <p className="text-sm text-[rgb(161,161,170)]">Direct strategy sessions with the founder who's scaled 50+ brands</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Qualities & Team */}
          <div className="space-y-8">
            {/* Founder Qualities */}
            <div className="bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8">
              <h3 className="h2 text-white mb-6">Why Founder-Led Matters</h3>
              <div className="space-y-4">
                {founderQualities.map((quality, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-[rgb(218,255,1)] flex-shrink-0" size={24} />
                    <span className="text-[rgb(218,218,218)]">{quality}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Strengths */}
            <div className="space-y-4">
              <h3 className="h2 text-white mb-4">Backed by Expert Planning Team</h3>
              {teamStrengths.map((strength, index) => {
                const Icon = strength.icon;
                return (
                  <div 
                    key={index}
                    className="bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-[rgb(218,255,1)] transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[rgba(218,255,1,0.1)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(218,255,1)] transition-colors">
                        <Icon className="text-[rgb(218,255,1)] group-hover:text-[rgb(17,17,19)] transition-colors" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{strength.title}</h4>
                        <p className="text-sm text-[rgb(161,161,170)]">{strength.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderTeam;
