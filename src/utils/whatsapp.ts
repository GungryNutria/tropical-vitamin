// Único lugar del código con el número de WhatsApp. El respaldo se usa hasta que
// socialService lee GET /social, o si esa lectura falla (spec 007).
export const FALLBACK_WHATSAPP = '529841681263';

let currentNumber = FALLBACK_WHATSAPP;

export const setWhatsappNumber = (number: string) => {
  currentNumber = number;
};

export const whatsappUrl = (message?: string) =>
  message === undefined
    ? `https://wa.me/${currentNumber}`
    : `https://wa.me/${currentNumber}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string) => {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
};
