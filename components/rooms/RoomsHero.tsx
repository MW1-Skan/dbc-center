import Image from "next/image";
import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowIcon } from "@/components/ui/icons";

const stats = ["rooms", "size", "floor"] as const;
const d = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as React.CSSProperties;

export function RoomsHero() {
  const t = useTranslations("RoomsPage");
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <Image
        src="/brand/logo-mark-white.png"
        alt=""
        aria-hidden
        width={560}
        height={560}
        priority
        className="absolute -start-[160px] -bottom-[220px] size-[560px] object-contain opacity-[.05]"
      />
      <div className="relative container-x grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] items-center gap-10 pt-10 pb-14 md:gap-16 md:pt-[88px] md:pb-24">
        <div className="flex flex-col gap-5 md:gap-[26px]">
          <div data-hero style={d(0)}>
            <Breadcrumb current={t("crumb")} dark />
          </div>
          <span data-hero style={d(60)} className="eyebrow text-teal-200">
            {t("eyebrow")}
          </span>
          <h1 data-hero style={d(120)} className="text-display-rooms text-white">
            {t("title")}
          </h1>
          <p
            data-hero
            style={d(200)}
            className="max-w-[520px] text-[17px] text-on-navy-muted md:text-[19px]"
          >
            {t("lead")}
          </p>
          <div
            data-hero
            style={d(280)}
            className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-3.5"
          >
            <Button href="#inquiry" variant="white" className="h-[58px] px-[26px] max-md:w-full">
              {t("ctaAvailability")}
              <ArrowIcon size={18} className="nudge" />
            </Button>
            <Button
              href={contact.phoneHref}
              variant="ghost"
              className="h-[58px] px-6 max-md:w-full"
            >
              {t("ctaCall")}
            </Button>
          </div>
        </div>
        <div data-hero style={d(240)} className="flex flex-col gap-4">
          <ImagePlaceholder
            tone="navy"
            label={t("heroPhoto")}
            alt={t("heroPhotoAlt")}
            className="h-[240px] rounded-panel md:h-[340px]"
          />
          <dl className="grid grid-cols-3 gap-3 md:gap-4">
            {stats.map((s) => (
              <div
                key={s}
                className="flex flex-col rounded-[18px] bg-white/7 px-4 py-4 md:px-5 md:py-[18px]"
              >
                <dd className="font-heading text-xl font-bold md:text-[26px]">
                  {t(`stats.${s}.value`)}
                </dd>
                <dt className="text-[13px] text-on-navy-muted md:text-sm">
                  {t(`stats.${s}.label`)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
