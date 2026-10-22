import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuArrowRight, LuCalendar, LuCheck } from 'react-icons/lu';
import '../css/paquetes.css';
import { duracionPaquete, precioPaquete, textoEn, type Paquete } from '../data/paquetes';
import BotonWhatsApp from './botonWhatsApp';
import Pictograma from './pictograma';

// TarjetaPaquete (DESIGN §12): rótulo amarillo con la maleta (todo el rótulo es el enlace al detalle), foto,
// franja de datos y "Incluye".
// La destacada ocupa todo el ancho a ≥900 (foto a la izquierda) y muestra hasta 6 renglones de "Incluye".
export default function TarjetaPaquete({ paquete, destacada = false }: { paquete: Paquete; destacada?: boolean }) {
  const { t, i18n } = useTranslation();
  const idioma = i18n.language;
  const nombre = textoEn(paquete.nombre, idioma);
  const duracion = duracionPaquete(paquete.duracion, t);
  const ruta = `/paquetes/${paquete.slug}`;
  const incluye = paquete.incluye ?? [];
  const visibles = incluye.slice(0, destacada ? 6 : 4);
  const restantes = incluye.length - visibles.length;

  return (
    <article className={`paquete-tarjeta${destacada ? ' paquete-tarjeta--destacada' : ''}`}>
      <h3 className="paquete-tarjeta__titulo t-rotulo">
        <Link to={ruta} className="paquete-tarjeta__rotulo rotulo rotulo--paquete">
          <Pictograma id="maleta" size={32} />
          <span>{nombre}</span>
        </Link>
      </h3>
      <img className="paquete-tarjeta__foto" src={paquete.foto.src} alt={textoEn(paquete.foto.alt, idioma)} loading="lazy" />
      <div className="paquete-tarjeta__franja t-data">
        <span className="paquete-tarjeta__dato">
          <LuCalendar size={16} aria-hidden="true" />
          <span className="sr-only">{t('common.duracion')}: </span>
          {duracion}
        </span>
        {paquete.precio && (
          <span className="paquete-tarjeta__dato">
            <span className="sr-only">{t('paquetes.detalle.precio')}: </span>
            <span className="paquete-tarjeta__monto">{precioPaquete(paquete.precio, idioma)}</span>
            {paquete.precio.nota && <span className="paquete-tarjeta__nota">{textoEn(paquete.precio.nota, idioma)}</span>}
          </span>
        )}
      </div>
      <div className="paquete-tarjeta__cuerpo">
        <p className={destacada ? 't-body-lg' : 't-body'}>{textoEn(paquete.descripcion, idioma)}</p>
        {visibles.length > 0 && (
          <div className="paquete-tarjeta__incluye">
            <p className="t-label paquete-tarjeta__incluye-titulo">{t('paquetes.tarjeta.incluye')}</p>
            <ul>
              {visibles.map((item) => (
                <li key={item.es} className="t-small paquete-incluye">
                  <span className="paquete-incluye__icono" aria-hidden="true"><LuCheck size={16} /></span>
                  {textoEn(item, idioma)}
                </li>
              ))}
            </ul>
            {restantes > 0 && <p className="t-small paquete-tarjeta__mas">{t('paquetes.tarjeta.mas', { count: restantes })}</p>}
          </div>
        )}
        <div className="paquete-tarjeta__acciones">
          {destacada ? (
            <>
              <BotonWhatsApp mensaje={t('whatsapp.paquete', { nombre, duracion })} texto={t('common.preguntarWhatsapp')} tamano="grande" />
              <Link to={ruta} className="tv-boton tv-boton--direccion">
                {t('paquetes.tarjeta.verDetalle')}<span className="sr-only">: {nombre}</span>
                <LuArrowRight size={20} aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <Link to={ruta} className="tv-boton tv-boton--texto">{t('paquetes.tarjeta.verDetalle')}<span className="sr-only">: {nombre}</span></Link>
              <BotonWhatsApp mensaje={t('whatsapp.paquete', { nombre, duracion })} texto={t('common.preguntarWhatsapp')} />
            </>
          )}
        </div>
      </div>
    </article>
  );
}
