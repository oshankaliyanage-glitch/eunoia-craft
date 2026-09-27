import React, { useState } from 'react';
import { Eye, MessageCircle, Sparkles, Filter, ShoppingBag } from 'lucide-react';
import { Product } from '../types.ts';
import { PRODUCTS } from '../data/products.ts';
import { ProductModal } from './ProductModal.tsx';

interface ProductsProps {
  onOrderWhatsApp: (productName: string, price?: number) => void;
  onMakeItMine: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOrderWhatsApp, onMakeItMine }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = ['All', 'Woven & Textiles', 'Ceramics & Tableware', 'Natural Wellness', 'Home Decor'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory || (selectedCategory === 'Ceramics & Tableware' && (p.category as any) === 'Ceramics & Aromatics'));

  return (
    <section id="products" className="py-16 md:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Handmade Collections
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight text-balance">
            Our Featured Handcrafted Pieces
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Inspired by the handmade craft collection in our official studio emblem: canvas totes, botanicals, hand-stitched linen, wheel-thrown pottery, and woven cane baskets.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-2" aria-hidden="true" />
        </div>

        {/* Filter Controls (Allowed by zero-pill rule as functional interactive controls) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with hover zoom & subtle overlay */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Subtle Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 text-[11px] font-semibold tracking-wide px-2.5 py-1 bg-white/90 backdrop-blur-xs text-blue-950 rounded-md shadow-xs">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick View Floating Action */}
                  <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-blue-950 font-semibold text-xs rounded-lg shadow-md hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-700" />
                      <span>View Craft Details</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {/* Clean unboxed category metadata (Anti-slop rule compliant) */}
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="text-blue-700 font-medium">{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Colombo Made</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-serif font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Tagline / Brief Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Price */}
                  <div className="pt-2 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Price</span>
                      <span className="text-2xl font-serif font-bold text-blue-950 tabular-nums">
                        Rs. {product.priceLKR.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 pb-6 pt-2 space-y-2">
                <button
                  onClick={() => onMakeItMine(product)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 active:bg-blue-900 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group/btn"
                  title="Personalize and add to bag"
                >
                  <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span>Make It Mine</span>
                  <Sparkles className="w-3 h-3 text-amber-300 ml-0.5" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="w-full py-2 px-3 text-[11px] font-semibold text-slate-700 hover:text-blue-900 bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100 cursor-pointer text-center"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => onOrderWhatsApp(product.name, product.priceLKR)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-100 transition-colors whitespace-nowrap cursor-pointer"
                    title="Order directly via WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Custom Order / Commission Callout */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-serif font-bold">Looking for Custom Sizes or Wedding Favours?</h4>
            <p className="text-sm text-blue-100 max-w-xl">
              We create custom macramé designs, personalized ceramic batches, and bespoke corporate gifting boxes right here in Colombo.
            </p>
          </div>
          <button
            onClick={() => onOrderWhatsApp("Hello Eunoia! I'm interested in a custom handmade order / gift box commission.")}
            className="px-5 py-3 bg-white text-blue-950 hover:bg-blue-50 font-semibold text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Inquire Custom Order
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onOrderWhatsApp={onOrderWhatsApp}
        onMakeItMine={onMakeItMine}
      />
    </section>
  );
};
