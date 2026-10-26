import { useTranslation } from 'react-i18next';
import '../../css/mice.css';
import WhatsappFloat from '../../components/whatsappFloat';
import SectionHero from '../../components/sectionHero';

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

      <SectionHero
        title={t('mice.hero.title')}
        subtitle={t('mice.hero.subtitle')}
        text={t('mice.hero.text')} backgroundImage={'https://plus.unsplash.com/premium_photo-1661510831877-e94fff4cc710?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />

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
