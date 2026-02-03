'use client'
import { Button } from "@/components/Button";
import { TemplateCarousel } from "@/components/TemplateCarousel";
import { Testimonials } from "@/components/Testimonials";
import { useApp } from "@/context/AppContext";
import { TRANSLATIONS } from "@/translations";
import Link from "next/link";

const COMMUNITY_ICONS = ['🕉️', '🌙', '⚔️', '✝️', '✋', '☸️', '📖', '🚩', '🚜', '⚔️', '🕯️', '🖋️'];

export default function Home() {
  const { lang, setBiodata } = useApp();
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
  const homeT = t.home;
  return (
    <>
      <header className="relative bg-white pt-16 pb-24 sm:pt-24 sm:pb-40 overflow-hidden px-4">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-600 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-400 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-rose-50 text-rose-700 rounded-full text-[11px] font-black uppercase tracking-widest mb-8 border border-rose-100 shadow-sm">
            <span className="text-amber-500">✦</span> {t.tagline} <span className="text-amber-500">✦</span>
          </div>
          <h1 className="text-5xl sm:text-8xl font-serif font-bold text-slate-900 leading-[1.05] mb-8 tracking-tight">
            Crafting <span className="italic text-brand-gradient">Beautiful</span> <br /> Beginnings
          </h1>
          <p className="text-lg sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/editor">
              <Button variant="primary" size="lg" className="px-14 shadow-2xl scale-110 hover:scale-115 transition-transform">
                {t.cta}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-slate-900 sm:text-5xl mb-4">{homeT.communitiesTitle}</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 rounded-full opacity-50"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{homeT.communitiesSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {homeT.communityNames.map((name, idx) => (
              <div key={name} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all text-center group cursor-default">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500 inline-block grayscale group-hover:grayscale-0">{COMMUNITY_ICONS[idx % COMMUNITY_ICONS.length]}</div>
                <h3 className="font-black uppercase tracking-widest text-[11px] text-slate-400 group-hover:text-rose-700 transition-colors">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <TemplateCarousel lang={lang} onSelect={(id) => {
          setBiodata((p: any) => ({ ...p, templateId: id }));
        }} />
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="text-amber-500 font-script text-4xl mb-4 block">Our Story</span>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold italic mb-8 tracking-tight">{homeT.aboutTitle}</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-12 font-light max-w-4xl mx-auto">
            {homeT.aboutDesc}
          </p>
          <Link href="/about">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900 px-12">
              {homeT.aboutMissionCta}
            </Button>
          </Link>
        </div>
      </section>

      <Testimonials lang={lang} />

      <section className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-slate-900 sm:text-5xl mb-6">{homeT.faqTitle}</h2>
            <div className="w-20 h-1 bg-rose-200 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-6 text-lg">{homeT.faqSubtitle}</p>
          </div>
          <div className="space-y-8">
            {homeT.faqs.map((faq, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 group hover:bg-white hover:border-rose-200 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-black shrink-0 shadow-sm">Q</span>
                  {faq.q}
                </h3>
                <p className="text-slate-600 pl-14 text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
