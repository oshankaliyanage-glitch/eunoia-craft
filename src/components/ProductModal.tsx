import React from 'react';
import { X, MessageCircle, Check, Sparkles, Package, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Product } from '../types.ts';
import { BUSINESS_INFO } from '../data/products.ts';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOrderWhatsApp: (productName: string, price: number) => void;
  onMakeItMine: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOrderWhatsApp,
  onMakeItMine,
}) => {
  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-blue-100 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Column */}
          <div className="relative bg-slate-100 min-h-[300px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 bg-blue-900/85 text-white backdrop-blur-xs rounded-md shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {product.category}
                </span>
                <h3 
                  id="modal-product-title"
                  className="text-2xl font-serif font-bold text-blue-950 mt-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 italic mt-0.5">{product.tagline}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-blue-900 tabular-nums">
                  Rs. {product.priceLKR.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">LKR · Net Price</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Key Specifications */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div>
                  <strong className="text-blue-950 block mb-1">Handcrafted Materials:</strong>
                  <ul className="space-y-1 pl-1">
                    {product.materials.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Dimensions:</span>
                  <span className="font-medium text-slate-800">{product.dimensions}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Care:</span>
                  <span className="font-medium text-slate-800 text-right">{product.careInstructions}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-blue-50">
              <button
                onClick={() => {
                  onClose();
                  onMakeItMine(product);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Make It Mine — Personalize & Add to Bag</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </button>

              <button
                onClick={() => {
                  onOrderWhatsApp(product.name, product.priceLKR);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs rounded-xl transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600/20 text-emerald-700" />
                <span>Quick Inquire / Order on WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery / Bank Transfer · Island-wide Delivery from Colombo</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
