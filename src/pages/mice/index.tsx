import { useTranslation } from 'react-i18next';
import convencionesImg from '../../assets/services/convenciones.jpg';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaServicio from '../../components/tarjetaServicio';
import SolicitudGrupo from '../../components/solicitudGrupo';
import WhatsappFloat from '../../components/whatsappFloat';

const GRUPOS = ['mice', 'team', 'boda', 'viajeros', 'familia', 'escolares', 'deportivos'];

export default function Mice() {
  const { t } = useTranslation();
  const tipos = GRUPOS.map((clave) => ({ clave, titulo: t(`mice.groups.${clave}`) }));

  return (
    <>
      <HeroServicio
        tipo="servicio"
        pictograma="grupo"
        etiqueta={t('common.servicio')}
        titulo={t('mice.hero.title')}
        texto={t('mice.hero.subtitle')}
        imagen={convencionesImg}
        accion={
          <div className="hero-servicio__botones">
            <a href="#cotizar" className="tv-boton tv-boton--primario">{t('mice.hero.cta')}</a>
            <BotonWhatsApp mensaje={t('whatsapp.servicio', { servicio: t('mice.title').toLowerCase() })} tamano="grande" />
          </div>
        }
      />

      <section className="seccion">
        <div className="contenedor">
          <h2 className="t-h2 seccion__titulo">{t('mice.tiposTitulo')}</h2>
          <p className="t-body seccion__entradilla">{t('mice.texto1')}</p>
          <p className="t-body seccion__entradilla">{t('mice.texto2')}</p>
          <ul className="rejilla bloque-tarjetas">
            {GRUPOS.map((clave) => (
              <li key={clave}>
                <TarjetaServicio compacta pictograma="grupo" titulo={t(`mice.groups.${clave}`)} texto={t(`mice.groups.${clave}Desc`)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cotizar" className="seccion solicitud">
        <div className="contenedor solicitud__rejilla">
          <div className="solicitud__intro">
            <h2 className="t-h2">{t('mice.pasosTitulo')}</h2>
            <p className="t-body seccion__entradilla">{t('mice.pasosTexto')}</p>
          </div>
          <SolicitudGrupo servicio="mice" tituloTipo={t('common.grupoTipo')} tipos={tipos} />
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
