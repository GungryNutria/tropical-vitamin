import { useEffect, useRef } from 'react';

// Apertura y cierre de un <dialog> modal (lo comparten Tours y Hospedaje)
export function useModalDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => ref.current?.close();

  const onBackdropClick = (e: React.MouseEvent) => {
    // El clic en el fondo cierra solo en pantallas anchas
    if (e.target === ref.current && window.matchMedia('(min-width: 768px)').matches) {
      ref.current?.close();
    }
  };

  return { ref, close, onBackdropClick };
}
