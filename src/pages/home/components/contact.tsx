import "../../../css/contact.css";
import { FaAt, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useFadeUp } from "../hooks/useFadeUp";
import { useState } from "react";

function Contact() {
    useFadeUp();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
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
                        <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
                        <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
                        <a href="https://tiktok.com" target="_blank"><FaTiktok /></a>
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
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Correo"
                        required
                    />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Teléfono"
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos tu plan de viaje"
                        rows={5}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar mensaje"}
                    </button>

                    {status === "success" && (
                        <p className="success">Mensaje enviado correctamente ✅</p>
                    )}
                    {status === "error" && (
                        <p className="error">Ocurrió un error, intenta más tarde ❌</p>
                    )}
                </form>
            </div>
        </section>
    );
}

export default Contact;
