import { useTranslation } from 'react-i18next';
import '../../css/thematic.css';
import WhatsappFloat from '../../components/whatsappFloat';

import logo from '../../assets/logo.png';
export default function Thematic() {
  const { t } = useTranslation();

  const thematicTrips = [
    { 
      key: 'despedida', 
      title: t('thematic.trips.despedida'),
      description: t('thematic.trips.despedidaDesc')
    },
    { 
      key: 'bienvenida', 
      title: t('thematic.trips.bienvenida'),
      description: t('thematic.trips.bienvenidaDesc')
    },
    { 
      key: 'graduacion', 
      title: t('thematic.trips.graduacion'),
      description: t('thematic.trips.graduacionDesc')
    },
    { 
      key: 'familia', 
      title: t('thematic.trips.familia'),
      description: t('thematic.trips.familiaDesc')
    },
    { 
      key: 'cumpleanos', 
      title: t('thematic.trips.cumpleanos'),
      description: t('thematic.trips.cumpleanosDesc')
    },
    { 
      key: 'pedida', 
      title: t('thematic.trips.pedida'),
      description: t('thematic.trips.pedidaDesc')
    }
  ];

  return (
    <div className="thematic-container">
      {/* Hero Section */}
      <div className="thematic-hero">
        <div className="thematic-hero-content">
          <div className="thematic-brand">
            <span className="thematic-viajes">{t('thematic.hero.title')}</span>
            <div className="thematic-tropical">
              <img src={logo} alt="Tropical Vitamin" className="thematic-logo" />
            </div>
          </div>
          <p className="thematic-hero-subtitle" dangerouslySetInnerHTML={{ __html: t('thematic.hero.subtitle') }} />
          <p className="thematic-hero-text" dangerouslySetInnerHTML={{ __html: t('thematic.hero.text') }} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="thematic-grid">
        {thematicTrips.map((trip) => (
          <div key={trip.key} className="thematic-card">
            <h3 className="thematic-card-title">{trip.title}</h3>
            <p className="thematic-card-desc">{trip.description}</p>
            <button className="thematic-btn">{t('thematic.moreInfo')}</button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="thematic-cta">
        <h2>{t('thematic.cta.title')}</h2>
        <p>{t('thematic.cta.subtitle')}</p>
        <button className="thematic-contact-btn">{t('thematic.cta.button')}</button>
      </div>

      <WhatsappFloat />
    </div>
  );
}
