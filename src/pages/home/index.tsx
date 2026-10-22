import { useTranslation } from 'react-i18next';
import '../../css/home.css';
import Hero from './components/hero';
import Services from './components/services';
import PaquetesDestacados from './components/paquetesDestacados';
import Destacados from './components/destacados';
import History from './components/history';
import FAQ from './components/faq';
import BotonWhatsApp from '../../components/botonWhatsApp';
import WhatsappFloat from '../../components/whatsappFloat';

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <Services />
      <PaquetesDestacados />
      <Destacados />
      <History />
      <FAQ />
      <section className="home-cierre">
        <div className="contenedor home-cierre__rejilla">
          <div>
            <h2 className="t-h2">{t('home.cta.title')}</h2>
            <p className="t-body-lg home-cierre__texto">{t('home.cta.subtitle')}</p>
          </div>
          <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('home.cta.button')} tamano="grande" />
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
