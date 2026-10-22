import { useTranslation } from 'react-i18next';

const IDIOMAS = [
  { codigo: 'es', corto: 'ES', nombre: 'Español' },
  { codigo: 'en', corto: 'EN', nombre: 'English' },
] as const;

// "ES | EN" en texto; el actual se anuncia con aria-pressed. completo = nombres largos (footer).
export default function LanguageSwitcher({ completo = false }: { completo?: boolean }) {
  const { t, i18n } = useTranslation();
  return (
    <div className={`idioma${completo ? ' idioma--completo' : ''}`} role="group" aria-label={t('common.idioma')}>
      {IDIOMAS.map(({ codigo, corto, nombre }) => (
        <button
          key={codigo}
          type="button"
          lang={codigo}
          className="idioma__opcion"
          aria-pressed={i18n.language === codigo}
          aria-label={completo ? undefined : nombre}
          onClick={() => i18n.changeLanguage(codigo)}
        >
          {completo ? nombre : corto}
        </button>
      ))}
    </div>
  );
}
