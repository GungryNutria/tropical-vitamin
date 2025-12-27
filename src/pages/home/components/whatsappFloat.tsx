import "../../../css/whatsapp-float.css";
import { FaWhatsapp } from "react-icons/fa";

function WhatsappFloat() {
  const handleClick = () => {
    window.open(
      "https://wa.me/529841681263?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios%20",
      "_blank"
    );
  };

  return (
    <button
      className="whatsapp-float"
      onClick={handleClick}
      aria-label="WhatsApp"
    >
      <FaWhatsapp />
    </button>
  );
}

export default WhatsappFloat;
