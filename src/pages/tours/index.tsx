import { useEffect, useState, useMemo } from 'react';
import { toursService, type Tour } from '../../services/toursService';
import '../../css/tours.css';

import service1 from "../../assets/services/transportacion.jpg";

export default function Tours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await toursService.getTours('es');
        setTours(data);
      } catch (err) {
        setError('Error al cargar los tours');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

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

  if (loading) {
    return <div className="tours-loading">Cargando tours...</div>;
  }

  if (error) {
    return <div className="tours-error">{error}</div>;
  }

  return (
    <div className="tours-container">
      <h1 className="tours-title">Tours</h1>
      
      {/* Filter */}
      <div className="tours-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'todos' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      <p className="tours-count">{filteredTours.length} tours disponibles</p>

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
                  <span className="tour-location">📍 {tour.location}</span>
                  <span className="tour-duration">⏱️ {translation?.duration}</span>
                </div>
                <div className="tour-price">
                  <span className="price-label">Desde</span>
                  <span className="price-value">${tour.price}</span>
                </div>
                <button className="tour-button">Reservar Ahora</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
