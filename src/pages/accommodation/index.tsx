import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../css/accommodation.css';
import WhatsappFloat from '../../components/whatsappFloat';
import SectionHero from '../../components/sectionHero';
import StayQuoteDialog from './components/stayQuoteDialog';
import { EMPTY_STAY, type StayData, type StayType } from '../../utils/travelQuote';

// Una sola lista para "Destinos disponibles" y la zona del formulario (REQ-7)
const DESTINATIONS = [
  'contact.destinations.cancun',
  'contact.destinations.playaCarmen',
  'contact.destinations.rivieraMaya',
  'contact.destinations.tulum',
  'contact.destinations.bacalar',
  'Mahahual',
  'contact.destinations.yucatan',
  'Holbox',
  'Isla Mujeres',
  'Cozumel',
] as const;

export default function Accommodation() {
  const { t } = useTranslation();
  // Último formulario: reabrir la misma tarjeta conserva los datos, otra empieza de cero (D-9)
  const [stay, setStay] = useState<{ type: StayType; data: StayData } | null>(null);
  const [openType, setOpenType] = useState<StayType | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openQuote = (e: React.MouseEvent<HTMLElement>, id: StayType) => {
    openerRef.current = e.currentTarget;
    if (stay?.type !== id) setStay({ type: id, data: EMPTY_STAY });
    setOpenType(id);
  };

  const closeQuote = () => {
    setOpenType(null);
    openerRef.current?.focus();
  };

  const accommodations: { id: StayType; title: string; description: string; features: string[] }[] = [
    {
      id: 'houses',
      title: t('accommodation.types.houses'),
      description: t('accommodation.features.houses'),
      features: [
        t('accommodation.features.directHost'),
        t('accommodation.features.cultural'),
        t('accommodation.features.comfort')
      ]
    },
    {
      id: 'hoteles',
      title: t('accommodation.types.hoteles'),
      description: t('accommodation.features.hoteles'),
      features: [
        t('accommodation.features.roomService'),
        t('accommodation.features.amenities'),
        t('accommodation.features.personalized'),
        t('accommodation.features.variety')
      ]
    },
    {
      id: 'condos',
      title: t('accommodation.types.condos'),
      description: t('accommodation.features.condos'),
      features: [
        t('accommodation.features.kitchen'),
        t('accommodation.features.spaces'),
        t('accommodation.features.privacy'),
        t('accommodation.features.longStays')
      ]
    }
  ];

  const destinations = DESTINATIONS.map((d) => (d.startsWith('contact.') ? t(d) : d));

  return (
    <div className="accommodation-container">
      {/* Hero Section */}
      <SectionHero
        title={t('accommodation.hero.title')}
        subtitle={t('accommodation.hero.subtitle')}
        text={t('accommodation.intro')}
        backgroundImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
      />

      <div className="accommodation-grid">
        {accommodations.map((acc) => (
          <div key={acc.id} className="accommodation-card">
            <h2 className="accommodation-card-title">{acc.title}</h2>
            <p className="accommodation-card-desc">{acc.description}</p>

            <button
              type="button"
              className="accommodation-btn"
              aria-label={t('accommodation.quote.ctaLabel', { type: t(`accommodation.quote.types.${acc.id}`) })}
              onClick={(e) => openQuote(e, acc.id)}
            >
              {t('accommodation.quote.cta')}
            </button>
          </div>
        ))}
      </div>

      <div className="destinations-section">
        <h2 className="destinations-title">{t('accommodation.destinations')}</h2>
        <div className="destinations-list">
          {destinations.map((dest, idx) => (
            <span key={idx} className="destination-tag">{dest}</span>
          ))}
        </div>
      </div>

      {openType && stay && (
        <StayQuoteDialog
          typeName={t(`accommodation.quote.types.${openType}`)}
          destinations={destinations}
          data={stay.data}
          onChange={(data) => setStay({ type: openType, data })}
          onClose={closeQuote}
        />
      )}

      <WhatsappFloat />
    </div>
  );
}
