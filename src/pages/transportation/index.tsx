import { useTranslation } from 'react-i18next';
import '../../css/transportation.css';
import WhatsappFloat from '../../components/whatsappFloat';

export default function Transportation() {
  const { t } = useTranslation();

  const transportServices = [
    {
      id: 'airport-hotel',
      title: t('transportation.airport.title'),
      subtitle: t('transportation.airport.subtitle'),
      description: t('transportation.airport.description'),
      options: [
        t('transportation.options.shared'),
        t('transportation.options.private'),
        t('transportation.options.luxury'),
        t('transportation.options.bus')
      ],
      types: [
        t('transportation.type.oneWay'),
        t('transportation.type.roundTrip')
      ]
    }
  ];

  return (
    <div className="transportation-container">
      <h1 className="transportation-title">{t('transportation.title')}</h1>
      
      <div className="transportation-intro">
        <p>{t('transportation.intro')}</p>
      </div>

      <div className="transportation-grid">
        {transportServices.map((service) => (
          <div key={service.id} className="transport-card">
            <h2 className="transport-card-title">{service.title}</h2>
            <p className="transport-card-subtitle">{service.subtitle}</p>
            <p className="transport-card-desc">{service.description}</p>
            
            <div className="transport-options">
              <h3>{t('transportation.options.title')}</h3>
              <ul>
                {service.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </div>

            <div className="transport-types">
              <h3>{t('transportation.type.title')}</h3>
              <div className="transport-type-buttons">
                {service.types.map((type, idx) => (
                  <button key={idx} className="transport-type-btn">
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button className="transport-quote-btn">{t('transportation.quote')}</button>
          </div>
        ))}
      </div>

      <WhatsappFloat />
    </div>
  );
}
