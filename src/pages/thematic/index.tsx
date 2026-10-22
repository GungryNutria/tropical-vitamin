import { useTranslation } from 'react-i18next';
import thematicImg from '../../assets/thematic-hero.jpg';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaServicio from '../../components/tarjetaServicio';
import SolicitudGrupo from '../../components/solicitudGrupo';
import WhatsappFloat from '../../components/whatsappFloat';

const VIAJES = ['despedida', 'bienvenida', 'graduacion', 'familia', 'cumpleanos', 'pedida'];

export default function Thematic() {
  const { t } = useTranslation();
  const tipos = VIAJES.map((clave) => ({ clave, titulo: t(`thematic.trips.${clave}`) }));

  return (
    <>
      <HeroServicio
        tipo="servicio"
        pictograma="copas"
        etiqueta={t('common.servicio')}
        titulo={t('thematic.hero.title')}
        texto={t('thematic.hero.subtitle')}
        imagen={thematicImg}
        accion={
          <div className="hero-servicio__botones">
            <a href="#cotizar" className="tv-boton tv-boton--primario">{t('thematic.hero.cta')}</a>
            <BotonWhatsApp mensaje={t('whatsapp.servicio', { servicio: t('thematic.title').toLowerCase() })} tamano="grande" />
          </div>
        }
      />

      <section className="seccion">
        <div className="contenedor">
          <h2 className="t-h2 seccion__titulo">{t('thematic.tiposTitulo')}</h2>
          <p className="t-body seccion__entradilla">{t('thematic.texto')}</p>
          <ul className="rejilla bloque-tarjetas">
            {VIAJES.map((clave) => (
              <li key={clave}>
                <TarjetaServicio compacta pictograma="copas" titulo={t(`thematic.trips.${clave}`)} texto={t(`thematic.trips.${clave}Desc`)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cotizar" className="seccion solicitud">
        <div className="contenedor solicitud__rejilla">
          <div className="solicitud__intro">
            <h2 className="t-h2">{t('thematic.pasosTitulo')}</h2>
            <p className="t-body seccion__entradilla">{t('thematic.pasosTexto')}</p>
          </div>
          <SolicitudGrupo servicio="tematicos" tituloTipo={t('thematic.pasosTipo')} tipos={tipos} />
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
