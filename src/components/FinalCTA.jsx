import React, { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const FinalCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission
    if (formData.name && formData.email) {
      toast.success('Strategy call request submitted! We\'ll contact you within 24 hours.');
      setFormData({ name: '', email: '', company: '', revenue: '' });
    } else {
      toast.error('Please fill in your name and email');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    'Free 30-minute strategy session',
    'Custom growth roadmap for your brand',
    'AI opportunity analysis',
    'No-obligation consultation'
  ];

  return (
    <section id="contact" className="py-24 bg-[rgb(26,28,30)] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[rgba(218,255,1,0.05)] to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-[rgba(218,255,1,0.05)] to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Urgency Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-[rgb(218,255,1)] text-[rgb(17,17,19)] rounded-full px-6 py-2 font-semibold">
              <Clock size={18} />
              <span>Limited Spots Available - Only 3 New Clients This Month</span>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="display-md text-white mb-4">
              Ready to <span className="text-[rgb(218,255,1)]">10x Your Growth?</span>
            </h2>
            <p className="body-lg text-[rgb(218,218,218)] max-w-2xl mx-auto">
              Book a free strategy call and discover how AI-powered marketing can transform your business
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="h2 text-white mb-6">What You'll Get:</h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-[rgb(218,255,1)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-[rgb(17,17,19)]" size={16} />
                  </div>
                  <span className="text-lg text-[rgb(218,218,218)]">{benefit}</span>
                </div>
              ))}

              {/* Trust Signals */}
              <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">48hrs</div>
                    <div className="text-sm text-[rgb(161,161,170)]">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">100%</div>
                    <div className="text-sm text-[rgb(161,161,170)]">Free Consultation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-[rgb(17,17,19)] border border-[rgb(218,255,1)] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[rgb(218,218,218)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(218,218,218)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(218,218,218)] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgb(218,218,218)] mb-2">
                    Monthly Revenue
                  </label>
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select range</option>
                    <option value="0-50k">$0 - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-500k">$100k - $500k</option>
                    <option value="500k+">$500k+</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2 group">
                  <Calendar size={20} />
                  <span>Book Your Strategy Call</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-[rgb(161,161,170)]">
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
