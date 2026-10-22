import type { TFunction } from 'i18next';
import { formatearDuracion } from '../lib/duracion';

// Paquetes publicados: combinaciones de servicios reales confirmadas por la dueña (spec 002, bloque B).
// Para publicar uno, se agrega a PUBLICADOS con todos sus campos obligatorios.

export type Bilingue = { es: string; en: string };
export type Imagen = { src: string; alt: Bilingue }; // src = import de src/assets/…
export type DuracionPaquete = { minutos: number } | { dias: number };

export interface PasoItinerario {
  momento?: Bilingue; // "Día 1" / "Day 1", "08:00"…
  titulo: Bilingue;
  descripcion?: Bilingue;
}

export interface PrecioPaquete {
  monto: number; // entero, solo si la dueña lo confirmó
  moneda: 'MXN' | 'USD';
  nota?: Bilingue; // "por persona", "desde"… (texto confirmado)
}

export interface Paquete {
  // Obligatorios
  slug: string; // kebab-case, único, mismo en es y en; URL /paquetes/<slug>
  nombre: Bilingue;
  descripcion: Bilingue; // corta: tarjeta y entradilla del detalle
  foto: Imagen; // principal (tarjeta y detalle)
  duracion: DuracionPaquete;
  // Opcionales: si faltan o están vacíos, su bloque no se muestra
  destacado?: boolean; // tarjeta destacada y prioridad en Home
  incluye?: Bilingue[];
  noIncluye?: Bilingue[];
  itinerario?: PasoItinerario[];
  galeria?: Imagen[];
  precio?: PrecioPaquete;
  relacionados?: string[]; // slugs; los que no existan en PAQUETES se ignoran
}

const PUBLICADOS: Paquete[] = [];

// Paquetes de prueba solo en desarrollo y con ?demo-paquetes en la URL. En el build de producción
// import.meta.env.DEV es false: la rama se elimina y paquetes.demo.ts no entra en ningún chunk.
const demo =
  import.meta.env.DEV && new URLSearchParams(location.search).has('demo-paquetes')
    ? (await import('./paquetes.demo')).PAQUETES_DEMO
    : null;

export const PAQUETES: Paquete[] = demo ?? PUBLICADOS;

export function textoEn(b: Bilingue, idioma: string): string {
  return idioma.startsWith('en') ? b.en : b.es;
}

export function duracionPaquete(d: DuracionPaquete, t: TFunction): string {
  return 'minutos' in d ? formatearDuracion(d.minutos) : t('paquetes.dias', { count: d.dias });
}

// "$12,500 MXN"; la nota (p. ej. "por persona") se muestra aparte.
export function precioPaquete(p: PrecioPaquete, idioma: string): string {
  const monto = new Intl.NumberFormat(idioma.startsWith('en') ? 'en-US' : 'es-MX', {
    style: 'currency',
    currency: p.moneda,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(p.monto);
  return `${monto} ${p.moneda}`;
}

export function paquetePorSlug(slug: string | undefined): Paquete | undefined {
  return PAQUETES.find((p) => p.slug === slug);
}
