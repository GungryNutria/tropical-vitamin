import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BotonWhatsApp from './botonWhatsApp';
import Pictograma, { type PictogramaId } from './pictograma';

type Props = {
  pictograma: PictogramaId;
  titulo: string;
  tipo?: 'servicio' | 'tour';
  imagen?: string;
  texto?: string;
  datos?: string[];
  enlace?: string;
  mensaje?: string;
  // Sin bloque de foto (tipos de MICE y Temáticos)
  compacta?: boolean;
};

// Rótulo añil de servicio (rosa solo para Tours, que es experiencia).
export default function TarjetaServicio({ pictograma, titulo, tipo = 'servicio', imagen, texto, datos, enlace, mensaje, compacta }: Props) {
  const { t } = useTranslation();
  return (
    <article className={`tarjeta tarjeta--${tipo}`}>
      <h3 className={`tarjeta__placa rotulo rotulo--${tipo} t-rotulo`}>
        <Pictograma id={pictograma} size={32} />
        <span>{titulo}</span>
      </h3>
      {compacta ? null : imagen ? (
        <img className="tarjeta__foto" src={imagen} alt="" loading="lazy" />
      ) : (
        <div className="tarjeta__foto tarjeta__foto--vacia">
          <Pictograma id={pictograma} size={96} />
        </div>
      )}
      {(texto || datos || enlace || mensaje) && (
      <div className="tarjeta__cuerpo">
        {texto && <p className="t-small tarjeta__texto">{texto}</p>}
        {datos && (
          <ul className="t-small tarjeta__datos">
            {datos.map((d) => <li key={d}>{d}</li>)}
          </ul>
        )}
        {(enlace || mensaje) && (
          <div className="tarjeta__acciones">
            {enlace && <Link to={enlace} className="tv-boton tv-boton--texto">{t('common.verServicio')}<span className="sr-only">: {titulo}</span></Link>}
            {mensaje && (enlace
              ? <BotonWhatsApp mensaje={mensaje} tamano="icono" />
              : <BotonWhatsApp mensaje={mensaje} texto={t('common.preguntarWhatsapp')} />)}
          </div>
        )}
      </div>
      )}
    </article>
  );
}
