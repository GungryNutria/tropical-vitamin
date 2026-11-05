// Cotización de un tour (spec 006). Funciones puras: nada sale a un servidor,
// el mensaje se entrega a openWhatsApp (spec 007).
export const QUOTE_MAX = 20;

export interface QuoteData {
  date: string; // YYYY-MM-DD, como lo da <input type="date">
  adults: number;
  children: number;
  ages: string[]; // una por menor; '' = sin elegir
  companions: number;
  zone: string;
  hotel: string;
}

export interface QuoteErrors {
  date?: 'empty' | 'past';
  ages: number[]; // índices de los menores sin edad
  zone?: true;
  hotel?: true;
}

const pad = (n: number) => String(n).padStart(2, '0');

// Fecha de hoy en la zona del viajero (no en UTC)
export const todayLocal = (now = new Date()): string =>
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

export const validateQuote = (data: QuoteData, today: string): QuoteErrors => {
  const errors: QuoteErrors = { ages: [] };
  if (!data.date) errors.date = 'empty';
  else if (data.date < today) errors.date = 'past'; // YYYY-MM-DD ordena como texto
  data.ages.forEach((age, i) => {
    if (age === '') errors.ages.push(i);
  });
  if (!data.zone.trim()) errors.zone = true;
  if (!data.hotel.trim()) errors.hotel = true;
  return errors;
};

export const hasErrors = (e: QuoteErrors): boolean =>
  Boolean(e.date || e.zone || e.hotel || e.ages.length);

// La fecha se interpreta como local: new Date('2026-11-14') sería UTC y en México saldría el 13
const formatLongDate = (iso: string, lang: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  const text = new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
  // es: "sábado, 14 de noviembre de 2026" -> sin coma, como en el brief
  return lang.startsWith('es') ? text.replace(',', '') : text;
};

type T = (key: string, options?: Record<string, unknown>) => string;

export const buildTourQuoteMessage = (
  t: T,
  lang: string,
  tourTitle: string,
  data: QuoteData
): string => {
  const lines = [
    t('tours.quote.msg.intro', { tour: tourTitle }),
    t('tours.quote.msg.date', { date: formatLongDate(data.date, lang) }),
    t('tours.quote.msg.adults', { n: data.adults }),
  ];
  if (data.children > 0) {
    lines.push(t('tours.quote.msg.children', { n: data.children, ages: data.ages.join(', ') }));
  }
  if (data.companions > 0) {
    lines.push(t('tours.quote.msg.companions', { n: data.companions }));
  }
  lines.push(t('tours.quote.msg.zone', { zone: data.zone.trim() }));
  lines.push(t('tours.quote.msg.hotel', { hotel: data.hotel.trim() }));
  return lines.join('\n');
};
