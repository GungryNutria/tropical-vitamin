import "../../../css/history.css";
import { useFadeUp } from "../../../hooks/useFadeUp";
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

          </p>

          <div className="history-values">

            <div className="history-card fade-up fade-delay-1">
              <FaHandshake />
              <h3>Trato Humano</h3>
              <p>
                Nuestra historia comienza cuando el destino nos dio un giro inesperado.
                Aráiz de la pandemia, la vida nos llevó de la gigante Ciudad de México
                al paraíso de la Riviera Maya. Incursionando en el turismo, y el servicio
                hospitalario entendimos que el turismo moderno se había vuelto frío y
                automatizado. Por eso, decidimos ir contracorriente:
                <strong> Ofrecer un trato más humano, amable y personal en un mundo cada vez más digitalizado</strong>.
              </p>
              <br />
              <p>
                Creemos firmemente que un robot no puede escuchar tus sueños ni entender lo que hace especial a un viaje, nos
                dimos cuenta de que la industria se había vuelto fría. Pero nosotros creemos que un robot nunca podrá reemplazar el
                abrazo de un buen anfitrión.
              </p>
              <br />
              <p>
                Somos el resultado de la unión de dos culturas: la estructura NEERLANDES y la inigualable calidez MEXICANA. Esta
                fusión nos permitió construir una empresa orgullosamente 100% MEXICANA, con una misión clara: No hacer clientes,
                sino AMIGOS.
                Queremos que tu estancia sea amena, cálida y memorable., que no te sientas como un turista más, sino como un
                amigo que viene de visita.
              </p>
              <br />
              <p>
                Estamos aquí para mostrarle a México, Europa y al mundo la verdadera esencia de nuestra tierra y por qué en México
                decimos con tanto orgullo:"MICASAESTUCASA"
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
