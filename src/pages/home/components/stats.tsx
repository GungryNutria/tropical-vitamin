import { useTranslation } from 'react-i18next';
import { FaSmile, FaHotel, FaMapMarkedAlt, FaAward } from 'react-icons/fa';

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { icon: FaSmile, value: '5000+', label: t('home.stats.clients') },
    { icon: FaHotel, value: '50+', label: t('home.stats.hotels') },
    { icon: FaMapMarkedAlt, value: '39', label: t('home.stats.tours') },
    { icon: FaAward, value: '10+', label: t('home.stats.experience') }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-item">
            <stat.icon className="stat-icon" />
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
