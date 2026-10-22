import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import { urlWhatsApp } from '../lib/whatsapp';

const SELECTOR = '[data-whatsapp]';

// WhatsappFijo: solo < 900 px (CSS). Se oculta mientras haya un BotonWhatsApp del contenido en pantalla,
// incluidos los que aparecen después de cargar (p. ej. la vista previa de una solicitud).
export default function WhatsappFloat() {
  const { t } = useTranslation();
  const [oculto, setOculto] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    const visibles = new Set<Element>();
    const actualizar = () => setOculto(visibles.size > 0);
    const io = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) visibles.add(e.target);
        else visibles.delete(e.target);
      }
      actualizar();
    });
    const botones = (n: Node): Element[] => {
      if (!(n instanceof Element)) return [];
      return [...(n.matches(SELECTOR) ? [n] : []), ...n.querySelectorAll(SELECTOR)];
    };
    botones(main).forEach((el) => io.observe(el));
    // Vigila nodos nuevos y quitados: observa los botones que llegan y olvida los que salen.
    const mo = new MutationObserver((cambios) => {
      for (const c of cambios) {
        c.addedNodes.forEach((n) => botones(n).forEach((el) => io.observe(el)));
        c.removedNodes.forEach((n) => botones(n).forEach((el) => {
          io.unobserve(el);
          visibles.delete(el);
        }));
      }
      actualizar();
    });
    mo.observe(main, { childList: true, subtree: true });
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
