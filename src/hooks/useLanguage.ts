import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SUPPORTED_LANGUAGES = ['en', 'pt', 'pt-br', 'es'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export interface UseLanguageReturn {
  currentLang: string;
  changeLanguage: (langCode: string) => void;
  getLocalizedPath: (path: string) => string;
  isValidLanguage: (code: string) => boolean;
}

export const useLanguage = (): UseLanguageReturn => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = i18n.language;

  const isValidLanguage = useCallback((code: string): boolean => {
    return SUPPORTED_LANGUAGES.includes(code as SupportedLanguage);
  }, []);

  const changeLanguage = useCallback((langCode: string) => {
    if (!isValidLanguage(langCode)) {
      console.warn(`Invalid language code: ${langCode}`);
      return;
    }

    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    
    // Update URL path
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove old language prefix if exists
    if (isValidLanguage(pathParts[0])) {
      pathParts.shift();
    }
    
    // Add new language prefix
    const newPath = `/${langCode}/${pathParts.join('/')}`.replace(/\/+$/, '') || `/${langCode}`;
    navigate(newPath);
  }, [i18n, location.pathname, navigate, isValidLanguage]);

  const getLocalizedPath = useCallback((path: string): string => {
    return `/${currentLang}${path}`;
  }, [currentLang]);

  return {
    currentLang,
    changeLanguage,
    getLocalizedPath,
    isValidLanguage,
  };
};

export default useLanguage;
