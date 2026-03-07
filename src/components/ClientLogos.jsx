import React from 'react';
import image from "@/assests/Iuova White Logo. PNG.png";
import image2 from "@/assests/J12485_Oak-Tree_Logo-Final_Primary-Logo-Green.png";
import image3 from "@/assests/SecureMyCar-Web-Logo-removebg-preview.webp";
import image4 from "@/assests/ZW-Logo-web.png";
import image5 from "@/assests/logo-w.webp";
import image6 from "@/assests/copy_of_gusto_logo_with_r_jprg_2 (1).jpg";
import image7 from "@/assests/Indoartisans_Logo_transparent_bg_no_tagline_375x230 (1).jpg";
import image8 from "@/assests/frais-green-logo_280x.jpg";

const ClientLogos = () => {
  const clients = [
    { name: 'TechCorp', logo: image },
    { name: 'ShopFlow', logo: image2 },
    { name: 'DataVault', logo: image3 },
    { name: 'GrowthLabs', logo: image4 },
    { name: 'CloudNine', logo: image5 },
    { name: 'MetaScale', logo: image6 },
    { name: 'BrandBoost', logo: image7 },
    { name: 'FastCommerce', logo: image8 }
  ];

  return (
    <section className="py-16 bg-[rgb(17,17,19)] border-y border-[rgba(255,255,255,0.05)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[rgb(218,255,1)] mb-2 uppercase tracking-wider">
            Trusted By Industry Leaders
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-6" style={{ background: "rgb(17,17,19)" }}>
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to right, rgb(17,17,19), transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
            style={{ background: "linear-gradient(to left, rgb(17,17,19), transparent)" }} />

          {/* Marquee track */}
          <div className="flex w-max items-center" style={{ animation: "marquee 28s linear infinite" }}>
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="mx-10 flex items-center justify-center group"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    filter: "grayscale(0.4) brightness(0.6)", 
                    transition: "filter 0.3s, transform 0.3s",
                    maxWidth: "140px"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0) brightness(1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(1) brightness(0.6)"; }}
                />
              </div>
            ))}
          </div>

          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
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