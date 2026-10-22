import { useTranslation } from 'react-i18next';
import BotonWhatsApp from '../../../components/botonWhatsApp';

// q4 (cancelación, "48 horas") oculta hasta que la dueña confirme la política (dato 15).
const PREGUNTAS = ['q1', 'q2', 'q3', 'q5'];

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <section className="seccion home-faq">
      <div className="contenedor home-faq-fila__rejilla">
        <div className="home-faq-fila__intro">
          <h2 className="t-h2">{t('home.faq.title')}</h2>
          <p className="t-body seccion__entradilla">{t('home.faq.subtitle')}</p>
          <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('common.preguntarWhatsapp')} />
        </div>
        <div className="home-faq-fila__lista">
          {PREGUNTAS.map((q, i) => (
            <details key={q} className="faq-fila" open={i === 0}>
              <summary className="faq-fila__pregunta">
                <span>{t(`home.faq.${q}.question`)}</span>
                <span className="faq-fila__icono" aria-hidden="true" />
              </summary>
              <p className="t-body faq-fila__respuesta">{t(`home.faq.${q}.answer`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
