import { useTranslation } from 'react-i18next';
import '../../css/mice.css';
import WhatsappFloat from '../../components/whatsappFloat';

export default function Mice() {
  const { t } = useTranslation();

  const miceServices = [
    t('mice.services.1'),
    t('mice.services.2'),
    t('mice.services.3'),
    t('mice.services.4'),
    t('mice.services.5')
  ];

  return (
    <div className="mice-container">
      <h1 className="mice-title">{t('mice.title')}</h1>
      
      <div className="mice-intro">
        <p>{t('mice.intro')}</p>
        <p className="mice-subtitle">{t('mice.subtitle')}</p>
      </div>

      <div className="mice-services-grid">
        {miceServices.map((service, idx) => (
          <div key={idx} className="mice-service-card">
            <div className="mice-service-number">{idx + 1}</div>
            <p className="mice-service-text">{service}</p>
          </div>
        ))}
      </div>

      <div className="mice-cta">
        <h2>{t('mice.cta.title')}</h2>
        <p>{t('mice.cta.subtitle')}</p>
        <button className="mice-contact-btn">{t('mice.cta.button')}</button>
      </div>

      <WhatsappFloat />
    </div>
  );
}
