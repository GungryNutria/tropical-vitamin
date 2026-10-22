import { useTranslation } from 'react-i18next';
import historyImg from '../../../assets/history.jpg';

export default function History() {
  const { t } = useTranslation();
  return (
    <section id="historia" className="seccion">
      <div className="contenedor home-historia">
        <img className="home-historia__foto" src={historyImg} alt="" loading="lazy" />
        <div className="home-historia__texto">
          <h2 className="t-h2">{t('home.history.title')}</h2>
          <p className="t-body">{t('home.history.short')}</p>
          <div className="placa placa--asfalto home-historia__mision">
            <div>
              <h3 className="t-label">{t('home.history.missionTitle')}</h3>
              <p className="t-h3">{t('home.history.missionText')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
