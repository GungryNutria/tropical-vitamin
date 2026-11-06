import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "../css/footer.css";
import { FaFacebookF, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useSocial } from "../hooks/useSocial";
import { whatsappUrl } from "../utils/whatsapp";

const NETWORK_META = {
    facebook: { Icon: FaFacebookF, label: "Facebook" },
    instagram: { Icon: FaInstagram, label: "Instagram" },
    linkedin: { Icon: FaLinkedin, label: "LinkedIn" },
};

function Footer() {
    const { t } = useTranslation();
    const { networks } = useSocial();

    return (
        <footer className="footer">
            <div className="footer-wrapper">

                {/* BRAND */}
                <div className="footer-brand">
                    <h3>Tropical Vitamin</h3>
                    <p>{t('footer.description')}</p>

                    <div className="footer-socials">
                        {networks.map(({ network, url }) => {
                            const { Icon, label } = NETWORK_META[network];
                            return (
                                <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={`social-${network}`}>
                                    <Icon />
                                </a>
                            );
                        })}
                        <a
                            href={whatsappUrl()}
                            target="_blank"
                            aria-label="WhatsApp"
                            className="social-whatsapp"
                            rel="noopener noreferrer"
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
                    <NavLink to="/servicios-en-destino">{t('onsite.title')}</NavLink>
                    <NavLink to="/contacto">{t('nav.contacto')}</NavLink>
                </div>

                {/* REGISTROS */}
                <div className="footer-legal">
                    <h4>{t('footer.registros')}</h4>
                    <a href="#">{t('footer.privacy')}</a>
                    <a href="#">{t('footer.cancellations')}</a>
                    <a href="#">{t('footer.sitePolicies')}</a>
                </div>

                {/* CONTACT */}
                <div className="footer-contact">
                    <h4>{t('footer.contact')}</h4>
                    <a href="tel:+529841681263">+52 984 168 1263</a>
                    <a href="mailto:contacto@tropical-vitamin.com">contacto@tropical-vitamin.com</a>
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
