import "../../../css/history.css";
import { useFadeUp } from "../hooks/useFadeUp";
import historyImg from "../../../assets/history.jpg";
import { FaHandshake, FaGlobeAmericas, FaHome } from "react-icons/fa";

function History() {
  useFadeUp();

  return (
    <section id="historia" className="history">
      <div className="history-wrapper">

        {/* LEFT CONTENT */}
        <div className="history-content">
          <h2 className="fade-up">Nuestra Historia</h2>

          <p className="history-intro fade-up">
            Nuestra historia comienza cuando el destino nos dio un giro inesperado.
            Decidimos ir contracorriente y devolverle al turismo algo esencial:
            <strong> el trato humano</strong>.
          </p>

          <div className="history-values">

            <div className="history-card fade-up fade-delay-1">
              <FaHandshake />
              <h3>Trato Humano</h3>
              <p>
                Aquí no eres un número, eres un amigo. Escuchamos, entendemos y
                acompañamos cada experiencia.
              </p>
            </div>

            <div className="history-card fade-up fade-delay-2">
              <FaGlobeAmericas />
              <h3>Fusión Cultural</h3>
              <p>
                Organización europea con la calidez mexicana para crear
                experiencias auténticas y memorables.
              </p>
            </div>

            <div className="history-card fade-up fade-delay-3">
              <FaHome />
              <h3>Mi Casa es Tu Casa</h3>
              <p>
                Queremos que vivas México como en casa, con cercanía, hospitalidad
                y orgullo.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="history-image fade-up fade-delay-2">
          <img src={historyImg} alt="Tropical Vitamin Historia" />
        </div>

      </div>
    </section>
  );
}

export default History;
