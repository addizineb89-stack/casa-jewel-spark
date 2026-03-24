import { useState } from "react";
import { Calculator, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const GOLD_PRICES: Record<string, number> = {
  "24k": 742.50,
  "22k": 680.63,
  "18k": 556.88,
  "14k": 433.13,
  "9k": 278.44,
};

const PricingCalculator = () => {
  const { toast } = useToast();
  const [karat, setKarat] = useState("18k");
  const [weight, setWeight] = useState("");
  const [laborCost, setLaborCost] = useState("");

  const goldCost = parseFloat(weight || "0") * (GOLD_PRICES[karat] || 0);
  const labor = parseFloat(laborCost || "0");
  const totalPrice = goldCost + labor;

  const handleWhatsAppQuote = () => {
    const msg = `✨ *Devis Casa Gold* ✨\n\n💎 Caratage: ${karat.toUpperCase()}\n⚖️ Poids: ${weight}g\n💰 Or: ${goldCost.toFixed(2)} MAD\n🔨 Façon: ${labor.toFixed(2)} MAD\n\n*Prix Total: ${totalPrice.toFixed(2)} MAD*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${totalPrice.toFixed(2)} MAD`);
    toast({ title: "Prix copié !", description: `${totalPrice.toFixed(2)} MAD` });
  };

  return (
    <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-[var(--shadow-card)]">
      <div className="zellige-card" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Moteur de Prix</h3>
            <p className="text-sm text-muted-foreground font-body">Calculez le prix final instantanément</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-body font-medium text-foreground">Caratage</Label>
            <Select value={karat} onValueChange={setKarat}>
              <SelectTrigger className="mt-1 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(GOLD_PRICES).map((k) => (
                  <SelectItem key={k} value={k}>{k.toUpperCase()} — {GOLD_PRICES[k].toFixed(2)} MAD/g</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-body font-medium text-foreground">Poids (grammes)</Label>
            <Input
              type="number"
              placeholder="ex: 12.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 bg-background border-border"
            />
          </div>

          <div>
            <Label className="text-sm font-body font-medium text-foreground">Façon (MAD)</Label>
            <Input
              type="number"
              placeholder="ex: 350"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              className="mt-1 bg-background border-border"
            />
          </div>

          <div className="bg-ivory-deep rounded-lg p-4 mt-4">
            <div className="flex justify-between text-sm text-muted-foreground font-body mb-1">
              <span>Coût or</span>
              <span>{goldCost.toFixed(2)} MAD</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground font-body mb-2">
              <span>Façon</span>
              <span>{labor.toFixed(2)} MAD</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between items-baseline">
              <span className="font-display font-semibold text-foreground">Total</span>
              <span className="font-display text-2xl font-bold gold-text">{totalPrice.toFixed(2)} MAD</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleCopy} variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary">
              <Copy className="w-4 h-4 mr-2" /> Copier
            </Button>
            <Button onClick={handleWhatsAppQuote} className="flex-1 gold-gradient text-primary-foreground hover:opacity-90">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
