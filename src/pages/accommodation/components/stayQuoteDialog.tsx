import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../css/tours.css';
import { Counter, FieldError } from '../../../components/quoteFields';
import { useModalDialog } from '../../../hooks/useModalDialog';
import { openWhatsApp } from '../../../utils/whatsapp';
import { todayLocal } from '../../../utils/tourQuote';
import {
  buildStayMessage,
  hasErrors,
  validateStay,
  type StayData,
  type StayErrors,
} from '../../../utils/travelQuote';

interface Props {
  typeName: string;
  destinations: string[];
  data: StayData;
  onChange: (data: StayData) => void;
  onClose: () => void;
}

export default function StayQuoteDialog({ typeName, destinations, data, onChange, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const { ref, close, onBackdropClick } = useModalDialog();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<StayErrors>({});
  const set = (patch: Partial<StayData>) => onChange({ ...data, ...patch });

  // Al abrir, el foco va al título del diálogo
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateStay(data, todayLocal());
    setErrors(found);
    if (hasErrors(found)) {
      const firstId = found.arrival
        ? 'aq-arrival'
        : found.nights
          ? 'aq-nights'
          : found.zone
            ? 'aq-zone'
            : 'aq-other';
      e.currentTarget.querySelector<HTMLElement>(`#${firstId}`)?.focus();
      return;
    }
    const zoneName = data.zone === 'other' ? data.otherZone.trim() : destinations[Number(data.zone)];
    openWhatsApp(buildStayMessage(t, i18n.language, typeName, zoneName, data));
  };

  const arrivalError = errors.arrival
    ? t(errors.arrival === 'empty' ? 'accommodation.quote.arrival.errorEmpty' : 'tours.quote.date.errorPast')
    : null;
  const nightsError = errors.nights
    ? t(errors.nights === 'empty' ? 'accommodation.quote.nights.errorEmpty' : 'accommodation.quote.nights.errorInvalid')
    : null;

  return (
    <dialog
      ref={ref}
      className="tour-dialog tour-dialog--narrow"
      aria-labelledby="aq-heading"
      onClose={onClose}
      onClick={onBackdropClick}
    >
      <div className="td-view">
        <div className="td-top">
          <span />
          <button type="button" className="td-close" onClick={close}>{t('tours.dialog.close')}</button>
        </div>
        <form className="td-form" noValidate onSubmit={submit}>
          <div className="td-form-fields">
            <span className="tour-category">{typeName}</span>
            <h2 className="td-title" id="aq-heading" tabIndex={-1} ref={headingRef}>{t('accommodation.quote.title')}</h2>
            <p className="td-subtitle">{t('accommodation.quote.subtitle')}</p>

            <div className="tq-row tq-row--2">
              <div className="td-field">
                <label className="td-label" htmlFor="aq-arrival">{t('accommodation.quote.arrival.label')}</label>
                <input
                  id="aq-arrival"
                  type="date"
                  className={`td-input td-date${arrivalError ? ' is-invalid' : ''}`}
                  min={todayLocal()}
                  value={data.arrival}
                  aria-invalid={Boolean(arrivalError)}
                  aria-describedby={`${arrivalError ? 'aq-arrival-error ' : ''}aq-arrival-help`}
                  onChange={(e) => set({ arrival: e.target.value })}
                />
                {arrivalError && <FieldError id="aq-arrival-error" text={arrivalError} />}
                <p className="td-help" id="aq-arrival-help">{t('accommodation.quote.arrival.help')}</p>
              </div>

              <div className="td-field">
                <label className="td-label" htmlFor="aq-nights">{t('accommodation.quote.nights.label')}</label>
                <input
                  id="aq-nights"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`td-input${nightsError ? ' is-invalid' : ''}`}
                  placeholder={t('accommodation.quote.nights.placeholder')}
                  value={data.nights}
                  aria-invalid={Boolean(nightsError)}
                  aria-describedby={nightsError ? 'aq-nights-error' : undefined}
                  onChange={(e) => set({ nights: e.target.value })}
                />
                {nightsError && <FieldError id="aq-nights-error" text={nightsError} />}
              </div>
            </div>

            <fieldset className="tq-group">
              <legend className="td-label">{t('accommodation.quote.guests')}</legend>
              <Counter id="aq-adults" label={t('quote.adults.label')} value={data.adults} min={1}
                addLabel={t('tours.quote.adults.add')} removeLabel={t('tours.quote.adults.remove')}
                onChange={(adults) => set({ adults })} />
              <Counter id="aq-children" label={t('quote.children.label')} value={data.children} min={0}
                addLabel={t('tours.quote.children.add')} removeLabel={t('tours.quote.children.remove')}
                onChange={(children) => set({ children })} />
              <Counter id="aq-infants" label={t('quote.infants.label')} value={data.infants} min={0}
                addLabel={t('quote.infants.add')} removeLabel={t('quote.infants.remove')}
                onChange={(infants) => set({ infants })} />
            </fieldset>

            <div className="td-field">
              <label className="td-label" htmlFor="aq-zone">{t('accommodation.quote.zone.label')}</label>
              <select
                id="aq-zone"
                className={`td-input td-select${errors.zone ? ' is-invalid' : ''}`}
                value={data.zone}
                aria-invalid={Boolean(errors.zone)}
                aria-describedby={errors.zone ? 'aq-zone-error' : undefined}
                onChange={(e) => set({ zone: e.target.value })}
              >
                <option value="">{t('accommodation.quote.zone.placeholder')}</option>
                {destinations.map((d, i) => (
                  <option key={i} value={i}>{d}</option>
                ))}
                <option value="other">{t('accommodation.quote.zone.other')}</option>
              </select>
              {errors.zone && <FieldError id="aq-zone-error" text={t('accommodation.quote.zone.error')} />}
            </div>

            {data.zone === 'other' && (
              <div className="td-field">
                <label className="td-label" htmlFor="aq-other">{t('accommodation.quote.otherZone.label')}</label>
                <input
                  id="aq-other"
                  type="text"
                  className={`td-input${errors.otherZone ? ' is-invalid' : ''}`}
                  placeholder={t('accommodation.quote.otherZone.placeholder')}
                  value={data.otherZone}
                  aria-invalid={Boolean(errors.otherZone)}
                  aria-describedby={errors.otherZone ? 'aq-other-error' : undefined}
                  onChange={(e) => set({ otherZone: e.target.value })}
                />
                {errors.otherZone && <FieldError id="aq-other-error" text={t('accommodation.quote.otherZone.error')} />}
              </div>
            )}
          </div>

          <div className="td-form-footer">
            <button type="submit" className="tour-button">{t('tours.quote.submit')}</button>
            <p className="td-note">{t('tours.quote.note')}</p>
          </div>
        </form>
      </div>
    </dialog>
  );
}
