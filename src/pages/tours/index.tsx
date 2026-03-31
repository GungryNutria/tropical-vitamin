import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toursService, type Tour } from '../../services/toursService';
import '../../css/tours.css';
import { FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import WhatsappFloat from '../../components/whatsappFloat';

import logo from '../../assets/logo.png';
import service1 from "../../assets/services/transportacion.jpg";


export default function Tours() {
  const { t, i18n } = useTranslation();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  // Filter tours by category and search
  const filteredTours = useMemo(() => {
    let filtered = tours;
    
    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(tour => 
        tour.tourTranslations[0]?.category === selectedCategory
      );
    }
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tour => {
        const translation = tour.tourTranslations[0];
        return (
          translation?.title?.toLowerCase().includes(query) ||
          translation?.description?.toLowerCase().includes(query) ||
          tour.location?.toLowerCase().includes(query)
        );
      });
    }
    
    return filtered;
  }, [tours, selectedCategory, searchQuery]);

  if (loading) {
    return <div className="tours-loading">{t('tours.loading')}</div>;
  }

  if (error) {
    return <div className="tours-error">{error}</div>;
  }

  return (
    <div className="tours-container">
      {/* Hero Section */}
      <div className="tours-hero">
        <div className="tours-hero-content">
          <div className="tours-brand">
            <span className="tours-title-hero">TOURS</span>
            <div className="tours-tropical">
              <img src={logo} alt="Tropical Vitamin" className="tours-logo" />
            </div>
          </div>
          <p className="tours-hero-subtitle">{t('tours.hero.subtitle')}</p>
          <p className="tours-hero-text">{t('tours.intro')}</p>
        </div>
      </div>

      <h1 className="tours-page-title">{t('tours.title')}</h1>
      
      {/* Search & Filter */}
      <div className="tours-search-filter">
        {/* Search */}
        <div className="tours-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={t('tours.search.placeholder') || 'Buscar tours...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todos' ? t('tours.filter.all') : cat}
            </option>
          ))}
        </select>
      </div>

      {/* <p className="tours-count">{filteredTours.length} {t('tours.count')}</p> */}

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