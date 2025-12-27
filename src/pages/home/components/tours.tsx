import "../../../css/tours.css";
import { useFadeUp } from "../hooks/useFadeUp";

import tour1 from "../../../assets/tours/snorkel.jpg";
import tour2 from "../../../assets/tours/chichen.jpg";
import tour3 from "../../../assets/tours/catamaran.jpg";
import tour4 from "../../../assets/tours/cenote.jpg";
import tour5 from "../../../assets/tours/isla.jpg";
import tour6 from "../../../assets/tours/xcaret.jpg";

const tours = [
  {
    title: "Snorkel & Buceo",
    category: "Acuático",
    img: tour1,
  },
  {
    title: "Chichén Itzá",
    category: "Arqueológico",
    img: tour2,
  },
  {
    title: "Catamarán al Atardecer",
    category: "Acuático",
    img: tour3,
  },
  {
    title: "Cenotes",
    category: "Naturaleza",
    img: tour4,
  },
  {
    title: "Isla Mujeres",
    category: "Islas",
    img: tour5,
  },
  {
    title: "Xcaret",
    category: "Parques",
    img: tour6,
  },
];

function Tours() {
  useFadeUp();

  return (
    <section id="tours" className="tours">
      <h2 className="fade-up">Tours Destacados</h2>
      <p className="tours-intro fade-up">
        Experiencias seleccionadas para que vivas lo mejor de la Riviera Maya.
      </p>

      <div className="tours-grid">
        {tours.map((tour, i) => (
          <div
            className={`tour-card fade-up fade-delay-${(i % 3) + 1}`}
            key={i}
          >
            <div className="tour-image">
              <img src={tour.img} alt={tour.title} />
              <span className="tour-category">{tour.category}</span>
            </div>

            <div className="tour-info">
              <h3>{tour.title}</h3>
              <button
              onClick={() => 
                window.open(
      "https://wa.me/525580343878?text=Hola%2C%20quiero%20información%20sobre%20el%20tour%20" +
        tour.title,
      "_blank"
    )
              }
              >Solicitar info</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tours;
