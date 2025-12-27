import "../../../css/services.css";
import { useFadeUp } from "../hooks/useFadeUp";
import {
  FaShuttleVan,
  FaHotel,
  FaUmbrellaBeach,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";

const services = [
  { title: "Transportación", icon: <FaShuttleVan />, desc: "Aeropuerto, punto a punto y servicio abierto." },
  { title: "Hospedaje", icon: <FaHotel />, desc: "Hoteles, casas y condos en la Riviera Maya." },
  { title: "Tours & Experiencias", icon: <FaUmbrellaBeach />, desc: "Acuáticos, arqueológicos, parques y más." },
  { title: "MICE & Convenciones", icon: <FaBriefcase />, desc: "Eventos, congresos y logística empresarial." },
  { title: "Viajes Temáticos", icon: <FaStar />, desc: "Experiencias hechas a tu medida." },
];

function Services() {
  useFadeUp();

  return (
    <section id="servicios" className="services">
      <h2 className="fade-up">Nuestros Servicios</h2>
      <p className="fade-up">Diseñamos experiencias, no solo viajes.</p>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            className={`service-card fade-up fade-delay-${i + 1}`}
            key={i}
          >
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
