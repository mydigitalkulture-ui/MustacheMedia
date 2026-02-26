import React from 'react';

const ClientLogos = () => {
  const clients = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'ShopFlow', logo: 'SF' },
    { name: 'DataVault', logo: 'DV' },
    { name: 'GrowthLabs', logo: 'GL' },
    { name: 'CloudNine', logo: 'CN' },
    { name: 'MetaScale', logo: 'MS' },
    { name: 'BrandBoost', logo: 'BB' },
    { name: 'FastCommerce', logo: 'FC' }
  ];

  return (
    <section className="py-16 bg-[rgb(17,17,19)] border-y border-[rgba(255,255,255,0.05)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[rgb(218,255,1)] mb-2 uppercase tracking-wider">
            Trusted By Industry Leaders
          </p>
          <h3 className="text-2xl text-white font-semibold">
            Brands We've Scaled to 7 & 8 Figures
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center group"
            >
              <div className="w-20 h-20 bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center hover:border-[rgb(218,255,1)] hover:bg-[rgba(218,255,1,0.05)] transition-all duration-300 group-hover:scale-110">
                <span className="text-xl font-bold text-[rgb(180,180,190)] group-hover:text-[rgb(218,255,1)] transition-colors">
                  {client.logo}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 pt-12 border-t border-[rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">98%</div>
              <div className="text-sm text-[rgb(180,180,190)]">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">$120M+</div>
              <div className="text-sm text-[rgb(180,180,190)]">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">4.2x</div>
              <div className="text-sm text-[rgb(180,180,190)]">Average ROI</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[rgb(218,255,1)] mb-2">24/7</div>
              <div className="text-sm text-[rgb(180,180,190)]">AI Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
