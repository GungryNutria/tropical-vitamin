import "../../../css/footer.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-wrapper">

                {/* BRAND */}
                <div className="footer-brand">
                    <h3>Tropical Vitamin</h3>
                    <p>
                        Diseñamos experiencias auténticas en la Riviera Maya, combinando
                        organización europea con calidez mexicana.
                    </p>

                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="TikTok"><FaTiktok /></a>
                        <a
                            href="https://wa.me/525580343878"
                            target="_blank"
                            aria-label="WhatsApp"
                            rel="noreferrer"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>

                {/* LINKS */}
                <div className="footer-links">
                    <h4>Información</h4>
                    <a href="#servicios">Servicios</a>
                    <a href="#tours">Tours</a>
                    <a href="#mice">MICE</a>
                    <a href="#contacto">Contacto</a>
                </div>

                {/* POLICIES */}
                <div className="footer-links">
                    <h4>Legal</h4>
                    <a
                        href="/policies/aviso-privacidad.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Aviso de Privacidad
                    </a>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                © {new Date().getFullYear()} Tropical Vitamin. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
