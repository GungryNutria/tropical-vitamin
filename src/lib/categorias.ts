import type { TFunction } from 'i18next';
import i18n from '../i18n';
import type { Category } from '../services/toursService';

// TODO T-2: mover a src/components/pictograma.tsx y reexportar desde allí.
export type PictogramaId =
  | 'snorkel' | 'isla' | 'tortuga' | 'laguna' | 'piramide' | 'moto-acuatica' | 'tirolesa' | 'tobogan'
  | 'luna-copa' | 'avion' | 'camioneta' | 'cama' | 'grupo' | 'copas' | 'camara';

const PICTOGRAMAS: Record<string, PictogramaId> = {
  aquatic: 'snorkel',
  islands: 'isla',
  wildlife: 'tortuga',
  nature: 'laguna',
  archaeological: 'piramide',
  adventure: 'moto-acuatica',
  'extreme-adventure': 'tirolesa',
  parks: 'tobogan',
  'night-entertainment': 'luna-copa',
};

export function nombreCategoria(cat: Category, t: TFunction): string {
  const clave = `tours.categories.${cat.adminName}`;
  if (i18n.exists(clave)) return t(clave);
  const traducida = cat.translations[0]?.name;
  if (traducida) return traducida;
  return cat.adminName.charAt(0).toUpperCase() + cat.adminName.slice(1);
}

export function pictogramaCategoria(adminName: string): PictogramaId {
  return PICTOGRAMAS[adminName] ?? 'camara';
}
