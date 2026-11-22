import { useTranslations } from "next-intl";
import { publications } from "@/content/credentials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckIcon, ExternalLinkIcon } from "@/components/ui/icons";

/** Publications, selected presentations and teaching on a mint band. */
export function ProfileResearch() {
  const t = useTranslations("DoctorPage.research");
  return (
    <section className="bg-mint">
      <div className="container-x flex flex-col gap-10 section-y md:gap-14">
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          maxWidth="max-w-[720px]"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-6">
          <Reveal className="flex flex-col gap-4 rounded-card-lg bg-white p-6 md:p-8">
            <h3 className="text-xl">{t("publicationsTitle")}</h3>
            <ol className="flex flex-col">
              {publications.map((p) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[52px_1fr] gap-3 border-t border-line-faint py-3.5 text-[15px] [overflow-wrap:anywhere] text-body"
                >
                  <span className="font-heading font-semibold text-teal-600 tabular-nums">
                    {p.year}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href={`https://doi.org/${p.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1.5 font-medium text-navy-800 no-underline hover:text-teal-600 hover:underline"
                    >
                      <span>{t(`publications.${p.id}.text`)}</span>
                      <ExternalLinkIcon
                        size={14}
                        className="mt-1 shrink-0 text-teal-600 opacity-75 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-muted">
                      <span className="font-medium text-lead">{p.journal}</span>
                      <span aria-hidden>·</span>
                      <span dir="ltr" className="font-mono text-xs">
                        DOI: {p.doi}
                      </span>
                      {p.firstAuthor ? (
                        <span className="rounded-pill bg-chip px-2.5 py-0.5 text-[11px] font-semibold text-teal-700">
                          {t("firstAuthor")}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal
              delay={0.07}
              className="flex flex-col gap-4 rounded-card-lg bg-white p-6 md:p-8"
            >
              <h3 className="text-xl">{t("presentationsTitle")}</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-body">
                {(["aortogastric", "herniation", "abdominoplasty", "endobag"] as const).map((p) => (
                  <li key={p} className="flex gap-3">
                    <CheckIcon size={18} className="mt-1 shrink-0 text-teal-600" />
                    <span>{t(`presentations.${p}`)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              delay={0.14}
              className="flex flex-col gap-4 rounded-card-lg bg-white p-6 md:p-8"
            >
              <h3 className="text-xl">{t("teachingTitle")}</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-body">
                {(["rounds", "supervision", "instructor"] as const).map((p) => (
                  <li key={p} className="flex gap-3">
                    <CheckIcon size={18} className="mt-1 shrink-0 text-teal-600" />
                    <span>{t(`teaching.${p}`)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
