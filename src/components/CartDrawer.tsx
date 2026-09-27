import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageCircle, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Truck, Tag, Check } from 'lucide-react';
import { CartItem } from '../types.ts';
import { BUSINESS_INFO } from '../data/products.ts';
import { SafeCheckoutPromise } from './SafeCheckoutPromise.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenWhatsApp,
}) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    label: string;
    discountPercent?: number;
    discountAmount?: number;
  } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Colombo',
    notes: '',
    paymentMethod: 'Cash on Delivery (COD)' as 'Cash on Delivery (COD)' | 'Bank Transfer',
  });

  if (!isOpen) return null;

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.priceLKR * item.quantity, 0);

  // Discount calculation
  let discountValue = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountValue = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.discountAmount) {
      discountValue = Math.min(subtotal, appliedPromo.discountAmount);
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountValue);
  const FREE_SHIPPING_THRESHOLD = 6000;
  const isFreeDelivery = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 350;
  const grandTotal = discountedSubtotal + deliveryFee;

  const handleApplyPromo = (codeToApply?: string) => {
    const raw = (codeToApply || promoCodeInput).trim().toUpperCase();
    setPromoError(null);

    if (!raw) return;

    if (raw === 'EUNOIA10') {
      setAppliedPromo({
        code: 'EUNOIA10',
        label: '10% Discount Applied',
        discountPercent: 10,
      });
      setPromoCodeInput('EUNOIA10');
    } else if (raw === 'FIRSTCRAFT') {
      setAppliedPromo({
        code: 'FIRSTCRAFT',
        label: '15% Welcome Discount Applied',
        discountPercent: 15,
      });
      setPromoCodeInput('FIRSTCRAFT');
    } else if (raw === 'COLOMBO500') {
      setAppliedPromo({
        code: 'COLOMBO500',
        label: 'Rs. 500 Discount Applied',
        discountAmount: 500,
      });
      setPromoCodeInput('COLOMBO500');
    } else {
      setPromoError('Invalid promo code. Try "EUNOIA10"');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError(null);
  };

  const generateWhatsAppOrderText = () => {
    let text = `Hello ${BUSINESS_INFO.name}! 👋\n\nI would like to place an order from your website collection:\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* × ${item.quantity} = Rs. ${(item.product.priceLKR * item.quantity).toLocaleString()} LKR\n`;
      if (item.personalization?.customName) {
        text += `   • Custom Name/Monogram: "${item.personalization.customName}"\n`;
      }
      if (item.personalization?.customNote) {
        text += `   • Gift Note: "${item.personalization.customNote}"\n`;
      }
      if (item.personalization?.giftWrapping) {
        text += `   • Free Artisanal Gift Wrapping: Yes\n`;
      }
    });

    text += `\n📦 *Subtotal:* Rs. ${subtotal.toLocaleString()} LKR`;
    if (appliedPromo && discountValue > 0) {
      text += `\n🏷️ *Promo Code:* ${appliedPromo.code} (- Rs. ${discountValue.toLocaleString()} LKR | ${appliedPromo.label})`;
      text += `\n✨ *Discounted Subtotal:* Rs. ${discountedSubtotal.toLocaleString()} LKR`;
    }
    text += `\n🚚 *Delivery:* ${deliveryFee === 0 ? 'FREE Island-wide' : `Rs. ${deliveryFee} LKR (Colombo & Suburbs)`}`;
    text += `\n💰 *Total Amount:* Rs. ${grandTotal.toLocaleString()} LKR`;

    if (checkoutData.name) {
      text += `\n\n*Customer Details:*\n• Name: ${checkoutData.name}\n• Phone: ${checkoutData.phone}\n• Address: ${checkoutData.address}, ${checkoutData.city}\n• Payment: ${checkoutData.paymentMethod}`;
    } else {
      text += `\n\nPlease let me know your delivery timeline and payment details. Thank you!`;
    }

    return text;
  };

  const handleWhatsAppCheckout = () => {
    const text = generateWhatsAppOrderText();
    onOpenWhatsApp(text);
  };

  const handleFormOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) return;
    setOrderSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 to-blue-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800/80 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <h2 id="cart-drawer-title" className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                Make It Mine
              </h2>
              <p className="text-[11px] text-blue-200">
                {totalItemCount} {totalItemCount === 1 ? 'handcrafted item' : 'handcrafted items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Make It Mine"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="px-5 py-2.5 bg-blue-50/80 border-b border-blue-100 flex items-center gap-2 text-xs text-blue-950 shrink-0">
          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
          {isFreeDelivery ? (
            <span className="font-medium text-emerald-800">
              🎉 Congratulations! You qualify for <strong>FREE island-wide delivery</strong> in Sri Lanka.
            </span>
          ) : (
            <span>
              Add <strong>Rs. {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} LKR</strong> more for <strong>FREE delivery</strong> across Sri Lanka!
            </span>
          )}
        </div>

        {/* Order Confirmation Screen */}
        {orderSubmitted ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-blue-950">Thank You, {checkoutData.name}!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Your order for <strong>Rs. {grandTotal.toLocaleString()} LKR</strong> has been recorded. Our Colombo studio team is preparing your customized handcrafted items.
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left w-full text-xs space-y-1">
              <div className="font-semibold text-blue-900">Delivery Summary:</div>
              <div className="text-slate-600">{checkoutData.address}, {checkoutData.city}</div>
              <div className="text-slate-600">Contact: {checkoutData.phone}</div>
              <div className="text-slate-600">Payment: {checkoutData.paymentMethod}</div>
            </div>
            <div className="w-full space-y-2 pt-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Confirm Order via WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setOrderSubmitted(false);
                  setShowOrderForm(false);
                  onClearCart();
                  onClose();
                }}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Done / Back to Shop
              </button>
            </div>
          </div>
        ) : (
          /* Cart Content List */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-serif font-bold text-blue-950">Your 'Make It Mine' is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Discover our handmade collections and customize your favorite pieces with "Make It Mine".
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs flex gap-3 relative group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-blue-950 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Personalization Tag Details */}
                      {(item.personalization?.customName || item.personalization?.customNote || item.personalization?.giftWrapping) && (
                        <div className="mt-1 space-y-0.5 text-[11px] bg-blue-50/70 p-1.5 rounded-md border border-blue-100 text-blue-950">
                          {item.personalization.customName && (
                            <div className="flex items-center gap-1 font-medium">
                              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                              <span className="truncate">Name/Monogram: "{item.personalization.customName}"</span>
                            </div>
                          )}
                          {item.personalization.customNote && (
                            <div className="text-[10px] text-slate-600 truncate">
                              Note: "{item.personalization.customNote}"
                            </div>
                          )}
                          {item.personalization.giftWrapping && (
                            <div className="text-[10px] text-amber-800 font-medium">
                              ✓ Artisanal gift wrap included
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity & Price Controls */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center border border-slate-200 rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-serif font-bold text-blue-950 tabular-nums">
                            Rs. {(item.product.priceLKR * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block">LKR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Inline Quick Order Checkout Form */}
                {showOrderForm && (
                  <form onSubmit={handleFormOrderSubmit} className="mt-4 p-4 rounded-xl bg-slate-50 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950">Sri Lanka Delivery Details</span>
                      <button
                        type="button"
                        onClick={() => setShowOrderForm(false)}
                        className="text-[11px] text-slate-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp (+94...) *"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Street Address in Sri Lanka *"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Colombo">Colombo (1-15)</option>
                        <option value="Colombo Suburbs">Colombo Suburbs</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Galle">Galle</option>
                        <option value="Other Sri Lanka">Other Island-wide</option>
                      </select>

                      <select
                        value={checkoutData.paymentMethod}
                        onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value as any })}
                        className="text-xs px-2.5 py-2 rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Cash on Delivery (COD)">Cash on Delivery</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg shadow-sm"
                    >
                      Place Order (Rs. {grandTotal.toLocaleString()} LKR)
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer & Totals */}
        {items.length > 0 && !orderSubmitted && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3 shrink-0 max-h-[60vh] overflow-y-auto">
            {/* Promo Code Feature */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-700" />
                  <span>Enter Promo Code</span>
                </span>
                {!appliedPromo && (
                  <button
                    type="button"
                    onClick={() => handleApplyPromo('EUNOIA10')}
                    className="text-[10px] text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
                  >
                    Try "EUNOIA10"
                  </button>
                )}
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold select-none">✅</span>
                    <div>
                      <span className="font-bold">{appliedPromo.code}</span>
                      <span className="text-[11px] text-emerald-700 block font-medium">
                        ✅ {appliedPromo.label} (-Rs. {discountValue.toLocaleString()} LKR)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    aria-label="Remove promo code"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="e.g. EUNOIA10"
                      value={promoCodeInput}
                      onChange={(e) => {
                        setPromoCodeInput(e.target.value);
                        setPromoError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyPromo();
                        }
                      }}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 uppercase font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-slate-50"
                    />
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-rose-600 pl-1">{promoError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItemCount} items)</span>
                <span className="font-medium text-slate-800">Rs. {subtotal.toLocaleString()} LKR</span>
              </div>

              {discountValue > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Promo Discount ({appliedPromo?.code})</span>
                  </span>
                  <span>- Rs. {discountValue.toLocaleString()} LKR</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery (Sri Lanka)</span>
                <span className="font-medium text-slate-800">
                  {deliveryFee === 0 ? <span className="text-emerald-700 font-semibold">FREE</span> : `Rs. ${deliveryFee} LKR`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-blue-950 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="font-serif text-lg text-blue-950">
                  Rs. {grandTotal.toLocaleString()} LKR
                </span>
              </div>
            </div>

            {/* 🛡 Eunoia Safe Checkout Promise Compact Card */}
            <SafeCheckoutPromise compact />

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Order on WhatsApp (Instant Response)</span>
              </button>

              {!showOrderForm ? (
                <button
                  type="button"
                  onClick={() => setShowOrderForm(true)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Or enter delivery address manually</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <button
                onClick={onClearCart}
                className="hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Direct from Colombo Workshop
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
