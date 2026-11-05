import "../css/whatsapp-float.css";
import { FaWhatsapp } from "react-icons/fa";
import { openWhatsApp } from "../utils/whatsapp";

function WhatsappFloat() {
  const handleClick = () => {
    openWhatsApp("Hola, quiero información sobre sus servicios ");
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
