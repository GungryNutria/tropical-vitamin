import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../css/languageSwitcher.css';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  if (!mounted) {
    return (
      <div className="language-switcher">
        <select className="language-select">
          <option value="es">🇲🇽 Español</option>
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
      >
        <option value="es">🇲🇽 Español</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
}
