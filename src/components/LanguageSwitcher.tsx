import { useLang } from "../context/LanguageContext";
import { LANGS, LANG_META } from "../i18n/types";
import { cn } from "../utils/cn";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    // dir="ltr": the buttons keep the same order in every language
    <div dir="ltr" role="group" aria-label={t.nav.language} className={cn("flex items-center gap-0.5 rounded-full border border-stone-200 p-0.5", className)}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={LANG_META[code].label}
          aria-pressed={code === lang}
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold transition",
            code === lang ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"
          )}
        >
          {LANG_META[code].short}
        </button>
      ))}
    </div>
  );
}
