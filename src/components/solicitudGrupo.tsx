import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PasosSolicitud from './pasosSolicitud';
import Campo from './campo';

// "Grupos MICE" → "grupos MICE": baja solo la inicial y respeta siglas.
const minusculaInicial = (s: string) => s.replace(/^\p{Lu}(?!\p{Lu})/u, (c) => c.toLowerCase());

type Props = {
  // Valor de "servicio" que entiende el formulario de Contacto ("mice" | "tematicos")
  servicio: string;
  tituloTipo: string;
  tipos: { clave: string; titulo: string }[];
};

// Pasos de MICE y Temáticos: tipo → personas → fechas → vista previa (whatsapp.grupo).
export default function SolicitudGrupo({ servicio, tituloTipo, tipos }: Props) {
  const { t } = useTranslation();
  const [tipo, setTipo] = useState<string | null>(null);
  const [personas, setPersonas] = useState('');
  const [fechas, setFechas] = useState('');
  const [tocado, setTocado] = useState(false);

  const numero = Number(personas);
  const personasOk = personas !== '' && Number.isInteger(numero) && numero >= 1;
  const fechasOk = fechas.trim() !== '';
  const elegido = tipos.find((x) => x.clave === tipo);
  const mensaje = elegido && personasOk && fechasOk
    ? t('whatsapp.grupo', { tipo: minusculaInicial(elegido.titulo), personas: numero, fechas: fechas.trim() })
    : null;

  return (
    <PasosSolicitud
      mensaje={mensaje}
      correo={{ servicio }}
      pasos={[
        {
          titulo: tituloTipo,
          completo: Boolean(elegido),
          motivo: t('common.faltaGrupoTipo'),
          contenido: (
            <ul className="pasos__opciones">
              {tipos.map((x) => (
                <li key={x.clave}>
                  <button type="button" className="chip chip--servicio" aria-pressed={tipo === x.clave} onClick={() => setTipo(x.clave)}>
                    {x.titulo}
                  </button>
                </li>
              ))}
            </ul>
          ),
        },
        {
          titulo: t('common.grupoPersonas'),
          completo: personasOk,
          motivo: t('common.faltaPersonas'),
          contenido: (
            <Campo id={`${servicio}-personas`} etiqueta={t('common.personas')} obligatorio error={tocado && personas !== '' && !personasOk ? t('common.errorPersonas') : undefined}>
              <input type="number" min={1} step={1} inputMode="numeric" value={personas} onChange={(e) => setPersonas(e.target.value)} onBlur={() => setTocado(true)} />
            </Campo>
          ),
        },
        {
          titulo: t('common.grupoFechas'),
          completo: fechasOk,
          motivo: t('common.faltaFechas'),
          contenido: (
            <Campo id={`${servicio}-fechas`} etiqueta={t('common.fechas')} obligatorio ayuda={t('common.fechasAyuda')}>
              <input type="text" value={fechas} onChange={(e) => setFechas(e.target.value)} />
            </Campo>
          ),
        },
      ]}
    />
  );
}
