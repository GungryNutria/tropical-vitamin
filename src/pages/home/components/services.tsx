import "../../../css/services.css";
import { useFadeUp } from "../../../hooks/useFadeUp";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import service1 from "../../../assets/services/transportacion.jpg";
import service2 from "../../../assets/services/hospedaje.jpg";
import service3 from "../../../assets/services/tours.jpg";
import service4 from "../../../assets/services/convenciones.jpg";
import service5 from "../../../assets/services/tematicos.jpg";
import { Swiper, SwiperSlide } from "swiper/react";



const servicios = [
  {
    title: "Transportación",
    desc: "Aeropuerto, punto a punto y servicio abierto.",
    img: service1,
  },
  {
    title: "Hospedaje",
    desc: "Hoteles, casas y condos en la Riviera Maya.",
    img: service2,
  },
  {
    title: "Tours & Experiencias",
    desc: "Acuáticos, arqueológicos, parques y más.",
    img: service3,
  },
  {
    title: "MICE & Convenciones",
    desc: "Eventos, congresos y logística empresarial.",
    img: service4,
  },
  {
    title: "Viajes Temáticos",
    desc: "Experiencias hechas a tu medida.",
    img: service5,
  },
];

function Services() {
  useFadeUp();

  return (
    <section id="servicios" className="services">
      <h2 className="fade-up">Nuestros Servicios</h2>
      <p className="services-intro fade-up">
        Diseñamos experiencias, no solo viajes.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={40}
        slidesPerView={2}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        className="services-swiper fade-up"
      >
        {servicios.map((service, i) => (
          <SwiperSlide key={i} >
            <div className="service-card">
              <div className="service-image">
                <img src={service.img} alt={service.title} />
              </div>

              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Services;
