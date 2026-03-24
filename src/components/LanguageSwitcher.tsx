import { useLanguage } from "@/i18n/LanguageContext";
import { Language } from "@/i18n/translations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages: { value: Language; label: string; flag: string }[] = [
  { value: "fr", label: "FR", flag: "🇫🇷" },
  { value: "en", label: "EN", flag: "🇬🇧" },
  { value: "ar", label: "AR", flag: "🇲🇦" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
      <SelectTrigger className="w-[80px] h-9 bg-background border-border text-foreground gap-1 text-sm font-body">
        <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value} className="font-body">
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
