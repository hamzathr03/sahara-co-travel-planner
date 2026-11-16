import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="text-6xl">🐪</p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-stone-900">{t.notFound.title}</h1>
      <p className="mt-2 text-stone-500">{t.notFound.text}</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
      >
        {t.notFound.back}
      </Link>
    </div>
  );
}
