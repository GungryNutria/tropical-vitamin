import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../../css/services.css";
import { useFadeUp } from "../../../hooks/useFadeUp";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import service1 from "../../../assets/services/transportacion.jpg";
import service2 from "../../../assets/services/hospedaje.jpg";
import service3 from "../../../assets/services/tours.jpg";
import service4 from "../../../assets/services/convenciones.jpg";
import service5 from "../../../assets/services/tematicos.jpg";



function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useFadeUp();

  const servicios = [
    {
      title: t('home.services.cards.transportation'),
      desc: t('home.services.cards.transportationDesc'),
      img: service1,
      path: '/transportacion',
    },
    {
      title: t('home.services.cards.accommodation'),
      desc: t('home.services.cards.accommodationDesc'),
      img: service2,
      path: '/hospedaje',
    },
    {
      title: t('home.services.cards.tours'),
      desc: t('home.services.cards.toursDesc'),
      img: service3,
      path: '/tours',
    },
    {
      title: t('home.services.cards.mice'),
      desc: t('home.services.cards.miceDesc'),
      img: service4,
      path: '/mice',
    },
    {
      title: t('home.services.cards.thematic'),
      desc: t('home.services.cards.thematicDesc'),
      img: service5,
      path: '/tematicos',
    },
  ];

  return (
    <section id="servicios" className="services">
      <h2 className="section-title fade-up">
        <span className="title-accent"></span>
        {t('home.services.title')}
      </h2>
      <p className="services-intro fade-up">
        {t('home.services.subtitle')}
      </p>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={40}
        slidesPerView={1}
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
                <button onClick={() => navigate(service.path)}>Ver más</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Services;
