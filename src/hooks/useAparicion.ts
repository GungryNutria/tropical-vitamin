import { useCallback } from 'react';

// Entrada escalonada de letreros (DESIGN §8): 8 px + opacidad, 240 ms, 50 ms entre cada uno, máx. 6 por grupo.
// Mejora progresiva: sin JS o con movimiento reducido no se oculta nada.
export function useAparicion() {
  return useCallback((lista: HTMLElement | null) => {
    if (!lista || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entradas) => {
      let i = 0;
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.style.setProperty('--retraso', `${Math.min(i++, 5) * 50}ms`);
        el.classList.add('aparece--visible');
        io.unobserve(el);
      }
    });
    const observados = new WeakSet<Element>();
    const preparar = () => {
      for (const el of Array.from(lista.children)) {
        // Se vuelve a observar si el ref se reconecta (StrictMode) y el letrero aún no apareció.
        if (observados.has(el) || el.classList.contains('aparece--visible')) continue;
        observados.add(el);
        el.classList.add('aparece');
        io.observe(el);
      }
    };
    preparar();
    const mo = new MutationObserver(preparar);
    mo.observe(lista, { childList: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
