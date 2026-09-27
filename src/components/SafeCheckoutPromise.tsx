import React from 'react';
import { ShieldCheck, Lock, CreditCard, Truck, Bot } from 'lucide-react';

interface SafeCheckoutPromiseProps {
  className?: string;
  compact?: boolean;
}

export const SafeCheckoutPromise: React.FC<SafeCheckoutPromiseProps> = ({
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div className={`p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-slate-800 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 mb-1">
          <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
          <span>🛡 Eunoia Safe Checkout Promise</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
          Your orders are protected with SSL encryption, secure payment methods, privacy protection, and trusted customer support.
        </p>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-blue-950 font-medium">
          <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded border border-blue-100">
            <span>🔒</span>
            <span>SSL Protected</span>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded border border-blue-100">
            <span>💳</span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded border border-blue-100">
            <span>🚚</span>
            <span>Order Tracking</span>
          </div>
          <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded border border-blue-100">
            <span>🤖</span>
            <span>Ask Eunoia Support</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-10 bg-gradient-to-b from-white to-blue-50/40 border-y border-blue-100/70 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          <span>Trust & Craft Integrity</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-blue-950 tracking-tight">
          🛡 Eunoia Safe Checkout Promise
        </h3>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your orders are protected with SSL encryption, secure payment methods, privacy protection, and trusted customer support.
        </p>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <span className="text-2xl mb-1 select-none">🔒</span>
            <span className="font-semibold text-xs sm:text-sm text-blue-950">SSL Protected</span>
            <span className="text-[11px] text-slate-500">256-bit encryption</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <span className="text-2xl mb-1 select-none">💳</span>
            <span className="font-semibold text-xs sm:text-sm text-blue-950">Secure Payments</span>
            <span className="text-[11px] text-slate-500">COD & Bank Transfers</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <span className="text-2xl mb-1 select-none">🚚</span>
            <span className="font-semibold text-xs sm:text-sm text-blue-950">Order Tracking</span>
            <span className="text-[11px] text-slate-500">Island-wide updates</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
            <span className="text-2xl mb-1 select-none">🤖</span>
            <span className="font-semibold text-xs sm:text-sm text-blue-950">Ask Eunoia Support</span>
            <span className="text-[11px] text-slate-500">24/7 AI & WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
};
