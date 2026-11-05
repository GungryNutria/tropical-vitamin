import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openWhatsApp } from '../../../utils/whatsapp';
import {
  QUOTE_MAX,
  buildTourQuoteMessage,
  hasErrors,
  todayLocal,
  validateQuote,
  type QuoteData,
  type QuoteErrors,
} from '../../../utils/tourQuote';

interface CounterProps {
  id: string;
  label: string;
  value: number;
  min: number;
  addLabel: string;
  removeLabel: string;
  help?: string;
  onChange: (n: number) => void;
}

function Counter({ id, label, value, min, addLabel, removeLabel, help, onChange }: CounterProps) {
  return (
    <div className="td-field">
      <div className="td-counter-row">
        <span className="td-label" id={`${id}-label`}>{label}</span>
        <div className="td-stepper" role="group" aria-labelledby={`${id}-label`} aria-describedby={help ? `${id}-help` : undefined}>
          <button type="button" aria-label={removeLabel} disabled={value <= min} onClick={() => onChange(value - 1)}>−</button>
          <output aria-live="polite">{value}</output>
          <button type="button" aria-label={addLabel} disabled={value >= QUOTE_MAX} onClick={() => onChange(value + 1)}>+</button>
        </div>
      </div>
      {help && <p className="td-help" id={`${id}-help`}>{help}</p>}
    </div>
  );
}

function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <p className="td-error" id={id}>
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 5.5v5.5M10 13.5v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {text}
    </p>
  );
}

interface Props {
  tourTitle: string;
  titleId: string;
  titleRef: React.Ref<HTMLHeadingElement>;
}

const EMPTY: QuoteData = { date: '', adults: 1, children: 0, ages: [], companions: 0, zone: '', hotel: '' };

export default function QuoteForm({ tourTitle, titleId, titleRef }: Props) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<QuoteData>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({ ages: [] });
  const set = (patch: Partial<QuoteData>) => setData((d) => ({ ...d, ...patch }));

  const setChildren = (n: number) =>
    set({ children: n, ages: Array.from({ length: n }, (_, i) => data.ages[i] ?? '') });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateQuote(data, todayLocal());
    setErrors(found);
    if (hasErrors(found)) {
      const firstId = found.date
        ? 'q-date'
        : found.ages.length
          ? `q-age-${found.ages[0]}`
          : found.zone
            ? 'q-zone'
            : 'q-hotel';
      e.currentTarget.querySelector<HTMLElement>(`#${firstId}`)?.focus();
      return;
    }
    openWhatsApp(buildTourQuoteMessage(t, i18n.language, tourTitle, data));
  };

  const dateError = errors.date
    ? t(errors.date === 'empty' ? 'tours.quote.date.errorEmpty' : 'tours.quote.date.errorPast')
    : null;

  return (
    <form className="td-form" noValidate onSubmit={submit}>
      <div className="td-form-fields">
        <h2 className="td-title" id={titleId} tabIndex={-1} ref={titleRef}>{t('tours.quote.title')}</h2>
        <p className="td-subtitle">{t('tours.quote.subtitle')}</p>

        <div className="td-field">
          <label className="td-label" htmlFor="q-date">{t('tours.quote.date.label')}</label>
          <input
            id="q-date"
            type="date"
            className={`td-input td-date${dateError ? ' is-invalid' : ''}`}
            min={todayLocal()}
            value={data.date}
            aria-invalid={Boolean(dateError)}
            aria-describedby={`${dateError ? 'q-date-error ' : ''}q-date-help`}
            onChange={(e) => set({ date: e.target.value })}
          />
          {dateError && <FieldError id="q-date-error" text={dateError} />}
          <p className="td-help" id="q-date-help">{t('tours.quote.date.help')}</p>
        </div>

        <Counter id="q-adults" label={t('tours.quote.adults.label')} value={data.adults} min={1}
          addLabel={t('tours.quote.adults.add')} removeLabel={t('tours.quote.adults.remove')}
          onChange={(adults) => set({ adults })} />

        <Counter id="q-children" label={t('tours.quote.children.label')} value={data.children} min={0}
          addLabel={t('tours.quote.children.add')} removeLabel={t('tours.quote.children.remove')}
          onChange={setChildren} />

        {data.ages.map((age, i) => {
          const invalid = errors.ages.includes(i);
          return (
            <div className="td-field" key={i}>
              <label className="td-label" htmlFor={`q-age-${i}`}>{t('tours.quote.age.label', { n: i + 1 })}</label>
              <select
                id={`q-age-${i}`}
                className={`td-input td-select${invalid ? ' is-invalid' : ''}`}
                value={age}
                aria-invalid={invalid}
                aria-describedby={invalid ? `q-age-${i}-error` : undefined}
                onChange={(e) => set({ ages: data.ages.map((a, j) => (j === i ? e.target.value : a)) })}
              >
                <option value="">{t('tours.quote.age.placeholder')}</option>
                {Array.from({ length: 18 }, (_, n) => (
                  <option key={n} value={n}>{t('tours.quote.age.option', { count: n })}</option>
                ))}
              </select>
              {invalid && <FieldError id={`q-age-${i}-error`} text={t('tours.quote.age.error')} />}
            </div>
          );
        })}

        <Counter id="q-companions" label={t('tours.quote.companions.label')} value={data.companions} min={0}
          addLabel={t('tours.quote.companions.add')} removeLabel={t('tours.quote.companions.remove')}
          help={t('tours.quote.companions.help')} onChange={(companions) => set({ companions })} />

        <div className="td-field">
          <label className="td-label" htmlFor="q-zone">{t('tours.quote.zone.label')}</label>
          <input
            id="q-zone"
            type="text"
            className={`td-input${errors.zone ? ' is-invalid' : ''}`}
            placeholder={t('tours.quote.zone.placeholder')}
            value={data.zone}
            aria-invalid={Boolean(errors.zone)}
            aria-describedby={errors.zone ? 'q-zone-error' : undefined}
            onChange={(e) => set({ zone: e.target.value })}
          />
          {errors.zone && <FieldError id="q-zone-error" text={t('tours.quote.zone.error')} />}
        </div>

        <div className="td-field">
          <label className="td-label" htmlFor="q-hotel">{t('tours.quote.hotel.label')}</label>
          <input
            id="q-hotel"
            type="text"
            className={`td-input${errors.hotel ? ' is-invalid' : ''}`}
            placeholder={t('tours.quote.hotel.placeholder')}
            value={data.hotel}
            aria-invalid={Boolean(errors.hotel)}
            aria-describedby={`${errors.hotel ? 'q-hotel-error ' : ''}q-hotel-help`}
            onChange={(e) => set({ hotel: e.target.value })}
          />
          {errors.hotel && <FieldError id="q-hotel-error" text={t('tours.quote.hotel.error')} />}
          <p className="td-help" id="q-hotel-help">{t('tours.quote.hotel.help')}</p>
        </div>
      </div>

      <div className="td-form-footer">
        <button type="submit" className="tour-button">{t('tours.quote.submit')}</button>
        <p className="td-note">{t('tours.quote.note')}</p>
      </div>
    </form>
  );
}
