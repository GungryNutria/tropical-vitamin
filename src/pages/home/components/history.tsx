import { useTranslation } from "react-i18next";
import "../../../css/history.css";
import { useFadeUp } from "../../../hooks/useFadeUp";

const pillars = [
  { key: 'culture', paragraphs: ['p1', 'p2'] },
  { key: 'trust', paragraphs: ['p1', 'p2'] },
  { key: 'hospitality', paragraphs: ['p1', 'p2', 'p3'] },
];

function History() {
  const { t } = useTranslation();
  useFadeUp();

  return (
    <section id="historia" className="history">
      <div className="history-wrapper">

        {/* LEFT CONTENT */}
        <div className="history-content">
          <h2 className="section-title fade-up">
            <span className="title-accent"></span>
            {t('home.history.title')}
          </h2>

          <div className="history-cards">
            {/* Description Card */}
            <div className="history-card text-card fade-up fade-delay-1">
              <p>{t('home.history.description')}</p>
            </div>

            {/* Mission Card */}
            <div className="history-card mission-card fade-up fade-delay-2">
              <h3>{t('home.history.missionTitle')}</h3>
              <p>{t('home.history.missionP1')}</p>
              <p>{t('home.history.missionP2')}</p>
            </div>

            {/* Vision Card */}
            <div className="history-card vision-card fade-up fade-delay-3">
              <h3>{t('home.history.visionTitle')}</h3>
              <p>{t('home.history.visionP1')}</p>
              <p>{t('home.history.visionP2')}</p>
            </div>
          </div>

          <h2 className="section-title history-pillars-title fade-up">
            <span className="title-accent"></span>
            {t('home.history.pillarsTitle')}
          </h2>

          <div className="history-pillars">
            {pillars.map(({ key, paragraphs }, i) => (
              <div className={`history-card pillar-card fade-up fade-delay-${i + 1}`} key={key}>
                <h3>{t(`home.history.pillars.${key}.title`)}</h3>
                {paragraphs.map((p) => (
                  <p key={p}>{t(`home.history.pillars.${key}.${p}`)}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default History;
