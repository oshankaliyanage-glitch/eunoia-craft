import React, { useState } from 'react';
import { Palette, MessageCircle, Sparkles, CheckCircle2, Send, MapPin, PackageCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products.ts';

interface CustomOrderProps {
  onOpenWhatsApp: (message?: string) => void;
}

export const CustomOrder: React.FC<CustomOrderProps> = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productType: 'Handwoven Macramé Tote',
    preferredColors: '',
    specialMessage: '',
    deliveryInstructions: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const productOptions = [
    'Handwoven Macramé Tote',
    'Ceramic Soy Candle (Custom Vessel & Scent)',
    'Flora Hand-Embroidered Linen Pouch',
    'Artisan Glazed Ceramic Coffee Mug',
    'Botanical Cold-Process Soap Set',
    'Handcrafted Cane & Wicker Basket',
    'Custom Wedding Favours / Bulk Corporate Gift Box',
    'Other Bespoke Commission',
  ];

  const colorPalettes = [
    'Natural Indigo & Ivory',
    'Terracotta & Warm Sage',
    'Ceylon Cinnamon & Oatmeal',
    'Monochrome Charcoal & Ecru',
    'Custom Palette (Specify below)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.productType) return;
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = `Hello ${BUSINESS_INFO.name}! 👋\n\nI would like to submit a *Custom Commission Order*:\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone/WhatsApp:* ${formData.phone || 'Provided via WhatsApp'}\n` +
      `🎨 *Product Type:* ${formData.productType}\n` +
      `🌈 *Preferred Colors:* ${formData.preferredColors || 'Standard Studio Palette'}\n` +
      `✍️ *Special Message / Personalization:* ${formData.specialMessage || 'None'}\n` +
      `📍 *Delivery Instructions:* ${formData.deliveryInstructions || 'Colombo standard'}\n\n` +
      `Could you please review and let me know the custom crafting timeline & pricing estimate? Thank you!`;

    onOpenWhatsApp(text);
  };

  return (
    <section id="custom-order" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Bespoke Handmade Commissions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight">
            Custom Order Page
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Looking for tailored dimensions, unique color glazes, custom embroidery, or curated wedding and event gift batches? Share your vision with our Colombo artisans.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" aria-hidden="true" />
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-blue-50/70 to-white border border-blue-200 text-center space-y-5 shadow-lg animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-blue-950">
                Custom Order Inquiry Received, {formData.name}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Thank you for entrusting your piece to Eunoia. Our Colombo studio artisans will review your color preferences and delivery instructions.
              </p>
            </div>

            {/* Inquiry Summary Box */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2 shadow-2xs">
              <div><strong className="text-blue-950">Product Type:</strong> <span className="text-slate-700">{formData.productType}</span></div>
              <div><strong className="text-blue-950">Preferred Colors:</strong> <span className="text-slate-700">{formData.preferredColors || 'Studio standard'}</span></div>
              {formData.specialMessage && (
                <div><strong className="text-blue-950">Special Message:</strong> <span className="text-slate-700">"{formData.specialMessage}"</span></div>
              )}
              {formData.deliveryInstructions && (
                <div><strong className="text-blue-950">Delivery Instructions:</strong> <span className="text-slate-700">{formData.deliveryInstructions}</span></div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Send to Studio on WhatsApp for Instant Quote</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    productType: 'Handwoven Macramé Tote',
                    preferredColors: '',
                    specialMessage: '',
                    deliveryInstructions: '',
                  });
                }}
                className="w-full sm:w-auto px-5 py-3 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="custom-name-field" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="custom-name-field"
                  type="text"
                  required
                  placeholder="e.g. Nethmi Perera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label htmlFor="custom-phone-field" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="custom-phone-field"
                  type="tel"
                  placeholder="e.g. +94 77 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800"
                />
              </div>
            </div>

            {/* Product Type */}
            <div>
              <label htmlFor="custom-product-type" className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Type <span className="text-rose-500">*</span>
              </label>
              <select
                id="custom-product-type"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800 cursor-pointer"
              >
                {productOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Colors */}
            <div>
              <label htmlFor="custom-preferred-colors" className="block text-xs font-bold text-slate-800 mb-1.5">
                Preferred Colors
              </label>
              <input
                id="custom-preferred-colors"
                type="text"
                placeholder="e.g. Deep indigo dip glaze with ivory stoneware, or earth tones"
                value={formData.preferredColors}
                onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800"
              />
              {/* Palette Quick Select */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {colorPalettes.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setFormData({ ...formData, preferredColors: p })}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-900 border border-slate-200/80 transition-colors"
                  >
                    + {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Message */}
            <div>
              <label htmlFor="custom-special-message" className="block text-xs font-bold text-slate-800 mb-1.5">
                Special Message <span className="text-slate-400 font-normal">(Personalization or Gift Inscription)</span>
              </label>
              <textarea
                id="custom-special-message"
                rows={3}
                placeholder="Include custom initials to embroider/engrave, handwritten gift card notes, or specific sizing..."
                value={formData.specialMessage}
                onChange={(e) => setFormData({ ...formData, specialMessage: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800 resize-none"
              />
            </div>

            {/* Delivery Instructions */}
            <div>
              <label htmlFor="custom-delivery-instructions" className="block text-xs font-bold text-slate-800 mb-1.5">
                Delivery Instructions <span className="text-slate-400 font-normal">(Address, Landmark, or Preferred Delivery Date)</span>
              </label>
              <textarea
                id="custom-delivery-instructions"
                rows={2}
                placeholder="e.g. 14 Flower Road, Colombo 03 · Deliver after 4:00 PM or arrange studio pickup"
                value={formData.deliveryInstructions}
                onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-800 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-6 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>Submit Custom Order Inquiry</span>
              </button>

              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full sm:w-auto py-3 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Discuss on WhatsApp</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500 pt-1">
              Custom commissions are handmade in small batches in Colombo. Lead times typically range from 3 to 7 business days.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
