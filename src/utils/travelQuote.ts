// Cotizaciones de Transportación y Hospedaje (spec 009). Funciones puras: nada sale a un servidor,
// el mensaje se entrega a openWhatsApp (spec 007).
import { formatLongDate } from './tourQuote';

type T = (key: string, options?: Record<string, unknown>) => string;

export type DateError = 'empty' | 'past';
// YYYY-MM-DD ordena como texto (igual que validateQuote de la 006)
export const checkDate = (v: string, today: string): DateError | undefined =>
  !v ? 'empty' : v < today ? 'past' : undefined;

export const hasErrors = (e: object): boolean => Object.values(e).some(Boolean);

/* Transportación */
export type Segment = 'airport' | 'point' | 'open';

// Lo propio del segmento; se reinicia al cambiar de pestaña
export interface TransportChoice {
  segment: Segment;
  serviceType: 'private' | 'shared'; // point y open siempre 'private'
  tripType: 'oneWay' | 'roundTrip'; // en open no se usa
  options: string[]; // textos elegidos, en el orden de la rejilla
}

// Se conserva al cambiar de pestaña (REQ-3)
export interface TransportTrip {
  date: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  carSeat: boolean;
  carSeats: number; // solo cuenta si carSeat
  hotel: string;
}

export const EMPTY_TRIP: TransportTrip = {
  date: '', returnDate: '', adults: 1, children: 0, infants: 0, carSeat: false, carSeats: 1, hotel: '',
};

export interface TransportErrors {
  options?: true;
  date?: DateError;
  returnDate?: DateError | 'before';
  hotel?: true;
}

export const needsReturn = (c: TransportChoice): boolean =>
  c.segment !== 'open' && c.tripType === 'roundTrip';

export const validateTransport = (c: TransportChoice, trip: TransportTrip, today: string): TransportErrors => {
  const errors: TransportErrors = {};
  if (!c.options.length) errors.options = true;
  const date = checkDate(trip.date, today);
  if (date) errors.date = date;
  if (needsReturn(c)) {
    const ret = checkDate(trip.returnDate, today) ?? (trip.date && trip.returnDate < trip.date ? 'before' : undefined);
    if (ret) errors.returnDate = ret;
  }
  if (!trip.hotel.trim()) errors.hotel = true;
  return errors;
};

export const buildTransportMessage = (t: T, lang: string, c: TransportChoice, trip: TransportTrip): string => {
  const lines = [
    t('transportation.form.msg.intro'),
    t('transportation.form.msg.service', { value: t(`transportation.form.msg.segment.${c.segment}`) }),
    t('transportation.form.msg.mode', { value: t(c.serviceType === 'shared' ? 'transportation.form.msg.shared' : 'transportation.form.msg.private') }),
    t(`transportation.form.msg.options.${c.segment}`, { count: c.options.length, options: c.options.join(', ') }),
  ];
  if (c.segment !== 'open') {
    lines.push(t('transportation.form.msg.trip', { value: t(c.tripType === 'roundTrip' ? 'transportation.type.roundTrip' : 'transportation.type.oneWay') }));
  }
  lines.push(t('transportation.form.msg.date', { date: formatLongDate(trip.date, lang) }));
  if (needsReturn(c)) lines.push(t('transportation.form.msg.returnDate', { date: formatLongDate(trip.returnDate, lang) }));
  lines.push(t('quote.msg.adults', { n: trip.adults }));
  if (trip.children > 0) lines.push(t('quote.msg.children', { n: trip.children }));
  if (trip.infants > 0) lines.push(t('quote.msg.infants', { n: trip.infants }));
  lines.push(trip.carSeat ? t('transportation.form.msg.carSeatYes', { n: trip.carSeats }) : t('transportation.form.msg.carSeatNo'));
  lines.push(t('transportation.form.msg.hotel', { text: trip.hotel.trim() }));
  return lines.join('\n');
};

/* Hospedaje */
export type StayType = 'houses' | 'hoteles' | 'condos'; // = id de la tarjeta → accommodation.quote.types.<id>

export interface StayData {
  arrival: string;
  nights: string; // texto: empieza vacío (D-4)
  adults: number;
  children: number;
  infants: number;
  zone: string; // '' = sin elegir | '0'…'9' = índice en DESTINATIONS | 'other'
  otherZone: string;
}

export const EMPTY_STAY: StayData = { arrival: '', nights: '', adults: 1, children: 0, infants: 0, zone: '', otherZone: '' };

export interface StayErrors {
  arrival?: DateError;
  nights?: 'empty' | 'invalid';
  zone?: true;
  otherZone?: true;
}

export const validateStay = (d: StayData, today: string): StayErrors => {
  const errors: StayErrors = {};
  const arrival = checkDate(d.arrival, today);
  if (arrival) errors.arrival = arrival;
  const nights = d.nights.trim();
  if (!nights) errors.nights = 'empty';
  else if (!/^\d+$/.test(nights) || Number(nights) < 1) errors.nights = 'invalid';
  if (!d.zone) errors.zone = true;
  else if (d.zone === 'other' && !d.otherZone.trim()) errors.otherZone = true;
  return errors;
};

// zoneName lo resuelve el componente: el destino traducido, o el texto de "Otra"
export const buildStayMessage = (t: T, lang: string, typeName: string, zoneName: string, d: StayData): string => {
  const lines = [
    t('accommodation.quote.msg.intro'),
    t('accommodation.quote.msg.type', { type: typeName }),
    t('accommodation.quote.msg.arrival', { date: formatLongDate(d.arrival, lang) }),
    t('accommodation.quote.msg.nights', { n: Number(d.nights.trim()) }),
    t('quote.msg.adults', { n: d.adults }),
  ];
  if (d.children > 0) lines.push(t('quote.msg.children', { n: d.children }));
  if (d.infants > 0) lines.push(t('quote.msg.infants', { n: d.infants }));
  lines.push(t('accommodation.quote.msg.zone', { zone: zoneName }));
  return lines.join('\n');
};
