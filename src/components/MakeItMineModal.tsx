import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Check, Gift, Heart, ShieldCheck } from 'lucide-react';
import { Product, CartItemPersonalization } from '../types.ts';

interface MakeItMineModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, personalization: CartItemPersonalization) => void;
  onOrderWhatsApp: (productName: string, price: number) => void;
}

export const MakeItMineModal: React.FC<MakeItMineModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOrderWhatsApp,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [customName, setCustomName] = useState<string>('');
  const [customNote, setCustomNote] = useState<string>('');
  const [giftWrapping, setGiftWrapping] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!product) return null;

  const handleMakeItMine = () => {
    onAddToCart(product, quantity, {
      customName: customName.trim() || undefined,
      customNote: customNote.trim() || undefined,
      giftWrapping,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  const totalPrice = product.priceLKR * quantity;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="make-it-mine-title"
    >
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-blue-100 my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
            <div>
              <h2 id="make-it-mine-title" className="text-lg font-serif font-bold text-white leading-tight">
                Make It Mine
              </h2>
              <p className="text-[11px] text-blue-100">
                Personalize & add this handmade piece to Make It Mine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Product Mini Banner */}
          <div className="flex gap-4 items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0 border border-slate-200"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                {product.category}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-blue-950 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">{product.tagline}</p>
              <div className="mt-1 font-serif font-bold text-blue-900 text-sm">
                Rs. {product.priceLKR.toLocaleString()} LKR
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-4">
            {/* Custom Name / Monogram */}
            <div>
              <label htmlFor="custom-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Name / Monogram / Initials <span className="text-slate-400 font-normal">(Optional · Free)</span>
              </label>
              <input
                id="custom-name"
                type="text"
                placeholder="e.g. 'A.K.' or 'Amaya' for packaging tag / embroidery"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={40}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Our Colombo studio artisans will hand-inscribe your custom name tag or monogram packaging.
              </p>
            </div>

            {/* Handwritten Gift Note */}
            <div>
              <label htmlFor="custom-note" className="block text-xs font-semibold text-slate-700 mb-1">
                Handwritten Gift Card Note <span className="text-slate-400 font-normal">(Optional · Free)</span>
              </label>
              <textarea
                id="custom-note"
                rows={2}
                placeholder="Write a message to be penned on our handmade botanical gift card..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                maxLength={180}
                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
              />
            </div>

            {/* Gift wrap checkbox */}
            <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-lg border border-amber-200/60">
              <input
                type="checkbox"
                id="gift-wrapping"
                checked={giftWrapping}
                onChange={(e) => setGiftWrapping(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="gift-wrapping" className="text-xs text-slate-700 flex items-center gap-1.5 cursor-pointer">
                <Gift className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-medium text-blue-950">Complimentary Artisanal Gift Packaging</span>
                <span className="text-[11px] text-amber-800 font-medium">(Free)</span>
              </label>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-800 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Total & Primary Make It Mine Button */}
          <div className="pt-3 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Order Subtotal:</span>
              <div className="text-right">
                <span className="text-xl font-serif font-bold text-blue-950 tabular-nums">
                  Rs. {totalPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">LKR</span>
              </div>
            </div>

            <button
              onClick={handleMakeItMine}
              disabled={isSuccess}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white hover:shadow-lg'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Make It Mine!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Make It Mine — Add to Cart (Rs. {totalPrice.toLocaleString()})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Handcrafted in Colombo 07
              </span>
              <button
                type="button"
                onClick={() => {
                  const customText = customName ? ` with custom name "${customName}"` : '';
                  onOrderWhatsApp(`${product.name} (Qty: ${quantity}${customText})`, totalPrice);
                  onClose();
                }}
                className="text-blue-700 hover:text-blue-900 font-medium underline underline-offset-2"
              >
                Or order directly on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
