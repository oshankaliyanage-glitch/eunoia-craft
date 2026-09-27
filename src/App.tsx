import React, { useState, useEffect } from 'react';
import { MessageCircle, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Products } from './components/Products.tsx';
import { About } from './components/About.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { MakeItMineModal } from './components/MakeItMineModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { AskEunoiaChat } from './components/AskEunoiaChat.tsx';
import { SafeCheckoutPromise } from './components/SafeCheckoutPromise.tsx';
import { CustomOrder } from './components/CustomOrder.tsx';
import { CustomerReviews } from './components/CustomerReviews.tsx';
import { Product, CartItem, CartItemPersonalization } from './types.ts';
import { BUSINESS_INFO } from './data/products.ts';

const CART_STORAGE_KEY = 'eunoia_craft_bag';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeMakeItMineProduct, setActiveMakeItMineProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenWhatsApp = (customMsg?: string) => {
    const defaultMsg = `Hello ${BUSINESS_INFO.name}! 👋 I am visiting your website and would love to inquire about your handcrafted collection and island-wide delivery options in Sri Lanka.`;
    const message = customMsg || defaultMsg;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOrderProductWhatsApp = (productName: string, price?: number) => {
    const orderMsg = price !== undefined
      ? `Hello ${BUSINESS_INFO.name}! 👋\n\nI would like to order the handcrafted:\n*${productName}* (Rs. ${price.toLocaleString()} LKR)\n\nCould you please let me know availability, payment options, and delivery timeframe to my location in Sri Lanka? Thank you!`
      : `Hello ${BUSINESS_INFO.name}! 👋\n\n${productName}\n\nCould you please share custom commission options and pricing? Thank you!`;
    handleOpenWhatsApp(orderMsg);
  };

  const handleAddToCart = (product: Product, quantity: number, personalization: CartItemPersonalization) => {
    const newItemId = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      id: newItemId,
      product,
      quantity,
      personalization,
    };

    setCart((prev) => [newItem, ...prev]);
    showToast(`"${product.name}" added to Make It Mine!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900 font-sans antialiased">
      {/* Top sticky navigation bar */}
      <Navbar
        onOpenWhatsApp={handleOpenWhatsApp}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Single-Page Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 2. Products Section (with "Make It Mine" action button) */}
        <Products
          onOrderWhatsApp={handleOrderProductWhatsApp}
          onMakeItMine={(product) => setActiveMakeItMineProduct(product)}
        />

        {/* 3. 🛡 Eunoia Safe Checkout Promise */}
        <SafeCheckoutPromise />

        {/* 4. ⭐ Custom Order Page */}
        <CustomOrder onOpenWhatsApp={handleOpenWhatsApp} />

        {/* 5. ⭐ Customer Reviews with "Show more lines" & "Submit Review" */}
        <CustomerReviews />

        {/* 6. About Us Section */}
        <About />

        {/* 7. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 8. Contact Section with phone, WhatsApp button, email, address */}
        <Contact onOpenWhatsApp={handleOpenWhatsApp} />
      </main>

      {/* 6. Footer Section */}
      <Footer
        onOpenWhatsApp={handleOpenWhatsApp}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* 24/7 Chatbot: 💬 Ask Eunoia */}
      <AskEunoiaChat
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen((prev) => !prev)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* "Make It Mine" Personalization Modal */}
      <MakeItMineModal
        product={activeMakeItMineProduct}
        onClose={() => setActiveMakeItMineProduct(null)}
        onAddToCart={handleAddToCart}
        onOrderWhatsApp={handleOrderProductWhatsApp}
      />

      {/* Cart Drawer with items, customization notes & Sri Lanka checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-22 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-2xl border border-blue-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <span className="p-1 bg-emerald-500 rounded-full text-white">
            <Check className="w-3 h-3" />
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-amber-300 hover:text-amber-200 font-semibold cursor-pointer"
          >
            View Make It Mine
          </button>
        </div>
      )}

      {/* Sticky Floating Action Buttons for Mobile & Desktop */}
      <aside aria-label="Quick Make It Mine & WhatsApp assistance" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Floating Make It Mine Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative group flex items-center gap-2 px-3.5 py-3 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white font-semibold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-blue-400 cursor-pointer"
          aria-label={`View your Make It Mine items (${totalCartCount} items)`}
          title="Open your 'Make It Mine' items"
        >
          <ShoppingBag className="w-4 h-4 text-blue-200" />
          <span className="hidden sm:inline-block font-medium">Make It Mine</span>
          {totalCartCount > 0 && (
            <span className="bg-amber-400 text-blue-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Floating WhatsApp Button */}
        <button
          onClick={() => handleOpenWhatsApp()}
          className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-emerald-400 cursor-pointer"
          aria-label="Chat with Eunoia on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline-block font-medium">WhatsApp</span>
        </button>
      </aside>
    </div>
  );
}
