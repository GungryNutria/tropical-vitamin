import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/languageSwitcher.css';

const COMPACT = '(min-width: 1280px) and (max-width: 1439px)';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(() => window.matchMedia(COMPACT).matches);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT);
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  const label = t('nav.languageLabel', { lang: i18n.language.startsWith('en') ? 'English' : 'Español' });

  if (!mounted) {
    return (
      <div className="language-switcher">
        <select className="language-select" aria-label={label}>
          <option value="es">{compact ? 'ES' : '🇲🇽 Español'}</option>
        </select>
      </div>
    );
  }

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="language-select"
        aria-label={label}
      >
        <option value="es">{compact ? 'ES' : '🇲🇽 Español'}</option>
        <option value="en">{compact ? 'EN' : '🇺🇸 English'}</option>
      </select>
    </div>
  );
}
