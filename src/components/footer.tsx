import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "../css/footer.css";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-wrapper">

                {/* BRAND */}
                <div className="footer-brand">
                    <h3>Tropical Vitamin</h3>
                    <p>{t('footer.description')}</p>

                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="TikTok"><FaTiktok /></a>
                        <a
                            href="https://wa.me/529841681263"
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
                    <h4>{t('footer.information')}</h4>
                    <NavLink to="/transportacion">{t('nav.transportacion')}</NavLink>
                    <NavLink to="/hospedaje">{t('nav.hospedaje')}</NavLink>
                    <NavLink to="/tours">{t('nav.tours')}</NavLink>
                    <NavLink to="/mice">{t('nav.mice')}</NavLink>
                    <NavLink to="/tematicos">{t('nav.tematicos')}</NavLink>
                </div>

                {/* POLICIES */}
                <div className="footer-links">
                    <h4>{t('footer.legal')}</h4>
                    <a
                        href="/policies/aviso-privacidad.pdf"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t('footer.privacy')}
                    </a>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="footer-bottom">
                © {new Date().getFullYear()} Tropical Vitamin. {t('footer.rights')}
            </div>
        </footer>
    );
}

export default Footer;
