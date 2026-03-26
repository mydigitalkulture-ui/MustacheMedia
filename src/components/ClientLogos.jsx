import React from 'react';
import { useAnimate } from "framer-motion";

import image from "@/assests/Iuova White Logo. PNG.png";
import image2 from "@/assests/J12485_Oak-Tree_Logo-Final_Primary-Logo-Green.png";
import image3 from "@/assests/SecureMyCar-Web-Logo-removebg-preview.webp";
import image4 from "@/assests/ZW-Logo-web.png";
import image5 from "@/assests/logo-w.webp";
import image6 from "@/assests/copy_of_gusto_logo_with_r_jprg_2 (1).jpg";
import image7 from "@/assests/Indoartisans_Logo_transparent_bg_no_tagline_375x230 (1).jpg";
import image8 from "@/assests/frais-green-logo_280x.jpg";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ src, alt, href }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-24 w-full place-content-center sm:h-32 md:h-40"
    >
      <img src={src} alt={alt} className="h-12 w-auto object-contain transition-all" style={{ filter: "grayscale(1) brightness(0.7)" }} />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-[var(--bg-tertiary)]"
      >
        <img src={src} alt={alt} className="h-16 w-auto object-contain scale-110 drop-shadow-xl" style={{ filter: "grayscale(0) brightness(1.1)" }} />
      </div>
    </a>
  );
};

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
    <section className="py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[var(--accent-primary)] mb-2 uppercase tracking-wider">
            Trusted By Industry Leaders
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-[var(--bg-secondary)] shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border-subtle)]">
              {clients.slice(0, 4).map((client, idx) => (
                <LinkBox key={idx} src={client.logo} alt={client.name} href="#" />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border-subtle)]">
              {clients.slice(4, 8).map((client, idx) => (
                <LinkBox key={idx} src={client.logo} alt={client.name} href="#" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-16 border-t border-[var(--border-subtle)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">98%</div>
              <div className="text-sm text-[var(--text-muted)] font-medium">Client Retention Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">$120M+</div>
              <div className="text-sm text-[var(--text-muted)] font-medium">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">4.2x</div>
              <div className="text-sm text-[var(--text-muted)] font-medium">Average ROI</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">24/7</div>
              <div className="text-sm text-[var(--text-muted)] font-medium">AI Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;