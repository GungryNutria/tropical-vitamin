import { useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../services/socialService';

export const useSocial = () => useSyncExternalStore(subscribe, getSnapshot);
