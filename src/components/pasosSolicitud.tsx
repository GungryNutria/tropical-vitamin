import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';
import BotonWhatsApp from './botonWhatsApp';

type Paso = { titulo: string; contenido: ReactNode; completo: boolean; motivo?: string };

type Props = {
  pasos: Paso[];
  // null mientras falte algún dato
  mensaje: string | null;
  // "Prefiero correo": lleva a Contacto con servicio y mensaje prellenados
  correo?: { servicio: string };
};

// Pasos numerados unidos por una línea sólida; el último es la vista previa del mensaje.
export default function PasosSolicitud({ pasos, mensaje, correo }: Props) {
  const { t } = useTranslation();
  const pendiente = pasos.find((p) => !p.completo);

  return (
    <ol className="pasos">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} id={`paso-${i + 1}`} className="pasos__paso">
          <span className={`pasos__numero${paso.completo ? ' pasos__numero--completo' : ''}`} aria-hidden="true">{i + 1}</span>
          <div className="pasos__cuerpo">
            <h3 className="t-h3 pasos__titulo">
              {paso.titulo}
              {paso.completo && <span className="sr-only"> ({t('common.completo')})</span>}
            </h3>
            {paso.contenido}
          </div>
        </li>
      ))}
      <li className="pasos__paso">
        <span className="pasos__numero" aria-hidden="true">{pasos.length + 1}</span>
        <div className="pasos__cuerpo">
          <h3 className="t-h3 pasos__titulo">{t('common.vistaPrevia')}</h3>
          {mensaje ? (
            <>
              <div className="pasos__vista">
                <p className="t-body pasos__mensaje" aria-live="polite">{mensaje}</p>
                <a href="#paso-1" className="tv-boton tv-boton--texto">{t('common.editar')}</a>
              </div>
              <div className="pasos__acciones">
                <BotonWhatsApp mensaje={mensaje} texto={t('common.enviarWhatsapp')} tamano="grande" />
                {correo && (
                  <Link
                    className="tv-boton tv-boton--texto"
                    to={`/contacto?servicio=${encodeURIComponent(correo.servicio)}&mensaje=${encodeURIComponent(mensaje)}`}
                  >
                    {t('common.prefieroCorreo')}
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="pasos__acciones">
              <button type="button" className="tv-boton pasos__deshabilitado" disabled aria-describedby="pasos-motivo">
                <FaWhatsapp aria-hidden="true" />
                {t('common.enviarWhatsapp')}
              </button>
              <p id="pasos-motivo" className="t-small pasos__motivo">{pendiente?.motivo}</p>
            </div>
          )}
        </div>
      </li>
    </ol>
  );
}
