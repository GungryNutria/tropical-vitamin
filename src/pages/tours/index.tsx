import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuSearch, LuX } from 'react-icons/lu';
import '../../css/tours.css';
import toursImg from '../../assets/services/tours.jpg';
import { useTours } from '../../hooks/useTours';
import { useAparicion } from '../../hooks/useAparicion';
import { nombreCategoria, pictogramaCategoria } from '../../lib/categorias';
import type { Category } from '../../services/toursService';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import LetreroTour from '../../components/letreroTour';
import Pictograma from '../../components/pictograma';
import { EstadoError, EstadoVacio } from '../../components/estados';
import WhatsappFloat from '../../components/whatsappFloat';

const PAGINA = 12;

// Comparación sin mayúsculas ni acentos ("chichen" encuentra "Chichén").
const normalizar = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

export default function Tours() {
  const { t } = useTranslation();
  const { tours, estado, reintentar } = useTours();
  const aparicion = useAparicion();
  const [params, setParams] = useSearchParams();
  const categoria = params.get('categoria') ?? '';
  const q = params.get('q') ?? '';
  const [pagina, setPagina] = useState({ clave: '', visibles: PAGINA });
  // Al cambiar los filtros se vuelve a la primera página.
  const claveFiltros = `${categoria}|${q}`;
  const visibles = pagina.clave === claveFiltros ? pagina.visibles : PAGINA;

  const categorias = useMemo(() => {
    const mapa = new Map<string, Category>();
    tours.forEach((tour) => {
      if (!mapa.has(tour.category.adminName)) mapa.set(tour.category.adminName, tour.category);
    });
    return Array.from(mapa.values());
  }, [tours]);

  const filtrados = useMemo(() => {
    const texto = normalizar(q.trim());
    return tours.filter((tour) => {
      if (categoria && tour.category.adminName !== categoria) return false;
      if (!texto) return true;
      const tr = tour.translations[0];
      return normalizar(`${tr?.title ?? ''} ${tr?.description ?? ''} ${nombreCategoria(tour.category, t)}`).includes(texto);
    });
  }, [tours, categoria, q, t]);

  const actualizar = (cambios: Record<string, string>) => {
    const siguiente = new URLSearchParams(params);
    Object.entries(cambios).forEach(([k, v]) => (v ? siguiente.set(k, v) : siguiente.delete(k)));
    setParams(siguiente, { replace: true });
  };
  const quitarFiltros = () => setParams({}, { replace: true });
  const hayFiltros = Boolean(categoria || q);
  const total = tours.length;
  const mostrados = filtrados.slice(0, visibles);
  const restantes = Math.min(PAGINA, filtrados.length - mostrados.length);

  return (
    <>
      <HeroServicio
        tipo="tour"
        pictograma="camara"
        etiqueta={t('tours.hero.etiqueta')}
        destino={t('tours.hero.destino')}
        titulo={t('tours.hero.title')}
        texto={t('tours.hero.subtitle')}
        imagen={toursImg}
        accion={<BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('tours.hero.cta')} tamano="grande" />}
      />

      <section className="tours-filtros" aria-label={t('tours.filter.label')}>
        <div className="contenedor tours-filtros__interior">
          <div className="tours-filtros__fila">
            <div className="tours-busqueda">
              <label htmlFor="buscar-tours" className="t-small tours-busqueda__etiqueta">{t('tours.search.label')}</label>
              <div className="tours-busqueda__campo">
                <LuSearch size={20} aria-hidden="true" className="tours-busqueda__icono" />
                <input
                  id="buscar-tours"
                  type="search"
                  value={q}
                  placeholder={t('tours.search.placeholder')}
                  onChange={(e) => actualizar({ q: e.target.value })}
                />
                {q && (
                  <button type="button" className="tours-busqueda__limpiar" aria-label={t('tours.search.limpiar')} onClick={() => actualizar({ q: '' })}>
                    <LuX size={20} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            {estado === 'listo' && (
              <p className="t-data tours-contador" aria-live="polite">
                {hayFiltros ? t('tours.contadorFiltrado', { n: filtrados.length, total }) : t('tours.contador', { count: total })}
                {hayFiltros && (
                  <button type="button" className="tv-boton tv-boton--texto" onClick={quitarFiltros}>{t('tours.quitarFiltros')}</button>
                )}
              </p>
            )}
          </div>
          {categorias.length > 0 && (
            <ul className="tours-chips">
              <li>
                <button type="button" className="chip" aria-pressed={!categoria} onClick={() => actualizar({ categoria: '' })}>
                  {t('tours.filter.all')}
                </button>
              </li>
              {categorias.map((cat) => (
                <li key={cat.adminName}>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={categoria === cat.adminName}
                    onClick={() => actualizar({ categoria: cat.adminName })}
                  >
                    <span className="chip__picto"><Pictograma id={pictogramaCategoria(cat.adminName)} size={20} /></span>
                    {nombreCategoria(cat, t)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="tours-catalogo">
        <div className="contenedor">
          {estado === 'error' && <EstadoError titulo={t('tours.errorCarga')} onReintentar={reintentar} />}

          {estado === 'cargando' && (
            <ul className="rejilla rejilla--4" aria-busy="true">
              {Array.from({ length: 8 }, (_, i) => <li key={i}><LetreroTour cargando /></li>)}
            </ul>
          )}

          {estado === 'listo' && filtrados.length === 0 && (
            hayFiltros ? (
              <EstadoVacio pictograma="camara" titulo={t('tours.vacio.title')} texto={t('tours.vacio.text')}>
                <button type="button" className="tv-boton tv-boton--secundario" onClick={quitarFiltros}>{t('tours.quitarFiltros')}</button>
                <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('common.preguntarWhatsapp')} />
              </EstadoVacio>
            ) : (
              <EstadoVacio pictograma="camara" titulo={t('tours.sinTours.title')} texto={t('tours.sinTours.text')}>
                <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('common.preguntarWhatsapp')} />
              </EstadoVacio>
            )
          )}

          {estado === 'listo' && filtrados.length > 0 && (
            <>
              <ul ref={aparicion} className="rejilla rejilla--4">
                {mostrados.map((tour) => <li key={tour.id}><LetreroTour tour={tour} /></li>)}
              </ul>
              <div className="tours-mas">
                <p className="t-data tours-mas__texto">{t('tours.mostrando', { n: mostrados.length, total: filtrados.length })}</p>
                {restantes > 0 && (
                  <button
                    type="button"
                    className="tv-boton tv-boton--secundario"
                    onClick={() => setPagina({ clave: claveFiltros, visibles: visibles + PAGINA })}
                  >
                    {t('tours.verMas', { count: restantes })}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
