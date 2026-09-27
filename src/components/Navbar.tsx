import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products.ts';

interface NavbarProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWhatsApp, cartCount = 0, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#products' },
    { label: 'Custom Order', href: '#custom-order' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Our Story', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100/80 py-3'
            : 'bg-white border-b border-blue-50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Zone with Official Logo and Wordmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 focus-visible:outline-hidden"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-200/90 shadow-xs group-hover:scale-105 transition-transform bg-[#FDFBF7] shrink-0">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Eunoia Official Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-blue-950 group-hover:text-blue-700 transition-colors leading-none">
                  {BUSINESS_INFO.name}
                </span>
                <span className="hidden sm:block text-[11px] text-slate-500 italic mt-0.5 tracking-wide">
                  Thoughtfully made for you.
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-blue-700 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Direct Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors px-2 py-1.5"
                title="Call our Colombo studio"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span className="tabular-nums">{BUSINESS_INFO.phone}</span>
              </a>

              {/* Make It Mine Bag Trigger */}
              <button
                onClick={onOpenCart}
                className="relative inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-950 bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200/70 rounded-lg shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer"
                aria-label={`View Make It Mine (${cartCount} items)`}
                title="View your 'Make It Mine' items"
              >
                <ShoppingBag className="w-4 h-4 text-blue-700" />
                <span>Make It Mine</span>
                {cartCount > 0 && (
                  <span className="bg-blue-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center leading-tight">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onOpenWhatsApp()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Mobile Menu & Bag Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenCart}
                className="relative p-2 text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                aria-label={`View shopping bag (${cartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5 text-blue-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onOpenWhatsApp()}
                className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Contact on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs transition-opacity">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col p-6 z-50">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Eunoia Logo"
                  className="w-8 h-8 rounded-full object-cover border border-amber-200"
                />
                <span className="text-xl font-serif font-bold text-blue-950">
                  {BUSINESS_INFO.name}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 py-6 text-base font-medium text-slate-700">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between py-2 border-b border-slate-50 hover:text-blue-700 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCart) onOpenCart();
                }}
                className="w-full flex items-center justify-between py-2.5 px-4 bg-blue-50 text-blue-950 font-semibold text-xs rounded-lg hover:bg-blue-100 transition-colors border border-blue-200/80 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-blue-700" />
                  <span>Make It Mine</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {cartCount} items
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 text-blue-800 font-medium text-xs rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <p className="text-[11px] text-center text-slate-400 pt-2">
                Colombo 07, Sri Lanka · Handcrafted Daily
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
