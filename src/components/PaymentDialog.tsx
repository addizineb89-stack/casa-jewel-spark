import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, Landmark, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: number;
}

const RIB = "230 780 0123456789 0001 23";
const TRANSFER_NUMBER = "0661-234567";

const PaymentDialog = ({ open, onOpenChange, planName, planPrice }: PaymentDialogProps) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copié !`);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !fullName.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    setSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { error } = await supabase.from("subscriptions").insert({
        plan_name: planName,
        plan_price: planPrice,
        email: email.trim(),
        full_name: fullName.trim(),
        user_id: session?.user?.id ?? null,
        status: "pending",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Demande envoyée ! Activation sous 24h.");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'envoi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setSubmitted(false);
      setEmail("");
      setFullName("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md relative overflow-hidden border-gold/30">
        <div className="zellige-card" />
        <DialogHeader className="relative">
          <DialogTitle className="font-display text-xl gold-text">Finaliser mon abonnement</DialogTitle>
          <DialogDescription className="font-body">
            Plan <strong>{planName}</strong> — <strong>{planPrice} DH</strong>/mois
          </DialogDescription>
          <Badge className="w-fit gold-gradient text-primary-foreground border-0 mt-1 text-xs">
            Essai gratuit de 7 jours inclus
          </Badge>
        </DialogHeader>

        {submitted ? (
          <div className="relative text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <p className="font-display text-lg font-semibold text-foreground">Demande enregistrée !</p>
            <p className="font-body text-sm text-muted-foreground">
              Votre abonnement sera activé sous 24h après vérification du paiement.
            </p>
          </div>
        ) : (
          <div className="relative space-y-5">
            {/* Virement bancaire */}
            <div className="space-y-2 bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 font-body font-semibold text-sm text-foreground">
                <Landmark className="w-4 h-4 text-gold" />
                Paiement par virement bancaire
              </div>
              <div className="text-xs font-body text-muted-foreground space-y-1">
                <p>Nom du compte : <span className="text-foreground font-medium">Aura Gold Intelligence</span></p>
                <p>Banque : <span className="text-foreground font-medium">CIH Bank</span></p>
                <div className="flex items-center gap-2">
                  <p>RIB : <span className="text-foreground font-medium font-mono text-[11px]">{RIB}</span></p>
                  <button onClick={() => copyToClipboard(RIB, "RIB")} className="text-gold hover:text-gold/80">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] italic">Envoyez le montant avec votre email en référence</p>
              </div>
            </div>

            {/* Paiement mobile */}
            <div className="space-y-2 bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 font-body font-semibold text-sm text-foreground">
                <Smartphone className="w-4 h-4 text-gold" />
                Paiement mobile
              </div>
              <div className="text-xs font-body text-muted-foreground space-y-1">
                <p>Wafacash / CashPlus / Barid Bank</p>
                <div className="flex items-center gap-2">
                  <p>Numéro : <span className="text-foreground font-medium">{TRANSFER_NUMBER}</span></p>
                  <button onClick={() => copyToClipboard(TRANSFER_NUMBER, "Numéro")} className="text-gold hover:text-gold/80">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="pay-email" className="font-body text-xs">Email *</Label>
                <Input id="pay-email" type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pay-name" className="font-body text-xs">Nom complet *</Label>
                <Input id="pay-name" placeholder="Mohamed Alaoui" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-9 text-sm" />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full gold-gradient text-primary-foreground font-body font-semibold hover:opacity-90 gold-glow"
              >
                {submitting ? "Envoi en cours..." : "✓ J'ai effectué le virement"}
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground font-body text-center">
              Votre abonnement sera activé sous 24h après vérification du paiement
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
