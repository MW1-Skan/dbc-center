import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = ["consultation", "assessment", "surgery", "followUp"] as const;

/** Four-step "Your journey with us" band on navy. */
export function Journey() {
  const t = useTranslations("Journey");
  return (
    <section id="journey" className="relative scroll-mt-24 overflow-hidden bg-navy-800 text-white">
      <div
        aria-hidden
        className="absolute -end-[200px] -top-[360px] size-[720px] rounded-full border-2 border-teal-200/22"
      />
      <div
        aria-hidden
        className="absolute -end-[80px] -top-[240px] size-[480px] rounded-full border-2 border-teal-200/16"
      />
      <div className="relative container-x flex flex-col gap-10 section-y md:gap-14">
        <Reveal className="flex max-w-[640px] flex-col gap-4">
          <Eyebrow className="text-teal-200">{t("eyebrow")}</Eyebrow>
          <h2 className="text-section text-white">{t("title")}</h2>
        </Reveal>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-x-8 gap-y-10">
          {steps.map((step, i) => (
            <Reveal
              key={step}
              as="li"
              delay={i * 0.07}
              className="flex flex-col gap-3.5 border-t border-white/22 pt-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-teal-500 font-heading font-semibold">
                {i + 1}
              </span>
              <h3 className="text-[22px] text-white">{t(`steps.${step}.title`)}</h3>
              <p className="text-base text-on-navy-muted">{t(`steps.${step}.desc`)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
