import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toursService, type Tour } from '../../services/toursService';
import '../../css/tours.css';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import WhatsappFloat from '../../components/whatsappFloat';

import service1 from "../../assets/services/transportacion.jpg";

const exchangeRates = {
  MXN: 1,
  USD: 0.059,
  EUR: 0.054
};

const currencies = [
  { code: 'MXN', symbol: '$', name: 'MXN' },
  { code: 'USD', symbol: '$', name: 'USD' },
  { code: 'EUR', symbol: '€', name: 'EUR' }
];

export default function Tours() {
  const { t, i18n } = useTranslation();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [currency, setCurrency] = useState<string>('MXN');

  useEffect(() => {
    console.log('Fetching tours, language:', i18n.language);
    const fetchTours = async () => {
      setLoading(true);
      try {
        const data = await toursService.getTours();
        console.log('Tours loaded:', data.length);
        setTours(data);
      } catch (err) {
        setError(t('tours.error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [i18n.language, t]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    tours.forEach(tour => {
      const cat = tour.tourTranslations[0]?.category;
      if (cat) cats.add(cat);
    });
    return ['todos', ...Array.from(cats).sort()];
  }, [tours]);

  // Filter tours
  const filteredTours = useMemo(() => {
    if (selectedCategory === 'todos') return tours;
    return tours.filter(tour => 
      tour.tourTranslations[0]?.category === selectedCategory
    );
  }, [tours, selectedCategory]);

  // Convert price
  const convertPrice = (price: number) => {
    const converted = price * exchangeRates[currency as keyof typeof exchangeRates];
    return Math.round(converted);
  };

  if (loading) {
    return <div className="tours-loading">{t('tours.loading')}</div>;
  }

  if (error) {
    return <div className="tours-error">{error}</div>;
  }

  return (
    <div className="tours-container">
      <h1 className="tours-title">{t('tours.title')}</h1>
      
      {/* Currency Selector */}
      <div className="tours-currency">
        <label>{t('tours.currency')}: </label>
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="currency-select"
        >
          {currencies.map(curr => (
            <option key={curr.code} value={curr.code}>
              {curr.symbol} {curr.code}
            </option>
          ))}
        </select>
      </div>
      
      {/* Filter */}
      <div className="tours-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'todos' ? t('tours.filter.all') : cat}
          </button>
        ))}
      </div>

      <p className="tours-count">{filteredTours.length} {t('tours.count')}</p>

      <div className="tours-grid">
        {filteredTours.map((tour) => {
          const translation = tour.tourTranslations[0];
          
          return (
            <div key={tour.id} className="tour-card">
              <div className="tour-image">
                <span className="tour-category">{translation?.category}</span>
                <img 
                  src={service1}
                  alt={translation?.title || 'Tour'}
                />
              </div>
              <div className="tour-content">
                <h3 className="tour-name">{translation?.title}</h3>
                <p className="tour-description">{translation?.description}</p>
                <div className="tour-info">
                  <span className="tour-location"><FaMapMarkerAlt /> {tour.location}</span>
                  <span className="tour-duration"><FaClock /> {translation?.duration}</span>
                </div>
                <div className="tour-price">
                  <span className="price-label">{t('tours.price.label')}</span>
                  <span className="price-value">
                    {currencies.find(c => c.code === currency)?.symbol}{convertPrice(tour.price)}
                  </span>
                </div>
                <button className="tour-button">{t('tours.book')}</button>
              </div>
            </div>
          );
        })}
      </div>

      <WhatsappFloat />
    </div>
  );
}
