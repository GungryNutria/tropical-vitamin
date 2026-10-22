import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import navigatorImg from '../../assets/units/navigator.jpg';
import autobusImg from '../../assets/units/autobus.jpg';
import HeroServicio from '../../components/heroServicio';
import BotonWhatsApp from '../../components/botonWhatsApp';
import TarjetaServicio from '../../components/tarjetaServicio';
import PasosSolicitud from '../../components/pasosSolicitud';
import WhatsappFloat from '../../components/whatsappFloat';

type Tipo = 'airport' | 'point' | 'open';
type Modalidad = 'private' | 'shared';
type Viaje = 'oneWay' | 'roundTrip';

// Mismas opciones que la versión anterior; ahora una sola por paso (D-4).
const OPCIONES: Record<Tipo, string[]> = {
  airport: ['airportOpt1', 'airportOpt2', 'airportOpt3'],
  point: ['pointOpt1', 'pointOpt2', 'pointOpt3', 'pointOpt4', 'pointOpt5'],
  open: ['openOpt1', 'openOpt2', 'openOpt3', 'openOpt4', 'openOpt5'],
};
const PASO2: Record<Tipo, { titulo: string; falta: string; detalle: string }> = {
  airport: { titulo: 'aeropuerto', falta: 'faltaAeropuerto', detalle: 'detalleAeropuerto' },
  point: { titulo: 'destino', falta: 'faltaDestino', detalle: 'detalleDestino' },
  open: { titulo: 'duracion', falta: 'faltaDuracion', detalle: 'detalleDuracion' },
};

function Chips<T extends string>({ valores, actual, etiqueta, onElegir }: {
  valores: T[];
  actual: T | null;
  etiqueta: (v: T) => string;
  onElegir: (v: T) => void;
}) {
  return (
    <ul className="pasos__opciones">
      {valores.map((v) => (
        <li key={v}>
          <button type="button" className="chip chip--azul" aria-pressed={actual === v} onClick={() => onElegir(v)}>
            {etiqueta(v)}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function Transportation() {
  const { t } = useTranslation();
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [opcion, setOpcion] = useState<string | null>(null);
  const [modalidad, setModalidad] = useState<Modalidad | null>(null);
  const [viaje, setViaje] = useState<Viaje | null>(null);
  const tx = (k: string) => t(`transportation.${k}`);

  const elegirTipo = (v: Tipo) => {
    setTipo(v);
    setOpcion(null);
    if (v === 'open') setViaje(null);
  };

  const pasoTipoOk = tipo !== null;
  const pasoDetalleOk = opcion !== null;
  const pasoModalidadOk = modalidad !== null && (tipo === 'open' || viaje !== null);

  let mensaje: string | null = null;
  if (tipo && opcion && pasoModalidadOk && modalidad) {
    const vars = {
      tipo: tx(`segments.${tipo}`).toLowerCase(),
      detalle: t(`transportation.pasos.${PASO2[tipo].detalle}`, { opcion: tx(`segments.${opcion}`) }),
      modalidad: tx(`options.${modalidad}`),
    };
    mensaje = tipo === 'open'
      ? t('whatsapp.transporteAbierto', vars)
      : t('whatsapp.transporte', { ...vars, viaje: tx(`type.${viaje}`).toLowerCase() });
  }

  // sprinter.jpg (un Tesla) y transporter.jpg (una playa) no muestran la unidad: van sin foto (REQ-23).
  const unidades: { nombre: string; imagen?: string }[] = [
    { nombre: 'Transporter / Van' },
    { nombre: 'Navigator / Luxury', imagen: navigatorImg },
    { nombre: 'Sprinter / Crafter' },
    { nombre: tx('units.bus'), imagen: autobusImg },
  ];

  return (
    <>
      <HeroServicio
        tipo="servicio"
        pictograma="camioneta"
        etiqueta={t('common.servicio')}
        titulo={tx('hero.title')}
        texto={tx('hero.subtitle')}
        imagen={autobusImg}
        accion={
          <div className="hero-servicio__botones">
            <a href="#cotizar" className="tv-boton tv-boton--primario">{tx('hero.cta')}</a>
            <BotonWhatsApp mensaje={t('whatsapp.servicio', { servicio: tx('hero.title').toLowerCase() })} tamano="grande" />
          </div>
        }
      />

      <section id="cotizar" className="seccion solicitud">
        <div className="contenedor solicitud__rejilla">
          <div className="solicitud__intro">
            <h2 className="t-h2">{tx('pasos.titulo')}</h2>
            <p className="t-body seccion__entradilla">{tx('pasos.texto')}</p>
          </div>
          <PasosSolicitud
            mensaje={mensaje}
            pasos={[
              {
                titulo: tx('pasos.tipo'),
                completo: pasoTipoOk,
                motivo: tx('pasos.faltaTipo'),
                contenido: (
                  <Chips<Tipo> valores={['airport', 'point', 'open']} actual={tipo} etiqueta={(v) => tx(`segments.${v}`)} onElegir={elegirTipo} />
                ),
              },
              {
                titulo: tipo ? tx(`pasos.${PASO2[tipo].titulo}`) : tx('pasos.detalle'),
                completo: pasoDetalleOk,
                motivo: tipo ? tx(`pasos.${PASO2[tipo].falta}`) : tx('pasos.faltaTipo'),
                contenido: tipo ? (
                  <Chips valores={OPCIONES[tipo]} actual={opcion} etiqueta={(v) => tx(`segments.${v}`)} onElegir={setOpcion} />
                ) : (
                  <p className="t-small pasos__subtitulo">{tx('pasos.faltaTipo')}</p>
                ),
              },
              {
                titulo: tx('pasos.modalidad'),
                completo: pasoModalidadOk,
                motivo: modalidad ? tx('pasos.faltaViaje') : tx('pasos.faltaModalidad'),
                contenido: (
                  <>
                    <Chips<Modalidad> valores={['private', 'shared']} actual={modalidad} etiqueta={(v) => tx(`options.${v}`)} onElegir={setModalidad} />
                    {tipo !== 'open' && (
                      <Chips<Viaje> valores={['oneWay', 'roundTrip']} actual={viaje} etiqueta={(v) => tx(`type.${v}`)} onElegir={setViaje} />
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="t-h2 seccion__titulo">{tx('units.title')}</h2>
          <p className="t-body-lg seccion__entradilla">{tx('intro')}</p>
          <ul className="rejilla rejilla--4 bloque-tarjetas">
            {unidades.map((u) => (
              <li key={u.nombre}>
                <TarjetaServicio pictograma="camioneta" titulo={u.nombre} imagen={u.imagen} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WhatsappFloat />
    </>
  );
}
