import { useTranslation } from "react-i18next";
import "../../../css/history.css";
import { useFadeUp } from "../../../hooks/useFadeUp";
import historyImg from "../../../assets/history.jpg";
import { FaHandshake, FaHeart } from "react-icons/fa";

function History() {
  const { t } = useTranslation();
  useFadeUp();

  return (
    <section id="historia" className="history">
      <div className="history-wrapper">

        {/* LEFT CONTENT */}
        <div className="history-content">
          <h2 className="fade-up">{t('home.history.title')}</h2>

          <div className="history-cards">
            {/* Icon Cards Row */}
            <div className="history-card icon-card fade-up fade-delay-1">
              <FaHandshake />
              <h3>{t('home.history.values.humanTreatment')}</h3>
              <p>{t('home.history.values.humanTreatmentDesc')}</p>
            </div>

            <div className="history-card icon-card fade-up fade-delay-2">
              <FaHeart />
              <h3>{t('home.history.values.passion')}</h3>
              <p>{t('home.history.values.passionDesc')}</p>
            </div>

            {/* Main Text Card */}
            <div className="history-card text-card fade-up fade-delay-3">
              <p>{t('home.history.description')}</p>
            </div>

            {/* Mission Highlight */}
            <div className="history-card mission fade-up fade-delay-4">
              <h3>{t('home.history.missionTitle')}</h3>
              <p>{t('home.history.missionText')}</p>
            </div>
          </div>
        </div>

        {/* RIGHT - Collage */}
        <div className="history-collage fade-up fade-delay-2">
          <img src={historyImg} alt="Tropical Vitamin" />
          <img src={historyImg} alt="Tropical Vitamin" />
          <img src={historyImg} alt="Tropical Vitamin" />
          <img src={historyImg} alt="Tropical Vitamin" />
          <img src={historyImg} alt="Tropical Vitamin" />
        </div>

      </div>
    </section>
  );
}

export default History;
