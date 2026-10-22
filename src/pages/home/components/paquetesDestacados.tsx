import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';
import { PAQUETES } from '../../../data/paquetes';
import TarjetaPaquete from '../../../components/tarjetaPaquete';

// Bloque de Home (DESIGN §12): solo si hay paquetes. La primera destacada (o el primero) y hasta 2 más.
export default function PaquetesDestacados() {
  const { t } = useTranslation();
  if (PAQUETES.length === 0) return null;

  const principal = PAQUETES.find((p) => p.destacado) ?? PAQUETES[0];
  const otros = PAQUETES.filter((p) => p !== principal).slice(0, 2);

  return (
    <section className="seccion home-paquetes">
      <div className="contenedor">
        <div className="home-destacados__cabecera">
          <div>
            <h2 className="t-h2 seccion__titulo">{t('home.paquetes.titulo')}</h2>
            <p className="t-body-lg seccion__entradilla">{t('home.paquetes.texto')}</p>
          </div>
          <Link to="/paquetes" className="tv-boton tv-boton--direccion">
            {t('home.paquetes.verTodos')}
            <LuArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <ul className="rejilla paquetes-rejilla paquetes-rejilla--2">
          <li className="paquetes-rejilla__ancha"><TarjetaPaquete paquete={principal} destacada={Boolean(principal.destacado)} /></li>
          {otros.map((p) => <li key={p.slug}><TarjetaPaquete paquete={p} /></li>)}
        </ul>
      </div>
    </section>
  );
}
