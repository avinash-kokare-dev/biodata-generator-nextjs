
"use client";
import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Button } from '../../components/Button';
import Link from 'next/link';

export default function AboutPage() {
  const { lang } = useApp();
  const t = TRANSLATIONS[lang];
  const homeT = t.home;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="font-script text-4xl text-rose-600 mb-4 block animate-fade-in-up">Our Story</span>
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 leading-tight mb-8 animate-fade-in-up">
              Crafting Digital <span className="italic">Elegance</span> for Life's Biggest Milestones.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              EternalBond was born from a simple observation: the first introduction between two families should be as beautiful as the journey it begins. 
              We've combined modern technology with traditional values to create the world's finest biodata builder.
            </p>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -skew-x-12 translate-x-1/2"></div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-3xl">✨</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Unmatched Quality</h3>
              <p className="text-slate-500 leading-relaxed">
                Every pixel is scrutinized. Our templates aren't just forms; they are professionally designed canvases that highlight your personality and achievements with grace.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Privacy First</h3>
              <p className="text-slate-500 leading-relaxed">
                Your personal details never touch our servers. We utilize local browser storage to ensure that your sensitive information remains under your control at all times.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">🌍</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Cultural Heritage</h3>
              <p className="text-slate-500 leading-relaxed">
                We celebrate diversity. Our tool is optimized for multiple languages and religions, ensuring your biodata respects and reflects your specific cultural traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-4 italic">How it Works</h2>
            <div className="w-20 h-1 bg-rose-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Choose Your Style', desc: 'Select from our gallery of hand-crafted templates.' },
              { step: '02', title: 'Enter Your Details', desc: 'Fill in your personal, educational, and family info with ease.' },
              { step: '03', title: 'Download & Share', desc: 'Get a professional PDF or image ready for WhatsApp and printing.' }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-slate-900 rounded-[40px] border border-slate-800 group hover:border-rose-900 transition-all">
                <span className="text-6xl font-black text-white/5 absolute top-4 right-8 group-hover:text-rose-600/20 transition-colors">{item.step}</span>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 mb-10">Ready to start your <span className="text-brand-gradient">beautiful</span> journey?</h2>
          <Link href="/editor">
            <Button size="lg" className="px-16 shadow-2xl">Create Your Biodata Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
