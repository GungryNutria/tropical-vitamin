import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "../css/footer.css";
import { FaFacebookF, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

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
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
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

                {/* SECTIONS - Same as navbar */}
                <div className="footer-sections">
                    <h4>{t('footer.information')}</h4>
                    <NavLink to="/transportacion">{t('nav.transportacion')}</NavLink>
                    <NavLink to="/hospedaje">{t('nav.hospedaje')}</NavLink>
                    <NavLink to="/tours">{t('nav.tours')}</NavLink>
                    <NavLink to="/mice">{t('nav.mice')}</NavLink>
                    <NavLink to="/tematicos">{t('nav.tematicos')}</NavLink>
                </div>

                {/* REGISTROS */}
                <div className="footer-legal">
                    <h4>{t('footer.registros')}</h4>
                    <a href="#">{t('footer.privacy')}</a>
                    <a href="#">{t('footer.cancellations')}</a>
                    <a href="#">{t('footer.sitePolicies')}</a>
                    <a href="#">{t('footer.sitemap')}</a>
                </div>

                {/* CONTACT */}
                <div className="footer-contact">
                    <h4>{t('footer.contact')}</h4>
                    <a href="tel:+529841681263">+52 984 168 1263</a>
                    <a href="mailto:info@tropical-vitamin.com">info@tropical-vitamin.com</a>
                    <NavLink to="/contacto">{t('nav.contacto')}</NavLink>
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
