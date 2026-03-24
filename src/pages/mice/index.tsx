import { useTranslation } from 'react-i18next';
import '../../css/mice.css';
import WhatsappFloat from '../../components/whatsappFloat';

import logo from '../../assets/logo.png';

export default function Mice() {
  const { t } = useTranslation();

  const miceGroups = [
    { 
      key: 'mice',
      title: t('mice.groups.mice'),
      description: t('mice.groups.miceDesc')
    },
    { 
      key: 'team',
      title: t('mice.groups.team'),
      description: t('mice.groups.teamDesc')
    },
    { 
      key: 'boda',
      title: t('mice.groups.boda'),
      description: t('mice.groups.bodaDesc')
    },
    { 
      key: 'viajeros',
      title: t('mice.groups.viajeros'),
      description: t('mice.groups.viajerosDesc')
    },
    { 
      key: 'familia',
      title: t('mice.groups.familia'),
      description: t('mice.groups.familiaDesc')
    },
    { 
      key: 'escolares',
      title: t('mice.groups.escolares'),
      description: t('mice.groups.escolaresDesc')
    },
    { 
      key: 'deportivos',
      title: t('mice.groups.deportivos'),
      description: t('mice.groups.deportivosDesc')
    }
  ];

  return (
    <div className="mice-container">
      {/* Hero Section */}
      <div className="mice-hero">
        <div className="mice-hero-content">
          <div className="mice-brand">
            <span className="mice-grupos">GRUPOS</span>
            <div className="mice-tropical">
              <img src={logo} alt="Tropical Vitamin" className="mice-logo" />
            </div>
          </div>
          <p className="mice-hero-subtitle">{t('mice.hero.subtitle')}</p>
          <p className="mice-hero-text" dangerouslySetInnerHTML={{ __html: t('mice.hero.text') }} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mice-grid">
        {miceGroups.map((group) => (
          <div key={group.key} className="mice-card">
            <h3 className="mice-card-title">{group.title}</h3>
            <p className="mice-card-desc">{group.description}</p>
            <button className="mice-btn">{t('mice.moreInfo')}</button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mice-cta">
        <h2>{t('mice.cta.title')}</h2>
        <p>{t('mice.cta.subtitle')}</p>
        <button className="mice-contact-btn">{t('mice.cta.button')}</button>
      </div>

      <WhatsappFloat />
    </div>
  );
}
