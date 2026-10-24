import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("Common");
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-navy-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
    >
      {t("skipToContent")}
    </a>
  );
}
