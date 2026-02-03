
import React from 'react';
import { TemplateRenderer } from './TemplateRenderer';
import { INITIAL_BIODATA, TEMPLATE_SHOWCASE } from '../constants';
import { Language } from '../translations';

interface TemplateCarouselProps {
  lang: Language;
  onSelect: (id: any) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ lang, onSelect }) => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-stone-900 sm:text-4xl mb-4">Choose Your Style</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">Explore our premium selection of Classic, Modern, and Elegant templates designed for every taste.</p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth">
            {TEMPLATE_SHOWCASE.map((item) => (
              <div 
                key={item.id} 
                className="flex-none w-[280px] sm:w-[320px] snap-center group cursor-pointer"
                onClick={() => onSelect(item.id)}
              >
                <div className="relative bg-stone-100 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 border border-stone-200 aspect-[210/297]">
                  <div className="absolute inset-0 origin-top-left scale-[0.38] sm:scale-[0.43]">
                    <div className="w-[794px] h-[1123px] bg-white pointer-events-none">
                      <TemplateRenderer 
                        data={{ ...INITIAL_BIODATA, templateId: item.id }} 
                        lang={lang} 
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full py-2 bg-rose-600 text-white rounded-lg font-bold text-sm shadow-lg">Use This Template</button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="font-serif font-bold text-stone-800">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Subtle scroll indicator for mobile */}
          <div className="flex justify-center gap-2 mt-4 sm:hidden">
            {TEMPLATE_SHOWCASE.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
