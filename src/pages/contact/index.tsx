import { useTranslation } from "react-i18next";
import "../../css/contact-page.css";
import { FaAt, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import WhatsappFloat from "../../components/whatsappFloat";

function ContactPage() {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        destination: "",
        travelers: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            var url = import.meta.env.VITE_API_URL + "/mail"
            const res = await fetch(
                url,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            if (!res.ok) throw new Error("Error");

            setStatus("success");
            setForm({ name: "", email: "", phone: "", service: "", destination: "", travelers: "", message: "" });
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-container">
            <div className="contact-page-wrapper">
                {/* LEFT - Info */}
                <div className="contact-page-info">
                    <h1>{t('contact.title')}</h1>
                    <p className="contact-page-subtitle">{t('contact.subtitle')}</p>

                    <div className="contact-page-details">
                        <div className="contact-page-detail">
                            <FaLocationDot className="contact-page-icon" />
                            <div>
                                <h4>{t('contact.info.location')}</h4>
                                <p>{t('contact.info.locationValue')}</p>
                            </div>
                        </div>
                        <div className="contact-page-detail">
                            <FaPhone className="contact-page-icon" />
                            <div>
                                <h4>{t('contact.info.phone')}</h4>
                                <p>+52 984 168 1263</p>
                            </div>
                        </div>
                        <div className="contact-page-detail">
                            <FaAt className="contact-page-icon" />
                            <div>
                                <h4>{t('contact.info.email')}</h4>
                                <p>contacto@tropicalvitamin.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-page-socials">
                        <a href="https://facebook.com" target="_blank" className="social-link">
                            <FaFacebookF /> Facebook
                        </a>
                        <a href="https://instagram.com" target="_blank" className="social-link">
                            <FaInstagram /> Instagram
                        </a>
                        <a href="https://tiktok.com" target="_blank" className="social-link">
                            <FaTiktok /> TikTok
                        </a>
                    </div>

                    <button
                        className="contact-page-whatsapp"
                        onClick={() =>
                            window.open(
                                "https://wa.me/529841681263?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios%20",
                                "_blank"
                            )
                        }
                    >
                        <FaPhone /> {t('contact.whatsapp')}
                    </button>
                </div>

                {/* RIGHT - Form */}
                <div className="contact-page-form-container">
                    <form className="contact-page-form" onSubmit={handleSubmit}>
                        <h2>{t('contact.form.title')}</h2>
                        
                        <div className="form-row">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder={t('contact.form.name')}
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder={t('contact.form.email')}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder={t('contact.form.phone')}
                            />
                            <select name="service" value={form.service} onChange={handleChange}>
                                <option value="">{t('contact.form.service')}</option>
                                <option value="transportacion">{t('contact.services.transportation')}</option>
                                <option value="hospedaje">{t('contact.services.accommodation')}</option>
                                <option value="tours">{t('contact.services.tours')}</option>
                                <option value="mice">{t('contact.services.mice')}</option>
                                <option value="tematicos">{t('contact.services.thematic')}</option>
                                <option value="otro">{t('contact.services.other')}</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <select name="destination" value={form.destination} onChange={handleChange}>
                                <option value="">{t('contact.form.destination')}</option>
                                <option value="cancun">{t('contact.destinations.cancun')}</option>
                                <option value="playa-carmen">{t('contact.destinations.playaCarmen')}</option>
                                <option value="riviera-maya">{t('contact.destinations.rivieraMaya')}</option>
                                <option value="tulum">{t('contact.destinations.tulum')}</option>
                                <option value="bacalar">{t('contact.destinations.bacalar')}</option>
                                <option value="yucatan">{t('contact.destinations.yucatan')}</option>
                                <option value="otro">{t('contact.destinations.other')}</option>
                            </select>
                            <input
                                name="travelers"
                                type="number"
                                value={form.travelers}
                                onChange={handleChange}
                                placeholder={t('contact.form.travelers')}
                                min="1"
                            />
                        </div>

                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder={t('contact.form.message')}
                            rows={6}
                        />

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? t('contact.form.sending') : t('contact.form.submit')}
                        </button>

                        {status === "success" && (
                            <p className="form-success">{t('contact.form.success')}</p>
                        )}
                        {status === "error" && (
                            <p className="form-error">{t('contact.form.error')}</p>
                        )}
                    </form>
                </div>
            </div>

            <WhatsappFloat />
        </div>
    );
}

export default ContactPage;
