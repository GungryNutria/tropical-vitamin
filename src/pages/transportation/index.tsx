import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../css/transportation.css';
import WhatsappFloat from '../../components/whatsappFloat';

import logo from '../../assets/logo.png';

export default function Transportation() {
  const { t, i18n } = useTranslation();
  const [activeSegment, setActiveSegment] = useState(0);
  const [serviceType, setServiceType] = useState<'private' | 'shared'>('private');
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const toggleOption = (idx: number) => {
    setSelectedOptions(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  const handleQuote = () => {
    const isSpanish = i18n.language === 'es';
    
    const segmentNames: Record<string, Record<number, string>> = {
      es: {
        0: 'Transporte Aeropuerto',
        1: 'Transporte Punto a Punto',
        2: 'Transporte Servicio Abierto'
      },
      en: {
        0: 'Airport Transportation',
        1: 'Point to Point Transportation',
        2: 'Open Service Transportation'
      }
    };

    const serviceTypeText = serviceType === 'private' 
      ? (isSpanish ? 'servicio privado' : 'private service')
      : (isSpanish ? 'servicio compartido' : 'shared service');
    
    const tripTypeText = activeSegment === 2
      ? (isSpanish ? 'servicio por hora' : 'hourly service')
      : tripType === 'oneWay'
        ? (isSpanish ? 'solo ida' : 'one way')
        : (isSpanish ? 'ida y vuelta' : 'round trip');

    const segmentName = segmentNames[isSpanish ? 'es' : 'en'][activeSegment];
    const selectedOption = selectedOptions.length > 0
      ? segments[activeSegment].options.filter((_, idx) => selectedOptions.includes(idx)).join(', ')
      : segments[activeSegment].options.join(', ');

    const destinationLabel = activeSegment === 2 
      ? (isSpanish ? 'Duración' : 'Duration')
      : (isSpanish ? 'Destino' : 'Destination');
    
    const message = isSpanish
      ? `Hola, me gustaría cotizar un ${serviceTypeText} de ${segmentName}. ${destinationLabel}: ${selectedOption}. Tipo: ${tripTypeText}`
      : `Hello, I would like to quote a ${serviceTypeText} of ${segmentName}. ${destinationLabel}: ${selectedOption}. Type: ${tripTypeText}`;

    const whatsappUrl = `https://wa.me/529841681263?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const segments = [
    {
      id: 'airport',
      title: t('transportation.segments.airport'),
      subtitle: t('transportation.segments.airportSubtitle'),
      options: [
        t('transportation.segments.airportOpt1'),
        t('transportation.segments.airportOpt2'),
        t('transportation.segments.airportOpt3'),
      ]
    },
    {
      id: 'point',
      title: t('transportation.segments.point'),
      subtitle: t('transportation.segments.pointSubtitle'),
      options: [
        t('transportation.segments.pointOpt1'),
        t('transportation.segments.pointOpt2'),
        t('transportation.segments.pointOpt3'),
        t('transportation.segments.pointOpt4'),
        t('transportation.segments.pointOpt5'),
      ]
    },
    {
      id: 'open',
      title: t('transportation.segments.open'),
      subtitle: t('transportation.segments.openSubtitle'),
      options: [
        t('transportation.segments.openOpt1'),
        t('transportation.segments.openOpt2'),
        t('transportation.segments.openOpt3'),
        t('transportation.segments.openOpt4'),
        t('transportation.segments.openOpt5'),
      ]
    }
  ];

  const units = [
    { name: 'Transporter/Van', icon: '🚐' },
    { name: 'Navigator/Luxury', icon: '🚗' },
    { name: 'Sprinter/Crafter', icon: '🚌' },
    { name: 'Autobús', icon: '🚌' }
  ];

  return (
    <div className="transportation-container">
      {/* Hero Section */}
      <div className="transportation-hero">
        <div className="transportation-hero-content">
          <div className="transportation-brand">
            <span className="transportation-title-hero">{t('transportation.hero.title')}</span>
            <div className="transportation-tropical">
              <img src={logo} alt="Tropical Vitamin" className="transportation-logo" />
            </div>
          </div>
          <p className="transportation-hero-subtitle">{t('transportation.hero.subtitle')}</p>
          <p className="transportation-hero-text">{t('transportation.intro')}</p>
        </div>
      </div>

      {/* Units Section */}
      <section className="transport-units">
        <h2 className="transport-section-title">{t('transportation.units.title')}</h2>
        <div className="transport-units-grid">
          {units.map((unit, idx) => (
            <div key={idx} className="transport-unit-card">
              <span className="transport-unit-icon">{unit.icon}</span>
              <span className="transport-unit-name">{unit.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Segments Tabs */}
      <section className="transport-segments">
        <div className="transport-segment-tabs">
          {segments.map((seg, idx) => (
            <button
              key={seg.id}
              className={`transport-segment-tab ${activeSegment === idx ? 'active' : ''}`}
              onClick={() => { setActiveSegment(idx); setSelectedOptions([]); setServiceType('private'); setTripType('oneWay'); }}
            >
              {seg.title}
            </button>
          ))}
        </div>

        <div className="transport-segment-content">
          <h3 className="transport-segment-title">{segments[activeSegment].title}</h3>
          <p className="transport-segment-subtitle">{segments[activeSegment].subtitle}</p>
          
          <div className="transport-service-selection">
            <div className="transport-service-buttons">
              <button 
                className={`transport-service-btn ${serviceType === 'private' ? 'active' : ''}`}
                onClick={() => setServiceType('private')}
              >
                {t('transportation.options.private')}
              </button>
              <button 
                className={`transport-service-btn ${serviceType === 'shared' ? 'active' : ''}`}
                onClick={() => setServiceType('shared')}
              >
                {t('transportation.options.shared')}
              </button>
            </div>
          </div>

          <div className="transport-segment-options">
            <h4>{t('transportation.segments.optionsTitle')}</h4>
            <div className="transport-options-grid">
              {segments[activeSegment].options.map((opt, idx) => (
                <div 
                  key={idx} 
                  className={`transport-option-item ${selectedOptions.includes(idx) ? 'active' : ''}`}
                  onClick={() => toggleOption(idx)}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {activeSegment !== 2 && (
            <div className="transport-type-selection">
              <div className="transport-type-buttons">
                <button 
                  className={`transport-type-btn ${tripType === 'oneWay' ? 'active' : ''}`}
                  onClick={() => setTripType('oneWay')}
                >
                  {t('transportation.type.oneWay')}
                </button>
                <button 
                  className={`transport-type-btn ${tripType === 'roundTrip' ? 'active' : ''}`}
                  onClick={() => setTripType('roundTrip')}
                >
                  {t('transportation.type.roundTrip')}
                </button>
              </div>
            </div>
          )}

          <button className="transport-quote-btn" onClick={handleQuote}>{t('transportation.quote')}</button>
        </div>
      </section>

      <WhatsappFloat />
    </div>
  );
}