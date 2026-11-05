import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toursService, type TourWithImages, type Category } from '../../services/toursService';
import '../../css/tours.css';
import { FaSearch } from 'react-icons/fa';
import WhatsappFloat from '../../components/whatsappFloat';
import SectionHero from '../../components/sectionHero';
import TourDialog, { type DialogView } from './components/tourDialog';
import '../../css/tour-dialog.css';
import { useSocial } from '../../hooks/useSocial';

function getCategoryDisplayName(category: Category | undefined, t: (key: string) => string): string {
  if (!category) return '';

  // La API ya filtra la traducción por el idioma activo (?lang=); es la que se edita en el admin
  const translation = category.translations?.[0];
  if (translation?.name) return translation.name;

  const localized = t(`tours.categories.${category.adminName}`);
  if (localized && localized !== `tours.categories.${category.adminName}`) {
    return localized;
  }

  return category.adminName;
}

export default function Tours() {
  const { t, i18n } = useTranslation();
  useSocial(); // re-render al llegar el número vigente
  const [tours, setTours] = useState<TourWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [open, setOpen] = useState<{ tour: TourWithImages; view: DialogView } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null); // el botón que abrió el diálogo

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

  // Get unique categories from tours
  const categories = useMemo(() => {
    const cats = new Map<string, string>(); // adminName -> displayName
    tours.forEach(tour => {
      const cat = tour.category;
      if (cat) {
        const displayName = getCategoryDisplayName(cat, t);
        cats.set(cat.adminName, displayName);
      }
    });
    // Convert to array and sort by display name
    const sorted = Array.from(cats.entries()).sort((a, b) => a[1].localeCompare(b[1]));
    // Return as [adminName, displayName] pairs
    return sorted;
  }, [tours, t]);

  // Filter tours by category and search
  const filteredTours = useMemo(() => {
    let filtered = tours;
    
    // Filter by category
    if (selectedCategory !== 'todos' && selectedCategory !== 'all') {
      filtered = filtered.filter(tour => 
        tour.category?.adminName === selectedCategory
      );
    }
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tour => {
        const translation = tour.translations?.[0];
        return (
          translation?.title?.toLowerCase().includes(query) ||
          translation?.description?.toLowerCase().includes(query)
        );
      });
    }
    
    return filtered;
  }, [tours, selectedCategory, searchQuery]);

  const openDialog = (e: React.MouseEvent<HTMLElement>, tour: TourWithImages, view: DialogView) => {
    openerRef.current = e.currentTarget;
    setOpen({ tour, view });
  };

  const closeDialog = () => {
    setOpen(null);
    openerRef.current?.focus();
  };

  if (loading) {
    return <div className="tours-loading">{t('tours.loading')}</div>;
  }

  if (error) {
    return <div className="tours-error">{error}</div>;
  }

  return (
    <div className="tours-container">
      {/* Hero Section */}
      <SectionHero
        title={t('tours.hero.title')}
        subtitle={t('tours.hero.subtitle')}
        backgroundImage={'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80'} text={t('tours.intro')}      />
      
      <section className="tours-body">
        <h2 className="section-title">
          <span className="title-accent"></span>
          {t('tours.title')}
        </h2>

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
            <option value="todos">{t('tours.filter.all')}</option>
            {categories.map(([adminName, displayName]) => (
              <option key={adminName} value={adminName}>
                {displayName}
              </option>
            ))}
          </select>
        </div>

        <p className="tours-count">{filteredTours.length} {t('tours.count')}</p>

        <div className="tours-grid">
          {filteredTours.map((tour) => {
            const translation = tour.translations?.[0];
            const categoryDisplayName = getCategoryDisplayName(tour.category, t);

            return (
              <div key={tour.id} className="tour-card">
                <div className="tour-image">
                  <img
                    src={tour.imageUrl}
                    alt={translation?.title || 'Tour'}
                  />
                </div>
                <div className="tour-content">
                  <span className="tour-category">{categoryDisplayName}</span>
                  <h3 className="tour-name">{translation?.title}</h3>
                  <p className="tour-description">{translation?.description}</p>
                  <div className="tour-actions">
                    <button type="button" className="tour-button tour-button--secondary" onClick={(e) => openDialog(e, tour, 'gallery')}>
                      {t('tours.seeMore')}
                    </button>
                    <button type="button" className="tour-button" onClick={(e) => openDialog(e, tour, 'quote')}>
                      {t('tours.book')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {open && (
        <TourDialog
          title={open.tour.translations?.[0]?.title ?? ''}
          category={getCategoryDisplayName(open.tour.category, t)}
          description={open.tour.translations?.[0]?.description ?? ''}
          images={open.tour.imageUrls}
          initialView={open.view}
          onClose={closeDialog}
        />
      )}

      <WhatsappFloat />
    </div>
  );
}