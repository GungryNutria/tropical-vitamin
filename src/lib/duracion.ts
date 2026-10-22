// Espacio fino no separable entre número y unidad (DESIGN §3). Igual en es y en.
const ESPACIO = '\u202F';

export function formatearDuracion(minutos: number): string {
  if (minutos < 60) return `${minutos}${ESPACIO}min`;
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (resto === 0) return `${horas}${ESPACIO}h`;
  return `${horas}${ESPACIO}h ${resto}${ESPACIO}min`;
}
