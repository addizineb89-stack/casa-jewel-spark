import { Home, Flame, Calculator, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const items = [
  { icon: Home, label: "Accueil", path: "/", tab: undefined },
  { icon: Flame, label: "Tendances", path: "/?tab=trends", tab: "trends" },
  { icon: Calculator, label: "Calculateur", path: "/?tab=pricing", tab: "pricing" },
  { icon: User, label: "Profil", path: "/plans", tab: undefined },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item: typeof items[0]) => {
    if (item.path === "/plans") return location.pathname === "/plans";
    if (item.tab) return location.pathname === "/" && location.search.includes(`tab=${item.tab}`);
    return location.pathname === "/" && !location.search.includes("tab=");
  };

  const handleClick = (item: typeof items[0]) => {
    navigate(item.path);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around" style={{ minHeight: 56 }}>
        {items.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors ${
                active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-body font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
