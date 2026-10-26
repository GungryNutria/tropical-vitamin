import { useTranslation } from "react-i18next";
import "../../../css/history.css";
import { useFadeUp } from "../../../hooks/useFadeUp";

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
              <p>{t('home.history.missionText')}</p>
            </div>

            {/* Vision Card */}
            <div className="history-card vision-card fade-up fade-delay-3">
              <h3>{t('home.history.visionTitle')}</h3>
              <p>{t('home.history.visionText')}</p>
            </div>

            {/* Values Cards */}
            <div className="history-card value-card fade-up fade-delay-4">
              <h3>{t('home.history.values.humanTreatment')}</h3>
              <p>{t('home.history.values.humanTreatmentDesc')}</p>
            </div>

            <div className="history-card value-card fade-up fade-delay-5">
              <h3>{t('home.history.values.passion')}</h3>
              <p>{t('home.history.values.passionDesc')}</p>
            </div>

            <div className="history-card value-card fade-up fade-delay-6">
              <h3>{t('home.history.values.excellence')}</h3>
              <p>{t('home.history.values.excellenceDesc')}</p>
            </div>

            <div className="history-card value-card fade-up fade-delay-7">
              <h3>{t('home.history.values.community')}</h3>
              <p>{t('home.history.values.communityDesc')}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default History;
