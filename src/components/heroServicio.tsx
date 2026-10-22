import type { ReactNode } from 'react';
import Pictograma, { type PictogramaId } from './pictograma';

type Props = {
  tipo: 'tour' | 'servicio' | 'paquete';
  pictograma: PictogramaId;
  etiqueta: string;
  titulo: string;
  texto: string;
  imagen: string;
  // Texto alternativo de la foto; vacío si es decorativa
  alt?: string;
  accion: ReactNode;
  // Línea grande del rótulo (p. ej. "Cancún y Riviera Maya"); si falta, el rótulo solo lleva la etiqueta.
  destino?: string;
};

// Héroe de páginas internas: rótulo (rosa para tours, añil para servicios, amarillo para paquetes) + H1 + acción,
// foto 4:3 con marco del color del rótulo a la derecha.
export default function HeroServicio({ tipo, pictograma, etiqueta, titulo, texto, imagen, alt = '', accion, destino }: Props) {
  return (
    <section className={`hero-servicio hero-servicio--${tipo}`}>
      <div className="contenedor hero-servicio__rejilla">
        <div className="hero-servicio__texto">
          <p className={`rotulo rotulo--${tipo} hero-servicio__placa`}>
            <Pictograma id={pictograma} size={32} />
            <span className="hero-servicio__placa-texto">
              <span className="t-label">{etiqueta}</span>
              {destino && <span className="hero-servicio__destino">{destino}</span>}
            </span>
          </p>
          <h1 className="t-h1">{titulo}</h1>
          <p className="t-body-lg hero-servicio__entradilla">{texto}</p>
          <div className="hero-servicio__accion">{accion}</div>
        </div>
        <img className="hero-servicio__foto" src={imagen} alt={alt} />
      </div>
    </section>
  );
}
