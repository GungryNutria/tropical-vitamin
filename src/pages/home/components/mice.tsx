import "../../../css/mice.css";
import { useFadeUp } from "../hooks/useFadeUp";
import miceImg from "../../../assets/mice.jpg";
import { FaBriefcase, FaUsers, FaRegCalendarCheck } from "react-icons/fa";

function Mice() {
  useFadeUp();

  return (
    <section id="mice" className="mice">
      <div className="mice-wrapper">

        {/* LEFT */}
        <div className="mice-content">
          <h2 className="fade-up">MICE & Convenciones</h2>

          <p className="fade-up">
            Diseñamos y coordinamos eventos corporativos en la Riviera Maya con
            precisión, creatividad y atención al detalle.
          </p>

          <ul className="mice-list">
            <li className="fade-up fade-delay-1">
              <FaBriefcase />
              <span>Congresos y convenciones</span>
            </li>

            <li className="fade-up fade-delay-2">
              <FaUsers />
              <span>Viajes de incentivo y grupos</span>
            </li>

            <li className="fade-up fade-delay-3">
              <FaRegCalendarCheck />
              <span>Planeación, logística y operación integral</span>
            </li>
          </ul>

          <button
            className="mice-btn fade-up"
            onClick={() =>
              window.open(
                "https://wa.me/525580343878?text=Hola%2C%20quiero%20información%20sobre%20servicios%20MICE%20y%20convenciones",
                "_blank"
              )
            }
          >
            Solicitar propuesta
          </button>
        </div>

        {/* RIGHT */}
        <div className="mice-image fade-up fade-delay-2">
          <img src={miceImg} alt="Eventos corporativos MICE" />
        </div>

      </div>
    </section>
  );
}

export default Mice;
