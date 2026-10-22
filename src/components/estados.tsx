import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCircleAlert, LuCircleCheck, LuClock, LuInfo } from 'react-icons/lu';
import BotonWhatsApp from './botonWhatsApp';
import Pictograma, { type PictogramaId } from './pictograma';

// encabezado h1 cuando el estado es todo el contenido de la página (p. ej. paquete no encontrado).
export function EstadoVacio({ pictograma, tipo = 'tour', titulo, texto, encabezado: Encabezado = 'h2', children }: {
  pictograma: PictogramaId;
  tipo?: 'tour' | 'servicio' | 'paquete';
  encabezado?: 'h1' | 'h2';
  titulo: string;
  texto: string;
  children?: ReactNode;
}) {
  return (
    <div className="estado">
      <span className={`estado__placa rotulo--${tipo}`}><Pictograma id={pictograma} size={32} /></span>
      <Encabezado className="t-h3">{titulo}</Encabezado>
      <p className="t-small estado__texto">{texto}</p>
      {children && <div className="estado__acciones">{children}</div>}
    </div>
  );
}

export function EstadoError({ titulo, onReintentar }: { titulo: string; onReintentar: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="estado" role="alert">
      <LuCircleAlert className="estado__alerta" size={40} aria-hidden="true" />
      <h2 className="t-h3">{titulo}</h2>
      <div className="estado__acciones">
        <button type="button" className="tv-boton tv-boton--primario" onClick={onReintentar}>{t('common.reintentar')}</button>
        <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('common.preguntarWhatsapp')} />
      </div>
    </div>
  );
}

const ICONOS = { exito: LuCircleCheck, error: LuCircleAlert, pendiente: LuClock, info: LuInfo };

type TipoAviso = 'exito' | 'error' | 'pendiente' | 'info';

export function Aviso({ tipo, titulo, children }: { tipo: TipoAviso; titulo: string; children?: ReactNode }) {
  const Icono = ICONOS[tipo];
  return (
    <div className={`aviso aviso--${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
      <Icono className="aviso__icono" size={20} aria-hidden="true" />
      <div>
        <p className="aviso__titulo">{titulo}</p>
        {children}
      </div>
    </div>
  );
}
