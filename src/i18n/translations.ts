export type Language = "fr" | "en" | "ar";

export const translations = {
  // Header
  "app.title": {
    fr: "Casa Gold Intelligence",
    en: "Casa Gold Intelligence",
    ar: "كازا غولد إنتليجنس",
  },
  "app.subtitle": {
    fr: "Tableau de bord professionnel — Casablanca",
    en: "Professional Dashboard — Casablanca",
    ar: "لوحة القيادة المهنية — الدار البيضاء",
  },
  "header.search": {
    fr: "Rechercher un modèle...",
    en: "Search a model...",
    ar: "ابحث عن نموذج...",
  },

  // Ticker
  "ticker.live": { fr: "En direct", en: "Live", ar: "مباشر" },
  "ticker.goldPrice": {
    fr: "Prix de l'or en direct",
    en: "Live Gold Price",
    ar: "سعر الذهب مباشر",
  },

  // Tabs
  "tab.trends": { fr: "Tendances", en: "Trends", ar: "ترندات" },
  "tab.pricing": { fr: "Calculateur", en: "Calculator", ar: "حاسبة" },
  "tab.insights": { fr: "Market Insights", en: "Market Insights", ar: "تحليل السوق" },
  "tab.visual": { fr: "Recherche Visuelle", en: "Visual Search", ar: "بحث بصري" },

  // Trend Hunter
  "trends.title": { fr: "Trend Hunter", en: "Trend Hunter", ar: "صائد الترندات" },
  "trends.subtitle": {
    fr: "Modèles les plus viraux sur Instagram & TikTok au Maroc",
    en: "Most viral models on Instagram & TikTok in Morocco",
    ar: "أكثر النماذج انتشاراً على إنستغرام وتيك توك في المغرب",
  },
  "trends.trending": { fr: "Tendance", en: "Trending", ar: "رائج" },
  "trends.savedToCatalog": { fr: "Ajouté au catalogue ✨", en: "Added to catalog ✨", ar: "✨ أضيف إلى الكتالوج" },
  "trends.removedFromCatalog": { fr: "Retiré du catalogue", en: "Removed from catalog", ar: "أزيل من الكتالوج" },
  "trends.tiktok": { fr: "Tendances TikTok", en: "TikTok Trends", ar: "ترندات تيك توك" },

  // Pricing Calculator
  "pricing.title": { fr: "Moteur de Prix", en: "Pricing Engine", ar: "محرك الأسعار" },
  "pricing.subtitle": {
    fr: "Calculez le prix final instantanément",
    en: "Calculate the final price instantly",
    ar: "احسب السعر النهائي فوراً",
  },
  "pricing.calcTitle": {
    fr: "Calculateur de Prix au Gramme",
    en: "Price per Gram Calculator",
    ar: "حاسبة سعر الجرام",
  },
  "pricing.karat": { fr: "Caratage", en: "Karat", ar: "العيار" },
  "pricing.weight": { fr: "Poids (grammes)", en: "Weight (grams)", ar: "الوزن (غرام)" },
  "pricing.weightPlaceholder": { fr: "ex: 12.5", en: "e.g.: 12.5", ar: "مثال: 12.5" },
  "pricing.labor": { fr: "Façon (MAD)", en: "Labor Cost (MAD)", ar: "تكلفة الصنع (درهم)" },
  "pricing.laborPlaceholder": { fr: "ex: 350", en: "e.g.: 350", ar: "مثال: 350" },
  "pricing.goldCost": { fr: "Coût or", en: "Gold cost", ar: "تكلفة الذهب" },
  "pricing.laborCost": { fr: "Façon", en: "Labor", ar: "الصنع" },
  "pricing.total": { fr: "Total", en: "Total", ar: "المجموع" },
  "pricing.copy": { fr: "Copier", en: "Copy", ar: "نسخ" },
  "pricing.whatsapp": { fr: "WhatsApp", en: "WhatsApp", ar: "واتساب" },
  "pricing.copied": { fr: "Prix copié !", en: "Price copied!", ar: "!تم نسخ السعر" },

  // WhatsApp quote
  "quote.title": { fr: "Devis Casa Gold", en: "Casa Gold Quote", ar: "عرض كازا غولد" },
  "quote.karat": { fr: "Caratage", en: "Karat", ar: "العيار" },
  "quote.weight": { fr: "Poids", en: "Weight", ar: "الوزن" },
  "quote.gold": { fr: "Or", en: "Gold", ar: "ذهب" },
  "quote.labor": { fr: "Façon", en: "Labor", ar: "الصنع" },
  "quote.totalPrice": { fr: "Prix Total", en: "Total Price", ar: "السعر الإجمالي" },

  // Market Insights
  "insights.title": { fr: "Market Insights", en: "Market Insights", ar: "تحليل السوق" },
  "insights.subtitle": {
    fr: "Analyse des tendances du marché bijoutier marocain",
    en: "Moroccan jewelry market trend analysis",
    ar: "تحليل اتجاهات سوق المجوهرات المغربي",
  },
  "insights.commentsMonth": { fr: "Commentaires ce mois", en: "Comments this month", ar: "تعليقات هذا الشهر" },
  "insights.topModel": { fr: "Modèle #1 Maroc", en: "#1 Model Morocco", ar: "النموذج الأول في المغرب" },
  "insights.trendUp": { fr: "Tendance ↑", en: "Trending ↑", ar: "↑ رائج" },
  "insights.dominantStyle": { fr: "Style dominant", en: "Dominant style", ar: "الأسلوب السائد" },
  "insights.vsBeldiModern": { fr: "vs Moderne", en: "vs Modern", ar: "مقابل عصري" },
  "insights.commentsByCategory": { fr: "Commentaires par catégorie", en: "Comments by category", ar: "التعليقات حسب الفئة" },
  "insights.beldiVsModern": { fr: "Beldi vs Moderne", en: "Beldi vs Modern", ar: "بلدي مقابل عصري" },
  "insights.topModels": {
    fr: "Top Modèles — Plus Commentés au Maroc",
    en: "Top Models — Most Commented in Morocco",
    ar: "أفضل النماذج — الأكثر تعليقاً في المغرب",
  },
  "insights.beldi": { fr: "Beldi", en: "Beldi", ar: "بلدي" },
  "insights.modern": { fr: "Moderne", en: "Modern", ar: "عصري" },

  // Visual Search
  "visual.title": { fr: "Recherche Visuelle", en: "Visual Search", ar: "بحث بصري" },
  "visual.description": {
    fr: "Prenez une photo d'un bijou et trouvez des modèles similaires avec leur popularité sur le marché.",
    en: "Take a photo of a piece and find similar models with their market popularity.",
    ar: "التقط صورة لقطعة مجوهرات واعثر على نماذج مشابهة مع شعبيتها في السوق.",
  },
  "visual.scan": { fr: "Activer la Caméra", en: "Activate Camera", ar: "تفعيل الكاميرا" },
} as const;

export type TranslationKey = keyof typeof translations;
