import "../../../css/contact.css";
import { FaAt, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import { useFadeUp } from "../hooks/useFadeUp";
import { FaLocationDot, FaP } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Contact() {
    useFadeUp();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mensaje enviado (demo)");
    };

    return (
        <section id="contacto" className="contact">
            <div className="contact-wrapper">

                {/* LEFT */}
                <div className="contact-info fade-up">
                    <h2>Contáctanos</h2>
                    <p>
                        ¿Listo para vivir una experiencia única en la Riviera Maya?
                        Escríbenos y te ayudamos a planear cada detalle.
                    </p>

                    <div className="contact-details">
                        <p><FaLocationDot /> Riviera Maya, México</p>
                        <p><FaPhone /> +52 558 034 3878</p>
                        <p><FaAt /> contacto@tropicalvitamin.com</p>
                    </div>

                    <div className="socials">
                        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
                            <FaFacebookF />
                        </a>

                        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
                            <FaInstagram />
                        </a>

                        <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
                            <FaTiktok />
                        </a>
                    </div>



                    <button
                        className="whatsapp-btn"
                        onClick={() =>
                            window.open(
                                "https://wa.me/529841681263?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios%20",
                                "_blank"
                            )
                        }
                    >
                        Escríbenos por WhatsApp
                    </button>
                </div>

                {/* RIGHT */}
                <form className="contact-form fade-up" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" required />
                    <input type="email" placeholder="Correo" required />
                    <input type="tel" placeholder="Teléfono" />
                    <textarea placeholder="Cuéntanos tu plan de viaje" rows={5} />

                    <button type="submit">Enviar mensaje</button>
                </form>

            </div>
        </section>
    );
}

export default Contact;
