import React from 'react';
import { Heart, Compass, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products.ts';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white relative border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            About Eunoia
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight text-balance">
            Rooted in Sri Lankan Heritage, Thoughtfully Made for You.
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-3" aria-hidden="true" />
        </div>

        {/* Narrative & Emblem Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official Logo Story Emblem Display */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF7F2] to-blue-50/40 border border-amber-200/80 shadow-md max-w-sm w-full">
              
              {/* The circular brand logo */}
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-1">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Eunoia Official Handmade Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption */}
              <div className="mt-6 space-y-1.5">
                <h3 className="text-xl font-serif font-bold text-blue-950">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs font-serif italic text-amber-900">
                  — {BUSINESS_INFO.tagline} —
                </p>
                <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                  Our emblem depicts our signature craft basket: the handwoven canvas tote, botanical blossoms, spools of natural cord, and the terracotta heart of Colombo makers.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-200/60 flex items-center justify-center gap-2 text-xs font-medium text-blue-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Original Sri Lankan Artisan Seal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 leading-relaxed text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-blue-950">
              Where mindful intention meets slow Sri Lankan craft.
            </h3>
            
            <p>
              Born in Colombo, <strong className="text-blue-900 font-semibold">{BUSINESS_INFO.name}</strong> was 
              founded on a simple principle: that everyday objects in your home should carry genuine warmth, mindful intention, and natural beauty.
            </p>

            <p>
              Our artisans in Colombo and regional craft clusters hand-weave each strand of unbleached cotton, turn indigenous clay on pottery wheels, and hand-pour soy wax scented with wild Ceylon botanicals. In our workshop, we refuse mass plastic molds and fast factory assembly lines.
            </p>

            <blockquote className="border-l-3 border-blue-600 pl-4 py-1 italic text-slate-700 font-serif text-lg bg-blue-50/40 rounded-r-lg">
              "We believe that when something is thoughtfully made by hand, that heartfelt calm lives on in your home."
            </blockquote>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-950">100% Handcrafted</h4>
                </div>
                <p className="text-xs text-slate-600">
                  Every stitch, weave, and ceramic glaze is crafted by hand in Sri Lanka.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Feather className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-950">Island-Born Materials</h4>
                </div>
                <p className="text-xs text-slate-600">
                  Sri Lankan riverbed clay, raw unbleached linen, and natural cane.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Compass className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-950">Colombo Atelier</h4>
                </div>
                <p className="text-xs text-slate-600">
                  Located in Colombo 07 with local pickups and island-wide delivery.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-blue-950">Ethical Fair Wages</h4>
                </div>
                <p className="text-xs text-slate-600">
                  Direct support for local women artisans and heritage craft families.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
