import { motion } from "framer-motion";
import { BarChart3, MessageSquare, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useLanguage } from "@/i18n/LanguageContext";
import { useMarketInsights } from "@/hooks/useMarketInsights";
import { Skeleton } from "@/components/ui/skeleton";

const STYLE_COLORS = ["hsl(40, 65%, 50%)", "hsl(42, 30%, 75%)", "hsl(35, 50%, 60%)", "hsl(45, 40%, 65%)"];

function cleanModelName(text: string): string {
  return text.replace(/#\w+/g, "").replace(/\s+/g, " ").trim().slice(0, 50) + (text.length > 50 ? "…" : "");
}

const MarketInsights = () => {
  const { t } = useLanguage();
  const { stats, styles, comments, models, loading } = useMarketInsights();

  const statCards = [
    {
      label: t("insights.commentsMonth"),
      value: loading ? null : (stats?.total_comments?.toLocaleString() ?? "0"),
      change: "+12%",
      icon: MessageSquare,
    },
    {
      label: t("insights.topModel"),
      value: loading ? null : (stats?.top_model ?? "—"),
      change: t("insights.trendUp"),
      icon: TrendingUp,
    },
    {
      label: t("insights.dominantStyle"),
      value: loading ? null : `${stats?.dominant_style ?? "—"} (${styles[0]?.value ?? 0}%)`,
      change: styles.length >= 2 ? `${styles[0]?.name} ${styles[0]?.value}% vs ${styles[1]?.name} ${styles[1]?.value}%` : "",
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-lg p-5 relative overflow-hidden shadow-sm"
          >
            <div className="zellige-card" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-md gold-gradient flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              {stat.value === null ? (
                <Skeleton className="h-7 w-24 mt-1" />
              ) : (
                <p className="text-xl font-display font-bold text-foreground mt-1">{stat.value}</p>
              )}
              <p className="text-xs text-gold font-body mt-1">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-sm">
          <div className="zellige-card" />
          <div className="relative z-10">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t("insights.commentsByCategory")}</h3>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={comments}>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'DM Sans' }} stroke="#8a7e6b" />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'DM Sans' }} stroke="#8a7e6b" />
                  <Tooltip
                    contentStyle={{
                      background: '#f5f0e8',
                      border: '1px solid #e0d5c0',
                      borderRadius: '8px',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <Bar dataKey="comments" fill="#bf8c2c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-sm">
          <div className="zellige-card" />
          <div className="relative z-10">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t("insights.beldiVsModern")}</h3>
            {loading ? (
              <div className="flex items-center justify-center h-[200px]">
                <Skeleton className="w-[180px] h-[180px] rounded-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={styles}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        dataKey="value"
                        stroke="none"
                      >
                        {styles.map((_, idx) => (
                          <Cell key={idx} fill={STYLE_COLORS[idx % STYLE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-2 flex-wrap">
                  {styles.map((s, i) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: STYLE_COLORS[i % STYLE_COLORS.length] }} />
                      <span className="text-sm font-body text-foreground">
                        {s.name} ({s.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 relative overflow-hidden shadow-sm">
        <div className="zellige-card" />
        <div className="relative z-10">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t("insights.topModels")}</h3>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {models.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-xs text-primary-foreground font-bold font-body">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-body font-medium text-foreground">{cleanModelName(item.model)}</p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
