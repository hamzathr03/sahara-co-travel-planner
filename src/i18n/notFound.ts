import type { Lang } from "./types";

const fr = {
  title: "Page introuvable",
  text: "Cette page semble s'être perdue quelque part dans le désert...",
  back: "Retour à l'accueil",
};

type NotFoundTexts = typeof fr;

const en: NotFoundTexts = {
  title: "Page not found",
  text: "This page seems to have got lost somewhere in the desert...",
  back: "Back to home",
};

const ar: NotFoundTexts = {
  title: "الصفحة غير موجودة",
  text: "يبدو أن هذه الصفحة ضاعت في مكان ما في الصحراء...",
  back: "العودة إلى الرئيسية",
};

export const notFound: Record<Lang, NotFoundTexts> = { fr, en, ar };
