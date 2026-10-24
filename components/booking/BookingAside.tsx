import Image from "next/image";
import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

const steps = ["confirm", "visit", "plan"] as const;

export function BookingAside() {
  const t = useTranslations("BookPage");
  const tc = useTranslations("Common");
  const row =
    "flex items-center gap-3.5 font-semibold text-navy-800 no-underline hover:text-navy-700";
  const chip = "flex size-11 shrink-0 items-center justify-center rounded-full bg-chip";

  return (
    <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
      <Reveal
        delay={0.1}
        className="relative flex flex-col gap-6 overflow-hidden rounded-panel bg-navy-800 p-7 text-white md:p-9"
      >
        <Image
          src="/brand/logo-mark-white.png"
          alt=""
          aria-hidden
          width={220}
          height={220}
          className="absolute -end-[70px] -top-[70px] size-[220px] object-contain opacity-[.07]"
        />
        <h2 className="text-[22px] text-white">{t("next.title")}</h2>
        <ol className="flex flex-col gap-[22px]">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="min-w-6 font-heading font-semibold text-teal-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-0.5">
                <strong className="font-bold">{t(`next.steps.${s}.title`)}</strong>
                <span className="text-[15px] text-on-navy-muted">{t(`next.steps.${s}.desc`)}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="flex items-baseline justify-between gap-3 border-t border-on-navy-muted/20 pt-5">
          <span className="text-[15px] text-on-navy-muted">{t("next.feeLabel")}</span>
          <strong className="font-heading text-xl font-bold">{t("next.fee")}</strong>
        </div>
      </Reveal>

      <Reveal
        delay={0.15}
        className="flex flex-col gap-[18px] rounded-panel border border-line bg-white p-6 md:p-8"
      >
        <h2 className="text-xl">{t("talk.title")}</h2>
        <a href={contact.phoneHref} className={row}>
          <span className={chip}>
            <PhoneIcon size={18} className="text-teal-600" />
          </span>
          <span dir="ltr">{contact.phoneDisplay}</span>
        </a>
        <a href={contact.whatsappHref} className={row}>
          <span className={chip}>
            <WhatsAppIcon size={18} className="text-teal-600" />
          </span>
          {t("talk.whatsapp")}
        </a>
        <div
          role="img"
          aria-label={tc("mapPlaceholder")}
          className="flex h-[170px] items-center justify-center rounded-[18px] stripes-light"
        >
          <span className="rounded-pill bg-white/90 px-3 py-1.5 text-xs font-bold tracking-[.08em] text-label uppercase">
            {tc("map")}
          </span>
        </div>
        <span className="text-[15px] text-lead">
          {contact.address.inline}
          <br />
          {contact.hours}
        </span>
      </Reveal>

      <Reveal
        delay={0.2}
        className="rounded-card bg-warm-soft px-6 py-[22px] text-[15px] text-warm-deep"
      >
        {t.rich("emergency", {
          strong: (c) => <strong className="font-bold">{c}</strong>,
          line: contact.emergencyLine,
        })}
      </Reveal>
    </aside>
  );
}
