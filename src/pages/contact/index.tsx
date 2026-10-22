import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuPhone } from 'react-icons/lu';
import '../../css/contact-page.css';
import Campo from '../../components/campo';
import BotonWhatsApp from '../../components/botonWhatsApp';
import { Aviso } from '../../components/estados';
import WhatsappFloat from '../../components/whatsappFloat';

// Mismo cuerpo que antes para POST /mail (MailDto de la API).
type Formulario = { name: string; email: string; phone: string; service: string; destination: string; travelers: string; message: string };
type Errores = Partial<Record<keyof Formulario, string>>;

const SERVICIOS: [string, string][] = [
  ['transportacion', 'transportation'], ['hospedaje', 'accommodation'], ['tours', 'tours'],
  ['mice', 'mice'], ['tematicos', 'thematic'], ['otro', 'other'],
];
const DESTINOS: [string, string][] = [
  ['cancun', 'cancun'], ['playa-carmen', 'playaCarmen'], ['riviera-maya', 'rivieraMaya'], ['tulum', 'tulum'],
  ['bacalar', 'bacalar'], ['yucatan', 'yucatan'], ['otro', 'other'],
];
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const servicioInicial = params.get('servicio') ?? '';
  const [form, setForm] = useState<Formulario>({
    name: '', email: '', phone: '', destination: '', travelers: '',
    service: SERVICIOS.some(([v]) => v === servicioInicial) ? servicioInicial : '',
    message: params.get('mensaje') ?? '',
  });
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'exito' | 'error'>('idle');
  const resumen = useRef<HTMLDivElement>(null);

  const cambiar = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validar = (): Errores => {
    const e: Errores = {};
    if (!form.name.trim()) e.name = t('contact.form.errorName');
    if (!form.email.trim()) e.email = t('contact.form.errorEmail');
    else if (!CORREO.test(form.email.trim())) e.email = t('contact.form.errorEmailFormato');
    if (!form.message.trim()) e.message = t('contact.form.errorMessage');
    return e;
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    const encontrados = validar();
    setErrores(encontrados);
    const claves = Object.keys(encontrados) as (keyof Formulario)[];
    if (claves.length > 0) {
      if (claves.length > 1) requestAnimationFrame(() => resumen.current?.focus());
      else document.getElementById(`contacto-${claves[0]}`)?.focus();
      return;
    }
    setEstado('enviando');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEstado('exito');
      setForm({ name: '', email: '', phone: '', service: '', destination: '', travelers: '', message: '' });
    } catch {
      setEstado('error');
    }
  };

  const listaErrores = Object.entries(errores) as [keyof Formulario, string][];
  const enviando = estado === 'enviando';

  return (
    <section className="contacto">
      <div className="contenedor contacto__rejilla">
        <div className="contacto__info">
          <p className="rotulo rotulo--accion contacto__placa"><span className="t-label">{t('contact.etiqueta')}</span></p>
          <h1 className="t-h1">{t('contact.title')}</h1>
          <p className="t-body-lg contacto__entradilla">{t('contact.subtitle')}</p>
          <div className="contacto__canal">
            <h2 className="t-h3">{t('contact.datosTitulo')}</h2>
            <p className="t-small contacto__entradilla">{t('contact.whatsappTexto')}</p>
            <BotonWhatsApp mensaje={t('whatsapp.general')} texto={t('contact.whatsapp')} tamano="grande" />
            <a className="contacto__tel" href="tel:+529841681263">
              <LuPhone size={20} aria-hidden="true" />
              {t('contact.info.mexicoPhone')}
            </a>
          </div>
        </div>

        <form className="contacto__form" onSubmit={enviar} noValidate>
          <h2 className="t-h2">{t('contact.form.title')}</h2>

          {listaErrores.length > 1 && (
            <div ref={resumen} tabIndex={-1} className="aviso aviso--error" role="alert">
              <div>
                <p className="aviso__titulo">{t('contact.form.resumen', { count: listaErrores.length })}</p>
                <ul className="contacto__resumen">
                  {listaErrores.map(([campo, msg]) => (
                    <li key={campo}><a href={`#contacto-${campo}`}>{msg}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Campo id="contacto-name" etiqueta={t('contact.form.name')} obligatorio error={errores.name}>
            <input name="name" type="text" autoComplete="name" value={form.name} onChange={cambiar} />
          </Campo>
          <div className="contacto__par">
            <Campo id="contacto-email" etiqueta={t('contact.form.email')} obligatorio error={errores.email}>
              <input name="email" type="email" autoComplete="email" value={form.email} onChange={cambiar} />
            </Campo>
            <Campo id="contacto-phone" etiqueta={t('contact.form.phone')}>
              <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={cambiar} />
            </Campo>
          </div>
          <div className="contacto__par">
            <Campo id="contacto-service" etiqueta={t('contact.form.service')}>
              <select name="service" value={form.service} onChange={cambiar}>
                <option value="">{t('contact.form.servicePlaceholder')}</option>
                {SERVICIOS.map(([v, k]) => <option key={v} value={v}>{t(`contact.services.${k}`)}</option>)}
              </select>
            </Campo>
            <Campo id="contacto-destination" etiqueta={t('contact.form.destination')}>
              <select name="destination" value={form.destination} onChange={cambiar}>
                <option value="">{t('contact.form.destinationPlaceholder')}</option>
                {DESTINOS.map(([v, k]) => <option key={v} value={v}>{t(`contact.destinations.${k}`)}</option>)}
              </select>
            </Campo>
          </div>
          <Campo id="contacto-travelers" etiqueta={t('contact.form.travelers')}>
            <input name="travelers" type="number" min={1} inputMode="numeric" value={form.travelers} onChange={cambiar} />
          </Campo>
          <Campo id="contacto-message" etiqueta={t('contact.form.message')} obligatorio ayuda={t('contact.form.messageAyuda')} error={errores.message}>
            <textarea name="message" rows={5} value={form.message} onChange={cambiar} />
          </Campo>

          <button type="submit" className="tv-boton tv-boton--primario contacto__enviar" disabled={enviando} aria-busy={enviando}>
            {enviando && <span className="spinner" aria-hidden="true" />}
            {enviando ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {estado === 'exito' && (
            <Aviso tipo="exito" titulo={t('contact.form.successTitulo')}>
              <p className="t-small">{t('contact.form.success')}</p>
            </Aviso>
          )}
          {estado === 'error' && (
            <Aviso tipo="error" titulo={t('contact.form.errorTitulo')}>
              <p className="t-small">{t('contact.form.error')}</p>
              <div className="contacto__salida">
                <BotonWhatsApp mensaje={form.message || t('whatsapp.general')} texto={t('contact.whatsapp')} />
              </div>
            </Aviso>
          )}
        </form>
      </div>
      <WhatsappFloat />
    </section>
  );
}
