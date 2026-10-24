import Image from "next/image";
import { useTranslations } from "next-intl";
import { doctor, doctorCredentials } from "@/content/credentials";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CheckIcon } from "@/components/ui/icons";

const strong = (chunks: React.ReactNode) => (
  <strong className="font-bold text-navy-800">{chunks}</strong>
);

export function Doctor() {
  const t = useTranslations("Doctor");
  return (
    <section id="doctor" className="scroll-mt-24 bg-white">
      <div className="container-x grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-5 section-y md:gap-[72px]">
        <Reveal className="relative flex justify-center">
          <ImagePlaceholder
            label={t("portraitLabel")}
            alt={t("portraitAlt")}
            className="h-[380px] w-full rounded-[175px_175px_24px_24px] md:aspect-[4/5] md:h-auto md:max-w-[480px] md:rounded-[240px_240px_28px_28px]"
          />
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={112}
            height={112}
            className="absolute end-[4%] -bottom-7 hidden size-28 rounded-full bg-white object-contain p-3.5 shadow-badge md:block"
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-5 md:gap-[22px]">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <div className="flex flex-col gap-1 md:gap-1.5">
            <h2 className="text-doctor">{t("name")}</h2>
            <span className="font-semibold text-teal-600 md:text-lg">{t("role")}</span>
          </div>
          <p className="text-lead">
            <span className="md:hidden">{t("bioShort")}</span>
            <span className="hidden md:inline">{t("bio")}</span>
          </p>
          <ul className="flex flex-col gap-2.5 text-[15px] md:gap-3.5 md:text-[17px]">
            {doctorCredentials.map((id) => (
              <li key={id} className="flex items-start gap-2.5 md:gap-3.5">
                <CheckIcon size={18} className="mt-[3px] shrink-0 text-teal-600 md:hidden" />
                <CheckIcon size={22} className="mt-0.5 hidden shrink-0 text-teal-600 md:block" />
                <span className="md:hidden">{t(`credentialsShort.${id}`)}</span>
                <span className="hidden md:inline">{t.rich(`credentials.${id}`, { strong })}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3.5 md:pt-2">
            <Button
              href={doctor.profileHref}
              variant="outline"
              className="h-[52px] w-full md:hidden"
            >
              {t("readProfile")}
            </Button>
            <Button href={doctor.profileHref} className="max-md:hidden">
              {t("readProfile")}
            </Button>
            <Button href={doctor.certificatesHref} variant="outline" className="max-md:hidden">
              {t("viewCertificates")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
