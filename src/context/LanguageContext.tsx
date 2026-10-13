import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { Language } from '../types/trip';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['es'];
  /** Inline bilingual copy: tr('Hola', 'Hello'). */
  tr: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ixhuatan_lang');
      if (saved === 'es' || saved === 'en') return saved;
    } catch { /* storage unavailable */ }
    // First visit: Bruce & Norma's phones are in English, the family's in Spanish.
    return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
  });

  useEffect(() => {
    try { localStorage.setItem('ixhuatan_lang', language); } catch { /* ignore */ }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const t = translations[language];
  const tr = useCallback((es: string, en: string) => (language === 'es' ? es : en), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
