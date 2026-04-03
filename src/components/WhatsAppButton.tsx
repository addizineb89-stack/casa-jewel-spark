import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const message = encodeURIComponent("Bonjour, je souhaite en savoir plus sur Maroc Gold Intelligence");
  const url = `https://wa.me/212600000000?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 end-4 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Contact WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulsing red dot */}
      <span className="absolute -top-0.5 -end-0.5 w-3.5 h-3.5 bg-destructive rounded-full animate-pulse border-2 border-background" />
    </a>
  );
};

export default WhatsAppButton;
