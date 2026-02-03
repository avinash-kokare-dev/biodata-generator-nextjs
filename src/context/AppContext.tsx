
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Biodata } from '@/types';
import { Language } from '@/translations';
import { INITIAL_BIODATA } from '@/constants';

interface AppContextType {
  biodata: Biodata;
  setBiodata: React.Dispatch<React.SetStateAction<Biodata>>;
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [biodata, setBiodata] = useState<Biodata>(INITIAL_BIODATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('eternalbond_lang') as Language;
    if (savedLang) setLang(savedLang);

    const savedDraft = localStorage.getItem('eternalbond_draft');
    if (savedDraft) {
      try {
        setBiodata(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Error parsing saved draft", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('eternalbond_lang', lang);
    }
  }, [lang, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('eternalbond_draft', JSON.stringify(biodata));
    }
  }, [biodata, isLoaded]);

  return (
    <AppContext.Provider value={{ biodata, setBiodata, lang, setLang }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
