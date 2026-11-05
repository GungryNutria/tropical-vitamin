import { useTranslation } from "react-i18next";
import "../../../css/hero.css";
import heroVideo from '../../../assets/hero.mp4';
import logo from '../../../assets/logo.png';
import { openWhatsApp } from '../../../utils/whatsapp';

function Hero() {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    openWhatsApp("Hola, quiero ayuda para planear mi viaje a la Riviera Maya ");
  };

  const handleScrollDown = () => {
    const historySection = document.querySelector('.history');
    if (historySection) {
      historySection.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Overlay with gradient */}
      <div className="hero-overlay" />

      <div className="hero-container">
        {/* Main Content Card */}
        <div className="hero-content-card">
          <div className="hero-brand">
            <img src={logo} alt="Tropical Vitamin" className="hero-logo" />
          </div>
          
          <h1 className="hero-title">{t('home.hero.title')}</h1>
          <p className="hero-subtitle">{t('home.hero.subtitle')}</p>
          
          <button className="hero-cta" onClick={handleWhatsApp}>
            {t('home.hero.cta')}
            <span className="hero-cta-arrow">→</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll" onClick={handleScrollDown}>
          <span>Descubre más</span>
          <div className="hero-scroll-line"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;