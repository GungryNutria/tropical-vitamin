import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BotonWhatsApp from './botonWhatsApp';
import LanguageSwitcher from './languageSwitcher';

export default function Footer() {
  const { t } = useTranslation();
  const servicios = [
    { to: '/tours', texto: t('footer.toursServicio') },
    { to: '/transportacion', texto: t('nav.transportacion') },
    { to: '/hospedaje', texto: t('nav.hospedaje') },
    { to: '/mice', texto: t('nav.mice') },
    { to: '/tematicos', texto: t('nav.tematicos') },
  ];

  return (
    <footer className="pie superficie-oscura">
      <div className="linea-vial" />
      <div className="contenedor pie__rejilla">
        <div className="pie__marca">
          <p className="pie__nombre">Tropical Vitamin</p>
          <p className="t-small pie__texto">{t('footer.description')}</p>
        </div>
        <nav className="pie__columna" aria-labelledby="pie-servicios">
          <h2 id="pie-servicios" className="t-label pie__titulo">{t('footer.servicios')}</h2>
          <ul>
            {servicios.map((s) => (
              <li key={s.to}><Link to={s.to}>{s.texto}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="pie__columna">
          <h2 className="t-label pie__titulo">{t('footer.contacto')}</h2>
          <ul>
            <li><Link to="/contacto">{t('footer.formulario')}</Link></li>
            <li><a href="tel:+529841681263">+52 984 168 1263</a></li>
          </ul>
          <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('footer.whatsapp')} />
        </div>
        <div className="pie__columna">
          <h2 className="t-label pie__titulo">{t('footer.idioma')}</h2>
          <LanguageSwitcher completo />
        </div>
      </div>
      <p className="contenedor t-small pie__copy">{t('footer.copyright')}</p>
    </footer>
  );
}
