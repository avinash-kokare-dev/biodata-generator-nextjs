'use client';
import { Page } from '@/constants';
import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/translations';
import React, { useEffect, useState } from 'react'
const FloatingButton = () => {
    const { lang } = useApp();
    const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
    const homeT = t.home || TRANSLATIONS.en.home;
    const [page, setPage] = useState<Page>('home');
    const [showFab, setShowFab] = useState(false);
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200

    useEffect(() => {
        const handleScroll = () => {
            setShowFab(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (

        <div className={`fixed bottom-10 right-10 z-[70] transition-all duration-700 no-print ${showFab ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
            <button
                onClick={() => { setPage('editor'); window.scrollTo(0, 0); }}
                className="group relative flex items-center gap-4 bg-gradient-to-br from-rose-700 via-rose-800 to-slate-900 text-white pl-8 pr-6 py-5 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(190,18,60,0.5)] hover:shadow-[0_35px_60px_-15px_rgba(190,18,60,0.7)] hover:scale-110 active:scale-95 transition-all border border-white/20"
            >
                <span className="text-xs font-black uppercase tracking-[0.25em]">{t.fabCta}</span>
                <div className="bg-white/20 rounded-full p-2.5 group-hover:bg-white/40 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4" />
                    </svg>
                </div>
            </button>
        </div>
    )
};

export default FloatingButton