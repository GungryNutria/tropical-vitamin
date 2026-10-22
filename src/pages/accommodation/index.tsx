import { useTranslation } from 'react-i18next';
import hospedajeImg from '../../assets/services/hospedaje.jpg';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaServicio from '../../components/tarjetaServicio';
import WhatsappFloat from '../../components/whatsappFloat';

const TIPOS = [
  { clave: 'houses', datos: ['directHost', 'cultural', 'comfort'] },
  { clave: 'hoteles', datos: ['roomService', 'amenities', 'personalized', 'variety'] },
  { clave: 'condos', datos: ['kitchen', 'spaces', 'privacy', 'longStays'] },
];

export default function Accommodation() {
  const { t } = useTranslation();
  const destinos = [
    t('contact.destinations.cancun'),
    t('contact.destinations.playaCarmen'),
    t('contact.destinations.rivieraMaya'),
    t('contact.destinations.tulum'),
    t('contact.destinations.bacalar'),
    'Mahahual',
    t('contact.destinations.yucatan'),
    'Holbox',
    'Isla Mujeres',
    'Cozumel',
  ];

  return (
    <>
      <HeroServicio
        tipo="servicio"
        pictograma="cama"
        etiqueta={t('common.servicio')}
        titulo={t('accommodation.hero.title')}
        texto={t('accommodation.hero.subtitle')}
        imagen={hospedajeImg}
        accion={<BotonWhatsApp mensaje={t('whatsapp.servicio', { servicio: t('accommodation.hero.title').toLowerCase() })} texto={t('accommodation.hero.cta')} tamano="grande" />}
      />

      <section className="seccion">
        <div className="contenedor">
          <h2 className="t-h2 seccion__titulo">{t('accommodation.tiposTitulo')}</h2>
          <p className="t-body-lg seccion__entradilla">{t('accommodation.intro')}</p>
          <ul className="rejilla bloque-tarjetas">
            {TIPOS.map(({ clave, datos }) => {
              const titulo = t(`accommodation.types.${clave}`);
              return (
                <li key={clave}>
                  <TarjetaServicio
                    compacta
                    pictograma="cama"
                    titulo={titulo}
                    texto={t(`accommodation.features.${clave}`)}
                    datos={datos.map((d) => t(`accommodation.features.${d}`))}
                    mensaje={t('whatsapp.servicio', { servicio: `${t('accommodation.hero.title').toLowerCase()}: ${titulo}` })}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="seccion solicitud">
        <div className="contenedor">
          <h2 className="t-h2 seccion__titulo">{t('accommodation.destinations')}</h2>
          <ul className="destinos">
            {destinos.map((d) => <li key={d} className="t-data destinos__item">{d}</li>)}
          </ul>
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
