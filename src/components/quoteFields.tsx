import '../css/tour-dialog.css';
import '../css/quote-fields.css';
import { QUOTE_MAX } from '../utils/tourQuote';

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

// El rango de edad "(1-5 años)" no se parte en dos líneas
const rangeAtEnd = (label: string) => {
  const i = label.indexOf(' (');
  return i < 0 ? label : <>{label.slice(0, i + 1)}<span className="tq-nowrap">{label.slice(i + 1)}</span></>;
};

export function Counter({ id, label, value, min, addLabel, removeLabel, help, onChange }: CounterProps) {
  return (
    <div className="td-field">
      <div className="td-counter-row">
        <span className="td-label" id={`${id}-label`}>{rangeAtEnd(label)}</span>
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

export function FieldError({ id, text }: { id: string; text: string }) {
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
