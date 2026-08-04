import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const LANGUAGES = [
  { code: 'en', label: 'EN',    full: 'English'  },
  { code: 'si', label: 'සිං',   full: 'සිංහල'    },
  { code: 'ta', label: 'தமிழ்', full: 'தமிழ்'    },
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('stv_lang') || 'en'; }
    catch { return 'en'; }
  });

  const setLang = (l) => {
    localStorage.setItem('stv_lang', l);
    setLangState(l);
  };

  // t({ en, si, ta }) — returns text for current language, falls back to English
  const t = (translations) => {
    if (typeof translations === 'string') return translations;
    return translations[lang] ?? translations.en ?? '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
