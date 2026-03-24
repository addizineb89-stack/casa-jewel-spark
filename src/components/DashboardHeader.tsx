import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div>
        <h1 className="text-2xl font-display font-bold gold-text">Casa Gold Intelligence</h1>
        <p className="text-sm text-muted-foreground font-body">Tableau de bord professionnel — Casablanca</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un modèle..." className="pl-10 w-64 bg-background border-border" />
        </div>
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
