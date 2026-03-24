import { useTranslation } from 'react-i18next';
import '../../css/accommodation.css';
import WhatsappFloat from '../../components/whatsappFloat';

import logo from '../../assets/logo.png';

export default function Accommodation() {
  const { t } = useTranslation();

  const accommodations = [
    {
      id: 'casas',
      title: t('accommodation.types.houses'),
      description: t('accommodation.features.houses'),
      features: [
        t('accommodation.features.directHost'),
        t('accommodation.features.cultural'),
        t('accommodation.features.comfort')
      ]
    },
    {
      id: 'hoteles',
      title: t('accommodation.types.hotels'),
      description: t('accommodation.features.hotels'),
      features: [
        t('accommodation.features.roomService'),
        t('accommodation.features.amenities'),
        t('accommodation.features.personalized'),
        t('accommodation.features.variety')
      ]
    },
    {
      id: 'condos',
      title: t('accommodation.types.condos'),
      description: t('accommodation.features.condos'),
      features: [
        t('accommodation.features.kitchen'),
        t('accommodation.features.spaces'),
        t('accommodation.features.privacy'),
        t('accommodation.features.longStays')
      ]
    }
  ];

  const destinations = [
    t('contact.destinations.cancun'),
    t('contact.destinations.playaCarmen'),
    t('contact.destinations.rivieraMaya'),
    t('contact.destinations.tulum'),
    t('contact.destinations.bacalar'),
    'Mahahual',
    t('contact.destinations.yucatan')
  ];

  return (
    <div className="accommodation-container">
      {/* Hero Section */}
      <div className="accommodation-hero">
        <div className="accommodation-hero-content">
          <div className="accommodation-brand">
            <span className="accommodation-title-hero">HOSPEDAJE</span>
            <div className="accommodation-tropical">
              <img src={logo} alt="Tropical Vitamin" className="accommodation-logo" />
            </div>
          </div>
          <p className="accommodation-hero-subtitle">{t('accommodation.hero.subtitle')}</p>
          <p className="accommodation-hero-text">{t('accommodation.intro')}</p>
        </div>
      </div>

      <div className="accommodation-grid">
        {accommodations.map((acc) => (
          <div key={acc.id} className="accommodation-card">
            <h2 className="accommodation-card-title">{acc.title}</h2>
            <p className="accommodation-card-desc">{acc.description}</p>
            
            <div className="accommodation-features">
              <h3>{t('accommodation.includes')}:</h3>
              <ul>
                {acc.features.map((feat, idx) => (
                  <li key={idx}>✓ {feat}</li>
                ))}
              </ul>
            </div>

            <button className="accommodation-btn">{t('accommodation.viewOptions')}</button>
          </div>
        ))}
      </div>

      <div className="destinations-section">
        <h2 className="destinations-title">{t('accommodation.destinations')}</h2>
        <div className="destinations-list">
          {destinations.map((dest, idx) => (
            <span key={idx} className="destination-tag">{dest}</span>
          ))}
        </div>
      </div>

      <WhatsappFloat />
    </div>
  );
}