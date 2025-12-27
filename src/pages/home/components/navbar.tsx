import "../../../css/navbar.css";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          Tropical<span>Vitamin</span>
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#historia">Nuestra historia</a></li>
          <li><a href="#tours">Tours</a></li>
          <li><a href="#mice">MICE</a></li>
          <li><a href="#contacto" className="cta">Contáctanos</a></li>
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
