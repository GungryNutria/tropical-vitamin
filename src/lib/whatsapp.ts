export const WHATSAPP_NUMERO = '529841681263';

export function urlWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
