import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettingsApi } from "../../api/settingApi";

const WhatsAppButton = () => {
  const [whatsapp, setWhatsapp] = useState("");

  const fetchSettings = async () => {
    try {
      const data = await getSettingsApi();
      setWhatsapp(data.settings?.whatsapp || "");
    } catch (error) {
      setWhatsapp("");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!whatsapp) return null;

  const cleanNumber = whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${cleanNumber}?text=Hi, I want to know more about IT Sparks Technologies courses.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-soft hover:scale-105 transition"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;