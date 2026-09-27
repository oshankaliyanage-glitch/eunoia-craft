import React from 'react';
import { ArrowDown, MessageCircle, Sparkles, MapPin, Heart, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/craft_hero_banner_1790238580937.jpg';
import { BUSINESS_INFO } from '../data/products.ts';

interface HeroProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsApp }) => {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-[#FDFBF7]/60 to-white pt-6 pb-16 md:pt-10 md:pb-24">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy, Emblem Badge, and Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Location & Small Batch Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-800">
              <span className="flex items-center gap-1.5 text-blue-700">
                <MapPin className="w-3.5 h-3.5" />
                {BUSINESS_INFO.city}, {BUSINESS_INFO.country}
              </span>
              <span aria-hidden="true" className="text-blue-300">·</span>
              <span className="text-slate-500">Handmade Craft Studio</span>
            </div>

            {/* Headline and Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-950 tracking-tight leading-[1.1]">
                  {BUSINESS_INFO.name}
                </h1>
                <span className="text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                  Crafted in Colombo
                </span>
              </div>

              <p className="text-2xl sm:text-3xl font-serif italic text-blue-800 tracking-wide">
                — {BUSINESS_INFO.tagline} —
              </p>
            </div>

            {/* Descriptive Prose */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              An artisanal sanctuary in Colombo dedicated to slow, mindful living. 
              From wheel-thrown ceramic mugs and crackling soy wax candles to handwoven cane baskets and delicate linen pouches, every piece is created with heartfelt purpose.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
              >
                <span>Browse 6 Signature Crafts</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={() => onOpenWhatsApp("Hello Eunoia! I saw your website and logo, and I would love to order handcrafted items for delivery in Sri Lanka.")}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-blue-950 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-blue-100/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-2xl font-serif font-bold text-blue-950 tabular-nums">100%</p>
                <p className="text-xs text-slate-500 mt-0.5">Handmade Craft</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-blue-950 tabular-nums">Sri Lanka</p>
                <p className="text-xs text-slate-500 mt-0.5">Island-Wide Shipping</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-blue-950 tabular-nums">Small Batch</p>
                <p className="text-xs text-slate-500 mt-0.5">Zero Mass Production</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visuals Featuring the Brand Logo & Studio */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none flex flex-col items-center">
              
              {/* Studio Photography Card */}
              <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src={heroImg}
                  alt="Eunoia artisan studio in Colombo"
                  className="w-full h-auto object-cover aspect-16/10 transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Scrim overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/85 via-blue-950/40 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium tracking-wide uppercase text-blue-200">The Colombo Atelier</p>
                      <p className="text-sm font-serif font-semibold mt-0.5">Artisan Cane, Pottery & Textiles</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-100 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Original Crafts
                    </span>
                  </div>
                </div>
              </div>

              {/* Prominent Floating Brand Logo Emblem Card */}
              <div className="relative -mt-16 sm:-mt-20 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-200/90 max-w-md w-11/12 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                
                {/* Official Circular Logo Seal with stitched border appearance */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-dashed border-amber-700/40 p-0.5 bg-[#FAF7F2] shrink-0 shadow-inner">
                  <img
                    src={BUSINESS_INFO.logo}
                    alt="Eunoia Handcrafted Logo Emblem"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Logo story lockup */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Official Brand Emblem</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-blue-950 leading-snug">
                    "Thoughtfully made for you."
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Every piece in our collection is inspired by the craft basket in our emblem.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
