import "../../../css/cta.css";
import { useFadeUp } from "../hooks/useFadeUp";

function Cta() {
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
        <h2>Planea tu experiencia en la Riviera Maya</h2>
        <p>
          Viaja como invitado, no como turista.  
          Nosotros nos encargamos de todo.
        </p>

        <button onClick={handleWhatsApp}>
          Hablar por WhatsApp
        </button>
      </div>
    </section>
  );
}

export default Cta;
