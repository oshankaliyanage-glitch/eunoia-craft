import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products.ts';

interface FooterProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  onOpenChat?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand & Address Column with Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/80 bg-[#FAF7F2] p-0.5 shrink-0 shadow-sm">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Eunoia Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight block">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-xs font-serif italic text-amber-200">
                  — {BUSINESS_INFO.tagline} —
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Handcrafted with devotion in Colombo, Sri Lanka. Celebrating the beauty of slow intentional living through natural clay ceramics, handwoven bags, and botanical self-care.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-white transition-colors tabular-nums">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">6 Craft Pieces</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">Our Colombo Story</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact & Order</a>
              </li>
            </ul>
          </div>

          {/* Featured Craft Products */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Signature Crafts</h4>
            <ul className="space-y-2 text-xs">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onOpenWhatsApp(`Hello Eunoia! I would like to order the ${p.name} (Rs. ${p.priceLKR.toLocaleString()}).`)}
                    className="text-left hover:text-white transition-colors flex items-center justify-between w-full group cursor-pointer"
                  >
                    <span className="truncate pr-2 group-hover:text-blue-300">{p.name}</span>
                    <span className="text-slate-400 tabular-nums font-mono text-[11px] shrink-0">
                      Rs. {p.priceLKR.toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ordering & Delivery info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Island Delivery & Payment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We deliver island-wide across all 25 districts in Sri Lanka via trusted express couriers.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
              <p className="font-semibold text-white">Payment Options:</p>
              <p className="text-slate-400">· Cash on Delivery (COD)</p>
              <p className="text-slate-400">· Online Bank Transfer (Commercial / Sampath / HNB)</p>
            </div>

            <div className="space-y-2 pt-1">
              {onOpenChat && (
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-blue-300 hover:text-white border border-blue-900/60 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <span>💬 Ask Eunoia (24/7 Chat)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              )}

              <button
                onClick={() => onOpenWhatsApp()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message on WhatsApp</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name} Handmade Crafts. Colombo, Sri Lanka. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Thoughtfully made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400 inline" /> in Sri Lanka
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
