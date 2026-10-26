import "../css/navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import LanguageSwitcher from "./languageSwitcher";

function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="Tropical Vitamin" />
        </NavLink>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              {t('nav.inicio')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/transportacion" onClick={closeMenu}>
              {t('nav.transportacion')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/hospedaje" onClick={closeMenu}>
              {t('nav.hospedaje')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tours" onClick={closeMenu}>
              {t('nav.tours')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/mice" onClick={closeMenu}>
              {t('nav.mice')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tematicos" onClick={closeMenu}>
              {t('nav.tematicos')}
            </NavLink>
          </li>

          <li>
            <NavLink to="/contacto" className="cta-hero" onClick={closeMenu}>
              {t('nav.contacto')}
            </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <LanguageSwitcher />
          <div className={`hamburger ${open ? "active" : ""}`} onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
