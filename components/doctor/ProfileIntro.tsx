import { useTranslations } from "next-intl";
import { doctor, profile } from "@/content/credentials";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ArrowIcon } from "@/components/ui/icons";

const d = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as React.CSSProperties;

/** Portrait, introduction, quick facts and the four credential blocks. */
export function ProfileIntro() {
  const t = useTranslations("DoctorPage");
  // Block and item ids are combined at runtime, which the typed key union cannot express.
  const key = (k: string) => k as Parameters<typeof t>[0];
  return (
    <section className="bg-white">
      <div className="container-x grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] items-start gap-10 pt-10 pb-14 md:gap-[72px] md:pt-14 lg:pb-28">
        <div data-hero style={d(200)} className="relative flex justify-center lg:sticky lg:top-28">
          <ImagePlaceholder
            label={t("portraitLabel")}
            alt={t("portraitAlt")}
            className="aspect-[4/5] w-full max-w-[520px] rounded-[200px_200px_28px_28px] md:rounded-[260px_260px_28px_28px]"
          />
        </div>

        <div className="flex flex-col gap-[22px]">
          <div data-hero style={d(0)}>
            <Breadcrumb current={t("crumb")} />
          </div>
          <Eyebrow data-hero style={d(60)}>
            {t("eyebrow")}
          </Eyebrow>
          <div data-hero style={d(120)} className="flex flex-col gap-2">
            <h1 className="text-display-sm">{t("name")}</h1>
            <span className="text-lg font-semibold text-teal-600">{t("role")}</span>
            <span className="text-[15px] text-muted">{t("qualifications")}</span>
          </div>
          <p data-hero style={d(200)} className="text-[17px] text-body md:text-[19px]">
            {t("p1")}
          </p>
          <p data-hero style={d(260)} className="text-lead">
            {t("p2")}
          </p>

          <dl
            data-hero
            style={d(320)}
            className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-3"
          >
            {profile.facts.map((f) => (
              <div
                key={f}
                className="flex flex-col gap-1 rounded-[18px] border border-line bg-cloud px-4 py-4"
              >
                <dd className="font-heading text-[26px] leading-[1.1] font-semibold text-navy-800">
                  {t(`facts.${f}.value`)}
                </dd>
                <dt className="text-sm text-muted">{t(`facts.${f}.label`)}</dt>
              </div>
            ))}
          </dl>

          <div data-hero style={d(380)} className="flex flex-wrap gap-3.5 pt-2">
            <Button href="/book" className="max-md:w-full">
              {t("ctaBook")}
              <ArrowIcon size={18} className="nudge" />
            </Button>
            <Button href={doctor.certificatesHref} variant="outline" className="max-md:w-full">
              {t("ctaCertificates")}
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-10">
            {profile.blocks.map((block) => (
              <div key={block} className="flex flex-col">
                <h2 className="mb-2 text-[22px]">{t(`blocks.${block}.title`)}</h2>
                <ul className="flex flex-col">
                  {profile.blockItems[block].map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[minmax(84px,auto)_1fr] gap-4 border-t border-line py-3.5 text-body md:gap-6"
                    >
                      <span className="font-heading text-[15px] font-semibold text-teal-600 tabular-nums">
                        {t(key(`blocks.${block}.items.${item}.year`))}
                      </span>
                      <span>{t(key(`blocks.${block}.items.${item}.text`))}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
