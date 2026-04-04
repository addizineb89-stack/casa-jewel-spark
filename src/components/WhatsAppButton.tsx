import { useState } from "react";
import { MessageCircle, HelpCircle, ChevronDown, Mail, X, Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const FAQ_ITEMS = [
  { q: "Comment vérifier le prix de l'or ?", a: "Utilisez notre calculateur en temps réel dans l'onglet 'Calculateur'. Les prix sont mis à jour en continu depuis les marchés internationaux." },
  { q: "Comment trouver un bijoutier de confiance ?", a: "Notre annuaire de bijoutiers certifiés sera bientôt disponible. En attendant, consultez les tendances du marché marocain." },
  { q: "Comment utiliser le calculateur ?", a: "Sélectionnez le caratage (9K à 24K), entrez le poids en grammes, et le prix total s'affiche automatiquement avec les frais de façon." },
];

const WhatsAppButton = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [faqOpen, setFaqOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const isProPage = location.pathname === "/pro";

  // Pro dashboard: share button for jewelers
  if (isProPage && isAuthenticated) {
    const handleShare = () => {
      const shopName = user?.shopName || "Ma Bijouterie";
      const shareText = `Découvrez ${shopName} sur Aura Gold : ${window.location.origin}`;
      if (navigator.share) {
        navigator.share({ title: shopName, text: shareText, url: window.location.origin });
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Lien copié dans le presse-papier !");
      }
    };

    return (
      <button
        onClick={handleShare}
        className="fixed bottom-20 md:bottom-6 end-4 z-50 w-14 h-14 rounded-full gold-gradient text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Partager mon lien boutique"
      >
        <Share2 className="w-6 h-6" />
      </button>
    );
  }

  // Client pages: FAQ help widget
  return (
    <>
      {/* FAQ panel */}
      {faqOpen && (
        <div className="fixed bottom-20 md:bottom-24 end-4 z-50 w-80 max-h-[70vh] bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="zellige-card" />
          <div className="relative p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-foreground">Aide & FAQ</h3>
            <button onClick={() => setFaqOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative p-3 space-y-2 overflow-y-auto max-h-[50vh]">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-3 text-left font-body text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedIndex === i ? "rotate-180" : ""}`} />
                </button>
                {expandedIndex === i && (
                  <div className="px-3 pb-3 text-xs font-body text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 mt-2">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="font-body text-xs text-muted-foreground">Contactez-nous</p>
                <a href="mailto:contact@auragold.ma" className="font-body text-sm text-gold font-medium hover:underline">
                  contact@auragold.ma
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating help button */}
      <button
        onClick={() => setFaqOpen(!faqOpen)}
        className="fixed bottom-20 md:bottom-6 end-4 z-50 h-12 px-4 rounded-full gold-gradient text-primary-foreground flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform font-body font-medium text-sm"
        aria-label="Besoin d'aide"
      >
        {faqOpen ? <X className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
        <span className="hidden sm:inline">{faqOpen ? "Fermer" : "💬 Besoin d'aide ?"}</span>
        <span className="sm:hidden">{faqOpen ? "" : "💬"}</span>
      </button>
    </>
  );
};

export default WhatsAppButton;
