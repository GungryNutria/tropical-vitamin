import { useTranslation } from "react-i18next";
import "../../../css/cta.css";
import { useFadeUp } from "../../../hooks/useFadeUp";
import { openWhatsApp } from "../../../utils/whatsapp";

function Cta() {
  const { t } = useTranslation();
  useFadeUp();

  const handleWhatsApp = () => {
    openWhatsApp("Hola, quiero ayuda para planear mi viaje a la Riviera Maya ");
  };

  return (
    <section className="cta">
      <div className="cta-content fade-up">
        <h2>{t('home.cta.title')}</h2>
        <p>
          {t('home.cta.subtitle')}
        </p>

        <button onClick={handleWhatsApp}>
          {t('home.cta.button')}
        </button>
      </div>
    </section>
  );
}

export default Cta;
