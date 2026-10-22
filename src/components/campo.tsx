import { cloneElement, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCircleAlert } from 'react-icons/lu';

type Control = ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean; 'aria-required'?: boolean }>;

type Props = {
  id: string;
  etiqueta: string;
  obligatorio?: boolean;
  error?: string;
  ayuda?: string;
  children: Control;
};

// Etiqueta visible + "(obligatorio)" + ayuda y error enlazados al control con aria-describedby.
export default function Campo({ id, etiqueta, obligatorio, error, ayuda, children }: Props) {
  const { t } = useTranslation();
  const describe = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`campo${error ? ' campo--error' : ''}`}>
      <label htmlFor={id} className="campo__etiqueta">
        {etiqueta}
        {obligatorio && <span className="campo__obligatorio"> {t('common.obligatorio')}</span>}
      </label>
      {cloneElement(children, { id, 'aria-describedby': describe, 'aria-invalid': error ? true : undefined, 'aria-required': obligatorio || undefined })}
      {ayuda && <p id={`${id}-ayuda`} className="campo__ayuda">{ayuda}</p>}
      {error && (
        <p id={`${id}-error`} className="campo__error">
          <LuCircleAlert size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
