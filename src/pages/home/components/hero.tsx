import { useTranslation } from "react-i18next";
import "../../../css/hero.css";
import heroVideo from '../../../assets/hero.mp4';

function Hero() {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/529841681263?text=Hola%2C%20quiero%20ayuda%20para%20planear%20mi%20viaje%20a%20la%20Riviera%20Maya%20",
      "_blank"
    );
  };

  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="hero-overlay" />

      <div className="hero-left-content">
        <h1>{t('home.hero.title')}</h1>
        <p>{t('home.hero.subtitle')}</p>
        <button className="hero-cta" onClick={handleWhatsApp}>{t('home.hero.cta')}</button>
      </div>
    </section>
  );
}

export default Hero;
