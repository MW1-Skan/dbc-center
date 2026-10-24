import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";

const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const t = useTranslations("Hero");
  const stats = ["procedures", "years", "departments"] as const;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft mint circle behind the portrait */}
      <div
        aria-hidden
        className="absolute -end-[180px] -top-[120px] size-[460px] rounded-full bg-mint md:-end-[220px] md:-top-[160px] md:size-[900px]"
      />

      <div className="relative container-x flex flex-col gap-[22px] pt-8 pb-10 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] md:items-center md:gap-16 md:pt-[88px] md:pb-24">
        <div className="contents md:flex md:flex-col md:gap-7">
          <span
            data-hero
            style={delay(0)}
            className="order-1 inline-flex items-center gap-2 self-start rounded-pill bg-chip px-3 py-1.5 text-[13px] font-semibold text-teal-700 md:gap-2.5 md:px-4 md:py-2 md:text-sm"
          >
            <span className="size-[7px] rounded-full bg-teal-500 md:size-2" />
            <span className="md:hidden">{t("eyebrowShort")}</span>
            <span className="hidden md:inline">{t("eyebrow")}</span>
          </span>

          <h1 data-hero style={delay(80)} className="order-2 text-display">
            {t("title")}
          </h1>

          <p
            data-hero
            style={delay(160)}
            className="order-4 max-w-[540px] text-[17px] text-lead md:text-xl md:leading-[1.55]"
          >
            <span className="md:hidden">{t("leadShort")}</span>
            <span className="hidden md:inline">{t("lead")}</span>
          </p>

          <div
            data-hero
            style={delay(240)}
            className="order-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-3.5"
          >
            <Button href="/book" size="lg" className="max-md:h-14 max-md:w-full">
              {t("ctaBook")}
              <ArrowIcon size={18} className="nudge hidden md:block" />
            </Button>
            <Button
              href={contact.whatsappHref}
              variant="outline"
              size="lg"
              className="max-md:h-[54px] max-md:w-full"
            >
              <WhatsAppIcon size={18} className="text-teal-600" />
              <span className="md:hidden">{t("ctaWhatsappShort")}</span>
              <span className="hidden md:inline">{t("ctaWhatsapp")}</span>
            </Button>
          </div>

          <dl
            data-hero
            style={delay(320)}
            className="order-6 grid grid-cols-3 gap-2 border-t border-line pt-[18px] md:mt-2 md:flex md:flex-wrap md:gap-10 md:pt-5"
          >
            {stats.map((key) => (
              <div key={key} className="flex flex-col">
                <dt className="sr-only">{t(`stats.${key}.label`)}</dt>
                <dd className="font-heading text-xl font-semibold text-navy-800 md:text-3xl">
                  {t(`stats.${key}.value`)}
                </dd>
                <dd
                  className="text-[13px] leading-[1.3] text-muted md:text-sm md:leading-normal"
                  aria-hidden
                >
                  <span className="md:hidden">{t(`stats.${key}.labelShort`)}</span>
                  <span className="hidden md:inline">{t(`stats.${key}.label`)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait with the logo-motif arcs */}
        <div className="relative order-3 flex h-[300px] items-center justify-center md:h-auto md:min-h-[560px]">
          <div className="absolute inset-0 flex items-center justify-center rtl:-scale-x-100">
            <div
              aria-hidden
              data-hero="arc"
              style={{ "--arc-angle": "-30deg", "--hero-delay": "150ms" } as React.CSSProperties}
              className="absolute aspect-square w-[300px] rounded-full border-[7px] border-transparent border-t-navy-700 border-l-navy-700 md:w-[560px] md:max-w-full md:border-[10px]"
            />
            <div
              aria-hidden
              data-hero="arc"
              style={{ "--arc-angle": "-20deg", "--hero-delay": "250ms" } as React.CSSProperties}
              className="absolute aspect-square w-[300px] rounded-full border-[7px] border-transparent border-r-teal-500 md:w-[560px] md:max-w-full md:border-[10px]"
            />
          </div>
          <div
            data-hero
            style={delay(300)}
            className="relative flex w-[256px] md:w-[476px] md:max-w-[86%]"
          >
            <ImagePlaceholder
              alt={t("photoAlt")}
              label={t("photoLabel")}
              className="aspect-square w-full rounded-full"
              labelClassName="max-md:hidden"
            />
            <span
              className="absolute inset-0 flex items-center justify-center md:hidden"
              aria-hidden
            >
              <span className="rounded-pill bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-[.08em] text-label uppercase">
                {t("photoLabelShort")}
              </span>
            </span>
          </div>
          <div
            data-hero
            style={delay(800)}
            className="absolute start-0 bottom-10 hidden items-center gap-3.5 rounded-[18px] bg-white px-5 py-4 shadow-float md:flex"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-chip">
              <CheckIcon size={22} className="text-teal-600" />
            </span>
            <span className="flex flex-col leading-[1.3]">
              <strong className="text-base text-navy-800">{t("credentialName")}</strong>
              <span className="text-sm text-muted">{t("credentialSub")}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
