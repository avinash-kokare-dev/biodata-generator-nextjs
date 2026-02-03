
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS, Language } from '@/translations';
import { Button } from './Button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useApp();
  const pathname = usePathname();
  const t = TRANSLATIONS[lang];
  const navT = t.nav;

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-lg group-hover:rotate-6 transition-transform">E</div>
            <span className="font-serif font-bold text-2xl tracking-tighter text-slate-900">EternalBond<span className="text-amber-500">.</span></span>
          </Link>
          
          <div className="hidden xl:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/" className={`hover:text-rose-700 transition-colors relative ${isActive('/') ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`}>{navT.home}</Link>
            <Link href="/templates" className={`hover:text-rose-700 transition-colors whitespace-nowrap relative ${isActive('/templates') ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`}>{navT.templates}</Link>
            <Link href="/about" className={`hover:text-rose-700 transition-colors whitespace-nowrap relative ${isActive('/about') ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`}>{navT.about}</Link>
            <Link href="/blog" className={`hover:text-rose-700 transition-colors relative ${isActive('/blog') ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`}>{navT.blog}</Link>
            <Link href="/contact" className={`hover:text-rose-700 transition-colors whitespace-nowrap relative ${isActive('/contact') ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`}>{navT.contact}</Link>
            
            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-slate-200">
              <div className="relative group">
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="appearance-none text-[11px] font-black uppercase bg-slate-100 border border-slate-200 pl-3 pr-8 py-2 rounded-xl outline-none cursor-pointer hover:border-rose-300 transition-all text-slate-600"
                >
                  <option value="en">EN</option>
                  <option value="hi">हिन्दी</option>
                  <option value="mr">मराठी</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" /></svg>
                </div>
              </div>
              <Link href="/editor">
                <Button variant="primary" size="sm" className="px-6 shadow-xl shadow-rose-900/10">
                  {isActive('/editor') ? navT.editor : navT.startFree}
                </Button>
              </Link>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden p-3 bg-slate-100 rounded-xl text-slate-600 hover:text-rose-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] xl:hidden transition-all duration-500 no-print ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col p-10 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-8 mt-16">
            <Link onClick={() => setIsMenuOpen(false)} href="/" className={`text-base font-black uppercase tracking-widest text-left transition-colors ${isActive('/') ? 'text-rose-700' : 'text-slate-400'}`}>{navT.home}</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/templates" className={`text-base font-black uppercase tracking-widest text-left transition-colors ${isActive('/templates') ? 'text-rose-700' : 'text-slate-400'}`}>{navT.templates}</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/about" className={`text-base font-black uppercase tracking-widest text-left transition-colors ${isActive('/about') ? 'text-rose-700' : 'text-slate-400'}`}>{navT.about}</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/blog" className={`text-base font-black uppercase tracking-widest text-left transition-colors ${isActive('/blog') ? 'text-rose-700' : 'text-slate-400'}`}>{navT.blog}</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/contact" className={`text-base font-black uppercase tracking-widest text-left transition-colors ${isActive('/contact') ? 'text-rose-700' : 'text-slate-400'}`}>{navT.contact}</Link>
            
            <div className="h-px bg-slate-100 my-4"></div>
            
            <div className="flex flex-col gap-6">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Choose Language</label>
              <div className="grid grid-cols-3 gap-3">
                {['en', 'hi', 'mr'].map((l) => (
                  <button key={l} onClick={() => { setLang(l as Language); setIsMenuOpen(false); }} className={`py-3 text-[11px] font-black rounded-xl border transition-all ${lang === l ? 'bg-rose-700 border-rose-700 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-rose-300'}`}>
                    {l === 'en' ? 'EN' : l === 'hi' ? 'हिन्दी' : 'मराठी'}
                  </button>
                ))}
              </div>
            </div>
            
            <Link href="/editor" onClick={() => setIsMenuOpen(false)}>
              <Button variant="primary" size="lg" className="mt-8 w-full shadow-2xl">
                {isActive('/editor') ? navT.editor : navT.startFree}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
