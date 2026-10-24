import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, CheckIcon } from "@/components/ui/icons";

const bullets = ["furnished", "reception", "terms", "location"] as const;

export function RoomsBand() {
  const t = useTranslations("RoomsBand");
  const badge = "rounded-pill px-2.5 py-1 text-[13px] font-bold";

  return (
    <section id="rooms" className="relative overflow-hidden bg-mint md:bg-navy-800 md:text-white">
      <div
        aria-hidden
        className="absolute -start-[260px] -top-[260px] hidden size-[720px] rounded-full border-2 border-teal-200/18 md:block"
      />
      <div className="relative container-x flex flex-col gap-[18px] section-y md:grid md:grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] md:items-center md:gap-16">
        <Reveal className="flex flex-col gap-[18px] md:gap-[22px]">
          <span className="eyebrow md:text-teal-200">{t("eyebrow")}</span>
          <h2 className="text-section md:text-white">
            <span className="md:hidden">{t("titleShort")}</span>
            <span className="hidden md:inline">{t("title")}</span>
          </h2>
          <p className="max-w-[520px] text-lead md:text-on-navy-muted">
            <span className="md:hidden">{t("leadShort")}</span>
            <span className="hidden md:inline">{t("lead")}</span>
          </p>
          <ul className="hidden grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-x-6 gap-y-3.5 md:grid">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <CheckIcon size={20} className="shrink-0 text-teal-200" />
                {t(`bullets.${b}`)}
              </li>
            ))}
          </ul>
          <Link
            href="/rooms"
            className="press group order-last flex h-[54px] items-center justify-center gap-2.5 rounded-pill bg-navy-700 text-[17px] font-semibold text-white no-underline hover:text-white md:order-none md:mt-2 md:h-[58px] md:self-start md:bg-white md:px-[26px] md:text-navy-800 md:hover:text-navy-800 md:hover:shadow-button"
          >
            {t("cta")}
            <ArrowIcon size={18} className="nudge hidden md:block" />
          </Link>
          {/* Phone-only photo sits between the lead and the CTA */}
          <ImagePlaceholder
            tone="mint"
            labelPosition="bottom-start"
            alt={t("photoRoom2Alt")}
            label={t("photoRoom2")}
            className="h-[190px] rounded-card p-3.5 md:hidden"
            labelClassName="text-[11px]"
          >
            <span className={`${badge} bg-white text-teal-700`}>{t("available")}</span>
          </ImagePlaceholder>
        </Reveal>

        <Reveal delay={0.1} className="hidden grid-cols-2 gap-4 md:grid">
          <ImagePlaceholder
            tone="navy"
            labelPosition="bottom-start"
            alt={t("photoRoom2Alt")}
            label={t("photoRoom2")}
            className="col-span-2 h-[240px] rounded-[22px]"
          >
            <span className={`${badge} bg-teal-200 text-navy-800`}>{t("available")}</span>
          </ImagePlaceholder>
          <ImagePlaceholder
            tone="navy"
            labelPosition="bottom-start"
            label={t("room3")}
            className="h-[180px] rounded-[22px]"
          >
            <span className={`${badge} bg-teal-200 text-navy-800`}>{t("available")}</span>
          </ImagePlaceholder>
          <ImagePlaceholder
            tone="navy"
            labelPosition="bottom-start"
            label={t("reception")}
            className="h-[180px] rounded-[22px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
