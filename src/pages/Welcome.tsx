import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Diamond, TrendingUp, Calculator, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Diamond, title: "Prix de l'or en direct", desc: "Suivez le cours de l'or 18k, 21k et 24k mis à jour en temps réel pour tout le Maroc." },
  { icon: TrendingUp, title: "Tendances virales", desc: "Découvrez les bijoux les plus populaires sur Instagram et TikTok." },
  { icon: Calculator, title: "Calculateur de prix", desc: "Estimez instantanément le prix final : (Poids × Cours) + Façon." },
  { icon: MessageCircle, title: "Devis WhatsApp", desc: "Générez un devis professionnel et partagez-le en un clic sur WhatsApp." },
];

const Welcome = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else navigate("/");
  };

  const current = steps[step];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Stepper */}
      <div className="flex gap-2 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= step ? "w-8 gold-gradient" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 gold-glow">
            <current.icon className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">{current.title}</h2>
          <p className="text-muted-foreground font-body leading-relaxed">{current.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex gap-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground font-body">
          Passer
        </Button>
        <Button onClick={next} className="gold-gradient text-primary-foreground font-body font-semibold gold-glow gap-2">
          {step < steps.length - 1 ? "Suivant" : "Commencer"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
