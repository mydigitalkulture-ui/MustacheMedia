import React from 'react';
import { Award, Users, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import TextAnimation from './ui/scroll-text';
import './FounderTeamBlobBg.css';

const FounderTeam = () => {
  const founderQualities = [
    'AI & Performance Marketing Expert',
    '10+ Years Industry Experience',
    'Personally Oversees Every Strategy',
    'Direct Access to Founder'
  ];

  const teamStrengths = [
    { icon: Target, title: 'Strategic Planning', description: 'Expert strategists who understand your business goals and market dynamics' },
    { icon: Users, title: 'Execution Team', description: 'Skilled specialists in ads, creative, analytics, and automation' },
    { icon: Award, title: 'Quality Focus', description: 'Founder-led quality control ensures excellence in every campaign' }
  ];

  return (
    <section id="team" className="founder-team-section py-24 bg-[var(--bg-primary)]">
      <div className="founder-team-blob-bg" aria-hidden="true">
        <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
          <path
            fill="#9b5de5"
            className="founder-blob-out-top"
            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
          />
          <path
            fill="#f15bb5"
            className="founder-blob-in-top"
            d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
          />
          <path
            fill="#00bbf9"
            className="founder-blob-out-bottom"
            d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
          />
          <path
            fill="#00f5d4"
            className="founder-blob-in-bottom"
            d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
          />
        </svg>
      </div>
      <div className="founder-team-blob-overlay" />

      <div className="founder-team-content container mx-auto px-6">
        <div className="text-center mb-16">
          <TextAnimation as="h2" classname="display-md text-[var(--text-primary)] mb-4" direction="up">
            <span className="text-[var(--accent-primary)]">Founder-Led</span> Excellence
          </TextAnimation>
          <TextAnimation as="p" classname="body-lg text-[var(--text-secondary)] max-w-2xl mx-auto" direction="up">
            You're not getting a junior account manager. You're getting direct access to proven expertise and a dedicated team that treats your growth like their own.
          </TextAnimation>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGxlYWRlcnxlbnwwfHx8fDE3NzA3MTIyMzJ8MA&ixlib=rb-4.1.0&q=85"
                alt="Founder"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-[var(--bg-secondary)]/90 backdrop-blur-lg border border-[var(--accent-primary)] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-[var(--bg-primary)]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Your Founder-Led Advantage</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Direct strategy sessions with the founder who's scaled 50+ brands</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h3 className="h2 text-[var(--text-primary)] mb-6">Why Founder-Led Matters</h3>
              <div className="space-y-4">
                {founderQualities.map((quality, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="text-[var(--accent-primary)] flex-shrink-0" size={24} />
                    <span className="text-[var(--text-secondary)]">{quality}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="h2 text-[var(--text-primary)] mb-4">Backed by Expert Planning Team</h3>
              {teamStrengths.map((strength, index) => {
                const Icon = strength.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--accent-primary)] transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[var(--accent-bg)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-primary)] transition-colors">
                        <Icon className="text-[var(--accent-primary)] group-hover:text-[var(--bg-primary)] transition-colors" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">{strength.title}</h4>
                        <p className="text-sm text-[var(--text-secondary)]">{strength.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderTeam;
