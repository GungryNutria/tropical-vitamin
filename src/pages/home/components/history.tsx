import { useTranslation } from 'react-i18next';
import historyImg from '../../../assets/history.jpg';

const VALORES = ['humanTreatment', 'passion', 'excellence', 'community'] as const;

export default function History() {
  const { t } = useTranslation();
  const parrafos = t('home.history.description').split('\n\n');
  return (
    <section id="historia" className="seccion">
      <div className="contenedor home-historia">
        <img className="home-historia__foto" src={historyImg} alt="" loading="lazy" />
        <div className="home-historia__texto">
          <h2 className="t-h2">{t('home.history.title')}</h2>
          {parrafos.map((p) => (
            <p key={p} className="t-body">{p}</p>
          ))}
        </div>
      </div>

      <div className="contenedor home-historia__pilares">
        <div className="rotulo rotulo--tinta home-historia__placa">
          <div>
            <h3 className="t-label">{t('home.history.missionTitle')}</h3>
            <p className="t-h3">{t('home.history.missionText')}</p>
          </div>
        </div>
        <div className="rotulo rotulo--servicio home-historia__placa">
          <div>
            <h3 className="t-label">{t('home.history.visionTitle')}</h3>
            <p className="t-h3">{t('home.history.visionText')}</p>
          </div>
        </div>
      </div>

      <div className="contenedor">
        <ul className="home-historia__valores">
          {VALORES.map((v) => (
            <li key={v} className="home-historia__valor">
              <h3 className="t-h3">{t(`home.history.values.${v}`)}</h3>
              <p className="t-body">{t(`home.history.values.${v}Desc`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
