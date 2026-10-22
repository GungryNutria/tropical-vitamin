import { useEffect } from 'react';

// Título del documento mientras la página está montada; se restaura al salir.
export function useTituloDocumento(titulo: string) {
  useEffect(() => {
    const anterior = document.title;
    document.title = titulo;
    return () => { document.title = anterior; };
  }, [titulo]);
}
