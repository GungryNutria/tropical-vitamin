import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { urlWhatsApp } from '../lib/whatsapp';

type Props = {
  mensaje: string;
  texto?: string;
  tamano?: 'grande' | 'normal' | 'icono';
  // false en botones que no deben ocultar el WhatsApp fijo (p. ej. la navbar)
  observable?: boolean;
};

export default function BotonWhatsApp({ mensaje, texto, tamano = 'normal', observable = true }: Props) {
  const { t } = useTranslation();
  const etiqueta = texto ?? t('common.whatsapp');
  return (
    <a
      className={`tv-wa tv-wa--${tamano}`}
      href={urlWhatsApp(mensaje)}
      target="_blank"
      rel="noopener"
      aria-label={tamano === 'icono' ? t('common.whatsappAria') : undefined}
      data-whatsapp={observable ? '' : undefined}
    >
      <FaWhatsapp aria-hidden="true" className="tv-wa__icono" />
      {tamano !== 'icono' && <span>{etiqueta}</span>}
    </a>
  );
}
