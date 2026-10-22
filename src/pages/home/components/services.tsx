import { useTranslation } from 'react-i18next';
import TarjetaServicio from '../../../components/tarjetaServicio';
import BotonWhatsApp from '../../../components/botonWhatsApp';
import type { PictogramaId } from '../../../components/pictograma';
import imgTours from '../../../assets/services/tours.jpg';
import imgTransportacion from '../../../assets/units/autobus.jpg';
import imgHospedaje from '../../../assets/services/hospedaje.jpg';
import imgConvenciones from '../../../assets/services/convenciones.jpg';
import imgTematicos from '../../../assets/services/tematicos.jpg';

const SERVICIOS: { clave: string; ruta: string; pictograma: PictogramaId; imagen: string; tipo: 'servicio' | 'tour' }[] = [
  { clave: 'tours', ruta: '/tours', pictograma: 'camara', imagen: imgTours, tipo: 'tour' },
  { clave: 'transportation', ruta: '/transportacion', pictograma: 'camioneta', imagen: imgTransportacion, tipo: 'servicio' },
  { clave: 'accommodation', ruta: '/hospedaje', pictograma: 'cama', imagen: imgHospedaje, tipo: 'servicio' },
  { clave: 'mice', ruta: '/mice', pictograma: 'grupo', imagen: imgConvenciones, tipo: 'servicio' },
  { clave: 'thematic', ruta: '/tematicos', pictograma: 'copas', imagen: imgTematicos, tipo: 'servicio' },
];

export default function Services() {
  const { t } = useTranslation();
  return (
    <section className="seccion">
      <div className="contenedor">
        <h2 className="t-h2 seccion__titulo">{t('home.services.title')}</h2>
        <p className="t-body-lg seccion__entradilla">{t('home.services.subtitle')}</p>
        <ul className="rejilla home-servicios">
          {SERVICIOS.map((s) => {
            const titulo = t(`home.services.cards.${s.clave}`);
            return (
              <li key={s.clave}>
                <TarjetaServicio
                  pictograma={s.pictograma}
                  titulo={titulo}
                  tipo={s.tipo}
                  imagen={s.imagen}
                  texto={t(`home.services.cards.${s.clave}Desc`)}
                  enlace={s.ruta}
                  mensaje={t('whatsapp.servicio', { servicio: titulo.toLowerCase() })}
                />
              </li>
            );
          })}
          <li>
            <div className="rotulo rotulo--accion home-medida">
              <h3 className="t-rotulo-lg">{t('home.services.cards.medidaTitle')}</h3>
              <p className="t-body-lg">{t('home.services.cards.medidaText')}</p>
              <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('home.services.cards.medidaCta')} tamano="grande" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
