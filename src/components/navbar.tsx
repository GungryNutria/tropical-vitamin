import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LuMenu, LuX } from 'react-icons/lu';
import logo from '../assets/logo.png';
import LanguageSwitcher from './languageSwitcher';
import BotonWhatsApp from './botonWhatsApp';

const DESTINOS = [
  { to: '/tours', clave: 'nav.tours' },
  { to: '/transportacion', clave: 'nav.transportacion' },
  { to: '/hospedaje', clave: 'nav.hospedaje' },
  { to: '/mice', clave: 'nav.mice' },
  { to: '/tematicos', clave: 'nav.tematicos' },
  { to: '/contacto', clave: 'nav.contacto' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const esHome = pathname === '/';
  const [arriba, setArriba] = useState(() => window.scrollY <= 80);
  const [abierto, setAbierto] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const botonMenu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const alDesplazar = () => setArriba(window.scrollY <= 80);
    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  }, []);

  // Menú móvil: Esc cierra, el foco queda atrapado en el panel y vuelve al botón al cerrar.
  useEffect(() => {
    if (!abierto) return;
    const nodo = panel.current;
    const enfocables = () => Array.from(nodo?.querySelectorAll<HTMLElement>('a, button') ?? []);
    enfocables()[0]?.focus();
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const lista = enfocables();
      const primero = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener('keydown', alTeclear);
    document.body.style.overflow = 'hidden';
    const boton = botonMenu.current;
    return () => {
      document.removeEventListener('keydown', alTeclear);
      document.body.style.overflow = '';
      boton?.focus();
    };
  }, [abierto]);

  const transparente = esHome && arriba;
  const cerrar = () => setAbierto(false);

  return (
    <header className={`navbar ${esHome ? 'navbar--home' : ''} ${transparente ? 'navbar--transparente' : 'navbar--solida'}`}>
      <div className="navbar__barra">
        <Link to="/" className="navbar__logo" aria-label={t('nav.irInicio')} tabIndex={transparente ? -1 : undefined} aria-hidden={transparente || undefined}>
          <img src={logo} alt="" width={88} height={40} />
        </Link>
        <nav className="navbar__destinos" aria-label={t('nav.principal')}>
          <ul>
            {DESTINOS.map((d) => (
              <li key={d.to}>
                <NavLink to={d.to} className="navbar__enlace">{t(d.clave)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__acciones">
          <div className="navbar__idioma"><LanguageSwitcher /></div>
          <div className="navbar__wa-texto"><BotonWhatsApp mensaje={t('whatsapp.general')} observable={false} /></div>
          <div className="navbar__wa-icono"><BotonWhatsApp mensaje={t('whatsapp.general')} tamano="icono" observable={false} /></div>
          <button
            ref={botonMenu}
            type="button"
            className="navbar__menu"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={t('nav.abrirMenu')}
            onClick={() => setAbierto(true)}
          >
            <LuMenu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      {abierto && (
        <div
          id="menu-movil"
          ref={panel}
          className="menu-movil superficie-oscura"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.principal')}
        >
          <button type="button" className="menu-movil__cerrar" aria-label={t('nav.cerrarMenu')} onClick={cerrar}>
            <LuX size={24} aria-hidden="true" />
          </button>
          <ul className="menu-movil__destinos">
            {DESTINOS.map((d) => (
              <li key={d.to}>
                <NavLink to={d.to} className="placa placa--verde menu-movil__placa" onClick={cerrar}>{t(d.clave)}</NavLink>
              </li>
            ))}
          </ul>
          <div className="menu-movil__pie">
            <BotonWhatsApp mensaje={t('whatsapp.general')} tamano="grande" observable={false} />
            <LanguageSwitcher completo />
          </div>
        </div>
      )}
    </header>
  );
}
