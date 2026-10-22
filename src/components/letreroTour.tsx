import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuClock, LuMapPin } from 'react-icons/lu';
import type { Tour } from '../services/toursService';
import { formatearDuracion } from '../lib/duracion';
import { nombreCategoria, pictogramaCategoria } from '../lib/categorias';
import BotonWhatsApp from './botonWhatsApp';
import Pictograma from './pictograma';

// toursService agrega imageUrl (proxy de la API) a cada tour.
type TourConImagen = Tour & { imageUrl?: string };

type Props = { tour: TourConImagen; cargando?: never } | { cargando: true; tour?: never };

export default function LetreroTour(props: Props) {
  if (props.cargando) {
    return (
      <article className="letrero letrero--cargando" aria-hidden="true">
        <div className="letrero__placa esqueleto" />
        <div className="letrero__foto esqueleto" />
        <div className="letrero__cuerpo">
          <div className="esqueleto esqueleto--linea" />
          <div className="esqueleto esqueleto--linea esqueleto--corta" />
          <div className="esqueleto esqueleto--boton" />
        </div>
      </article>
    );
  }
  return <LetreroConDatos tour={props.tour} />;
}

function LetreroConDatos({ tour }: { tour: TourConImagen }) {
  const { t } = useTranslation();
  const [fotoRota, setFotoRota] = useState(false);
  const traduccion = tour.translations[0];
  const titulo = traduccion?.title ?? '';
  const duracion = formatearDuracion(tour.duration);
  const pictograma = pictogramaCategoria(tour.category.adminName);
  const salida = tour.location.split(',')[0].trim();
  const conFoto = Boolean(tour.img && tour.imageUrl) && !fotoRota;

  return (
    <article className="letrero">
      <h3 className="letrero__placa rotulo rotulo--tour t-rotulo">
        <Pictograma id={pictograma} size={32} />
        <span className="letrero__titulo">{titulo}</span>
      </h3>
      {conFoto ? (
        <img
          className="letrero__foto"
          src={tour.imageUrl}
          alt=""
          loading="lazy"
          onError={() => setFotoRota(true)}
        />
      ) : (
        <div className="letrero__foto letrero__foto--vacia">
          <Pictograma id={pictograma} size={96} />
        </div>
      )}
      <div className="letrero__franja t-data">
        <span className="letrero__dato">
          <LuClock size={16} aria-hidden="true" />
          <span className="sr-only">{t('common.duracion')}: </span>
          {duracion}
        </span>
        <span className="letrero__dato">
          <LuMapPin size={16} aria-hidden="true" />
          {t('common.saleDe', { lugar: salida })}
        </span>
        <span className="letrero__categoria">{nombreCategoria(tour.category, t)}</span>
      </div>
      <div className="letrero__cuerpo">
        <p className="letrero__descripcion t-small">{traduccion?.description}</p>
        <BotonWhatsApp
          mensaje={t('whatsapp.tour', { titulo, duracion })}
          texto={t('common.preguntarWhatsapp')}
        />
      </div>
    </article>
  );
}
