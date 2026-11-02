import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export interface Language {
  code: string;
  name: string;
  flag: string;
  shortName: string;
}

// Usando imagens de bandeiras do flagcdn.com para compatibilidade cross-platform
export const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png', shortName: 'EN' },
  { code: 'pt', name: 'Português (Portugal)', flag: 'https://flagcdn.com/w40/pt.png', shortName: 'PT' },
  { code: 'pt-br', name: 'Português (Brasil)', flag: 'https://flagcdn.com/w40/br.png', shortName: 'BR' },
  { code: 'es', name: 'Español', flag: 'https://flagcdn.com/w40/es.png', shortName: 'ES' },
];

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile';
  onLanguageChange?: () => void;
}

const LanguageSelector = ({ variant = 'desktop', onLanguageChange }: LanguageSelectorProps) => {
  const { currentLang, changeLanguage: changeLanguageHook } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangData = languages.find(l => l.code === currentLang) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const changeLanguage = (langCode: string) => {
    changeLanguageHook(langCode);
    setIsOpen(false);
    onLanguageChange?.();
  };

  // Mobile variant - horizontal flag buttons (usado no menu mobile que tem fundo escuro)
  if (variant === 'mobile') {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-white/60 text-sm text-center mb-2">Language</span>
        <div className="flex gap-3 justify-center">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                currentLang === lang.code
                  ? 'bg-NEXO-cyan/20 ring-2 ring-NEXO-cyan scale-110'
                  : 'hover:bg-white/10 hover:scale-105'
              }`}
              aria-label={`Switch to ${lang.name}`}
              title={lang.name}
            >
              <img 
                src={lang.flag} 
                alt={lang.name} 
                className="w-8 h-auto rounded-sm"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop variant - dropdown (para header com fundo branco)
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-NEXO-navy/80 hover:text-NEXO-navy font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <img 
          src={currentLangData.flag} 
          alt={currentLangData.name} 
          className="w-5 h-auto rounded-sm"
          loading="lazy"
        />
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden min-w-[220px] z-50"
            role="listbox"
            aria-label="Language options"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  currentLang === lang.code
                    ? 'text-NEXO-cyan bg-NEXO-cyan/5'
                    : 'text-NEXO-navy/80 hover:bg-gray-50'
                }`}
                role="option"
                aria-selected={currentLang === lang.code}
              >
                <img 
                  src={lang.flag} 
                  alt={lang.name} 
                  className="w-6 h-auto rounded-sm"
                  loading="lazy"
                />
                <span className="font-medium">{lang.name}</span>
                {currentLang === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-NEXO-cyan"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
