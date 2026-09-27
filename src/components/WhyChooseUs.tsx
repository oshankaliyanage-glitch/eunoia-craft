import React from 'react';
import { Sparkles, Leaf, Users, Truck, Gift, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: '100% Handcrafted Intention',
      description: 'Zero automated mass manufacturing. Every piece is shaped, woven, or poured by human hands with patient craftsmanship, making every single item distinct.'
    },
    {
      icon: Leaf,
      title: 'Sri Lankan Sourced Materials',
      description: 'We honor our island’s natural bounty: indigenous clay from local riverbanks, Kurunegala virgin coconut oil, organic cotton cord, and renewable rattan cane.'
    },
    {
      icon: Users,
      title: 'Ethical Artisan Empowerment',
      description: 'We work directly with independent home-based craftswomen and traditional potter families in Sri Lanka, paying fair livable wages that sustain craft heritage.'
    },
    {
      icon: Truck,
      title: 'Island-wide Express Delivery',
      description: 'Safe door-to-door courier delivery to any address across Sri Lanka within 2–4 business days. Same-day studio pickup available in Colombo 07.'
    },
    {
      icon: Gift,
      title: 'Plastic-Free Gift Packaging',
      description: 'Every order arrives lovingly wrapped in recyclable kraft paper, unbleached twine, and dried botanical botanicals — ready to gift with heartfelt presentation.'
    },
    {
      icon: CheckCircle2,
      title: 'Dedicated WhatsApp Service',
      description: 'We don’t believe in cold chatbots. Chat directly with our maker team on WhatsApp for custom size requests, gift notes, and real-time order tracking.'
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-white relative border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Our Commitment
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight text-balance">
            Why Discerning Homes Choose Eunoia
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            When you bring Eunoia crafts into your living space, you support authentic Sri Lankan creativity and slow living.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" aria-hidden="true" />
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#F8FAFC] border border-blue-100/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-blue-950 mb-3 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-700">
                  <span>Authentic Sri Lankan Craft</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
