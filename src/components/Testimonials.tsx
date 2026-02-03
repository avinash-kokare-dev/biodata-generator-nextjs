'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '@/constants';
import { Testimonial } from '@/types';
import { Button } from './Button';
import { TRANSLATIONS, Language } from '@/translations';

interface TestimonialsProps {
  heading?: string;
  lang?: Language;
}

const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }: { 
  filled: boolean; 
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => (
  <svg 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`h-6 w-6 cursor-pointer transition-all duration-200 ${filled ? 'text-amber-400 scale-110' : 'text-stone-300 hover:text-amber-200'}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const Testimonials: React.FC<TestimonialsProps> = ({ 
  heading, 
  lang = 'en' 
}) => {
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('eternalbond_user_reviews');
    const userReviews = saved ? JSON.parse(saved) : [];
    return [...TESTIMONIALS, ...userReviews];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', review: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const t = TRANSLATIONS[lang].testimonials;
  const currentHeading = heading || TRANSLATIONS[lang].testimonialsHeading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    const reviewToAdd: Testimonial = {
      id: Date.now(),
      name: newReview.name,
      review: newReview.review,
      rating: newReview.rating,
      image: `https://picsum.photos/seed/${newReview.name.length}/100/100`
    };

    const updatedUserReviews = [...(JSON.parse(localStorage.getItem('eternalbond_user_reviews') || '[]')), reviewToAdd];
    localStorage.setItem('eternalbond_user_reviews', JSON.stringify(updatedUserReviews));
    
    setReviews(prev => [...prev, reviewToAdd]);
    setSubmitted(true);
    setNewReview({ name: '', review: '', rating: 5 });
    
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
    }, 3000);
  };

  return (
    <section className="py-24 bg-stone-100/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-serif font-bold text-stone-900 sm:text-5xl mb-6">{currentHeading}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            See why people trust EternalBond to create beautiful introductions for their life's biggest milestone.
          </p>
          {!isFormOpen && !submitted && (
            <button 
              onClick={() => setIsFormOpen(true)}
              className="mt-8 px-8 py-3 bg-white border border-stone-200 text-stone-600 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm hover:shadow-md"
            >
              {t.addReview}
            </button>
          )}
        </div>

        {isFormOpen && (
          <div className="max-w-xl mx-auto mb-20 bg-white p-10 rounded-[40px] shadow-2xl border border-rose-50 animate-fade-in-up">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✨</div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-serif font-bold italic text-stone-800">{t.writeReview}</h3>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="text-stone-300 hover:text-stone-900 transition-colors">✕</button>
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 mb-2 block tracking-widest">{t.nameLabel}</label>
                  <input 
                    required
                    type="text" 
                    placeholder={t.placeholderName}
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 mb-2 block tracking-widest">{t.ratingLabel}</label>
                  <div className="flex gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon 
                        key={star} 
                        filled={hoverRating ? star <= hoverRating : star <= newReview.rating}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 mb-2 block tracking-widest">{t.reviewLabel}</label>
                  <textarea 
                    required
                    rows={4} 
                    placeholder={t.placeholderReview}
                    value={newReview.review}
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-rose-400 transition-all resize-none"
                  />
                </div>

                <Button variant="primary" className="w-full py-4 rounded-2xl shadow-xl shadow-rose-600/20 text-xs font-black uppercase tracking-widest">
                  {t.submit}
                </Button>
              </form>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((t, idx) => (
            <div 
              key={t.id} 
              className="bg-white p-10 rounded-[40px] shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < t.rating ? 'text-amber-400' : 'text-stone-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-800 italic mb-8 leading-relaxed font-serif text-lg">"{t.review}"</p>
              <div className="flex items-center space-x-4">
                <img 
                  crossOrigin="anonymous" 
                  src={t.image} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full border-2 border-rose-50 shadow-sm group-hover:scale-110 transition-transform" 
                />
                <div className="flex flex-col">
                  <span className="font-bold text-stone-900">{t.name}</span>
                  <span className="text-[10px] font-black uppercase text-stone-300 tracking-widest">Verified Story</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
