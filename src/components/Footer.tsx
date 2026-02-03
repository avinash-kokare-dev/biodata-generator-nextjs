
"use client";
import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../translations';

const Footer: React.FC = () => {
  const { lang } = useApp();
  const navT = TRANSLATIONS[lang].nav;

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 no-print px-4 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-700 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-lg">E</div>
            <span className="font-serif font-bold text-white text-2xl tracking-tighter">EternalBond<span className="text-amber-500">.</span></span>
          </div>
          <p className="text-base leading-relaxed opacity-50 max-w-xs italic font-medium">Empowering families to tell their unique stories with timeless beauty and digital elegance. Crafted for eternal beginnings.</p>
        </div>
        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Templates</h4>
          <ul className="space-y-5 text-sm">
            <li><Link href="/templates" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-amber-500 rounded-full"></span> Classic Designs</Link></li>
            <li><Link href="/templates" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-amber-500 rounded-full"></span> Modern Minimalist</Link></li>
            <li><Link href="/templates" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-amber-500 rounded-full"></span> Premium Selection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Resources</h4>
          <ul className="space-y-5 text-sm">
            <li><Link href="/blog" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-rose-700 rounded-full"></span> Wedding Blog</Link></li>
            <li><Link href="/about" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-rose-700 rounded-full"></span> {navT.about}</Link></li>
            <li><Link href="/contact" className="hover:text-rose-500 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-rose-700 rounded-full"></span> {navT.contact}</Link></li>
          </ul>
        </div>
        <div className="space-y-8">
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Stay Inspired</h4>
          <p className="text-sm opacity-50 leading-relaxed font-medium">Join our community for premium design tips and wedding planning resources.</p>
          <div className="flex bg-slate-900/50 backdrop-blur-md rounded-2xl p-1.5 border border-slate-800 ring-1 ring-white/5">
            <input type="email" placeholder="Your email address" className="bg-transparent border-none focus:ring-0 text-sm px-4 flex-1 outline-none text-slate-200 placeholder:text-slate-600" />
            <button className="bg-rose-700 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-8 text-[11px] opacity-20 uppercase tracking-[0.4em] font-black">
        <p>&copy; 2024 EternalBond Premium . Digital Matrimonial Artisans.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
          <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
