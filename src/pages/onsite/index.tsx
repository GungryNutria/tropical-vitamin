import { useTranslation } from 'react-i18next';
import '../../css/onsite.css';
import WhatsappFloat from '../../components/whatsappFloat';
import SectionHero from '../../components/sectionHero';
import { openWhatsApp } from '../../utils/whatsapp';
import heroImg from '../../assets/destino/hero.jpg';
import fotoImg from '../../assets/destino/foto.jpg';
import conciergeImg from '../../assets/destino/concierge.jpg';
import autosImg from '../../assets/destino/autos.jpg';
import movilidadImg from '../../assets/destino/movilidad.jpg';
import vanImg from '../../assets/destino/van-rampa.jpg';

// Orden del flyer. Los textos y alt viven en onsite.services.<key>.
const SERVICES = [
  { key: 'foto', img: fotoImg },
  { key: 'concierge', img: conciergeImg },
  { key: 'autos', img: autosImg },
  { key: 'movilidad', img: movilidadImg },
  { key: 'transporte', img: vanImg },
] as const;

export default function OnSite() {
  const { t } = useTranslation();

  return (
    <div className="onsite-container">
      <SectionHero title={t('onsite.title')} subtitle={t('onsite.subtitle')} backgroundImage={heroImg} />

      <section className="onsite-section">
        <h2 className="section-title">
          <span className="title-accent"></span>
          {t('onsite.eyebrow')}
        </h2>
        <div className="onsite-grid">
          {SERVICES.map(({ key, img }) => {
            const name = t(`onsite.services.${key}.name`);
            return (
              <article key={key} className="onsite-card">
                <img src={img} alt={t(`onsite.services.${key}.alt`)} width="1200" height="800" loading="lazy" />
                <div className="onsite-card-body">
                  <h3>{name}</h3>
                  <p>{t(`onsite.services.${key}.desc`)}</p>
                  <button
                    type="button"
                    className="onsite-btn"
                    aria-label={t('onsite.ctaLabel', { name })}
                    onClick={() => openWhatsApp(t('onsite.whatsappMessage', { name }))}
                  >
                    {t('onsite.cta')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <WhatsappFloat />
    </div>
  );
}
