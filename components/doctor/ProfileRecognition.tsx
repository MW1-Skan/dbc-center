import { useTranslations } from "next-intl";
import { profile } from "@/content/credentials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Congresses attended and honours, two columns. */
export function ProfileRecognition() {
  const t = useTranslations("DoctorPage.recognition");
  return (
    <section className="bg-white">
      <div className="container-x flex flex-col gap-10 section-y md:gap-14">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-10 md:gap-16">
          <Reveal className="flex flex-col gap-3">
            <h3 className="text-xl">{t("conferencesTitle")}</h3>
            <ul className="flex flex-col">
              {profile.conferences.map((c) => (
                <li key={c} className="border-t border-line py-3 text-body">
                  {t(`conferences.${c}`)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.07} className="flex flex-col gap-3">
            <h3 className="text-xl">{t("honoursTitle")}</h3>
            <ul className="flex flex-col">
              {profile.honours.map((h) => (
                <li key={h} className="border-t border-line py-3 text-body">
                  {t(`honours.${h}`)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
