import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { urlWhatsApp } from '../lib/whatsapp';

// WhatsappFijo: solo < 900 px (CSS). Se oculta mientras haya un BotonWhatsApp del contenido en pantalla.
export default function WhatsappFloat() {
  const { t } = useTranslation();
  const [oculto, setOculto] = useState(true);

  useEffect(() => {
    const visibles = new Set<Element>();
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      setOculto(visibles.size > 0);
    });
    const observar = () => {
      io.disconnect();
      visibles.clear();
      document.querySelectorAll('main [data-whatsapp]').forEach((el) => io.observe(el));
      setOculto(false);
    };
    observar();
    const mo = new MutationObserver(observar);
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <a
      className={`whatsapp-fijo${oculto ? ' whatsapp-fijo--oculto' : ''}`}
      href={urlWhatsApp(t('whatsapp.general'))}
      target="_blank"
      rel="noopener"
      aria-label={t('common.whatsappAria')}
      aria-hidden={oculto || undefined}
      tabIndex={oculto ? -1 : undefined}
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
