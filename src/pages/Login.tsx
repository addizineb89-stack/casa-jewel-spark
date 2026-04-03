import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: "Bienvenue !" });
      navigate("/");
    } catch {
      toast({ title: "Erreur de connexion", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold gold-text">Aura Gold</h1>
          <p className="text-muted-foreground font-body mt-2">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="zellige-card" />
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="ps-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="ps-10"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-primary-foreground font-body font-semibold gold-glow"
            >
              <LogIn className="w-4 h-4 me-2" />
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2 relative z-10">
            <p className="text-sm text-muted-foreground font-body">
              Pas encore de compte ?{" "}
              <Link to="/signup" className="text-gold font-medium hover:underline">Créer un compte</Link>
            </p>
            <Link to="/" className="text-sm text-muted-foreground font-body hover:text-foreground block">
              Continuer sans connexion →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
