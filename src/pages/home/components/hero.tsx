import { useRef, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuPause, LuPlay } from 'react-icons/lu';
import heroVideo from '../../../assets/hero.mp4';
import heroPoster from '../../../assets/hero-poster.webp';
import heroStill from '../../../assets/hero-still.webp';
import BotonWhatsApp from '../../../components/botonWhatsApp';

const CONSULTA = '(prefers-reduced-motion: reduce)';
const suscribir = (cb: () => void) => {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const movimientoReducido = () => window.matchMedia(CONSULTA).matches;

export default function Hero() {
  const { t } = useTranslation();
  const reducido = useSyncExternalStore(suscribir, movimientoReducido);
  const video = useRef<HTMLVideoElement>(null);
  const [pausado, setPausado] = useState(false);

  // El estado sigue a los eventos del video (también si el navegador bloquea la reproducción).
  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => setPausado(true));
    else v.pause();
  };

  return (
    <section className="hero">
      {reducido ? (
        <img className="hero__medio" src={heroStill} alt="" />
      ) : (
        <video ref={video} className="hero__medio" src={heroVideo} poster={heroPoster} autoPlay muted loop playsInline aria-hidden="true" onPlay={() => setPausado(false)} onPause={() => setPausado(true)} />
      )}
      <div className="hero__velo" />

      <div className="contenedor hero__contenido">
        <div className="hero__poste">
          <p className="hero__km">
            <span className="hero__placa-km t-km">KM 0</span>
            <span className="hero__ciudad">{t('home.hero.ciudad')}</span>
          </p>
          <h1 className="t-h1">{t('home.hero.title')}</h1>
          <p className="t-body-lg hero__entradilla">{t('home.hero.subtitle')}</p>
        </div>
        <div className="hero__acciones">
          <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('home.hero.cta')} tamano="grande" />
          <Link to="/tours" className="tv-boton tv-boton--direccion">{t('home.hero.verTours')}</Link>
        </div>
        {!reducido && (
          <button type="button" className="hero__pausa" onClick={alternar} aria-label={pausado ? t('home.hero.reproducir') : t('home.hero.pausar')}>
            {pausado ? <LuPlay size={20} aria-hidden="true" /> : <LuPause size={20} aria-hidden="true" />}
          </button>
        )}
      </div>
      <div className="contenedor hero__linea-wrap" aria-hidden="true">
        <div className="hero__linea" />
      </div>
    </section>
  );
}
