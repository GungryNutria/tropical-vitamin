import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../css/transportation.css';
import WhatsappFloat from '../../components/whatsappFloat';
import SectionHero from '../../components/sectionHero';
import { openWhatsApp } from '../../utils/whatsapp';
import { Counter, FieldError } from '../../components/quoteFields';
import { todayLocal } from '../../utils/tourQuote';
import {
  EMPTY_TRIP,
  buildTransportMessage,
  hasErrors,
  needsReturn,
  validateTransport,
  type TransportChoice,
  type TransportErrors,
  type TransportTrip,
} from '../../utils/travelQuote';
import transporterImg from '../../assets/units/transporter.jpg';
import navigatorImg from '../../assets/units/navigator.jpg';
import sprinterImg from '../../assets/units/sprinter.jpg';
import autobusImg from '../../assets/units/autobus.jpg';

export default function Transportation() {
  const { t, i18n } = useTranslation();
  const [activeSegment, setActiveSegment] = useState(0);
  const [serviceType, setServiceType] = useState<'private' | 'shared'>('private');
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  // Datos del viaje: no se reinician al cambiar de pestaña (REQ-3)
  const [trip, setTrip] = useState<TransportTrip>(EMPTY_TRIP);
  const [errors, setErrors] = useState<TransportErrors>({});
  const setTripData = (patch: Partial<TransportTrip>) => setTrip((d) => ({ ...d, ...patch }));

  const choiceSegment = (['airport', 'point', 'open'] as const)[activeSegment];
  const returnShown = needsReturn({ segment: choiceSegment, serviceType, tripType, options: [] });
  const dateError = errors.date
    ? t(errors.date === 'empty' ? 'transportation.form.date.errorEmpty' : 'tours.quote.date.errorPast')
    : null;
  const returnError = errors.returnDate
    ? t(
        errors.returnDate === 'empty'
          ? 'transportation.form.returnDate.errorEmpty'
          : errors.returnDate === 'past'
            ? 'tours.quote.date.errorPast'
            : 'transportation.form.returnDate.errorBefore'
      )
    : null;

  const toggleOption = (idx: number) => {
    setSelectedOptions(prev => 
      prev.includes(idx) 
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const choice: TransportChoice = {
      segment: choiceSegment,
      serviceType: activeSegment === 0 ? serviceType : 'private',
      tripType,
      options: segments[activeSegment].options.filter((_, i) => selectedOptions.includes(i)),
    };
    const found = validateTransport(choice, trip, todayLocal());
    setErrors(found);
    if (hasErrors(found)) {
      const firstId = found.options
        ? '.transport-option-item'
        : found.date
          ? '#tq-date'
          : found.returnDate
            ? '#tq-return'
            : '#tq-hotel';
      e.currentTarget.querySelector<HTMLElement>(firstId)?.focus();
      return;
    }
    openWhatsApp(buildTransportMessage(t, i18n.language, choice, trip));
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
    { name: 'Transporter/Van', img: transporterImg },
    { name: 'Navigator/Luxury', img: navigatorImg },
    { name: 'Sprinter/Crafter', img: sprinterImg },
    { name: t('transportation.units.bus'), img: autobusImg }
  ];

  return (
    <div className="transportation-container">
      <SectionHero 
        title={t('transportation.hero.title')} 
        subtitle={t('transportation.hero.subtitle')} 
        backgroundImage={navigatorImg}
        text={t('transportation.intro')}
      />
      {/* Hero Section
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
      </div> */}

      {/* Units Section */}
      <section className="transport-units">
        <h2 className="transport-section-title">{t('transportation.units.title')}</h2>
        <div className="transport-units-grid">
          {units.map((unit, idx) => (
            <div key={idx} className="transport-unit-card">
              <img className="transport-unit-img" src={unit.img} alt={unit.name} loading="lazy" />
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
              onClick={() => { setActiveSegment(idx); setSelectedOptions([]); setServiceType('private'); setTripType('oneWay'); setErrors({}); }}
            >
              {seg.title}
            </button>
          ))}
        </div>

        <form className="transport-segment-content" noValidate onSubmit={submit}>
          <h3 className="transport-segment-title">{segments[activeSegment].title}</h3>
          <p className="transport-segment-subtitle">{segments[activeSegment].subtitle}</p>
          
          <div className="transport-service-selection">
            {activeSegment === 0 ? (
              <div className="transport-service-buttons">
                <button
                  type="button"
                  className={`transport-service-btn ${serviceType === 'private' ? 'active' : ''}`}
                  aria-pressed={serviceType === 'private'}
                  onClick={() => setServiceType('private')}
                >
                  {t('transportation.options.private')}
                </button>
                <button
                  type="button"
                  className={`transport-service-btn ${serviceType === 'shared' ? 'active' : ''}`}
                  aria-pressed={serviceType === 'shared'}
                  onClick={() => setServiceType('shared')}
                >
                  {t('transportation.options.shared')}
                </button>
              </div>
            ) : (
              <p className="transport-service-fixed">{t('transportation.options.private')}</p>
            )}
          </div>

          <div className="transport-segment-options">
            <h4 id="tq-options-title">{t('transportation.segments.optionsTitle')}</h4>
            <div
              className="transport-options-grid"
              role="group"
              aria-labelledby="tq-options-title"
              aria-describedby={errors.options ? 'tq-options-error' : undefined}
            >
              {segments[activeSegment].options.map((opt, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`transport-option-item ${selectedOptions.includes(idx) ? 'active' : ''}`}
                  aria-pressed={selectedOptions.includes(idx)}
                  onClick={() => toggleOption(idx)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.options && (
              <FieldError id="tq-options-error" text={t(`transportation.form.optionsError.${choiceSegment}`)} />
            )}
          </div>

          {activeSegment !== 2 && (
            <div className="transport-type-selection">
              <div className="transport-type-buttons">
                <button
                  type="button"
                  className={`transport-type-btn ${tripType === 'oneWay' ? 'active' : ''}`}
                  aria-pressed={tripType === 'oneWay'}
                  onClick={() => setTripType('oneWay')}
                >
                  {t('transportation.type.oneWay')}
                </button>
                <button
                  type="button"
                  className={`transport-type-btn ${tripType === 'roundTrip' ? 'active' : ''}`}
                  aria-pressed={tripType === 'roundTrip'}
                  onClick={() => setTripType('roundTrip')}
                >
                  {t('transportation.type.roundTrip')}
                </button>
              </div>
            </div>
          )}

          <div className="transport-trip">
            <h4>{t('transportation.form.tripTitle')}</h4>

            <div className={`tq-row${returnShown ? ' tq-row--2' : ''}`}>
              <div className="td-field">
                <label className="td-label" htmlFor="tq-date">{t('transportation.form.date.label')}</label>
                <input
                  id="tq-date"
                  type="date"
                  className={`td-input td-date${dateError ? ' is-invalid' : ''}`}
                  min={todayLocal()}
                  value={trip.date}
                  aria-invalid={Boolean(dateError)}
                  aria-describedby={`${dateError ? 'tq-date-error ' : ''}tq-date-help`}
                  onChange={(e) => setTripData({ date: e.target.value })}
                />
                {dateError && <FieldError id="tq-date-error" text={dateError} />}
                <p className="td-help" id="tq-date-help">{t('transportation.form.date.help')}</p>
              </div>

              {returnShown && (
                <div className="td-field">
                  <label className="td-label" htmlFor="tq-return">{t('transportation.form.returnDate.label')}</label>
                  <input
                    id="tq-return"
                    type="date"
                    className={`td-input td-date${returnError ? ' is-invalid' : ''}`}
                    min={trip.date || todayLocal()}
                    value={trip.returnDate}
                    aria-invalid={Boolean(returnError)}
                    aria-describedby={`${returnError ? 'tq-return-error ' : ''}tq-return-help`}
                    onChange={(e) => setTripData({ returnDate: e.target.value })}
                  />
                  {returnError && <FieldError id="tq-return-error" text={returnError} />}
                  <p className="td-help" id="tq-return-help">{t('transportation.form.returnDate.help')}</p>
                </div>
              )}
            </div>

            <fieldset className="tq-group">
              <legend className="td-label">{t('transportation.form.passengers')}</legend>
              <Counter id="tq-adults" label={t('quote.adults.label')} value={trip.adults} min={1}
                addLabel={t('tours.quote.adults.add')} removeLabel={t('tours.quote.adults.remove')}
                onChange={(adults) => setTripData({ adults })} />
              <Counter id="tq-children" label={t('quote.children.label')} value={trip.children} min={0}
                addLabel={t('tours.quote.children.add')} removeLabel={t('tours.quote.children.remove')}
                onChange={(children) => setTripData({ children })} />
              <Counter id="tq-infants" label={t('quote.infants.label')} value={trip.infants} min={0}
                addLabel={t('quote.infants.add')} removeLabel={t('quote.infants.remove')}
                onChange={(infants) => setTripData({ infants })} />
            </fieldset>

            <div className="td-field" role="group" aria-labelledby="tq-carseat-label" aria-describedby="tq-carseat-help">
              <span className="td-label" id="tq-carseat-label">{t('transportation.form.carSeat.label')}</span>
              <div className="transport-type-buttons tq-carseat">
                <button
                  type="button"
                  className={`transport-type-btn ${!trip.carSeat ? 'active' : ''}`}
                  aria-pressed={!trip.carSeat}
                  onClick={() => setTripData({ carSeat: false })}
                >
                  {t('transportation.form.carSeat.no')}
                </button>
                <button
                  type="button"
                  className={`transport-type-btn ${trip.carSeat ? 'active' : ''}`}
                  aria-pressed={trip.carSeat}
                  onClick={() => setTripData(trip.carSeat ? {} : { carSeat: true, carSeats: 1 })}
                >
                  {t('transportation.form.carSeat.yes')}
                </button>
              </div>
              <p className="td-help" id="tq-carseat-help">{t('transportation.form.carSeat.help')}</p>
            </div>
            {trip.carSeat && (
              <Counter id="tq-carseats" label={t('transportation.form.carSeat.count')} value={trip.carSeats} min={1}
                addLabel={t('transportation.form.carSeat.add')} removeLabel={t('transportation.form.carSeat.remove')}
                onChange={(carSeats) => setTripData({ carSeats })} />
            )}

            <div className="td-field">
              <label className="td-label" htmlFor="tq-hotel">{t('transportation.form.hotel.label')}</label>
              <input
                id="tq-hotel"
                type="text"
                className={`td-input${errors.hotel ? ' is-invalid' : ''}`}
                placeholder={t('transportation.form.hotel.placeholder')}
                value={trip.hotel}
                aria-invalid={Boolean(errors.hotel)}
                aria-describedby={`${errors.hotel ? 'tq-hotel-error ' : ''}tq-hotel-help`}
                onChange={(e) => setTripData({ hotel: e.target.value })}
              />
              {errors.hotel && <FieldError id="tq-hotel-error" text={t('transportation.form.hotel.error')} />}
              <p className="td-help" id="tq-hotel-help">{t('tours.quote.hotel.help')}</p>
            </div>
          </div>

          <button type="submit" className="transport-quote-btn">{t('tours.quote.submit')}</button>
          <p className="td-note">{t('tours.quote.note')}</p>
        </form>
      </section>

      <WhatsappFloat />
    </div>
  );
}