import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toursService, type Tour } from '../services/toursService';

type Estado = 'cargando' | 'listo' | 'error';
type Resultado = { clave: string; tours: Tour[]; estado: Exclude<Estado, 'cargando'> };

export function useTours(): { tours: Tour[]; estado: Estado; reintentar(): void } {
  const { i18n } = useTranslation();
  const [intento, setIntento] = useState(0);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  // Cada idioma o reintento es una carga nueva: mientras no llegue su resultado, el estado es 'cargando'.
  const clave = `${i18n.language}:${intento}`;

  useEffect(() => {
    let vigente = true;
    toursService
      .getTours()
      .then((tours) => {
        if (vigente) setResultado({ clave, tours, estado: 'listo' });
      })
      .catch(() => {
        if (vigente) setResultado({ clave, tours: [], estado: 'error' });
      });
    return () => {
      vigente = false;
    };
  }, [clave]);

  const reintentar = useCallback(() => setIntento((n) => n + 1), []);

  if (resultado?.clave !== clave) return { tours: [], estado: 'cargando', reintentar };
  return { tours: resultado.tours, estado: resultado.estado, reintentar };
}
