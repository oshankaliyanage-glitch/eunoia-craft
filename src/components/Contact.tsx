import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, PRODUCTS } from '../data/products.ts';
import { InquiryFormData } from '../types.ts';

interface ContactProps {
  onOpenWhatsApp: (customMsg?: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    city: 'Colombo',
    productInterest: 'All Collection / General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendViaWhatsAppFromForm = () => {
    const text = `Hello Eunoia! 👋\n\nName: ${formData.name || 'Website Visitor'}\nPhone/WhatsApp: ${formData.phone || 'N/A'}\nLocation: ${formData.city}, Sri Lanka\nInterested In: ${formData.productInterest}\nMessage: ${formData.message || 'Please share product availability and details.'}`;
    onOpenWhatsApp(text);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F8FAFC] relative border-t border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight text-balance">
            Connect With Our Colombo Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Have a question about our handmade crafts, custom orders, or island-wide courier shipping? We’d love to hear from you.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Details & WhatsApp Button */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Callout Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold">Fastest Response on WhatsApp</h3>
                  <p className="text-xs text-emerald-100">Usually replies within minutes during studio hours</p>
                </div>
              </div>

              <p className="text-sm text-emerald-50 leading-relaxed">
                Connect directly with our team to inquire about item availability, request customized gift notes, or send payment slip confirmations.
              </p>

              <button
                onClick={() => onOpenWhatsApp("Hello Eunoia! I'm reaching out from your website to inquire about your handcrafted collection.")}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm rounded-xl shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-800 text-white" />
                <span>Open WhatsApp Chat Now</span>
              </button>
            </div>

            {/* Contact Channels List */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-5">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone Calls</p>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-base font-bold text-blue-950 hover:text-blue-700 transition-colors tabular-nums"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Direct line to our Colombo studio</p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Us</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-base font-bold text-blue-950 hover:text-blue-700 transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">For orders, bulk corporate gifting & press</p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Studio & Pick-up Address</p>
                  <p className="text-sm font-semibold text-blue-950 leading-snug">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Visits & pickups by appointment</p>
                </div>
              </div>

              <div className="border-t border-slate-100" />

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opening Hours</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {BUSINESS_INFO.hours}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Sri Lanka Standard Time (GMT+5:30)</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Inquiry / Custom Order Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              
              <div className="mb-6">
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Send a Message</span>
                <h3 className="text-xl font-serif font-bold text-blue-950 mt-1">Inquiry & Order Request</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Fill in your details below and we will confirm stock, shipping rates, and payment instructions.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 px-6 text-center space-y-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-blue-950">Thank you, {formData.name || 'Friend'}!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    We received your inquiry regarding <strong className="text-blue-900">{formData.productInterest}</strong>. 
                    Our Colombo maker team will get in touch with you shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsAppFromForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also Send to WhatsApp Now</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto py-2.5 px-5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-xl hover:bg-slate-50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anuki Perera"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 077 123 4567"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Delivery City / District
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Colombo 07, Kandy, Galle"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Interested Product / Craft Item
                    </label>
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                    >
                      <option value="All Collection / General Inquiry">General Inquiry / Not Sure Yet</option>
                      {PRODUCTS.map((prod) => (
                        <option key={prod.id} value={`${prod.name} (Rs. ${prod.priceLKR.toLocaleString()})`}>
                          {prod.name} — Rs. {prod.priceLKR.toLocaleString()}
                        </option>
                      ))}
                      <option value="Custom Wedding Favours & Gift Boxes">Custom Wedding Favours & Gift Boxes</option>
                      <option value="Corporate / Custom Bulk Order">Corporate / Custom Bulk Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your Message or Special Request
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know quantity, requested delivery timeframe, or any customization..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsAppFromForm}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                      title="Send this filled form directly to our WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
