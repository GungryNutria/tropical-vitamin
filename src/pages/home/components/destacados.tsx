import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';
import { useTours } from '../../../hooks/useTours';
import { useAparicion } from '../../../hooks/useAparicion';
import LetreroTour from '../../../components/letreroTour';

const CANTIDAD = 4;

// Primeros activos con foto; si hay menos de 3 con foto, los primeros activos. Se oculta si la API falla.
export default function Destacados() {
  const { t } = useTranslation();
  const { tours, estado } = useTours();
  const aparicion = useAparicion();
  if (estado === 'error') return null;

  const activos = tours.filter((tour) => tour.isActive);
  const conFoto = activos.filter((tour) => tour.img);
  const elegidos = (conFoto.length >= 3 ? conFoto : activos).slice(0, CANTIDAD);
  if (estado === 'listo' && elegidos.length === 0) return null;

  return (
    <section className="seccion home-destacados">
      <div className="contenedor">
        <div className="home-destacados__cabecera">
          <div>
            <h2 className="t-h2 seccion__titulo">{t('home.destacados.title')}</h2>
            <p className="t-body-lg seccion__entradilla">{t('home.destacados.subtitle')}</p>
          </div>
          <Link to="/tours" className="tv-boton tv-boton--direccion">
            {estado === 'listo' ? t('home.destacados.verTodos', { count: tours.length }) : t('home.destacados.verTours')}
            <LuArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <ul ref={estado === 'listo' ? aparicion : undefined} className="rejilla rejilla--4" aria-busy={estado === 'cargando'}>
          {estado === 'cargando'
            ? Array.from({ length: CANTIDAD }, (_, i) => <li key={i}><LetreroTour cargando /></li>)
            : elegidos.map((tour) => <li key={tour.id}><LetreroTour tour={tour} /></li>)}
        </ul>
      </div>
    </section>
  );
}
