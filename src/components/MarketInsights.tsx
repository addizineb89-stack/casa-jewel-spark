import { motion } from "framer-motion";
import { BarChart3, MessageSquare, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const categoryData = [
  { name: "Bracelet Beldi", comments: 2340, trend: 12 },
  { name: "Collier Moderne", comments: 1890, trend: 8 },
  { name: "Bague Filigrane", comments: 1560, trend: -3 },
  { name: "Boucles d'or", comments: 1230, trend: 15 },
  { name: "Gourmette", comments: 980, trend: 22 },
  { name: "Manchette", comments: 870, trend: 5 },
];

const styleDistribution = [
  { name: "Beldi", value: 62, color: "hsl(40, 65%, 50%)" },
  { name: "Moderne", value: 38, color: "hsl(42, 30%, 75%)" },
];

const topCommented = [
  { model: "Bracelet Twisté Beldi", comments: 847, platform: "Instagram", trend: "up" },
  { model: "Sautoir Baroque Moderne", comments: 623, platform: "TikTok", trend: "up" },
  { model: "Bague Émeraude Casa", comments: 512, platform: "Instagram", trend: "down" },
  { model: "Créoles XXL Doré", comments: 489, platform: "TikTok", trend: "up" },
  { model: "Chaîne Figaro 18K", comments: 445, platform: "Instagram", trend: "up" },
];

const MarketInsights = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Commentaires ce mois", value: "8,870", change: "+12%", icon: MessageSquare },
          { label: "Modèle #1 Maroc", value: "Bracelet Beldi", change: "Tendance ↑", icon: TrendingUp },
          { label: "Style dominant", value: "Beldi (62%)", change: "vs Moderne", icon: BarChart3 },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-lg p-5 relative overflow-hidden shadow-[var(--shadow-card)]"
          >
            <div className="zellige-card" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-md gold-gradient flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              <p className="text-xl font-display font-bold text-foreground mt-1">{stat.value}</p>
              <p className="text-xs text-gold font-body mt-1">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-[var(--shadow-card)]">
          <div className="zellige-card" />
          <div className="relative z-10">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Commentaires par catégorie</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'DM Sans' }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11, fontFamily: 'DM Sans' }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontFamily: 'DM Sans',
                  }}
                />
                <Bar dataKey="comments" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-[var(--shadow-card)]">
          <div className="zellige-card" />
          <div className="relative z-10">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Beldi vs Moderne</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={styleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    stroke="none"
                  >
                    {styleDistribution.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {styleDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm font-body text-foreground">{s.name} ({s.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-[var(--shadow-card)]">
        <div className="zellige-card" />
        <div className="relative z-10">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Top Modèles — Plus Commentés au Maroc</h3>
          <div className="space-y-3">
            {topCommented.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-xs text-primary-foreground font-bold font-body">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-body font-medium text-foreground">{item.model}</p>
                    <p className="text-xs text-muted-foreground font-body">{item.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-body font-semibold text-foreground">{item.comments}</span>
                  {item.trend === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
