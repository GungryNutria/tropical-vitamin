// Paquetes de prueba (spec 002, AC-28). Solo se cargan en desarrollo con ?demo-paquetes.
// Ningún dato es real: no se publican ni se copian a paquetes.ts.
import type { Paquete } from './paquetes';
import cenote from '../assets/tours/cenote.jpg';
import chichen from '../assets/tours/chichen.jpg';
import isla from '../assets/tours/isla.jpg';
import catamaran from '../assets/tours/catamaran.jpg';
import hospedaje from '../assets/services/hospedaje.jpg';

export const PAQUETES_DEMO: Paquete[] = [
  {
    slug: 'demo-completo',
    nombre: { es: '[DEMO] Cenotes, ruinas y playa', en: '[DEMO] Cenotes, ruins and beach' },
    descripcion: {
      es: 'Paquete de ejemplo con todos los campos: traslados, hospedaje y dos tours en tres días. No es un paquete real.',
      en: 'Sample package with every field: transfers, accommodation and two tours over three days. Not a real package.',
    },
    foto: { src: cenote, alt: { es: 'Cenote de agua turquesa', en: 'Turquoise cenote' } },
    duracion: { dias: 3 },
    destacado: true,
    incluye: [
      { es: 'Traslado aeropuerto – hotel – aeropuerto', en: 'Airport – hotel – airport transfer' },
      { es: 'Dos noches de hospedaje', en: 'Two nights of accommodation' },
      { es: 'Tour a Chichén Itzá', en: 'Chichén Itzá tour' },
      { es: 'Tour de cenotes', en: 'Cenote tour' },
      { es: 'Guía bilingüe', en: 'Bilingual guide' },
    ],
    noIncluye: [
      { es: 'Vuelos', en: 'Flights' },
      { es: 'Comidas no indicadas', en: 'Meals not listed' },
    ],
    itinerario: [
      { momento: { es: 'Día 1', en: 'Day 1' }, titulo: { es: 'Llegada y traslado', en: 'Arrival and transfer' }, descripcion: { es: 'Te recogemos en el aeropuerto y te llevamos al hotel.', en: 'We pick you up at the airport and take you to the hotel.' } },
      { momento: { es: 'Día 2', en: 'Day 2' }, titulo: { es: 'Chichén Itzá y cenote', en: 'Chichén Itzá and cenote' } },
      { momento: { es: 'Día 3', en: 'Day 3' }, titulo: { es: 'Mañana libre y regreso', en: 'Free morning and return' }, descripcion: { es: 'Traslado al aeropuerto a la hora de tu vuelo.', en: 'Transfer to the airport in time for your flight.' } },
    ],
    galeria: [
      { src: chichen, alt: { es: 'Pirámide de Chichén Itzá', en: 'Chichén Itzá pyramid' } },
      { src: isla, alt: { es: 'Playa de isla con agua clara', en: 'Island beach with clear water' } },
      { src: hospedaje, alt: { es: 'Habitación de hotel', en: 'Hotel room' } },
    ],
    precio: { monto: 12500, moneda: 'MXN', nota: { es: 'por persona', en: 'per person' } },
    relacionados: ['demo-relacionado', 'demo-no-existe'],
  },
  {
    slug: 'demo-minimo',
    nombre: { es: '[DEMO] Paseo en catamarán', en: '[DEMO] Catamaran trip' },
    descripcion: {
      es: 'Paquete de ejemplo con solo los campos obligatorios. No es un paquete real.',
      en: 'Sample package with only the required fields. Not a real package.',
    },
    foto: { src: catamaran, alt: { es: 'Catamarán en el mar Caribe', en: 'Catamaran on the Caribbean Sea' } },
    duracion: { minutos: 150 },
  },
  {
    slug: 'demo-relacionado',
    nombre: { es: '[DEMO] Isla y snorkel', en: '[DEMO] Island and snorkel' },
    descripcion: {
      es: 'Paquete de ejemplo que relaciona al completo. No es un paquete real.',
      en: 'Sample package related to the full one. Not a real package.',
    },
    foto: { src: isla, alt: { es: 'Playa de isla con agua clara', en: 'Island beach with clear water' } },
    duracion: { dias: 1 },
    incluye: [
      { es: 'Ferry ida y vuelta', en: 'Round-trip ferry' },
      { es: 'Equipo de snorkel', en: 'Snorkel gear' },
    ],
    relacionados: ['demo-completo'],
  },
];
