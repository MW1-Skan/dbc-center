import { useTranslations } from "next-intl";

const strong = (chunks: React.ReactNode) => (
  <strong className="font-bold text-white">{chunks}</strong>
);

export function TrustStrip() {
  const t = useTranslations("Trust");
  const item = "text-[15px] text-on-navy-soft";
  return (
    <section aria-label={t("sectionLabel")} className="bg-navy-800 text-white">
      <div className="container-x flex flex-col gap-3 py-6 md:flex-row md:flex-wrap md:items-center md:gap-x-10 md:gap-y-5 md:py-[30px]">
        <span className="text-xs font-bold tracking-eyebrow text-teal-200 uppercase md:text-[13px]">
          {t("label")}
        </span>
        <span className={item}>{t.rich("items.frcs", { strong })}</span>
        <span className={`${item} hidden md:inline`}>{t.rich("items.ifso", { strong })}</span>
        <span className={`${item} hidden md:inline`}>{t.rich("items.asmbs", { strong })}</span>
        <span className={`${item} md:hidden`}>{t.rich("items.ifsoAsmbs", { strong })}</span>
        <span className={`${item} hidden md:inline`}>{t.rich("items.strasbourg", { strong })}</span>
        <span className={item}>{t.rich("items.qatar", { strong })}</span>
      </div>
    </section>
  );
}
