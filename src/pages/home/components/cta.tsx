import { useTranslation } from "react-i18next";
import "../../../css/cta.css";
import { useFadeUp } from "../../../hooks/useFadeUp";

function Cta() {
  const { t } = useTranslation();
  useFadeUp();

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/529841681263?text=Hola%2C%20quiero%20ayuda%20para%20planear%20mi%20viaje%20a%20la%20Riviera%20Maya%20",
      "_blank"
    );
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
