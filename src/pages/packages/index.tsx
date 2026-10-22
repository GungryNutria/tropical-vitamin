import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuArrowRight } from 'react-icons/lu';
import '../../css/paquetes.css';
import toursImg from '../../assets/services/tours.jpg';
import { PAQUETES } from '../../data/paquetes';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaPaquete from '../../components/tarjetaPaquete';
import { EstadoVacio } from '../../components/estados';
import WhatsappFloat from '../../components/whatsappFloat';
import { useTituloDocumento } from '../../hooks/useTituloDocumento';

export default function Packages() {
  const { t } = useTranslation();
  useTituloDocumento(t('paquetes.tituloDocumento'));

  // La primera destacada va a todo el ancho; las demás, en tarjeta estándar.
  const destacada = PAQUETES.find((p) => p.destacado);
  const resto = PAQUETES.filter((p) => p !== destacada);

  return (
    <>
      <HeroServicio
        tipo="paquete"
        pictograma="maleta"
        etiqueta={t('paquetes.hero.etiqueta')}
        titulo={t('paquetes.hero.titulo')}
        texto={t('paquetes.hero.texto')}
        imagen={toursImg}
        accion={<BotonWhatsApp mensaje={t('whatsapp.paqueteMedida')} texto={t('paquetes.hero.cta')} tamano="grande" />}
      />

      <section className="paquetes-listado">
        <div className="contenedor">
          {PAQUETES.length === 0 ? (
            <EstadoVacio tipo="paquete" pictograma="maleta" titulo={t('paquetes.vacio.titulo')} texto={t('paquetes.vacio.texto')}>
              <BotonWhatsApp mensaje={t('whatsapp.paqueteMedida')} texto={t('paquetes.vacio.cta')} tamano="grande" />
              <Link to="/tours" className="tv-boton tv-boton--direccion">
                {t('home.hero.verTours')}
                <LuArrowRight size={20} aria-hidden="true" />
              </Link>
            </EstadoVacio>
          ) : (
            <ul className="rejilla paquetes-rejilla">
              {destacada && <li className="paquetes-rejilla__ancha"><TarjetaPaquete paquete={destacada} destacada /></li>}
              {resto.map((p) => <li key={p.slug}><TarjetaPaquete paquete={p} /></li>)}
            </ul>
          )}
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
