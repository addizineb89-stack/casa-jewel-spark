export type Language = "fr" | "en" | "ar";

export const translations = {
  // Header
  "app.title": {
    fr: "Aura Gold Intelligence",
    en: "Aura Gold Intelligence",
    ar: "أورا غولد إنتليجنس",
  },
  "app.subtitle": {
    fr: "Tableau de bord professionnel — Maroc",
    en: "Professional Dashboard — Morocco",
    ar: "لوحة القيادة المهنية — المغرب",
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
  "quote.title": { fr: "Devis Aura Gold", en: "Aura Gold Quote", ar: "عرض أورا غولد" },
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

  // Subscription
  "sub.title": { fr: "Abonnements & Forfaits", en: "Subscription & Plans", ar: "الاشتراكات والباقات" },
  "sub.subtitle": {
    fr: "Choisissez le forfait adapté à vos besoins",
    en: "Choose the plan that fits your needs",
    ar: "اختر الباقة المناسبة لاحتياجاتك",
  },
  "sub.back": { fr: "Retour", en: "Back", ar: "رجوع" },
  "sub.toggleClient": { fr: "Je suis un Client", en: "I'm a Client", ar: "أنا زبون" },
  "sub.togglePro": { fr: "Je suis un Professionnel", en: "I'm a Professional", ar: "أنا محترف" },
  "sub.month": { fr: "mois", en: "month", ar: "شهر" },
  "sub.currentPlan": { fr: "Plan actuel", en: "Current Plan", ar: "الباقة الحالية" },
  "sub.choosePlan": { fr: "Choisir ce forfait", en: "Choose Plan", ar: "اختر هذه الباقة" },
  "sub.recommended": { fr: "Recommandé", en: "Recommended", ar: "موصى به" },
  "sub.pro": { fr: "Professionnel", en: "Professional", ar: "محترف" },
  "sub.socialProof": {
    fr: "Approuvé par 50+ bijoutiers au Maroc",
    en: "Trusted by 50+ Jewelers across Morocco",
    ar: "موثوق من طرف أكثر من 50 صائغ في المغرب",
  },
  "sub.clientFree.name": { fr: "Découverte", en: "Discovery", ar: "اكتشاف" },
  "sub.clientFree.desc": { fr: "L'essentiel pour explorer", en: "The essentials to explore", ar: "الأساسيات للاستكشاف" },
  "sub.clientPremium.name": { fr: "L'Expérience Aura", en: "The Aura Experience", ar: "تجربة أورا" },
  "sub.clientPremium.desc": {
    fr: "Accès complet à l'intelligence dorée",
    en: "Full access to gold intelligence",
    ar: "وصول كامل إلى الذكاء الذهبي",
  },
  "sub.proplan.name": { fr: "Le Partenaire Aura Gold", en: "Aura Gold Partner", ar: "شريك أورا غولد" },
  "sub.proplan.tagline": {
    fr: "Dominez le marché marocain",
    en: "Dominate the Moroccan market",
    ar: "تصدّر السوق المغربي",
  },
  "sub.feat.visualFree": { fr: "3 recherches visuelles / jour", en: "3 visual searches / day", ar: "3 عمليات بحث بصري / يوم" },
  "sub.feat.livePrice": { fr: "Prix de l'or en direct", en: "Live Gold Price", ar: "سعر الذهب مباشر" },
  "sub.feat.basicTrends": { fr: "Tendances de base", en: "Basic Trends", ar: "ترندات أساسية" },
  "sub.feat.visualUnlimited": { fr: "Recherches visuelles illimitées", en: "Unlimited visual searches", ar: "بحث بصري غير محدود" },
  "sub.feat.whatsappAlerts": { fr: "Alertes prix via WhatsApp", en: "Price alerts via WhatsApp", ar: "تنبيهات الأسعار عبر واتساب" },
  "sub.feat.zakatCalc": { fr: "Calculateur Zakat détaillé", en: "Detailed Zakat Calculator", ar: "حاسبة زكاة مفصّلة" },
  "sub.feat.scanHistory": { fr: "Historique des bijoux scannés", en: "History of scanned jewelry", ar: "سجل المجوهرات الممسوحة" },
  "sub.feat.fullInsights": {
    fr: "Insights marché complets (tendances de scan au Maroc)",
    en: "Full Market Insights (what people scan in Morocco)",
    ar: "تحليل شامل للسوق (ما يبحث عنه الناس في المغرب)",
  },
  "sub.feat.whatsappLogo": {
    fr: "Devis WhatsApp avec votre logo boutique",
    en: "WhatsApp Quote with your shop logo",
    ar: "عرض واتساب بشعار متجرك",
  },
  "sub.feat.priorityListing": {
    fr: "Référencement prioritaire dans l'annuaire 'Où acheter'",
    en: "Priority listing in 'Where to Buy' directory",
    ar: "ترتيب أولوي في دليل 'أين تشتري'",
  },
  "sub.feat.trendScraping": {
    fr: "Analyse tendances depuis Dubaï, Paris et Milan",
    en: "Trend analysis from Dubai, Paris, and Milan",
    ar: "تحليل ترندات من دبي وباريس وميلانو",
  },
  "nav.plans": { fr: "Forfaits", en: "Plans", ar: "الباقات" },
  "nav.proDash": { fr: "Espace Pro", en: "Pro Dashboard", ar: "لوحة المحترف" },

  // Pro Dashboard
  "pro.title": { fr: "Tableau de Bord Professionnel", en: "Professional Dashboard", ar: "لوحة القيادة المهنية" },
  "pro.subtitle": { fr: "Votre intelligence marché en temps réel", en: "Your real-time market intelligence", ar: "ذكاء السوق في الوقت الفعلي" },
  "pro.badge": { fr: "Pro", en: "Pro", ar: "محترف" },
  "pro.marketPulse": { fr: "Pouls du Marché", en: "Market Pulse", ar: "نبض السوق" },
  "pro.gold18k": { fr: "Or 18K", en: "18K Gold", ar: "ذهب 18 قيراط" },
  "pro.gold21k": { fr: "Or 21K", en: "21K Gold", ar: "ذهب 21 قيراط" },
  "pro.gold24k": { fr: "Or 24K", en: "24K Gold", ar: "ذهب 24 قيراط" },
  "pro.perGram": { fr: "MAD/g", en: "MAD/g", ar: "درهم/غ" },

  // Pro Tabs
  "pro.tab.overview": { fr: "Aperçu", en: "Overview", ar: "نظرة عامة" },
  "pro.tab.globalTrends": { fr: "Tendances Mondiales", en: "Global Trends", ar: "ترندات عالمية" },
  "pro.tab.myQuotes": { fr: "Mes Devis", en: "My Quotes", ar: "عروضي" },
  "pro.tab.shopSettings": { fr: "Paramètres Boutique", en: "Shop Settings", ar: "إعدادات المتجر" },

  // Top Scanned
  "pro.topScanned": { fr: "Top Scannés au Maroc", en: "Top Scanned in Morocco", ar: "الأكثر مسحاً في المغرب" },
  "pro.topScannedSub": { fr: "Les 5 modèles les plus recherchés cette semaine", en: "Top 5 most searched models this week", ar: "أكثر 5 نماذج بحثاً هذا الأسبوع" },
  "pro.scans": { fr: "scans", en: "scans", ar: "مسح" },

  // Social Heatmap
  "pro.socialHeatmap": { fr: "Heatmap Social", en: "Social Media Heatmap", ar: "خريطة حرارة التواصل" },
  "pro.socialHeatmapSub": { fr: "Styles en explosion sur TikTok & Instagram au Maroc", en: "Styles exploding on TikTok & Instagram in Morocco", ar: "الأنماط المنتشرة على تيك توك وإنستغرام في المغرب" },
  "pro.mentions": { fr: "mentions", en: "mentions", ar: "إشارة" },

  // Quotation Maker
  "pro.quotationMaker": { fr: "Créateur de Devis", en: "Quotation Maker", ar: "منشئ العروض" },
  "pro.shopName": { fr: "Nom de la boutique", en: "Shop name", ar: "اسم المتجر" },
  "pro.shopNamePlaceholder": { fr: "ex: Bijouterie El Firdaous", en: "e.g.: El Firdaous Jewelry", ar: "مثال: مجوهرات الفردوس" },
  "pro.profitMargin": { fr: "Marge bénéficiaire (%)", en: "Profit Margin (%)", ar: "هامش الربح (%)" },
  "pro.profitPlaceholder": { fr: "ex: 15", en: "e.g.: 15", ar: "مثال: 15" },
  "pro.generateQuote": { fr: "Générer le Devis", en: "Generate Quote", ar: "إنشاء العرض" },
  "pro.shareWhatsapp": { fr: "Partager via WhatsApp", en: "Share via WhatsApp", ar: "مشاركة عبر واتساب" },
  "pro.quotePreview": { fr: "Aperçu du Devis", en: "Quote Preview", ar: "معاينة العرض" },
  "pro.profitLabel": { fr: "Marge", en: "Profit", ar: "الربح" },

  // Customer Requests
  "pro.customerRequests": { fr: "Demandes Clients", en: "Customer Requests", ar: "طلبات الزبائن" },
  "pro.customerRequestsSub": { fr: "Utilisateurs recherchant un bijoutier", en: "Users looking for a jeweler", ar: "مستخدمون يبحثون عن صائغ" },
  "pro.lookingFor": { fr: "Cherche", en: "Looking for", ar: "يبحث عن" },
  "pro.contact": { fr: "Contacter", en: "Contact", ar: "تواصل" },

  // Gold Price Chart
  "pro.priceEvolution": { fr: "Évolution du prix sur 30 jours", en: "30-Day Price Evolution", ar: "تطور السعر على 30 يوماً" },
  "pro.day": { fr: "Jour", en: "Day", ar: "يوم" },

  // Global Trends tab
  "pro.globalTrendsTitle": { fr: "Tendances Mondiales", en: "Global Trends", ar: "الترندات العالمية" },
  "pro.globalTrendsSub": { fr: "Tendances depuis Dubaï, Paris et Milan", en: "Trends from Dubai, Paris, and Milan", ar: "ترندات من دبي وباريس وميلانو" },
  "pro.comingSoon": { fr: "Bientôt disponible", en: "Coming soon", ar: "قريباً" },

  // Shop Settings tab
  "pro.settingsTitle": { fr: "Paramètres de la Boutique", en: "Shop Settings", ar: "إعدادات المتجر" },
  "pro.settingsSub": { fr: "Personnalisez votre profil professionnel", en: "Customize your professional profile", ar: "خصّص ملفك المهني" },
  "pro.settings.storeName": { fr: "Nom de la bijouterie", en: "Store Name", ar: "اسم المتجر" },
  "pro.settings.storeNamePlaceholder": { fr: "ex: Bijouterie El Firdaous", en: "e.g.: El Firdaous Jewelry", ar: "مثال: مجوهرات الفردوس" },
  "pro.settings.whatsapp": { fr: "Numéro WhatsApp", en: "WhatsApp Number", ar: "رقم واتساب" },
  "pro.settings.whatsappPlaceholder": { fr: "+212 6XX XXX XXX", en: "+212 6XX XXX XXX", ar: "+212 6XX XXX XXX" },
  "pro.settings.whatsappDesc": { fr: "Pour recevoir les demandes clients", en: "To receive customer requests", ar: "لاستقبال طلبات الزبائن" },
  "pro.settings.address": { fr: "Adresse", en: "Address", ar: "العنوان" },
  "pro.settings.addressPlaceholder": { fr: "ex: 45 Rue des Bijoutiers, Derb Sultan, Casablanca", en: "e.g.: 45 Rue des Bijoutiers, Derb Sultan, Casablanca", ar: "مثال: 45 شارع الصاغة، درب السلطان، الدار البيضاء" },
  "pro.settings.defaultLabor": { fr: "Prix main d'œuvre par défaut", en: "Default Labor Cost", ar: "تكلفة العمل الافتراضية" },
  "pro.settings.defaultLaborPlaceholder": { fr: "ex: 150", en: "e.g.: 150", ar: "مثال: 150" },
  "pro.settings.defaultLaborDesc": { fr: "Façon par défaut en MAD, appliquée automatiquement aux devis", en: "Default façon in MAD, auto-applied to quotes", ar: "تكلفة الصنعة الافتراضية بالدرهم، تُطبّق تلقائياً على العروض" },
  "pro.settings.logo": { fr: "Logo de la boutique", en: "Store Logo", ar: "شعار المتجر" },
  "pro.settings.logoDesc": { fr: "Affiché sur vos devis PDF. Format JPG ou PNG, max 2 Mo.", en: "Shown on your PDF quotes. JPG or PNG, max 2 MB.", ar: "يظهر على عروض PDF الخاصة بك. JPG أو PNG، حد أقصى 2 ميغا." },
  "pro.settings.logoUpload": { fr: "Télécharger un logo", en: "Upload Logo", ar: "رفع الشعار" },
  "pro.settings.logoChange": { fr: "Changer le logo", en: "Change Logo", ar: "تغيير الشعار" },
  "pro.settings.save": { fr: "Enregistrer les modifications", en: "Save Changes", ar: "حفظ التغييرات" },
  "pro.settings.saved": { fr: "Modifications enregistrées !", en: "Changes saved!", ar: "تم حفظ التغييرات!" },
  "pro.settings.profileSection": { fr: "Profil de la boutique", en: "Store Profile", ar: "ملف المتجر" },
  "pro.settings.quotesSection": { fr: "Paramètres des devis", en: "Quote Settings", ar: "إعدادات العروض" },

  // Quotation Generator
  "quotes.formTitle": { fr: "Créer un Devis", en: "Create a Quote", ar: "إنشاء عرض سعر" },
  "quotes.formSub": { fr: "Générez un devis professionnel et partagez-le via WhatsApp", en: "Generate a professional quote and share it via WhatsApp", ar: "أنشئ عرض سعر احترافي وشاركه عبر واتساب" },
  "quotes.photo": { fr: "Photo du bijou", en: "Jewelry Photo", ar: "صورة المجوهرات" },
  "quotes.uploadPhoto": { fr: "Télécharger une photo", en: "Upload a photo", ar: "رفع صورة" },
  "quotes.orSelectTrend": { fr: "Ou sélectionnez un modèle tendance :", en: "Or select a trending model:", ar: "أو اختر نموذجاً رائجاً:" },
  "quotes.karat": { fr: "Caratage de l'or", en: "Gold Karat", ar: "عيار الذهب" },
  "quotes.liveCalc": { fr: "Calcul en direct", en: "Live Calculation", ar: "الحساب المباشر" },
  "quotes.previewTitle": { fr: "Aperçu du Reçu", en: "Receipt Preview", ar: "معاينة الإيصال" },
  "quotes.receipt": { fr: "Devis", en: "Quote", ar: "عرض سعر" },
  "quotes.generateShare": { fr: "Générer & Partager via WhatsApp", en: "Generate & Share via WhatsApp", ar: "إنشاء ومشاركة عبر واتساب" },
} as const;

export type TranslationKey = keyof typeof translations;
