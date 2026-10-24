import { useTranslations } from "next-intl";
import { faqIds } from "@/content/faq";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * FAQ accordion built on native <details name="faq">, so it works without
 * JavaScript, is keyboard accessible by default and opens one item at a time.
 */
export function Faq() {
  const t = useTranslations("Faq");
  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      <div className="container-x mx-auto flex max-w-[960px] flex-col gap-8 section-y md:gap-10">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-section">{t("title")}</h2>
        </Reveal>
        <Reveal className="flex flex-col border-t border-line">
          {faqIds.map((id) => (
            <details key={id} name="faq" className="faq-item group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start text-[17px] font-semibold text-navy-800 md:py-6 md:text-[19px] [&::-webkit-details-marker]:hidden">
                <span>{t(`items.${id}.q`)}</span>
                <span
                  aria-hidden
                  className="duration-base flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4F6] text-[22px] leading-none font-normal text-navy-800 transition-[transform,background-color,color] ease-out group-open:rotate-45 group-open:bg-navy-700 group-open:text-white"
                >
                  +
                </span>
              </summary>
              <p className="fade-in max-w-[720px] pb-6 text-lead md:pb-[26px]">
                {t(`items.${id}.a`)}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
