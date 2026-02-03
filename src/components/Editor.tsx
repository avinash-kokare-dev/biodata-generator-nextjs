
import React, { useRef, useState } from 'react';
import { Biodata, CustomField, TemplateID, FieldConfig } from '../types';
import { Button } from './Button';
import { GoogleGenAI } from '@google/genai';
import { TRANSLATIONS, Language } from '../translations';
import { GOD_ICONS, TEMPLATE_SHOWCASE } from '../constants';

interface EditorProps {
  data: Biodata;
  onChange: (data: Biodata) => void;
  lang: Language;
}

const SECTION_KEYS: Record<string, string[]> = {
  personal: ['fullName', 'maritalStatus', 'dob', 'tob', 'pob', 'height', 'weight', 'complexion', 'bloodGroup', 'hobbies', 'languages'],
  professional: ['education', 'profession', 'income', 'location'],
  family: ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'siblings', 'nativePlace', 'maternalUncle', 'familyAssets'],
  expectations: ['expectationsAge', 'expectationsEdu', 'expectationsGeneral'],
  contact: ['phone', 'email']
};

const SECTION_THEMES: Record<string, { primary: string, bg: string, ring: string, border: string, text: string }> = {
  personal: { primary: 'rose-700', bg: 'bg-rose-50/50', ring: 'focus:ring-rose-200', border: 'border-rose-100', text: 'text-rose-900' },
  professional: { primary: 'indigo-700', bg: 'bg-indigo-50/50', ring: 'focus:ring-indigo-200', border: 'border-indigo-100', text: 'text-indigo-900' },
  family: { primary: 'emerald-700', bg: 'bg-emerald-50/50', ring: 'focus:ring-emerald-200', border: 'border-emerald-100', text: 'text-emerald-900' },
  expectations: { primary: 'amber-700', bg: 'bg-amber-50/50', ring: 'focus:ring-amber-200', border: 'border-amber-100', text: 'text-amber-900' },
  contact: { primary: 'slate-700', bg: 'bg-slate-50/50', ring: 'focus:ring-slate-200', border: 'border-slate-100', text: 'text-slate-900' },
  header: { primary: 'rose-700', bg: 'bg-slate-50/50', ring: 'focus:ring-rose-200', border: 'border-slate-200', text: 'text-slate-900' }
};

const resizeImage = (dataUrl: string, maxWidth: number = 1000): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(dataUrl);
      }
    };
    img.src = dataUrl;
  });
};

export const Editor: React.FC<EditorProps> = ({ data, onChange, lang }) => {
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const godPhotoRef = useRef<HTMLInputElement>(null);
  const customBgRef = useRef<HTMLInputElement>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'layout' | 'custom'>('details');
  const [isGodModalOpen, setIsGodModalOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [photoUploadStatus, setPhotoUploadStatus] = useState<'idle' | 'success'>('idle');

  const t = TRANSLATIONS[lang].form;

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleConfigChange = (key: string, updates: Partial<FieldConfig>) => {
    onChange({
      ...data,
      fieldConfigs: {
        ...data.fieldConfigs,
        [key]: { ...data.fieldConfigs[key], ...updates }
      }
    });
  };

  const getSortedSectionFields = (sectionId: string) => {
    const standardKeys = SECTION_KEYS[sectionId] || [];
    const customs = data.customFields.filter(f => f.sectionId === sectionId);
    
    const combined = [
      ...standardKeys.map(k => ({ id: k, isCustom: false, order: data.fieldConfigs[k]?.order ?? 0 })),
      ...customs.map(f => ({ id: f.id, isCustom: true, order: f.order }))
    ];
    
    return combined.sort((a, b) => (a.order - b.order) || a.id.localeCompare(b.id));
  };

  const handleMoveField = (sectionId: string, currentId: string, direction: 'up' | 'down') => {
    const sorted = getSortedSectionFields(sectionId);
    const index = sorted.findIndex(item => item.id === currentId);
    
    if (direction === 'up' && index > 0) {
      swapOrder(currentId, sorted[index - 1].id);
    } else if (direction === 'down' && index < sorted.length - 1) {
      swapOrder(currentId, sorted[index + 1].id);
    }
  };

  const swapOrder = (id1: string, id2: string) => {
    const isCustom1 = data.customFields.some(f => f.id === id1);
    const isCustom2 = data.customFields.some(f => f.id === id2);

    const order1 = isCustom1 
      ? data.customFields.find(f => f.id === id1)!.order 
      : data.fieldConfigs[id1].order;
    const order2 = isCustom2 
      ? data.customFields.find(f => f.id === id2)!.order 
      : data.fieldConfigs[id2].order;

    const finalOrder1 = order1 === order2 ? order1 + 1 : order2;
    const finalOrder2 = order1 === order2 ? order1 : order1;

    let newData = { ...data };

    if (isCustom1) {
      newData.customFields = newData.customFields.map(f => f.id === id1 ? { ...f, order: finalOrder1 } : f);
    } else {
      newData.fieldConfigs = { ...newData.fieldConfigs, [id1]: { ...newData.fieldConfigs[id1], order: finalOrder1 } };
    }

    if (isCustom2) {
      newData.customFields = newData.customFields.map(f => f.id === id2 ? { ...f, order: finalOrder2 } : f);
    } else {
      newData.fieldConfigs = { ...newData.fieldConfigs, [id2]: { ...newData.fieldConfigs[id2], order: finalOrder2 } };
    }

    onChange(newData);
  };

  const handleAddCustomField = (sectionId: string) => {
    const sorted = getSortedSectionFields(sectionId);
    const maxOrder = sorted.length > 0 ? Math.max(...sorted.map(s => s.order)) : 0;
    
    const newField: CustomField = {
      id: `custom_${Date.now()}`,
      label: 'New Label',
      value: '',
      visible: true,
      order: maxOrder + 1,
      sectionId
    };
    onChange({ ...data, customFields: [...data.customFields, newField] });
  };

  const handleDeleteCustomField = (id: string) => {
    onChange({ ...data, customFields: data.customFields.filter(f => f.id !== id) });
  };

  const handleCustomFieldChange = (id: string, updates: Partial<CustomField>) => {
    onChange({
      ...data,
      customFields: data.customFields.map(f => f.id === id ? { ...f, ...updates } : f)
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'photo' | 'godPhoto' | 'customBg') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawResult = reader.result as string;
        const result = await resizeImage(rawResult, target === 'customBg' ? 1200 : 600);
        if (target === 'customBg') {
          onChange({ 
            ...data, 
            templateId: 'custom-1',
            customConfig: { ...data.customConfig, background: result }
          });
        } else {
          onChange({ ...data, [target]: result });
        }
        
        if (target === 'photo') {
          setPhotoUploadStatus('success');
          setTimeout(() => setPhotoUploadStatus('idle'), 3000);
        }

        if (target === 'godPhoto') setIsGodModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (target: 'photo' | 'godPhoto') => {
    onChange({ ...data, [target]: null });
  };

  const generateAIIntro = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a professional marriage biodata introduction for ${data.fullName}, who is a ${data.profession} with ${data.education}. Language: ${lang}. Max 2 short sentences.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      if (response.text) {
        onChange({ ...data, aboutMe: response.text.trim() });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderFieldRow = (sectionId: string, key: string, isCustom = false) => {
    const config = isCustom ? null : data.fieldConfigs[key];
    const visible = isCustom ? data.customFields.find(f => f.id === key)?.visible : config?.visible;
    const value = isCustom ? data.customFields.find(f => f.id === key)?.value : (data as any)[key];
    
    const theme = SECTION_THEMES[sectionId] || SECTION_THEMES.personal;
    
    const localizedLabel = !isCustom ? (t.fields as any)[key] : 'New Field';
    const defaultEnLabel = !isCustom ? (TRANSLATIONS.en.form.fields as any)[key] : 'New Field';
    const configLabel = !isCustom ? (data.fieldConfigs[key]?.label) : data.customFields.find(f => f.id === key)?.label;
    const displayLabel = (!isCustom && configLabel === defaultEnLabel) ? localizedLabel : (configLabel || localizedLabel);

    const inputBaseClass = "flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all bg-white text-sm font-medium shadow-sm";
    const labelInputClass = `text-[11px] font-black uppercase text-slate-500 bg-slate-100/50 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg px-2 py-1 w-full mb-1.5 tracking-wider transition-all cursor-text`;

    return (
      <div key={key} className={`relative p-5 rounded-2xl border ${theme.border} ${theme.bg} shadow-sm hover:shadow-md transition-all group/card`}>
        <div className="flex items-center gap-3 mb-1">
          <input 
            className={labelInputClass}
            value={displayLabel}
            onChange={(e) => {
              if (isCustom) {
                handleCustomFieldChange(key, { label: e.target.value });
              } else {
                console.log("Here...")
                handleConfigChange(key, { label: e.target.value });
              }
            }}
            placeholder={localizedLabel}
          />
          <div className="flex items-center gap-1.5 bg-white/50 backdrop-blur-sm rounded-lg p-1 shrink-0 shadow-sm border border-slate-100">
            <button onClick={() => handleMoveField(sectionId, key, 'up')} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 text-[10px] transition-colors" title="Move Up">↑</button>
            <button onClick={() => handleMoveField(sectionId, key, 'down')} className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 text-[10px] transition-colors" title="Move Down">↓</button>
            {isCustom ? (
              <button onClick={() => handleDeleteCustomField(key)} className="p-1.5 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-md text-[10px] transition-colors" title="Remove">✕</button>
            ) : (
              <button onClick={() => handleConfigChange(key, { visible: !visible })} className={`p-1.5 rounded-md text-[10px] transition-all ${visible ? `text-${theme.primary} bg-${theme.primary}/10 border border-${theme.primary}/20` : 'text-slate-300 bg-slate-50'}`} title={visible ? 'Visible' : 'Hidden'}>
                {visible ? '👁️' : '🚫'}
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {key === 'maritalStatus' ? (
            <select
              name={key}
              value={value}
              onChange={handleChange}
              className={`${inputBaseClass} ${theme.ring}`}
            >
              <option value="Never Married">{lang === 'hi' ? 'अविवाहित' : lang === 'mr' ? 'अविवाहित' : 'Never Married'}</option>
              <option value="Divorced">{lang === 'hi' ? 'तलाकशुदा' : lang === 'mr' ? 'घटस्फोटित' : 'Divorced'}</option>
              <option value="Widowed">{lang === 'hi' ? 'विधवा/विधुर' : lang === 'mr' ? 'विधवा/विधुर' : 'Widowed'}</option>
              <option value="Awaiting Divorce">{lang === 'hi' ? 'तलाक की प्रतीक्षा' : lang === 'mr' ? 'घटस्फोटाची प्रतीक्षा' : 'Awaiting Divorce'}</option>
              <option value="Annulled">{lang === 'hi' ? 'अमान्य' : lang === 'mr' ? 'रद्द' : 'Annulled'}</option>
            </select>
          ) : key === 'expectationsGeneral' || key === 'familyAssets' || key === 'aboutMe' ? (
            <textarea
              name={key}
              value={value}
              onChange={isCustom ? (e) => handleCustomFieldChange(key, { value: e.target.value }) : handleChange}
              rows={2}
              className={`${inputBaseClass} ${theme.ring} resize-none`}
              placeholder={localizedLabel}
            />
          ) : (
            <input 
              type={key === 'dob' ? 'date' : 'text'}
              name={key}
              value={value}
              onChange={isCustom ? (e) => handleCustomFieldChange(key, { value: e.target.value }) : handleChange}
              className={`${inputBaseClass} ${theme.ring}`}
              placeholder={localizedLabel}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex border-b border-slate-100 bg-white sticky top-0 z-20 backdrop-blur-lg px-2">
        {(['details', 'layout', 'custom'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all border-b-2 relative ${activeTab === tab ? 'border-rose-700 text-rose-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {tab === 'details' ? (lang === 'mr' ? 'तपशील' : lang === 'hi' ? 'विवरण' : 'Details') : tab}
            {activeTab === tab && <div className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-rose-700"></div>}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-8 space-y-12">
        {activeTab === 'details' && (
          <div className="animate-fade-in-up space-y-12 pb-12">
            {/* Header Section */}
            <section className={`p-8 rounded-[40px] border ${SECTION_THEMES.header.border} ${SECTION_THEMES.header.bg} shadow-sm`}>
              <div 
                className="flex items-center justify-between mb-8 cursor-pointer group"
                onClick={() => toggleSection('header')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full bg-rose-700 shadow-[0_0_10px_rgba(190,18,60,0.3)]`}></div>
                  <h3 className="text-sm font-black uppercase text-slate-900 tracking-[0.2em]">
                    {lang === 'hi' ? 'प्रोफ़ाइल हेडर और चित्र' : lang === 'mr' ? 'प्रोफाइल हेडर आणि चित्रे' : 'Profile Header & Images'}
                  </h3>
                </div>
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 group-hover:text-rose-700 transition-all shadow-sm border border-slate-100">
                  {collapsedSections['header'] ? '+' : '-'}
                </span>
              </div>
              
              {!collapsedSections['header'] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in-up">
                  <div className="flex flex-col gap-4">
                    <label className="text-[11px] font-black uppercase text-rose-800/40 tracking-wider">
                      {lang === 'hi' ? 'प्रोफ़ाइल फोटो' : lang === 'mr' ? 'प्रोफाइल फोटो' : 'Profile Photo'}
                    </label>
                    <div className="flex gap-6 items-center">
                      <div className="relative w-28 h-28 rounded-3xl bg-white border-2 border-white flex items-center justify-center overflow-hidden shadow-xl ring-2 ring-slate-100">
                        {data.photo ? (
                          <>
                            <img src={data.photo} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => handleRemovePhoto('photo')}
                              className="absolute top-1 right-1 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs shadow-md hover:bg-rose-700 transition-colors z-10"
                            >
                              ✕
                            </button>
                          </>
                        ) : <span className="text-slate-100 text-4xl italic font-serif">P</span>}
                      </div>
                      <div className="flex flex-col gap-3">
                        <Button variant="outline" size="sm" onClick={() => profilePhotoRef.current?.click()} className="bg-white px-6 text-[10px]">
                          {lang === 'hi' ? 'फोटो बदलें' : lang === 'mr' ? 'फोटो बदला' : 'Change Photo'}
                        </Button>
                        {photoUploadStatus === 'success' && (
                          <div className="flex items-center gap-2 text-emerald-600 animate-fade-in-up">
                            <span className="text-[10px] font-black uppercase tracking-widest">Done</span>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={profilePhotoRef} className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'photo')} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <label className="text-[11px] font-black uppercase text-rose-800/40 tracking-wider">
                      {lang === 'hi' ? 'धार्मिक प्रतीक और शीर्षक' : lang === 'mr' ? 'धार्मिक चिन्ह आणि शीर्षक' : 'Religious Icon'}
                    </label>
                    <div className="flex gap-6 items-center">
                      <div className="relative w-28 h-28 rounded-3xl bg-white border-2 border-white flex items-center justify-center p-6 shadow-xl ring-2 ring-slate-100">
                        {data.godPhoto ? (
                          <>
                            <img src={data.godPhoto} className="w-full h-full object-contain" />
                            <button 
                              onClick={() => handleRemovePhoto('godPhoto')}
                              className="absolute top-1 right-1 w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs shadow-md hover:bg-rose-700 transition-colors z-10"
                            >
                              ✕
                            </button>
                          </>
                        ) : <span className="text-amber-500 text-3xl">ॐ</span>}
                      </div>
                      <div className="flex flex-col gap-3 flex-1">
                        <Button variant="outline" size="sm" onClick={() => setIsGodModalOpen(true)} className="w-full bg-white px-6 text-[10px]">
                          {lang === 'hi' ? 'प्रतीक चुनें' : lang === 'mr' ? 'चिन्ह निवडा' : 'Choose Symbol'}
                        </Button>
                        <input 
                          className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white text-xs font-medium shadow-sm" 
                          value={data.godName} 
                          name="godName" 
                          onChange={handleChange} 
                          placeholder={t.fields.spiritualText}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {Object.entries(SECTION_KEYS).map(([sectionId, keys]) => {
              const sortedItems = getSortedSectionFields(sectionId);
              const isCollapsed = collapsedSections[sectionId];
              const theme = SECTION_THEMES[sectionId] || SECTION_THEMES.personal;
              
              return (
                <section key={sectionId} className="relative animate-fade-in-up">
                  <div 
                    className={`flex items-center justify-between mb-6 cursor-pointer group`}
                    onClick={() => toggleSection(sectionId)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-8 rounded-full bg-${theme.primary.split('-')[0]}-700 shadow-[0_0_10px_rgba(0,0,0,0.1)]`}></div>
                      <h3 className={`text-sm font-black uppercase text-slate-900 tracking-[0.2em]`}>
                        {(t.sections as any)[sectionId] || sectionId}
                      </h3>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-slate-600 transition-all shadow-sm border border-slate-100">
                      {isCollapsed ? '+' : '-'}
                    </span>
                  </div>
                  
                  {!isCollapsed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up">
                      {sortedItems.map(item => {
                        return renderFieldRow(sectionId, item.id, item.isCustom);
                      })}
                      <button 
                        onClick={() => handleAddCustomField(sectionId)} 
                        className={`flex items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:border-${theme.primary.split('-')[0]}-400 hover:text-${theme.primary.split('-')[0]}-700 hover:bg-${theme.primary.split('-')[0]}-50 transition-all group`}
                      >
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-lg group-hover:bg-slate-700 group-hover:text-white transition-colors">+</span> 
                        {lang === 'hi' ? 'फ़ील्ड जोड़ें' : lang === 'mr' ? 'फील्ड जोडा' : 'Add Custom Field'}
                      </button>
                    </div>
                  )}
                </section>
              );
            })}

            {/* AI Assistant Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              <div 
                className="flex items-center justify-between mb-8 cursor-pointer group relative z-10"
                onClick={() => toggleSection('aiIntro')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/10">✨</div>
                  <h3 className="text-sm font-black uppercase text-white tracking-[0.2em]">
                    {lang === 'hi' ? 'एआई परिचय' : lang === 'mr' ? 'AI परिचय' : 'AI Assistant'}
                  </h3>
                </div>
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white font-bold text-xl transition-all">
                  {collapsedSections['aiIntro'] ? '+' : '-'}
                </span>
              </div>
              
              {!collapsedSections['aiIntro'] && (
                <div className="space-y-6 animate-fade-in-up relative z-10">
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md">Our AI can draft a professional summary based on your details. Perfect for making a great first impression.</p>
                  <textarea
                    name="aboutMe"
                    value={data.aboutMe}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-white font-medium text-sm placeholder:text-slate-600 resize-none"
                    placeholder="..."
                  />
                  <Button onClick={generateAIIntro} disabled={isGenerating} variant="primary" className="w-full py-4 text-[11px] font-black uppercase tracking-widest gap-3 shadow-2xl shadow-rose-900/40 border-none">
                    {isGenerating ? 'AI is thinking...' : `✨ Generate Smart Bio`}
                  </Button>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="animate-fade-in-up space-y-12">
            {['Elegant', 'Modern', 'Classic'].map(category => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h4 className="text-[11px] font-black uppercase text-slate-300 tracking-[0.3em]">{category} Designs</h4>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {TEMPLATE_SHOWCASE.filter(t => t.category === category).map(t => (
                    <button
                      key={t.id}
                      onClick={() => onChange({ ...data, templateId: t.id })}
                      className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all group ${data.templateId === t.id ? 'border-rose-700 bg-rose-50 text-rose-800 shadow-xl' : 'border-slate-50 hover:border-slate-200 bg-white text-slate-400 hover:shadow-lg'}`}
                    >
                      <div className={`w-4 h-4 rounded-full mb-3 border-4 ${data.templateId === t.id ? 'bg-rose-700 border-rose-100 shadow-[0_0_10px_rgba(190,18,60,0.5)]' : 'bg-slate-100 border-slate-200'}`}></div>
                      <span className="text-[10px] font-black uppercase text-center leading-tight tracking-tighter">
                        {t.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-8 animate-fade-in-up bg-slate-50 p-10 rounded-[40px] border border-slate-200">
             <div>
               <label className="block text-[11px] font-black uppercase text-slate-500 mb-4 tracking-widest">Theme Accent Color</label>
               <div className="flex gap-4 items-center">
                 <input 
                   type="color" 
                   value={data.customConfig.accentColor}
                   onChange={(e) => onChange({ ...data, templateId: 'custom-1', customConfig: { ...data.customConfig, accentColor: e.target.value }})}
                   className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
                 />
                 <span className="text-sm font-mono font-bold text-slate-400">{data.customConfig.accentColor.toUpperCase()}</span>
               </div>
             </div>
             <div>
               <label className="block text-[11px] font-black uppercase text-slate-500 mb-4 tracking-widest">Typography Style</label>
               <div className="grid grid-cols-3 gap-4">
                 {(['serif', 'sans', 'script'] as const).map(font => (
                   <button 
                     key={font}
                     onClick={() => onChange({ ...data, templateId: 'custom-1', customConfig: { ...data.customConfig, fontFamily: font }})}
                     className={`p-4 rounded-2xl border-2 transition-all text-center ${data.customConfig.fontFamily === font ? 'border-rose-700 bg-white text-rose-700 shadow-xl' : 'border-slate-200 bg-slate-100 text-slate-400'}`}
                   >
                     <span className={`text-xl ${font === 'serif' ? 'font-serif' : font === 'script' ? 'font-script' : 'font-sans'}`}>Aa</span>
                     <p className="text-[9px] font-black uppercase mt-1">{font}</p>
                   </button>
                 ))}
               </div>
             </div>
             <div>
               <label className="block text-[11px] font-black uppercase text-slate-500 mb-4 tracking-widest">Background Texture</label>
               <Button variant="outline" size="md" onClick={() => customBgRef.current?.click()} className="w-full bg-white rounded-2xl text-[10px] uppercase font-black tracking-widest">
                 {data.customConfig.background ? 'Change Pattern' : 'Upload Pattern'}
               </Button>
               <input type="file" ref={customBgRef} className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'customBg')} />
             </div>
          </div>
        )}
      </div>

      {isGodModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white rounded-[48px] w-full max-w-md p-10 shadow-2xl animate-fade-in-up max-h-[85vh] flex flex-col border border-white relative">
            <div className="flex justify-between items-center mb-10 shrink-0">
              <h3 className="text-2xl font-serif font-bold italic text-slate-900">Choose Symbol</h3>
              <button onClick={() => setIsGodModalOpen(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-700 transition-colors">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar p-2">
              {GOD_ICONS.map(icon => (
                <button
                  key={icon.id}
                  onClick={() => { onChange({ ...data, godPhoto: icon.url }); setIsGodModalOpen(false); }}
                  className="p-6 border-2 border-slate-50 rounded-[2rem] hover:bg-rose-50 hover:border-rose-200 transition-all flex flex-col items-center group shadow-sm hover:shadow-xl"
                >
                  <img src={icon.url} className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] font-black uppercase text-slate-300 group-hover:text-rose-700 tracking-widest text-center">{icon.name.split(' ')[1] || icon.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
