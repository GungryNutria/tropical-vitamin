import { useTranslation } from 'react-i18next';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      location: 'Ciudad de México',
      text: t('home.testimonials.items.1.text'),
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      location: 'Guadalajara',
      text: t('home.testimonials.items.2.text'),
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Martínez',
      location: 'Monterrey',
      text: t('home.testimonials.items.3.text'),
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-title">{t('home.testimonials.title')}</h2>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <FaQuoteLeft className="testimonial-quote" />
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
