import "../css/navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
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
              Inicio
            </NavLink>
          </li>

          <li>
            <a href="#historia" onClick={closeMenu}>
              Historia
            </a>
          </li>
          <li>
            <NavLink to="/transportacion" onClick={closeMenu}>
              Transportación
            </NavLink>
          </li>
          <li>
            <NavLink to="/hospedaje" onClick={closeMenu}>
              Hospedaje
            </NavLink>
          </li>
          <li>
            <NavLink to="/tours" onClick={closeMenu}>
              Tours & Experiencias
            </NavLink>
          </li>
          <li>
            <NavLink to="/mice" onClick={closeMenu}>
              MICE
            </NavLink>
          </li>
          <li>
            <NavLink to="/tematicos" onClick={closeMenu}>
              Viajes Temáticos
            </NavLink>
          </li>

          <li>
            <a href="#contacto" className="cta-hero" onClick={closeMenu}>
              Contáctanos
            </a>
          </li>
        </ul>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
