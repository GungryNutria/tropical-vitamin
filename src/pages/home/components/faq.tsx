import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('home.faq.q1.question'),
      answer: t('home.faq.q1.answer')
    },
    {
      question: t('home.faq.q2.question'),
      answer: t('home.faq.q2.answer')
    },
    {
      question: t('home.faq.q3.question'),
      answer: t('home.faq.q3.answer')
    },
    {
      question: t('home.faq.q4.question'),
      answer: t('home.faq.q4.answer')
    },
    {
      question: t('home.faq.q5.question'),
      answer: t('home.faq.q5.answer')
    }
  ];

  return (
    <section className="faq">
      <div className="faq-container">
        <h2 className="faq-title">{t('home.faq.title')}</h2>
        
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${openIndex === idx ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                {openIndex === idx ? <FaMinus /> : <FaPlus />}
              </div>
              {openIndex === idx && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
