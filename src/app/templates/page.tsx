
"use client";
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { TEMPLATE_SHOWCASE, INITIAL_BIODATA } from '../../constants';
import { TemplateRenderer } from '../../components/TemplateRenderer';
import { Button } from '../../components/Button';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const { lang, setBiodata } = useApp();
  const t = TRANSLATIONS[lang].templatesPage;
  const router = useRouter();
  const [filter, setFilter] = useState<'All' | 'Elegant' | 'Modern' | 'Classic'>('All');

  const categories = ['All', 'Elegant', 'Modern', 'Classic'];

  const handleSelect = (id: any) => {
    setBiodata(prev => ({ ...prev, templateId: id }));
    router.push('/editor');
  };

  const filteredTemplates = filter === 'All' 
    ? TEMPLATE_SHOWCASE 
    : TEMPLATE_SHOWCASE.filter(item => item.category === filter);

  return (
    <div className="bg-white min-h-screen pb-24">
      <header className="py-24 text-center border-b border-stone-100 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-amber-100">
            Design Gallery
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 mb-6 italic">{t.title}</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4">
        {/* Category Filters */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 ${filter === cat ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' : 'bg-white border-stone-200 text-stone-400 hover:border-rose-300 hover:text-rose-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredTemplates.map((item, idx) => (
            <div 
              key={item.id} 
              className="group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative bg-stone-50 rounded-[40px] p-6 border border-stone-200 shadow-sm hover:shadow-2xl hover:border-rose-200 transition-all duration-500 hover:-translate-y-4 cursor-default">
                {/* Preview Container */}
                <div className="relative aspect-[210/297] bg-white rounded-[24px] overflow-hidden border border-stone-100 shadow-inner group-hover:shadow-lg transition-all">
                  <div className="absolute inset-0 origin-top-left scale-[0.34] sm:scale-[0.38] md:scale-[0.41] lg:scale-[0.36] xl:scale-[0.43]">
                    <div className="w-[794px] h-[1123px] bg-white pointer-events-none">
                      <TemplateRenderer 
                        data={{ ...INITIAL_BIODATA, templateId: item.id }} 
                        lang={lang} 
                      />
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/60 backdrop-blur-[2px] transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                     <Button 
                       variant="primary" 
                       onClick={() => handleSelect(item.id)}
                       className="px-8 shadow-2xl scale-110 active:scale-95 transition-all"
                     >
                       {t.select}
                     </Button>
                  </div>
                </div>

                <div className="mt-8 px-2 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase text-rose-600 tracking-[0.2em] mb-1">{item.category}</p>
                    <h3 className="text-xl font-serif font-bold text-slate-900 italic">{item.name}</h3>
                  </div>
                  <div className="text-[10px] font-black uppercase text-slate-300 tracking-widest bg-slate-100 px-3 py-1 rounded-full">Premium</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
