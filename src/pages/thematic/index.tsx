import { useTranslation } from 'react-i18next';
import '../../css/thematic.css';
import WhatsappFloat from '../../components/whatsappFloat';

export default function Thematic() {
  const { t } = useTranslation();

  const thematicTrips = [
    { key: 'despedida', title: t('thematic.trips.despedida') },
    { key: 'bienvenida', title: t('thematic.trips.bienvenida') },
    { key: 'cumpleanos', title: t('thematic.trips.cumpleanos') },
    { key: 'pedida', title: t('thematic.trips.pedida') },
    { key: 'familia', title: t('thematic.trips.familia') },
    { key: 'team', title: t('thematic.trips.team') },
    { key: 'graduacion', title: t('thematic.trips.graduacion') }
  ];

  return (
    <div className="thematic-container">
      <h1 className="thematic-title">{t('thematic.title')}</h1>
      
      <div className="thematic-intro">
        <p>{t('thematic.intro')}</p>
      </div>

      <div className="thematic-grid">
        {thematicTrips.map((trip) => (
          <div key={trip.key} className="thematic-card">
            <div className="thematic-icon">✦</div>
            <h3 className="thematic-card-title">{trip.title}</h3>
            <p className="thematic-card-desc">{t('thematic.description')}</p>
            <button className="thematic-btn">{t('thematic.moreInfo')}</button>
          </div>
        ))}
      </div>

      <div className="thematic-cta">
        <h2>{t('thematic.cta.title')}</h2>
        <p>{t('thematic.cta.subtitle')}</p>
        <button className="thematic-contact-btn">{t('thematic.cta.button')}</button>
      </div>

      <WhatsappFloat />
    </div>
  );
}
