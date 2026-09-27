import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  product: string;
  date: string;
  summary: string;
  fullReview?: string;
  verified: boolean;
  location?: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-nethmi',
    name: 'Nethmi',
    rating: 5,
    product: 'Artisan Handwoven Macramé Tote',
    date: 'September 2026',
    summary: 'Loved my personalized tote.',
    fullReview: 'Loved my personalized tote. The organic cotton knotting is incredibly sturdy and the unbleached lining holds all my daily essentials. I asked for my initials monogrammed via the "Make It Mine" option and it arrived packed in beautiful botanical paper with a handwritten card right to my doorstep in Colombo. Exceptional craft quality!',
    verified: true,
    location: 'Colombo 05',
  },
  {
    id: 'rev-sachini',
    name: 'Sachini M.',
    rating: 5,
    product: 'Hand-Poured Ceramic Soy Candle',
    date: 'August 2026',
    summary: 'Ceylon cinnamon fragrance is pure heaven.',
    fullReview: 'Ceylon cinnamon fragrance is pure heaven. The crackling wooden wick adds so much serenity to our living room in the evenings. The speckled stoneware ceramic bowl is so well made that I plan to reuse it as a succulent planter when the candle finishes.',
    verified: true,
    location: 'Cinnamon Gardens, Colombo 07',
  },
  {
    id: 'rev-dylan',
    name: 'Dylan P.',
    rating: 5,
    product: 'Artisan Glazed Ceramic Coffee Mug',
    date: 'August 2026',
    summary: 'My absolute favorite morning coffee mug.',
    fullReview: 'My absolute favorite morning coffee mug. The ocean indigo glaze is striking and the thumb indent on the handle feels tailored to my hand. Arrived in Kandy safe and sound in 2 days without a scratch.',
    verified: true,
    location: 'Kandy',
  },
  {
    id: 'rev-hiruni',
    name: 'Hiruni F.',
    rating: 5,
    product: 'Flora Hand-Embroidered Linen Pouch',
    date: 'July 2026',
    summary: 'Delicate botanical needlework on raw linen.',
    fullReview: 'Delicate botanical needlework on raw linen. Bought this as a bridesmaid gift with custom name tags. The embroidery threads and vintage brass zipper are top-tier. Will definitely order from Eunoia again!',
    verified: true,
    location: 'Mount Lavinia',
  },
];

const REVIEWS_STORAGE_KEY = 'eunoia_customer_reviews';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({
    'rev-nethmi': false,
  });

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    product: 'Artisan Handwoven Macramé Tote',
    reviewText: '',
    location: 'Colombo',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // storage unavailable
    }
  }, [reviews]);

  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.reviewText) return;

    const reviewToAdd: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim(),
      rating: newReview.rating,
      product: newReview.product,
      date: 'Just now',
      summary: newReview.reviewText.slice(0, 45) + (newReview.reviewText.length > 45 ? '...' : ''),
      fullReview: newReview.reviewText.trim(),
      verified: true,
      location: newReview.location.trim() || 'Sri Lanka',
    };

    setReviews([reviewToAdd, ...reviews]);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewReview({
        name: '',
        rating: 5,
        product: 'Artisan Handwoven Macramé Tote',
        reviewText: '',
        location: 'Colombo',
      });
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FDFBF7] relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Patron Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-950 tracking-tight">
              Crafted with Care, Loved in Sri Lanka
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Read how our personalized tote bags, pottery, botanical candles, and custom gifts bring joy to homes across the island.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </div>
        </div>

        {/* Rating Summary Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-blue-950">5.0</div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Based on {reviews.length} verified artisan reviews</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              <CheckCircle className="w-3.5 h-3.5" /> 100% Genuine Handcrafted
            </span>
            <span className="flex items-center gap-1 text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> 'Make It Mine' Personalization
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => {
            const isExpanded = !!expandedReviews[rev.id];
            return (
              <article
                key={rev.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar: Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400" aria-label={`${rev.rating} out of 5 stars`}>
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>

                  {/* Customer Name */}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-serif font-bold text-blue-950">
                      {rev.name}
                    </h3>
                    {rev.location && (
                      <span className="text-xs text-slate-500">{rev.location}</span>
                    )}
                  </div>

                  {/* Product Tag */}
                  <div className="text-[11px] font-medium text-blue-700 bg-blue-50/70 inline-block px-2.5 py-0.5 rounded-md">
                    {rev.product}
                  </div>

                  {/* Review Content & Show More Lines */}
                  <div className="pt-1">
                    <p className="text-sm text-slate-800 leading-relaxed font-serif italic">
                      "{isExpanded ? rev.fullReview || rev.summary : rev.summary}"
                    </p>

                    {rev.fullReview && rev.fullReview !== rev.summary && (
                      <button
                        onClick={() => toggleExpand(rev.id)}
                        className="mt-2 text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>{isExpanded ? 'Show less' : 'Show more lines'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Verified Buyer Badge */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified Eunoia Buyer
                  </span>
                  <span className="text-[11px] text-slate-400">Sri Lanka</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Submit Review Modal */}
        {isSubmitModalOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsSubmitModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-review-title"
          >
            <div
              className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-blue-100 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label="Close review dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 id="submit-review-title" className="text-xl font-serif font-bold text-blue-950">
                    Submit Your Review
                  </h3>
                  <p className="text-xs text-slate-500">
                    We'd love to hear about your experience with our handcrafted crafts.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-950">Thank you for your review!</h4>
                    <p className="text-xs text-emerald-800">Your feedback has been added to our artisan page.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nethmi"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / Location in Sri Lanka
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Colombo 03, Kandy, Galle"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    {/* Product */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Craft Piece Purchased
                      </label>
                      <select
                        value={newReview.product}
                        onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Artisan Handwoven Macramé Tote">Artisan Handwoven Macramé Tote</option>
                        <option value="Hand-Poured Ceramic Soy Candle">Hand-Poured Ceramic Soy Candle</option>
                        <option value="Flora Hand-Embroidered Linen Pouch">Flora Hand-Embroidered Linen Pouch</option>
                        <option value="Artisan Glazed Ceramic Coffee Mug">Artisan Glazed Ceramic Coffee Mug</option>
                        <option value="Botanical Cold-Process Soap Set">Botanical Cold-Process Soap Set</option>
                        <option value="Handcrafted Cane & Wicker Basket">Handcrafted Cane & Wicker Basket</option>
                        <option value="Custom Bespoke Order">Custom Bespoke Order</option>
                      </select>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1 text-slate-300 hover:text-amber-400 focus:outline-hidden transition-colors cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= newReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">{newReview.rating} out of 5</span>
                      </div>
                    </div>

                    {/* Review text */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Review <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell us what you loved about the craftsmanship, materials, or 'Make It Mine' personalization..."
                        value={newReview.reviewText}
                        onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
