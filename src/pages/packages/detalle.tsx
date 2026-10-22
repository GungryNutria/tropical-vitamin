import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuArrowRight, LuCheck, LuX } from 'react-icons/lu';
import '../../css/paquetes.css';
import { PAQUETES, duracionPaquete, paquetePorSlug, precioPaquete, textoEn } from '../../data/paquetes';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaPaquete from '../../components/tarjetaPaquete';
import { EstadoVacio } from '../../components/estados';
import WhatsappFloat from '../../components/whatsappFloat';
import { useTituloDocumento } from '../../hooks/useTituloDocumento';

// Plantilla de detalle /paquetes/:slug (DESIGN §12). Cada bloque opcional solo aparece si tiene datos.
export default function PackageDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const idioma = i18n.language;
  const paquete = paquetePorSlug(slug);
  useTituloDocumento(paquete ? `${textoEn(paquete.nombre, idioma)} · Tropical Vitamin` : t('paquetes.noEncontrado.tituloDocumento'));

  if (!paquete) {
    return (
      <>
        <section className="seccion">
          <div className="contenedor">
            <EstadoVacio tipo="paquete" pictograma="maleta" encabezado="h1" titulo={t('paquetes.noEncontrado.titulo')} texto={t('paquetes.noEncontrado.texto')}>
              <Link to="/paquetes" className="tv-boton tv-boton--direccion">
                {t('paquetes.detalle.volver')}
                <LuArrowRight size={20} aria-hidden="true" />
              </Link>
              <BotonWhatsApp mensaje={t('whatsapp.paqueteMedida')} texto={t('paquetes.vacio.cta')} />
            </EstadoVacio>
          </div>
        </section>
        <WhatsappFloat />
      </>
    );
  }

  const nombre = textoEn(paquete.nombre, idioma);
  const duracion = duracionPaquete(paquete.duracion, t);
  const mensaje = t('whatsapp.paquete', { nombre, duracion });
  const incluye = paquete.incluye ?? [];
  const noIncluye = paquete.noIncluye ?? [];
  const itinerario = paquete.itinerario ?? [];
  const galeria = (paquete.galeria ?? []).slice(0, 6);
  const relacionados = (paquete.relacionados ?? [])
    .map((s) => PAQUETES.find((p) => p.slug === s && p.slug !== paquete.slug))
    .filter((p) => p !== undefined)
    .slice(0, 3);

  return (
    <div className="paquete-detalle">
      <HeroServicio
        tipo="paquete"
        pictograma="maleta"
        etiqueta={t('paquetes.detalle.etiqueta')}
        titulo={nombre}
        texto={textoEn(paquete.descripcion, idioma)}
        imagen={paquete.foto.src}
        alt={textoEn(paquete.foto.alt, idioma)}
        accion={<BotonWhatsApp mensaje={mensaje} texto={t('common.preguntarWhatsapp')} tamano="grande" />}
      />

      <div className="contenedor">
        <dl className="paquete-ficha">
          <div className="paquete-ficha__dato">
            <dt className="t-label">{t('common.duracion')}</dt>
            <dd className="t-data">{duracion}</dd>
          </div>
          {paquete.precio && (
            <div className="paquete-ficha__dato">
              <dt className="t-label">{t('paquetes.detalle.precio')}</dt>
              <dd className="t-h3">
                {precioPaquete(paquete.precio, idioma)}
                {paquete.precio.nota && <span className="t-small paquete-ficha__nota"> {textoEn(paquete.precio.nota, idioma)}</span>}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {(incluye.length > 0 || noIncluye.length > 0) && (
        <section className="seccion paquete-bloque">
          <div className="contenedor paquete-incluye-rejilla">
            {incluye.length > 0 && (
              <div>
                <h2 className="t-h2">{t('paquetes.detalle.incluye')}</h2>
                <ul className="paquete-lista">
                  {incluye.map((item) => (
                    <li key={item.es} className="t-body paquete-incluye paquete-incluye--grande">
                      <span className="paquete-incluye__icono" aria-hidden="true"><LuCheck size={20} /></span>
                      {textoEn(item, idioma)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {noIncluye.length > 0 && (
              <div>
                <h2 className="t-h2">{t('paquetes.detalle.noIncluye')}</h2>
                <ul className="paquete-lista">
                  {noIncluye.map((item) => (
                    <li key={item.es} className="t-body paquete-no-incluye">
                      <LuX size={20} aria-hidden="true" className="paquete-no-incluye__icono" />
                      {textoEn(item, idioma)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {itinerario.length > 0 && (
        <section className="seccion paquete-bloque">
          <div className="contenedor">
            <h2 className="t-h2">{t('paquetes.detalle.itinerario')}</h2>
            <ol className="paquete-itinerario">
              {itinerario.map((paso) => (
                <li key={paso.titulo.es} className="paquete-itinerario__paso">
                  {paso.momento && <p className="paquete-itinerario__momento">{textoEn(paso.momento, idioma)}</p>}
                  <h3 className="t-h3">{textoEn(paso.titulo, idioma)}</h3>
                  {paso.descripcion && <p className="t-body">{textoEn(paso.descripcion, idioma)}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {galeria.length > 0 && (
        <section className="seccion paquete-bloque">
          <div className="contenedor">
            <h2 className="t-h2">{t('paquetes.detalle.galeria')}</h2>
            <ul className="paquete-galeria">
              {galeria.map((img) => (
                <li key={img.src}><img src={img.src} alt={textoEn(img.alt, idioma)} loading="lazy" /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="paquete-cierre">
        <div className="contenedor paquete-cierre__rejilla">
          <h2 className="t-h2">{t('paquetes.detalle.cierre')}</h2>
          <BotonWhatsApp mensaje={mensaje} texto={t('common.preguntarWhatsapp')} tamano="grande" />
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="seccion">
          <div className="contenedor">
            <h2 className="t-h2 seccion__titulo">{t('paquetes.detalle.relacionados')}</h2>
            <ul className="rejilla paquetes-rejilla">
              {relacionados.map((p) => <li key={p.slug}><TarjetaPaquete paquete={p} /></li>)}
            </ul>
          </div>
        </section>
      )}
      <WhatsappFloat barra={{ mensaje, texto: t('paquetes.detalle.preguntar') }} />
    </div>
  );
}
