import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [role, setRole] = useState<"client" | "jeweler">("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+212");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, email, phone, password, role, ...(role === "jeweler" ? { shopName } : {}) });
      toast({ title: "Compte créé !", description: "Vérifiez votre email pour confirmer votre compte." });
      navigate("/welcome");
    } catch (err: any) {
      toast({ title: "Erreur", description: err?.message || "Impossible de créer le compte", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gold-text">Créer un compte</h1>
          <p className="text-muted-foreground font-body mt-2">Rejoignez Aura Gold</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="zellige-card" />

          {/* Role toggle */}
          <div className="flex gap-1 bg-secondary rounded-full p-1 mb-6 relative z-10">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`flex-1 py-2 rounded-full text-sm font-body font-medium transition-all ${
                role === "client" ? "gold-gradient text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setRole("jeweler")}
              className={`flex-1 py-2 rounded-full text-sm font-body font-medium transition-all ${
                role === "jeweler" ? "gold-gradient text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Bijoutier
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="relative">
              <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Nom complet" value={name} onChange={(e) => setName(e.target.value)} required className="ps-10" />
            </div>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="ps-10" />
            </div>
            <div className="relative">
              <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="tel" placeholder="+212 6XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} required className="ps-10" />
            </div>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required className="ps-10" />
            </div>

            {role === "jeweler" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="relative">
                <Store className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Nom de la bijouterie" value={shopName} onChange={(e) => setShopName(e.target.value)} required className="ps-10" />
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-primary-foreground font-body font-semibold gold-glow"
            >
              {loading ? "Création..." : "Créer mon compte"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground font-body relative z-10">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-gold font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
