import { FALLBACK_WHATSAPP, setWhatsappNumber } from '../utils/whatsapp';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export type SocialNetworkName = 'facebook' | 'instagram' | 'linkedin';
export interface SocialNetwork { network: SocialNetworkName; url: string }
export interface SocialState { whatsappNumber: string; networks: SocialNetwork[] }

const NETWORKS: SocialNetworkName[] = ['facebook', 'instagram', 'linkedin'];

let state: SocialState = { whatsappNumber: FALLBACK_WHATSAPP, networks: [] };
const listeners = new Set<() => void>();

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

export const getSnapshot = () => state;

let started = false;

// Una lectura por carga de página; si falla se queda el respaldo.
export const loadSocial = async () => {
  if (started) return;
  started = true;
  try {
    const res = await fetch(`${API_URL}/social`);
    if (!res.ok) return;
    const data = await res.json();
    if (typeof data?.whatsappNumber !== 'string' || !/^\d{11,15}$/.test(data.whatsappNumber)) return;
    const networks: SocialNetwork[] = Array.isArray(data.networks)
      ? data.networks.filter(
          (n: SocialNetwork) =>
            NETWORKS.includes(n?.network) && typeof n.url === 'string' && /^https?:\/\//.test(n.url),
        )
      : [];
    setWhatsappNumber(data.whatsappNumber);
    state = { whatsappNumber: data.whatsappNumber, networks };
    listeners.forEach((l) => l());
  } catch {
    // sin red o API caída: respaldo
  }
};
