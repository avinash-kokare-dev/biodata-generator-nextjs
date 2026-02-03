
import React from 'react';
import { Biodata, CustomField, TemplateID } from '../types';
import { TRANSLATIONS, Language } from '../translations';

interface TemplateProps {
  data: Biodata;
  lang: Language;
}

const FIELD_GROUPS = {
  personal: ['fullName', 'maritalStatus', 'aboutMe', 'dob', 'tob', 'pob', 'height', 'weight', 'complexion', 'bloodGroup', 'hobbies', 'languages'],
  horoscope: ['rashi', 'nakshatra', 'gothram', 'manglik'],
  professional: ['education', 'profession', 'income', 'location'],
  family: ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'siblings', 'nativePlace', 'maternalUncle', 'familyAssets'],
  expectations: ['expectationsAge', 'expectationsEdu', 'expectationsGeneral']
};

const getSortedGroupFields = (data: Biodata, groupKey: keyof typeof FIELD_GROUPS, lang: Language) => {
  const keys = FIELD_GROUPS[groupKey];
  const t = TRANSLATIONS[lang].form.fields;

  const standardFields = keys
    .filter(k => data.fieldConfigs[k]?.visible)
    .map(k => {
      // Priority: 
      // 1. If language is English, use standard config label (which might be customized)
      // 2. If language is non-English, use translation as default unless config label exists and differs from English default
      const defaultEnLabel = (TRANSLATIONS.en.form.fields as any)[k];
      const configLabel = data.fieldConfigs[k].label;
      const localizedLabel = (t as any)[k] || configLabel;

      // If user has customized the label (it's different from the English default), we keep the custom label
      // Otherwise, we use the localized one from the translation file
      const finalLabel = (configLabel !== defaultEnLabel) ? configLabel : localizedLabel;

      return {
        id: k,
        label: finalLabel,
        value: (data as any)[k],
        order: data.fieldConfigs[k].order
      };
    });

  const customFields = data.customFields
    .filter(f => f.sectionId === groupKey && f.visible)
    .map(f => ({
      id: f.id,
      label: f.label,
      value: f.value,
      order: f.order
    }));

  return [...standardFields, ...customFields].sort((a, b) => (a.order - b.order) || a.id.localeCompare(b.id));
};

const LuxuryCorner = ({ color }: { color: string }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-sm">
    <path d="M2 2C2 2 2 40 2 40" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M2 2C2 2 40 2 40 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 10C10 10 10 25 10 25" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <path d="M10 10C10 10 25 10 25 10" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    <circle cx="2" cy="2" r="2.5" fill={color}/>
    <path d="M15 15C15 15 20 15 20 20" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.2"/>
  </svg>
);

const ElegantLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const borders = ["#e11d48", "#be123c", "#b45309", "#0f766e", "#3730a3"];
  const accentColors = ["text-rose-900", "text-rose-950", "text-amber-950", "text-teal-950", "text-indigo-950"];
  const bgColors = ["bg-[#fffcf9]", "bg-rose-50/5", "bg-amber-50/5", "bg-teal-50/5", "bg-indigo-50/5"];
  
  const accentHex = borders[variant - 1] || borders[0];
  const bg = bgColors[variant - 1] || bgColors[0];
  const textColor = accentColors[variant - 1] || "text-stone-900";

  return (
    <div className={`${bg} h-full flex flex-col relative font-serif overflow-hidden`}>
      {/* Intricate Luxury Corners */}
      <div className="absolute top-6 left-6 rotate-0"><LuxuryCorner color={accentHex} /></div>
      <div className="absolute top-6 right-6 rotate-90"><LuxuryCorner color={accentHex} /></div>
      <div className="absolute bottom-6 left-6 -rotate-90"><LuxuryCorner color={accentHex} /></div>
      <div className="absolute bottom-6 right-6 rotate-180"><LuxuryCorner color={accentHex} /></div>

      {/* Main Luxury Frame - Layered Stationery Design */}
      <div className="m-12 flex-1 flex flex-col p-10 relative">
        {/* Triple Border System */}
        <div className="absolute inset-0 border border-stone-200 pointer-events-none"></div>
        <div className="absolute inset-2 border-[1px] opacity-10 pointer-events-none" style={{ borderColor: accentHex }}></div>
        <div className="absolute inset-3 border-[4px] border-double opacity-20 pointer-events-none" style={{ borderColor: accentHex }}></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-col items-center text-center mb-10">
            {data.godPhoto && <img crossOrigin="anonymous" src={data.godPhoto} className="w-16 h-16 mb-4 object-contain filter drop-shadow-md" />}
            {data.fieldConfigs.godName?.visible && (
                <p className="font-script text-3xl text-stone-400 mb-0 leading-none opacity-80">{data.godName}</p>
            )}
            <h1 className={`text-6xl font-bold tracking-tight ${textColor} mb-1 italic leading-tight drop-shadow-sm`}>{data.fullName}</h1>
            <div className="flex items-center gap-6 w-full max-w-sm mx-auto">
              <div className="h-px flex-1 bg-stone-200"></div>
              <p className="font-script text-4xl text-rose-800/30 -mt-2">Marriage Biodata</p>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>
            
            {data.fieldConfigs.aboutMe?.visible && data.aboutMe && (
              <div className="mt-6 px-16 relative">
                 <span className="absolute left-10 top-0 text-3xl text-stone-200 font-serif">“</span>
                 <p className="text-[11px] italic opacity-60 leading-relaxed font-serif tracking-wide">
                   {data.aboutMe}
                 </p>
                 <span className="absolute right-10 bottom-0 text-3xl text-stone-200 font-serif">”</span>
              </div>
            )}
          </div>

          <div className="flex gap-14 flex-1 overflow-hidden">
            <div className="w-[36%] flex flex-col items-center">
              {data.photo && (
                <div className="relative mb-10">
                   {/* Golden Photo Ring */}
                  <div className={`absolute -inset-4 border-2 border-dashed ${textColor} opacity-10 rounded-full animate-[spin_20s_linear_infinite]`}></div>
                  <img crossOrigin="anonymous" src={data.photo} className="w-44 h-44 object-cover rounded-full border-[6px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] relative z-10" />
                  <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full`} style={{ backgroundColor: accentHex, opacity: 0.3 }}></div>
                </div>
              )}
              <div className="text-center space-y-4 w-full px-4">
                {getSortedGroupFields(data, 'personal', lang).filter(f => f.id !== 'aboutMe').slice(0, 8).map((f, i) => (
                  <div key={i} className="relative pb-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] opacity-30 mb-0.5">{f.label}</p>
                    <p className="text-sm font-bold text-stone-800 leading-tight">{f.value}</p>
                    {i < 7 && <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-stone-100"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[64%] space-y-10 pr-6">
              {[
                { grp: 'professional', title: 'Education & Career', label: 'Professional' },
                { grp: 'family', title: 'Family Background', label: 'Heritage' },
                { grp: 'expectations', title: 'Partner Expectations', label: 'Aspirations' }
              ].map((section) => (
                <section key={section.grp} className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className={`italic ${textColor} text-xl font-bold shrink-0 leading-none`}>{section.title}</h4>
                    <div className="h-px flex-1 bg-stone-100"></div>
                    <span className="text-[8px] font-black opacity-20 uppercase tracking-[0.3em]">{section.label}</span>
                  </div>
                  <div className="space-y-3">
                    {getSortedGroupFields(data, section.grp as any, lang).map((f, i) => (
                      <div key={i} className="text-xs flex gap-6 hover:bg-stone-50/50 transition-colors p-1 -ml-1 rounded">
                        <span className="text-stone-400 font-bold min-w-[140px] uppercase text-[9px] tracking-wider pt-0.5">{f.label}</span>
                        <span className="font-bold text-stone-800 flex-1 leading-relaxed">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-stone-100 flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            {data.fieldConfigs.phone?.visible && (
              <span className="flex items-center gap-3">
                 <span className="text-stone-300">TEL</span>
                 <span>{data.phone}</span>
              </span>
            )}
            {data.fieldConfigs.email?.visible && (
              <span className="flex items-center gap-3">
                 <span className="text-stone-300">MAIL</span>
                 <span>{data.email}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomLayout: React.FC<TemplateProps> = ({ data, lang }) => {
  const { background, textColor, accentColor, fontFamily, overlayOpacity } = data.customConfig;
  const fontClass = fontFamily === 'serif' ? 'font-serif' : fontFamily === 'script' ? 'font-script' : 'font-sans';

  return (
    <div 
      className={`h-full w-full relative flex flex-col p-12 overflow-hidden ${fontClass}`}
      style={{ color: textColor, backgroundColor: 'white' }}
    >
      {background && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: `url("${background}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})` }} />
      <div className="relative z-[2] flex flex-col h-full">
        <div className="text-center mb-6">
          {data.godPhoto && <img crossOrigin="anonymous" src={data.godPhoto} className="w-10 h-10 mx-auto mb-1 object-contain" />}
          {data.fieldConfigs.godName?.visible && (
             <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{data.godName}</p>
          )}
          <h1 className="text-3xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>{data.fullName}</h1>
          <p className="text-[10px] opacity-60 font-bold uppercase tracking-[0.2em]">Marriage Biodata</p>
          {data.fieldConfigs.aboutMe?.visible && data.aboutMe && (
            <p className="mt-2 text-xs italic opacity-80 max-w-lg mx-auto leading-relaxed">"{data.aboutMe}"</p>
          )}
        </div>
        <div className="flex gap-8 flex-1 overflow-hidden">
          <div className="w-1/3 flex flex-col items-center gap-4">
            {data.photo && <img crossOrigin="anonymous" src={data.photo} className="w-32 h-32 object-cover rounded-xl border-2 border-white shadow-lg" />}
            <div className="space-y-2 w-full text-center">
              {getSortedGroupFields(data, 'personal', lang).filter(f => f.id !== 'aboutMe').slice(0, 7).map((f, i) => (
                <div key={i} className="text-[11px]">
                  <div className="text-[8px] uppercase font-bold opacity-40">{f.label}</div>
                  <div className="font-bold">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 space-y-4 text-xs">
            {['professional', 'family', 'expectations'].map((grp) => (
               <section key={grp}>
                 <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 pb-1 border-b" style={{ color: accentColor }}>
                   {grp === 'professional' ? 'Education & Profession' : grp === 'family' ? 'Family & Native' : 'Partner Expectations'}
                 </h3>
                 <div className="grid grid-cols-1 gap-1">
                   {getSortedGroupFields(data, grp as any, lang).map((f, i) => (
                     <div key={i} className="flex justify-between py-0.5">
                       <span className="opacity-60">{f.label}</span>
                       <span className="font-bold text-right ml-4">{f.value}</span>
                     </div>
                   ))}
                 </div>
               </section>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-current/10 flex justify-center gap-6 text-[9px] font-bold uppercase opacity-60">
          {data.fieldConfigs.phone?.visible && <span>{data.phone}</span>}
          {data.fieldConfigs.email?.visible && <span>{data.email}</span>}
        </div>
      </div>
    </div>
  );
};

const ClassicLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const borders = [
    "border-stone-50 border-[12px]",
    "border-[20px] border-stone-200",
    "border-stone-800 border-8",
    "border-sky-100 border-[15px]",
    "border-amber-50 border-[20px] shadow-inner"
  ];
  const borderStyle = borders[variant - 1] || borders[0];
  const accentColor = ["text-rose-700", "text-stone-700", "text-stone-900", "text-sky-800", "text-amber-700"][variant - 1] || "text-rose-700";

  const renderSortedGroup = (groupKey: keyof typeof FIELD_GROUPS, title: string) => {
    const fields = getSortedGroupFields(data, groupKey, lang);
    if (fields.length === 0) return null;
    return (
      <section>
        <h2 className={`${accentColor} border-b-2 border-current/10 mb-2 font-bold uppercase text-xs tracking-widest`}>{title}</h2>
        <div className="grid grid-cols-1 gap-1">
          {fields.map((f, i) => (
            <div key={i} className="flex gap-2">
              <span className="font-bold min-w-[120px]">{f.label}:</span>
              {f.id === 'aboutMe' ? (
                <span className="italic leading-relaxed">"{f.value}"</span>
              ) : (
                <span>{f.value}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className={`bg-white p-12 h-full flex flex-col ${borderStyle} font-serif text-sm`}>
      <div className="text-center mb-6">
        {data.godPhoto && <img crossOrigin="anonymous" src={data.godPhoto} className="w-12 h-12 mx-auto mb-2 object-contain" />}
        {data.fieldConfigs.godName?.visible && (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{data.godName}</p>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-widest">{data.fullName}</h1>
        <p className={`${accentColor} text-[10px] tracking-[0.4em] uppercase font-bold mt-1`}>Marriage Biodata</p>
      </div>
      <div className="space-y-6 overflow-hidden">
        {renderSortedGroup('personal', 'Personal Profile')}
        {renderSortedGroup('professional', 'Career & Education')}
        {renderSortedGroup('family', 'Family Background')}
        {renderSortedGroup('expectations', 'Partner Expectations')}
      </div>
    </div>
  );
};

const ModernLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const accents = ["bg-rose-600", "bg-blue-600", "bg-emerald-600", "bg-orange-600", "bg-violet-600"];
  const accent = accents[variant - 1] || accents[0];
  
  return (
    <div className={`h-full flex flex-col font-sans bg-white`}>
      <div className={`${accent} h-2 w-full`}></div>
      <div className="p-12 flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1 pr-4">
             {data.fieldConfigs.godName?.visible && (
                <p className="text-[10px] font-black uppercase text-stone-400 mb-1">{data.godName}</p>
             )}
            <h1 className="text-4xl font-black tracking-tighter uppercase">{data.fullName}</h1>
            <p className="text-xs font-bold opacity-60 tracking-widest mb-3">PERSONAL PROFILE</p>
            {data.fieldConfigs.aboutMe?.visible && data.aboutMe && (
              <p className="text-[11px] leading-relaxed opacity-70 italic border-l-2 border-stone-100 pl-3">
                {data.aboutMe}
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
             {data.godPhoto && <img crossOrigin="anonymous" src={data.godPhoto} className="w-10 h-10 object-contain" />}
             {data.photo && <img crossOrigin="anonymous" src={data.photo} className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white" />}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 text-xs">
          <section className="space-y-4">
             <h4 className="text-[10px] font-black uppercase opacity-40 border-b">Personal & Career</h4>
             {[...getSortedGroupFields(data, 'personal', lang), ...getSortedGroupFields(data, 'professional', lang)]
               .filter(f => f.id !== 'aboutMe')
               .slice(0, 11).map((f, i) => (
               <div key={i} className="flex flex-col">
                 <span className="opacity-60 text-[9px] uppercase">{f.label}</span>
                 <span className="font-bold">{f.value}</span>
               </div>
             ))}
          </section>
          <section className="space-y-4">
             <h4 className="text-[10px] font-black uppercase opacity-40 border-b">Family & Expectations</h4>
             {[...getSortedGroupFields(data, 'family', lang), ...getSortedGroupFields(data, 'expectations', lang)].slice(0, 11).map((f, i) => (
                <div key={i} className="flex flex-col">
                  <span className="opacity-60 text-[9px] uppercase">{f.label}</span>
                  <span className="font-bold">{f.value}</span>
                </div>
             ))}
          </section>
        </div>
        <div className="mt-auto pt-6 border-t flex justify-between items-center opacity-40 text-[9px] font-black uppercase tracking-widest">
           <span>{data.phone}</span>
           <span>{data.email}</span>
        </div>
      </div>
    </div>
  );
};

export const TemplateRenderer: React.FC<TemplateProps> = ({ data, lang }) => {
  if (data.templateId === 'custom-1') return <CustomLayout data={data} lang={lang} />;
  const [type, variantStr] = data.templateId.split('-');
  const variant = parseInt(variantStr);
  switch (type) {
    case 'classic': return <ClassicLayout data={data} lang={lang} variant={variant} />;
    case 'modern': return <ModernLayout data={data} lang={lang} variant={variant} />;
    case 'elegant': return <ElegantLayout data={data} lang={lang} variant={variant} />;
    default: return <ElegantLayout data={data} lang={lang} variant={1} />;
  }
};
