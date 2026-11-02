import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pt from './locales/pt.json';
import ptBr from './locales/pt-br.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  'pt-br': { translation: ptBr },
  es: { translation: es },
};

// Get initial language from URL path or localStorage
const getInitialLanguage = (): string => {
  const path = window.location.pathname;
  const pathLang = path.split('/')[1];
  
  if (['en', 'pt', 'pt-br', 'es'].includes(pathLang)) {
    return pathLang;
  }
  
  const storedLang = localStorage.getItem('language');
  if (storedLang && ['en', 'pt', 'pt-br', 'es'].includes(storedLang)) {
    return storedLang;
  }
  
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

